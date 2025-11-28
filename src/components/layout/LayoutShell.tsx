import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useUISettingsStore } from '../../features/settings/uiSettingsStore';

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const ambientMode = useUISettingsStore((state) => state.ambientMode);
  
  return (
    <div 
      className={`min-h-screen bg-background-primary text-text-primary relative overflow-hidden ${
        ambientMode ? 'ambient-horror' : ''
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)',
      }}
    >
      {/* Animated time rift background */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
        }}
      />
      
      {/* Time crack effect */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute top-0 left-1/3 w-[2px] h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(99, 102, 241, 0.3) 20%, rgba(139, 92, 246, 0.3) 50%, rgba(239, 68, 68, 0.3) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          transform: 'rotate(2deg)',
        }}
      />
      
      {/* Content container with journal page feeling */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Ambient mode overlay */}
      {ambientMode && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)',
          }}
        />
      )}
    </div>
  );
}
