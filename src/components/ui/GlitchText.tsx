import { motion } from 'framer-motion';
import { useUISettingsStore } from '../../features/settings/uiSettingsStore';
import type { ReactNode } from 'react';

interface GlitchTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  intensity?: 0 | 1 | 2 | 3;
  className?: string;
}

export function GlitchText({ 
  children, 
  as: Component = 'span', 
  intensity: propIntensity,
  className = '' 
}: GlitchTextProps) {
  const visualIntensity = useUISettingsStore((state) => state.visualIntensity);
  
  // Map visual intensity to numeric value if no prop intensity provided
  const getIntensityValue = (): number => {
    if (propIntensity !== undefined) return propIntensity;
    
    switch (visualIntensity) {
      case 'low': return 1;
      case 'medium': return 2;
      case 'high': return 3;
      default: return 2;
    }
  };
  
  const intensity = getIntensityValue();
  
  // Calculate jitter based on intensity
  const jitterAmount = intensity * 0.5;
  const ghostOpacity = 0.1 + intensity * 0.1;
  const flickerDuration = 3 - intensity * 0.5;
  
  const MotionComponent = motion[Component as keyof typeof motion] as any;
  
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text with subtle jitter */}
      <MotionComponent
        animate={{
          x: [0, jitterAmount, -jitterAmount, 0],
          y: [0, -jitterAmount, jitterAmount, 0],
        }}
        transition={{
          duration: flickerDuration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="relative z-10"
      >
        {children}
      </MotionComponent>
      
      {/* Ghost duplicate - only if intensity > 0 */}
      {intensity > 0 && (
        <motion.span
          animate={{
            opacity: [0, ghostOpacity, 0],
            x: [0, intensity, -intensity, 0],
          }}
          transition={{
            duration: flickerDuration * 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 text-accent-future pointer-events-none"
          style={{
            filter: 'blur(1px)',
          }}
        >
          {children}
        </motion.span>
      )}
      
      {/* Additional ghost for high intensity */}
      {intensity >= 3 && (
        <motion.span
          animate={{
            opacity: [0, ghostOpacity * 0.7, 0],
            x: [0, -intensity * 1.5, intensity * 1.5, 0],
          }}
          transition={{
            duration: flickerDuration * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.5,
          }}
          className="absolute inset-0 text-accent-danger pointer-events-none"
          style={{
            filter: 'blur(2px)',
          }}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
}
