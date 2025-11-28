import { useJournalStore } from './journalStore';
import { EntryCard } from './EntryCard';

export function JournalEntryList() {
  const entries = useJournalStore((state) => state.entries);
  const selectedEntryId = useJournalStore((state) => state.selectedEntryId);
  const selectEntry = useJournalStore((state) => state.selectEntry);
  
  // Sort entries by apparentTime (most recent first)
  const sortedEntries = [...entries].sort((a, b) => {
    return new Date(b.apparentTime).getTime() - new Date(a.apparentTime).getTime();
  });
  
  if (entries.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <p className="text-text-secondary text-sm">No entries yet...</p>
        <p className="text-text-secondary text-xs mt-2 opacity-50">or are there?</p>
      </div>
    );
  }
  
  return (
    <div className="h-full overflow-y-auto space-y-2 p-4">
      {sortedEntries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          isSelected={entry.id === selectedEntryId}
          onClick={() => selectEntry(entry.id)}
        />
      ))}
    </div>
  );
}
