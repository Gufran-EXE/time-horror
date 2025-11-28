import { useState } from 'react';
import { useJournalStore } from './journalStore';

export function EntryComposer() {
  const [content, setContent] = useState('');
  const addEntry = useJournalStore((state) => state.addEntry);
  
  const handleSubmit = () => {
    if (content.trim()) {
      addEntry(content);
      setContent('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const charCount = content.length;
  const maxChars = 1000;
  
  return (
    <div className="p-4 bg-background-secondary rounded-lg border border-background-tertiary">
      <h3 className="text-sm font-semibold text-text-primary mb-3">
        Write to the Rift
      </h3>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="The journal awaits your words..."
        className="w-full h-32 p-3 bg-background-primary text-text-primary 
                   border border-background-tertiary rounded-lg resize-none
                   focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary
                   placeholder:text-text-secondary placeholder:opacity-50
                   font-sans text-sm"
        maxLength={maxChars}
      />
      
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-text-secondary font-mono">
          {charCount} / {maxChars}
        </span>
        
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="px-4 py-2 bg-accent-primary text-white rounded-lg
                     hover:bg-accent-primary/90 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 text-sm font-medium"
        >
          Submit Entry
        </button>
      </div>
      
      <p className="text-xs text-text-secondary opacity-50 mt-2">
        Tip: Press Ctrl+Enter to submit
      </p>
    </div>
  );
}
