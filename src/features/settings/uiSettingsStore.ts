import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UISettingsState {
  visualIntensity: 'low' | 'medium' | 'high';
  glitchEnabled: boolean;
  ambientMode: boolean;
  
  // Actions
  setVisualIntensity: (level: 'low' | 'medium' | 'high') => void;
  setGlitchEnabled: (enabled: boolean) => void;
  setAmbientMode: (enabled: boolean) => void;
}

export const useUISettingsStore = create<UISettingsState>()(
  persist(
    (set) => ({
      visualIntensity: 'medium',
      glitchEnabled: true,
      ambientMode: true,
      
      setVisualIntensity: (level) => set({ visualIntensity: level }),
      setGlitchEnabled: (enabled) => set({ glitchEnabled: enabled }),
      setAmbientMode: (enabled) => set({ ambientMode: enabled }),
    }),
    {
      name: 'ui-settings-storage',
    }
  )
);
