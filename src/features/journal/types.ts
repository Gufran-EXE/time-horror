export type AnomalyType = 'none' | 'future' | 'altered_past' | 'parallel_branch';

export interface JournalEntry {
  id: string;
  createdAt: string; // ISO string - real creation time
  apparentTime: string; // ISO string - time the entry claims to be from
  content: string;
  originalContent: string; // Preserved for rewrite detection
  anomalyType: AnomalyType;
  parentId?: string | null; // For branches
  branchId?: string | null; // Which branch this entry belongs to
  version: number;
  isRewritten: boolean;
}

export interface AppState {
  entries: JournalEntry[];
  selectedEntryId: string | null;
  anomalyIntensity: 0 | 1 | 2 | 3;
}
