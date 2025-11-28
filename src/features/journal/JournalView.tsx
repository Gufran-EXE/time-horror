import { JournalEntryList } from './JournalEntryList';
import { ActiveEntryPanel } from './ActiveEntryPanel';
import { EntryComposer } from './EntryComposer';
import { TimeAnomalyPanel } from './TimeAnomalyPanel';
import { TimelineRibbon } from '../timeline/TimelineRibbon';

export function JournalView() {
  return (
    <div className="h-[calc(100vh-120px)] grid grid-cols-12 gap-4 p-6">
      {/* Left: Entry List */}
      <div className="col-span-3 bg-background-secondary rounded-lg border border-background-tertiary overflow-hidden flex flex-col">
        <div className="p-4 border-b border-background-tertiary">
          <h2 className="text-lg font-semibold text-text-primary">Entries</h2>
        </div>
        <div className="flex-1 overflow-hidden">
          <JournalEntryList />
        </div>
      </div>

      {/* Center: Active Entry + Composer */}
      <div className="col-span-6 flex flex-col gap-4">
        {/* Active Entry Panel */}
        <div className="flex-1 bg-background-secondary rounded-lg border border-background-tertiary overflow-hidden">
          <ActiveEntryPanel />
        </div>
        
        {/* Entry Composer */}
        <EntryComposer />
      </div>

      {/* Right: Time Anomalies + Timeline */}
      <div className="col-span-3 flex flex-col gap-4">
        {/* Time Anomaly Panel */}
        <div className="bg-background-secondary rounded-lg border border-background-tertiary overflow-hidden">
          <TimeAnomalyPanel />
        </div>
        
        {/* Timeline Ribbon */}
        <div className="flex-1 bg-background-secondary rounded-lg border border-background-tertiary overflow-hidden">
          <TimelineRibbon />
        </div>
      </div>
    </div>
  );
}
