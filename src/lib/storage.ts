const STORAGE_KEY = 'time-bending-horror-journal';

export interface StorageData {
  entries: any[];
  selectedEntryId: string | null;
  anomalyIntensity: 0 | 1 | 2 | 3;
  lastAnomalyAt: string | null;
}

export const storage = {
  save: (data: StorageData): void => {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  load: (): StorageData | null => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) return null;
      
      const data = JSON.parse(serialized);
      
      // Validate required fields
      if (!Array.isArray(data.entries)) {
        return null;
      }
      
      return data as StorageData;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};
