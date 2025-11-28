import { colors } from './colors';
import { typography } from './typography';
import { animations } from './animations';

// Enhanced theme with horror-specific presets
export const theme = {
  colors,
  typography,
  animations,
  
  // Shadow and glow presets
  shadows: {
    subtleGlow: '0 0 10px rgba(99, 102, 241, 0.3)',
    dangerGlow: '0 0 15px rgba(239, 68, 68, 0.4)',
    futureGlow: '0 0 20px rgba(96, 165, 250, 0.5)',
    innerDark: 'inset 0 2px 10px rgba(0, 0, 0, 0.5)',
  },
  
  // Gradient presets
  gradients: {
    timeRift: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
    bloodVein: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 50%, rgba(239, 68, 68, 0.1) 100%)',
    voidBackground: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)',
    temporalSpine: 'linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(239, 68, 68, 0.3) 100%)',
  },
} as const;

export { colors, typography, animations };
