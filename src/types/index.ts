export type AnomalyType = 'none' | 'future' | 'altered_past' | 'parallel_branch';

export interface JournalEntry {
  id: string;
  createdAt: Date;
  apparentTime: Date; // When it claims to be from
  content: string;
  originalContent: string;
  anomalyType: AnomalyType;
  parentId: string | null;
  branchId: string | null;
  version: number;
  isRewritten: boolean;
}

export interface TimelineBranch {
  id: string;
  name: string;
  originTimestamp: Date;
  entryIds: string[];
  visualOffset: number;
}

export interface ApplicationState {
  // UI State
  currentSection: 'landing' | 'journal' | 'settings';
  selectedEntryId: string | null;
  anomalyIntensity: 0 | 1 | 2 | 3;
  
  // Data
  entries: JournalEntry[];
  branches: TimelineBranch[];
  
  // Effects State
  activeGlitches: string[];
  rewritingEntryIds: string[];
  
  // Actions
  addEntry: (text: string) => void;
  updateEntry: (id: string, text: string) => void;
  deleteEntry: (id: string) => void;
  selectEntry: (id: string | null) => void;
  triggerRewrite: (entryId: string) => void;
  createBranch: (originTimestamp: Date) => string;
  setAnomalyIntensity: (intensity: 0 | 1 | 2 | 3) => void;
  setCurrentSection: (section: 'landing' | 'journal' | 'settings') => void;
  resetJournal: () => void;
}

export interface EffectConfig {
  type: 'screenTear' | 'colorAberration' | 'ripple' | 'static';
  duration: number;
  intensity: number;
  triggerProbability: number;
}
