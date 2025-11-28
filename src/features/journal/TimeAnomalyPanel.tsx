import { useJournalStore } from './journalStore';

export function TimeAnomalyPanel() {
  const anomalyIntensity = useJournalStore((state) => state.anomalyIntensity);
  const applyTimeAnomaly = useJournalStore((state) => state.applyTimeAnomaly);
  const setAnomalyIntensity = useJournalStore((state) => state.setAnomalyIntensity);
  const entriesCount = useJournalStore((state) => state.entries.length);
  
  const intensityLabels = {
    0: 'Calm',
    1: 'Unsettling',
    2: 'Unstable',
    3: 'Catastrophic',
  };
  
  const handleAnomaly = (mode: 'future_echo' | 'alter_past' | 'branch_timeline') => {
    if (entriesCount === 0) {
      alert('Write an entry first before tearing at time...');
      return;
    }
    applyTimeAnomaly(mode);
  };
  
  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          Time Anomalies
        </h2>
        <p className="text-xs text-text-secondary opacity-70">
          Tear at the seams of time.
        </p>
      </div>
      
      {/* Anomaly Triggers */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleAnomaly('future_echo')}
          disabled={entriesCount === 0}
          className="w-full px-4 py-3 bg-accent-future/10 border border-accent-future/30
                     text-accent-future rounded-lg hover:bg-accent-future/20
                     active:scale-95 transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed
                     text-sm font-medium text-left"
        >
          <div className="font-semibold mb-1">Future Echo</div>
          <div className="text-xs opacity-70">
            Glimpse what hasn't happened yet
          </div>
        </button>
        
        <button
          onClick={() => handleAnomaly('alter_past')}
          disabled={entriesCount === 0}
          className="w-full px-4 py-3 bg-accent-danger/10 border border-accent-danger/30
                     text-accent-danger rounded-lg hover:bg-accent-danger/20
                     active:scale-95 transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed
                     text-sm font-medium text-left"
        >
          <div className="font-semibold mb-1">Alter Past</div>
          <div className="text-xs opacity-70">
            Rewrite what already was
          </div>
        </button>
        
        <button
          onClick={() => handleAnomaly('branch_timeline')}
          disabled={entriesCount === 0}
          className="w-full px-4 py-3 bg-accent-secondary/10 border border-accent-secondary/30
                     text-accent-secondary rounded-lg hover:bg-accent-secondary/20
                     active:scale-95 transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed
                     text-sm font-medium text-left"
        >
          <div className="font-semibold mb-1">Branch Timeline</div>
          <div className="text-xs opacity-70">
            Split reality into parallel paths
          </div>
        </button>
      </div>
      
      {/* Intensity Control */}
      <div className="mt-auto pt-6 border-t border-background-tertiary">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">
              Intensity
            </span>
            <span className="text-xs text-text-secondary font-mono">
              {intensityLabels[anomalyIntensity]}
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {([0, 1, 2, 3] as const).map((level) => (
              <button
                key={level}
                onClick={() => setAnomalyIntensity(level)}
                className={`
                  px-2 py-2 rounded text-xs font-medium transition-all duration-200
                  ${
                    anomalyIntensity === level
                      ? 'bg-accent-primary text-white'
                      : 'bg-background-tertiary text-text-secondary hover:bg-background-tertiary/70'
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-xs text-text-secondary opacity-50 mt-3">
          Higher intensity invites greater corruption.
        </p>
      </div>
    </div>
  );
}
