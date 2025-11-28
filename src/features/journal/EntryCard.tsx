import { motion } from 'framer-motion';
import type { JournalEntry } from './types';

interface EntryCardProps {
  entry: JournalEntry;
  isSelected: boolean;
  onClick: () => void;
}

export function EntryCard({ entry, isSelected, onClick }: EntryCardProps) {
  // Format date for display
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Get first line of content as preview
  const preview = entry.content.split('\n')[0].slice(0, 60);
  const needsEllipsis = entry.content.length > 60;
  
  // Calculate age for decay effect
  const entryAge = Date.now() - new Date(entry.createdAt).getTime();
  const daysOld = entryAge / (1000 * 60 * 60 * 24);
  const decayOpacity = Math.max(0.6, 1 - daysOld * 0.05); // Fade older entries
  
  // Determine border style based on anomaly type
  const getBorderClass = () => {
    if (entry.anomalyType === 'future') {
      return 'border-accent-future animate-pulse-slow';
    }
    if (entry.anomalyType === 'altered_past') {
      return 'border-accent-danger';
    }
    if (entry.anomalyType === 'parallel_branch') {
      return 'border-accent-secondary';
    }
    return 'border-background-tertiary hover:border-text-secondary';
  };
  
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        p-3 rounded-lg border cursor-pointer transition-all duration-200
        ${getBorderClass()}
        ${
          isSelected
            ? 'bg-background-tertiary shadow-lg'
            : 'bg-background-secondary'
        }
      `}
      style={{
        opacity: decayOpacity,
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <motion.span 
          className="text-xs text-text-secondary font-mono"
          animate={
            entry.anomalyType === 'altered_past'
              ? { opacity: [1, 0.7, 1] }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {formatDate(entry.apparentTime)}
        </motion.span>
        {entry.anomalyType !== 'none' && (
          <span className={`
            text-xs px-2 py-0.5 rounded
            ${entry.anomalyType === 'future' && 'bg-accent-future/20 text-accent-future'}
            ${entry.anomalyType === 'altered_past' && 'bg-accent-danger/20 text-accent-danger'}
            ${entry.anomalyType === 'parallel_branch' && 'bg-accent-secondary/20 text-accent-secondary'}
          `}>
            {entry.anomalyType === 'future' && '⚡'}
            {entry.anomalyType === 'altered_past' && '⚠'}
            {entry.anomalyType === 'parallel_branch' && '⑂'}
          </span>
        )}
      </div>
      
      <p className="text-sm text-text-primary line-clamp-2">
        {preview}
        {needsEllipsis && '...'}
      </p>
      
      {entry.isRewritten && (
        <div className="mt-2 text-xs text-accent-danger opacity-70">
          Modified v{entry.version}
        </div>
      )}
    </motion.div>
  );
}
