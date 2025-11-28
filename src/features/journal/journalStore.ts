import { create } from 'zustand';
import type { JournalEntry } from './types';
import { storage } from '../../lib/storage';
import {
  getRandomFutureISODate,
  distortText,
  getRandomEntry,
  getOldestEntry,
} from '../../lib/temporal';

interface JournalState {
  entries: JournalEntry[];
  selectedEntryId: string | null;
  anomalyIntensity: 0 | 1 | 2 | 3;
  lastAnomalyAt: string | null;
  
  // Actions
  addEntry: (content: string) => void;
  updateEntry: (id: string, content: string) => void;
  selectEntry: (id: string | null) => void;
  setAnomalyIntensity: (level: 0 | 1 | 2 | 3) => void;
  applyTimeAnomaly: (mode: 'future_echo' | 'alter_past' | 'branch_timeline') => void;
  resetJournal: () => void;
}

// Generate UUID fallback for browsers without crypto.randomUUID
const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Create sample entries for first-time users
const createSampleEntries = (): JournalEntry[] => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  return [
    {
      id: generateId(),
      createdAt: yesterday.toISOString(),
      apparentTime: yesterday.toISOString(),
      content: 'I found this journal in the attic. The pages feel... wrong. Like they\'re watching me.',
      originalContent: 'I found this journal in the attic. The pages feel... wrong. Like they\'re watching me.',
      anomalyType: 'none',
      parentId: null,
      branchId: null,
      version: 1,
      isRewritten: false,
    },
    {
      id: generateId(),
      createdAt: now.toISOString(),
      apparentTime: now.toISOString(),
      content: 'The dates don\'t make sense. Some entries are from tomorrow. How is that possible?',
      originalContent: 'The dates don\'t make sense. Some entries are from tomorrow. How is that possible?',
      anomalyType: 'none',
      parentId: null,
      branchId: null,
      version: 1,
      isRewritten: false,
    },
  ];
};

// Load initial state from localStorage or create sample entries
const loadInitialState = () => {
  const stored = storage.load();
  
  if (stored && stored.entries.length > 0) {
    return {
      entries: stored.entries,
      selectedEntryId: stored.selectedEntryId,
      anomalyIntensity: stored.anomalyIntensity,
      lastAnomalyAt: stored.lastAnomalyAt || null,
    };
  }
  
  // First time user - create sample entries
  const sampleEntries = createSampleEntries();
  return {
    entries: sampleEntries,
    selectedEntryId: sampleEntries[0]?.id || null,
    anomalyIntensity: 2 as 0 | 1 | 2 | 3,
    lastAnomalyAt: null,
  };
};

export const useJournalStore = create<JournalState>((set, get) => {
  const initialState = loadInitialState();
  
  // Save to localStorage whenever state changes
  const saveToStorage = () => {
    const state = get();
    storage.save({
      entries: state.entries,
      selectedEntryId: state.selectedEntryId,
      anomalyIntensity: state.anomalyIntensity,
      lastAnomalyAt: state.lastAnomalyAt,
    });
  };
  
  return {
    ...initialState,
    
    addEntry: (content: string) => {
      const trimmedContent = content.trim();
      if (!trimmedContent) return;
      
      const now = new Date().toISOString();
      const newEntry: JournalEntry = {
        id: generateId(),
        createdAt: now,
        apparentTime: now,
        content: trimmedContent,
        originalContent: trimmedContent,
        anomalyType: 'none',
        parentId: null,
        branchId: null,
        version: 1,
        isRewritten: false,
      };
      
      set((state) => ({
        entries: [...state.entries, newEntry],
        selectedEntryId: newEntry.id,
      }));
      
      saveToStorage();
    },
    
    updateEntry: (id: string, content: string) => {
      set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id
            ? { ...entry, content: content.trim() }
            : entry
        ),
      }));
      
      saveToStorage();
    },
    
    selectEntry: (id: string | null) => {
      set({ selectedEntryId: id });
      saveToStorage();
    },
    
    setAnomalyIntensity: (level: 0 | 1 | 2 | 3) => {
      set({ anomalyIntensity: level });
      saveToStorage();
    },
    
    applyTimeAnomaly: (mode: 'future_echo' | 'alter_past' | 'branch_timeline') => {
      const state = get();
      const now = new Date().toISOString();
      
      if (state.entries.length === 0) return;
      
      let newEntry: JournalEntry | null = null;
      
      switch (mode) {
        case 'future_echo': {
          // Pick selected entry or random entry
          const sourceEntry = state.selectedEntryId
            ? state.entries.find((e) => e.id === state.selectedEntryId)
            : getRandomEntry(state.entries);
          
          if (!sourceEntry) return;
          
          // Create future echo
          const futureTime = getRandomFutureISODate(1, 168);
          const distortedContent = distortText(sourceEntry.content, 'future_echo');
          
          newEntry = {
            id: generateId(),
            createdAt: now,
            apparentTime: futureTime,
            content: distortedContent,
            originalContent: sourceEntry.content,
            anomalyType: 'future',
            parentId: sourceEntry.id,
            branchId: null,
            version: sourceEntry.version + 1,
            isRewritten: false,
          };
          break;
        }
        
        case 'alter_past': {
          // Pick oldest entry
          const oldestEntry = getOldestEntry(state.entries);
          
          if (!oldestEntry) return;
          
          // Create altered past version
          const alteredContent = distortText(oldestEntry.content, 'alter_past');
          
          newEntry = {
            id: generateId(),
            createdAt: now,
            apparentTime: oldestEntry.apparentTime, // Same apparent time as original
            content: alteredContent,
            originalContent: oldestEntry.content,
            anomalyType: 'altered_past',
            parentId: oldestEntry.parentId || oldestEntry.id,
            branchId: null,
            version: oldestEntry.version + 1,
            isRewritten: true,
          };
          break;
        }
        
        case 'branch_timeline': {
          // Pick selected entry or most recent
          const sourceEntry = state.selectedEntryId
            ? state.entries.find((e) => e.id === state.selectedEntryId)
            : state.entries[state.entries.length - 1];
          
          if (!sourceEntry) return;
          
          // Create branch
          const branchContent = distortText(sourceEntry.content, 'branch_timeline');
          
          newEntry = {
            id: generateId(),
            createdAt: now,
            apparentTime: now,
            content: branchContent,
            originalContent: sourceEntry.content,
            anomalyType: 'parallel_branch',
            parentId: sourceEntry.id,
            branchId: generateId(), // Create new branch ID
            version: 1,
            isRewritten: false,
          };
          break;
        }
      }
      
      if (newEntry) {
        set((state) => ({
          entries: [...state.entries, newEntry!],
          selectedEntryId: newEntry!.id,
          lastAnomalyAt: now,
        }));
        
        saveToStorage();
      }
    },
    
    resetJournal: () => {
      storage.clear();
      const sampleEntries = createSampleEntries();
      set({
        entries: sampleEntries,
        selectedEntryId: sampleEntries[0]?.id || null,
        anomalyIntensity: 2,
        lastAnomalyAt: null,
      });
      saveToStorage();
    },
  };
});
