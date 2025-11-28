import { motion } from 'framer-motion';
import { useJournalStore } from './journalStore';

export function ActiveEntryPanel() {
  const entries = useJournalStore((state) => state.entries);
  const selectedEntryId = useJournalStore((state) => state.selectedEntryId);
  
  const selectedEntry = entries.find((e) => e.id === selectedEntryId);
  
  if (!selectedEntry) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <p className="text-text-secondary text-lg mb-2">The pages are empty...</p>
        <p className="text-text-secondary text-sm opacity-70">for now.</p>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Get anomaly warning message
  const getAnomalyWarning = () => {
    switch (selectedEntry.anomalyType) {
      case 'future':
        return {
          icon: '⚡',
          text: 'This entry originates from a future timeline.',
          color: 'text-accent-future',
          bg: 'bg-accent-future/10',
          border: 'border-accent-future/30',
        };
      case 'altered_past':
        return {
          icon: '⚠',
          text: 'This entry has been rewritten. The original is lost.',
          color: 'text-accent-danger',
          bg: 'bg-accent-danger/10',
          border: 'border-accent-danger/30',
        };
      case 'parallel_branch':
        return {
          icon: '⑂',
          text: 'This entry exists in a parallel timeline branch.',
          color: 'text-accent-secondary',
          bg: 'bg-accent-secondary/10',
          border: 'border-accent-secondary/30',
        };
      default:
        return null;
    }
  };
  
  const anomalyWarning = getAnomalyWarning();
  
  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Anomaly Warning Banner */}
      {anomalyWarning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-3 rounded-lg border ${anomalyWarning.bg} ${anomalyWarning.border}`}
        >
          <div className={`flex items-center gap-2 text-sm ${anomalyWarning.color}`}>
            <span className="text-lg">{anomalyWarning.icon}</span>
            <span>{anomalyWarning.text}</span>
          </div>
        </motion.div>
      )}
      
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-background-tertiary">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-text-secondary font-mono">
            {formatDate(selectedEntry.apparentTime)}
          </span>
          {selectedEntry.anomalyType !== 'none' && (
            <span className={`
              text-xs px-3 py-1 rounded-full
              ${selectedEntry.anomalyType === 'future' && 'bg-accent-future/20 text-accent-future'}
              ${selectedEntry.anomalyType === 'altered_past' && 'bg-accent-danger/20 text-accent-danger'}
              ${selectedEntry.anomalyType === 'parallel_branch' && 'bg-accent-secondary/20 text-accent-secondary'}
            `}>
              {selectedEntry.anomalyType.replace('_', ' ')}
            </span>
          )}
        </div>
        
        {selectedEntry.isRewritten && (
          <div className="text-xs text-accent-danger opacity-70 mt-2">
            This entry has been modified • Version {selectedEntry.version}
          </div>
        )}
      </div>
      
      {/* Content with ghost effect for altered past */}
      <div className="prose prose-invert max-w-none relative">
        {selectedEntry.anomalyType === 'altered_past' && (
          <motion.div
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 text-text-primary whitespace-pre-wrap leading-relaxed pointer-events-none"
            style={{
              filter: 'blur(2px)',
              transform: 'translate(2px, 2px)',
            }}
          >
            {selectedEntry.originalContent}
          </motion.div>
        )}
        
        <motion.p
          animate={
            selectedEntry.anomalyType === 'future'
              ? { y: [0, -2, 0] }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="text-text-primary whitespace-pre-wrap leading-relaxed relative z-10"
        >
          {selectedEntry.content}
        </motion.p>
      </div>
      
      {/* Metadata */}
      <div className="mt-8 pt-4 border-t border-background-tertiary">
        <div className="text-xs text-text-secondary space-y-1">
          <div>Entry ID: {selectedEntry.id.slice(0, 8)}...</div>
          <div>Created: {formatDate(selectedEntry.createdAt)}</div>
          {selectedEntry.apparentTime !== selectedEntry.createdAt && (
            <div className="text-accent-future">
              ⚠ Temporal anomaly detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
