import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJournalStore } from '../journal/journalStore';
import { useUISettingsStore } from '../settings/uiSettingsStore';

/**
 * Hook to determine if glitch should be active based on lastAnomalyAt
 */
function useGlitchActive(lastAnomalyAt: string | null, anomalyIntensity: number) {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    if (!lastAnomalyAt) return;
    
    // Calculate glitch duration based on intensity
    const baseDuration = 300;
    const intensityMultiplier = 1 + anomalyIntensity * 0.3;
    const duration = baseDuration * intensityMultiplier;
    
    // Trigger glitch
    setIsGlitching(true);
    
    // Clear after duration
    const timeout = setTimeout(() => {
      setIsGlitching(false);
    }, duration);
    
    return () => clearTimeout(timeout);
  }, [lastAnomalyAt, anomalyIntensity]);
  
  return isGlitching;
}

export function GlitchOverlayLayer() {
  const lastAnomalyAt = useJournalStore((state) => state.lastAnomalyAt);
  const anomalyIntensity = useJournalStore((state) => state.anomalyIntensity);
  const glitchEnabled = useUISettingsStore((state) => state.glitchEnabled);
  const isGlitching = useGlitchActive(lastAnomalyAt, anomalyIntensity) && glitchEnabled;
  
  // Calculate intensity-based values
  const opacity = 0.1 + anomalyIntensity * 0.05;
  const barCount = 3 + anomalyIntensity * 2;
  
  return (
    <AnimatePresence>
      {isGlitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 pointer-events-none z-50"
          style={{ mixBlendMode: 'screen' }}
        >
          {/* Horizontal glitch bars */}
          {Array.from({ length: barCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0 }}
              animate={{
                x: [0, -10, 10, -5, 5, 0],
                opacity: [opacity, opacity * 1.5, opacity],
              }}
              transition={{
                duration: 0.15,
                repeat: 2,
                delay: i * 0.05,
              }}
              className="absolute w-full bg-accent-primary"
              style={{
                height: '2px',
                top: `${(i + 1) * (100 / (barCount + 1))}%`,
                boxShadow: `0 0 10px rgba(99, 102, 241, ${opacity})`,
              }}
            />
          ))}
          
          {/* RGB split effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, opacity * 2, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: 1,
            }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 30% 50%, rgba(255, 0, 0, ${opacity}) 0%, transparent 50%),
                radial-gradient(circle at 70% 50%, rgba(0, 255, 0, ${opacity}) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(0, 0, 255, ${opacity}) 0%, transparent 50%)
              `,
            }}
          />
          
          {/* Screen tear effect */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{
              scaleX: [1, 1.02, 0.98, 1],
              x: [0, 5, -5, 0],
            }}
            transition={{
              duration: 0.15,
              repeat: 2,
            }}
            className="absolute inset-0 border-2 border-accent-danger"
            style={{
              opacity: opacity * 0.5,
            }}
          />
          
          {/* Scanlines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, ${opacity * 0.3}) 0px,
                transparent 1px,
                transparent 2px,
                rgba(0, 0, 0, ${opacity * 0.3}) 3px
              )`,
            }}
          />
          
          {/* Vignette pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, opacity * 1.5, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: 1,
            }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
