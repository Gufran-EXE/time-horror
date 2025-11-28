export const animations = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  easings: {
    smooth: [0.4, 0.0, 0.2, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
  },
} as const;
