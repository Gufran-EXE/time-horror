import { motion } from 'framer-motion';
import { useJournalStore } from '../journal/journalStore';
import type { JournalEntry } from '../journal/types';

interface TimelineNodeProps {
  entry: JournalEntry;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function TimelineNode({ entry, isSelected, onClick, index }: TimelineNodeProps) {
  // Format time for display
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Determine visual style based on anomaly type
  const getNodeStyle = () => {
    switch (entry.anomalyType) {
      case 'future':
        return {
          color: 'text-accent-future',
          bg: 'bg-accent-future/20',
          border: 'border-accent-future',
          glow: 'shadow-[0_0_10px_rgba(99,102,241,0.5)]',
        };
      case 'altered_past':
        return {
          color: 'text-accent-danger',
          bg: 'bg-accent-danger/20',
          border: 'border-accent-danger',
          glow: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
        };
      case 'parallel_branch':
        return {
          color: 'text-accent-secondary',
          bg: 'bg-accent-secondary/20',
          border: 'border-accent-secondary',
          glow: 'shadow-[0_0_10px_rgba(139,92,246,0.5)]',
        };
      default:
        return {
          color: 'text-text-secondary',
          bg: 'bg-background-tertiary',
          border: 'border-text-secondary/30',
          glow: '',
        };
    }
  };
  
  const style = getNodeStyle();
  const isBranch = entry.anomalyType === 'parallel_branch';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`relative flex items-center ${isBranch ? 'ml-8' : ''}`}
    >
      {/* Branch connector line */}
      {isBranch && (
        <div
          className={`absolute left-[-2rem] top-1/2 w-8 h-[2px] ${style.bg}`}
          style={{
            transform: 'translateY(-50%)',
          }}
        />
      )}
      
      {/* Timeline node */}
      <button
        onClick={onClick}
        className={`
          relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-200
          ${style.border} ${style.bg}
          ${isSelected ? `${style.glow} scale-125` : 'hover:scale-110'}
          ${entry.anomalyType === 'future' ? 'animate-pulse-slow' : ''}
        `}
      >
        {/* Selected indicator */}
        {isSelected && (
          <motion.div
            layoutId="timeline-selected"
            className={`absolute inset-[-4px] rounded-full border-2 ${style.border}`}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </button>
      
      {/* Time label */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className={`
          absolute left-6 px-2 py-1 rounded text-xs font-mono whitespace-nowrap
          ${style.color} ${style.bg} border ${style.border}
          opacity-0 hover:opacity-100 transition-opacity duration-200
        `}
      >
        {formatTime(entry.apparentTime)}
        {entry.anomalyType !== 'none' && (
          <span className="ml-2 text-[10px] opacity-70">
            {entry.anomalyType === 'future' && '⚡'}
            {entry.anomalyType === 'altered_past' && '⚠'}
            {entry.anomalyType === 'parallel_branch' && '⑂'}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

function TimelineLegend() {
  return (
    <div className="p-3 bg-background-tertiary/50 rounded-lg border border-background-tertiary">
      <div className="text-xs font-semibold text-text-primary mb-2">Legend</div>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-background-tertiary border border-text-secondary/30" />
          <span className="text-text-secondary">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-future/20 border border-accent-future" />
          <span className="text-accent-future">Future Echo ⚡</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-danger/20 border border-accent-danger" />
          <span className="text-accent-danger">Altered Past ⚠</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-secondary/20 border border-accent-secondary" />
          <span className="text-accent-secondary">Branch ⑂</span>
        </div>
      </div>
    </div>
  );
}

export function TimelineRibbon() {
  const entries = useJournalStore((state) => state.entries);
  const selectedEntryId = useJournalStore((state) => state.selectedEntryId);
  const selectEntry = useJournalStore((state) => state.selectEntry);
  
  // Sort entries by apparentTime (oldest at top, newest at bottom)
  const sortedEntries = [...entries].sort((a, b) => {
    return new Date(a.apparentTime).getTime() - new Date(b.apparentTime).getTime();
  });
  
  if (entries.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
        <p className="text-text-secondary text-sm mb-2">No timeline yet</p>
        <p className="text-text-secondary text-xs opacity-50">
          Time awaits your first entry...
        </p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Legend at top */}
      <div className="p-4 border-b border-background-tertiary">
        <TimelineLegend />
      </div>
      
      {/* Timeline spine */}
      <div className="flex-1 overflow-y-auto p-4 relative">
        {/* Vertical spine line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary/30 via-accent-secondary/30 to-accent-danger/30"
          style={{
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)',
          }}
        />
        
        {/* Timeline nodes */}
        <div className="relative space-y-6 pl-4">
          {sortedEntries.map((entry, index) => (
            <TimelineNode
              key={entry.id}
              entry={entry}
              isSelected={entry.id === selectedEntryId}
              onClick={() => selectEntry(entry.id)}
              index={index}
            />
          ))}
        </div>
        
        {/* Current time indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute left-4 w-6 h-[2px] bg-accent-glow"
          style={{
            top: `${(sortedEntries.length / (sortedEntries.length + 1)) * 100}%`,
            boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)',
          }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-accent-glow font-mono whitespace-nowrap ml-2">
            NOW
          </div>
        </motion.div>
      </div>
    </div>
  );
}
