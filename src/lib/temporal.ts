// Temporal utility functions for time anomalies

/**
 * Generate a random future ISO date string
 * @param minHours Minimum hours in the future (default: 1)
 * @param maxHours Maximum hours in the future (default: 168 = 7 days)
 */
export function getRandomFutureISODate(minHours = 1, maxHours = 168): string {
  const now = new Date();
  const hoursInFuture = Math.random() * (maxHours - minHours) + minHours;
  const futureDate = new Date(now.getTime() + hoursInFuture * 60 * 60 * 1000);
  return futureDate.toISOString();
}

/**
 * Generate a random past ISO date string
 * @param minHours Minimum hours in the past (default: 1)
 * @param maxHours Maximum hours in the past (default: 168 = 7 days)
 */
export function getRandomPastISODate(minHours = 1, maxHours = 168): string {
  const now = new Date();
  const hoursInPast = Math.random() * (maxHours - minHours) + minHours;
  const pastDate = new Date(now.getTime() - hoursInPast * 60 * 60 * 1000);
  return pastDate.toISOString();
}

// Glitch characters for text corruption
const GLITCH_CHARS = ['▇', '█', '▓', '▒', '░', '▀', '▄', '▌', '▐', '■', '□', '▪', '▫'];
const CORRUPTION_PHRASES = [
  '...the void watches...',
  '...time fractures...',
  '...reality bends...',
  '...echoes from nowhere...',
  '...this never happened...',
  '...or did it?...',
  '...the timeline splits...',
  '...causality breaks...',
];

/**
 * Distort text for different anomaly types
 */
export function distortText(content: string, mode: 'future_echo' | 'alter_past' | 'branch_timeline'): string {
  const words = content.split(' ');
  
  switch (mode) {
    case 'future_echo': {
      // Future echoes: partial corruption, reversed fragments, glitch chars
      const corruptionLevel = 0.2; // 20% of words affected
      const distorted = words.map((word) => {
        if (Math.random() < corruptionLevel) {
          const rand = Math.random();
          if (rand < 0.3) {
            // Reverse word
            return word.split('').reverse().join('');
          } else if (rand < 0.6) {
            // Replace with glitch
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)].repeat(word.length);
          } else {
            // Partial corruption
            const mid = Math.floor(word.length / 2);
            return word.slice(0, mid) + GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] + word.slice(mid + 1);
          }
        }
        return word;
      });
      
      // Add ominous suffix
      const suffix = CORRUPTION_PHRASES[Math.floor(Math.random() * CORRUPTION_PHRASES.length)];
      return distorted.join(' ') + '\n\n' + suffix;
    }
    
    case 'alter_past': {
      // Altered past: insert ominous phrases, subtle changes
      const insertionPoint = Math.floor(words.length / 2);
      const ominousPhrase = CORRUPTION_PHRASES[Math.floor(Math.random() * CORRUPTION_PHRASES.length)];
      
      // Insert phrase in the middle
      words.splice(insertionPoint, 0, ominousPhrase);
      
      // Corrupt a few words
      const corruptionLevel = 0.15;
      const distorted = words.map((word) => {
        if (Math.random() < corruptionLevel && word.length > 3) {
          // Replace middle character with glitch
          const mid = Math.floor(word.length / 2);
          return word.slice(0, mid) + GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] + word.slice(mid + 1);
        }
        return word;
      });
      
      return distorted.join(' ');
    }
    
    case 'branch_timeline': {
      // Branch timeline: rewrite ending, change tone
      const sentences = content.split(/[.!?]+/).filter(s => s.trim());
      
      if (sentences.length > 1) {
        // Keep first half, rewrite second half
        const midPoint = Math.floor(sentences.length / 2);
        const firstHalf = sentences.slice(0, midPoint).join('. ') + '.';
        
        // Add divergent ending
        const divergentEndings = [
          ' But that\'s not what really happened.',
          ' Or was it? The memory shifts.',
          ' In another timeline, everything was different.',
          ' The truth fractures here.',
          ' Reality splits at this moment.',
          ' This is where it all went wrong.',
        ];
        
        const ending = divergentEndings[Math.floor(Math.random() * divergentEndings.length)];
        return firstHalf + ending;
      }
      
      // If only one sentence, add divergent continuation
      return content + ' ...but in this branch, something changed.';
    }
    
    default:
      return content;
  }
}

/**
 * Get a random entry from an array
 */
export function getRandomEntry<T>(array: T[]): T | null {
  if (array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get the oldest entry from an array
 */
export function getOldestEntry<T extends { createdAt: string }>(array: T[]): T | null {
  if (array.length === 0) return null;
  return array.reduce((oldest, current) => {
    return new Date(current.createdAt) < new Date(oldest.createdAt) ? current : oldest;
  });
}
