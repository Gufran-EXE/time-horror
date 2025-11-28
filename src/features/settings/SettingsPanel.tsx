import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUISettingsStore } from './uiSettingsStore';

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  
  const visualIntensity = useUISettingsStore((state) => state.visualIntensity);
  const glitchEnabled = useUISettingsStore((state) => state.glitchEnabled);
  const ambientMode = useUISettingsStore((state) => state.ambientMode);
  
  const setVisualIntensity = useUISettingsStore((state) => state.setVisualIntensity);
  const setGlitchEnabled = useUISettingsStore((state) => state.setGlitchEnabled);
  const setAmbientMode = useUISettingsStore((state) => state.setAmbientMode);
  
  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-background-secondary 
                   border border-accent-primary/30 rounded-lg shadow-lg
                   text-text-primary hover:border-accent-primary/60
                   transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">☰</span>
          <span className="text-sm font-medium">Rituals</span>
        </div>
      </motion.button>
      
      {/* Settings Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-background-secondary 
                         border-l border-accent-primary/30 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-display text-text-primary mb-2">
                    Ritual Controls
                  </h2>
                  <p className="text-xs text-text-secondary opacity-70">
                    Alter how the rift reveals itself.
                  </p>
                </div>
                
                {/* Visual Intensity */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Visual Intensity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setVisualIntensity(level)}
                        className={`
                          px-3 py-2 rounded text-sm font-medium transition-all duration-200
                          ${
                            visualIntensity === level
                              ? 'bg-accent-primary text-white shadow-lg'
                              : 'bg-background-tertiary text-text-secondary hover:bg-background-tertiary/70'
                          }
                        `}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-text-secondary opacity-50 mt-2">
                    Controls text glitching and visual effects
                  </p>
                </div>
                
                {/* Glitch Overlays */}
                <div className="mb-6">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-sm font-semibold text-text-primary mb-1">
                        Glitch Overlays
                      </div>
                      <p className="text-xs text-text-secondary opacity-70">
                        Screen distortions on anomalies
                      </p>
                    </div>
                    <button
                      onClick={() => setGlitchEnabled(!glitchEnabled)}
                      className={`
                        relative w-12 h-6 rounded-full transition-colors duration-200
                        ${glitchEnabled ? 'bg-accent-primary' : 'bg-background-tertiary'}
                      `}
                    >
                      <motion.div
                        animate={{ x: glitchEnabled ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </label>
                </div>
                
                {/* Ambient Horror Mode */}
                <div className="mb-6">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-sm font-semibold text-text-primary mb-1">
                        Ambient Horror Mode
                      </div>
                      <p className="text-xs text-text-secondary opacity-70">
                        Enhanced atmosphere and contrast
                      </p>
                    </div>
                    <button
                      onClick={() => setAmbientMode(!ambientMode)}
                      className={`
                        relative w-12 h-6 rounded-full transition-colors duration-200
                        ${ambientMode ? 'bg-accent-primary' : 'bg-background-tertiary'}
                      `}
                    >
                      <motion.div
                        animate={{ x: ambientMode ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </label>
                </div>
                
                {/* Warning */}
                <div className="mt-8 p-4 bg-accent-danger/10 border border-accent-danger/30 rounded-lg">
                  <p className="text-xs text-accent-danger">
                    ⚠ These controls affect only the visual presentation. 
                    The temporal anomalies remain unchanged.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
