# Design Document

## Overview

The Time-Bending Horror Journal is a single-page React application that creates a haunting experience through temporal distortion. The application uses a layered architecture where visual effects, state management, and UI components work together to create the illusion of a journal that exists outside normal time. The design emphasizes atmospheric horror through subtle animations, unpredictable behavior, and a cohesive dark aesthetic while maintaining usability.

## Architecture

### Technology Stack

- **React 18** with TypeScript for component architecture
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for declarative animations
- **Zustand** for lightweight state management
- **localStorage** for client-side persistence

### Application Structure

The application follows a feature-based architecture with clear separation between:

1. **Core Features**: Journal entries, timeline visualization, temporal effects
2. **UI Layer**: Reusable components, layout, theme
3. **State Management**: Centralized store with Zustand
4. **Effects System**: Autonomous system for triggering temporal anomalies
5. **Persistence Layer**: localStorage abstraction for data serialization

### Single-Page Architecture

The application renders as a single page with multiple sections that appear/disappear based on state:

- No routing library needed
- Component visibility controlled by application state
- Smooth transitions between sections using Framer Motion
- Persistent effects layer that overlays all sections

## Components and Interfaces

### Core Components

#### 1. App.tsx
**Responsibility**: Root component, orchestrates all sections and effects layer

```typescript
interface AppState {
  currentSection: 'landing' | 'journal' | 'settings';
  effectsIntensity: 'low' | 'medium' | 'high';
}
```

#### 2. LandingScreen
**Responsibility**: Initial experience with time-glitch introduction

- Displays title with glitch typography effect
- Animated subtitle: "A journal that remembers what hasn't happened yet"
- Pulsing "Enter" button that occasionally flickers
- Background with subtle temporal distortion
- Auto-transitions to journal view after interaction

#### 3. JournalView
**Responsibility**: Main container for journal experience

- Left side: TimelineRibbon (vertical spine)
- Center: EntryList and ActiveEntry
- Right side: EntryComposer
- Manages layout and coordinates between child components

#### 4. EntryComposer
**Responsibility**: Text input area for creating/editing entries

```typescript
interface EntryComposerProps {
  onSubmit: (text: string) => void;
  isGlitching: boolean;
}
```

- Textarea with character count
- Submit button with temporal pulse animation
- Placeholder text that occasionally changes
- Glitch effect when `isGlitching` is true (text jitters, cursor jumps)

#### 5. EntryList
**Responsibility**: Displays all journal entries in chronological order

```typescript
interface EntryListProps {
  entries: JournalEntry[];
  onEntrySelect: (id: string) => void;
}
```

- Scrollable list of EntryCard components
- Handles entry selection for editing
- Applies stagger animation on mount

#### 6. EntryCard
**Responsibility**: Individual entry display with temporal effects

```typescript
interface EntryCardProps {
  entry: JournalEntry;
  isRewriting: boolean;
  isFuture: boolean;
  isSelected: boolean;
  onClick: () => void;
}
```

- Shows timestamp, text preview, and temporal status
- Different visual treatment for past/future/rewriting states
- Hover effects with subtle distortion
- Rewrite animation when `isRewriting` is true

#### 7. TimelineRibbon
**Responsibility**: Vertical timeline visualization with branches

```typescript
interface TimelineRibbonProps {
  entries: JournalEntry[];
  branches: TimelineBranch[];
  currentTime: Date;
}
```

- Vertical line representing time flow
- Entry markers positioned by timestamp
- Branch visualizations that diverge from main timeline
- Glitch effects that distort the line periodically
- Interactive: clicking markers scrolls to entry

#### 8. TimelineBranch
**Responsibility**: Visual representation of alternate timeline path

```typescript
interface TimelineBranchProps {
  branch: TimelineBranch;
  originPoint: number; // Y position where branch diverges
  entries: JournalEntry[];
}
```

- SVG path that curves away from main timeline
- Contains entry markers for branch entries
- Pulsing glow effect
- Hover reveals branch entries

#### 9. AnomalyEffectsLayer
**Responsibility**: Overlay layer for visual glitch effects

```typescript
interface AnomalyEffectsLayerProps {
  intensity: 'low' | 'medium' | 'high';
  isActive: boolean;
}
```

- Positioned absolutely over entire viewport
- Pointer-events: none (doesn't block interaction)
- Renders active glitch effects:
  - Screen tear (horizontal displacement)
  - Color aberration (RGB channel separation)
  - Scanlines
  - Temporal ripples
  - Static noise overlay

#### 10. GlitchText
**Responsibility**: Reusable text component with glitch animation

```typescript
interface GlitchTextProps {
  text: string;
  isGlitching: boolean;
  glitchType: 'subtle' | 'moderate' | 'intense';
}
```

- Renders text with optional glitch effect
- Character scrambling animation
- Position jitter
- Color shift

#### 11. SettingsPanel
**Responsibility**: User controls for effect intensity

```typescript
interface SettingsPanelProps {
  intensity: 'low' | 'medium' | 'high';
  onIntensityChange: (intensity: 'low' | 'medium' | 'high') => void;
  onClose: () => void;
}
```

- Slide-in panel from right
- Intensity slider with labels
- "Reset Journal" button (clears localStorage)
- Styled as a "ritual configuration" panel

### Feature Modules

#### features/journal/
- `JournalView.tsx`
- `EntryComposer.tsx`
- `EntryList.tsx`
- `EntryCard.tsx`
- `hooks/useJournalEntries.ts`
- `hooks/useEntryRewriter.ts`

#### features/timeline/
- `TimelineRibbon.tsx`
- `TimelineBranch.tsx`
- `hooks/useTimelineBranches.ts`
- `hooks/useTemporalDistortion.ts`

#### features/effects/
- `AnomalyEffectsLayer.tsx`
- `GlitchText.tsx`
- `effects/ScreenTear.tsx`
- `effects/ColorAberration.tsx`
- `effects/TemporalRipple.tsx`
- `hooks/useAnomalyTrigger.ts`

#### features/landing/
- `LandingScreen.tsx`

#### features/settings/
- `SettingsPanel.tsx`

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Entry creation with valid text
*For any* non-empty text string, creating a journal entry should result in a new entry with that exact text and a valid timestamp.
**Validates: Requirements 1.1, 1.2**

### Property 2: localStorage persistence round-trip
*For any* journal entry, serializing to localStorage and then deserializing should produce an equivalent entry with all fields intact.
**Validates: Requirements 1.3, 6.1, 6.2, 6.3, 6.4**

### Property 3: Empty input rejection
*For any* string composed entirely of whitespace characters, attempting to create an entry should be rejected and no entry should be added.
**Validates: Requirements 1.5**

### Property 4: Future entry timestamp validity
*For any* entry marked as future, its displayTimestamp should be greater than the current time.
**Validates: Requirements 2.2**

### Property 5: Future entry visual distinction
*For any* future entry, the rendered output should contain styling attributes that differ from past entries.
**Validates: Requirements 2.3**

### Property 6: Temporal transition consistency
*For any* future entry, when current time advances past its displayTimestamp, the entry should transition to past status.
**Validates: Requirements 2.4**

### Property 7: Rewrite preserves identity
*For any* entry that undergoes rewriting, its id, timestamp, and timeline position should remain unchanged.
**Validates: Requirements 3.4**

### Property 8: Rewrite changes content
*For any* entry selected for rewriting, the new text should differ from the original text.
**Validates: Requirements 3.3**

### Property 9: Glitch effects are temporary
*For any* glitch effect triggered, the effect should become inactive after its specified duration.
**Validates: Requirements 4.3**

### Property 10: Glitch effect selection
*For any* glitch trigger event, the selected effect should be one of the available effect types.
**Validates: Requirements 4.4**

### Property 11: Effect duration bounds
*For any* effect configuration, the duration should be within a reasonable range (50ms to 5000ms) to maintain usability.
**Validates: Requirements 4.5**

### Property 12: Branch rendering presence
*For any* timeline branch that exists in state, the rendered timeline should include a visual representation of that branch.
**Validates: Requirements 5.1**

### Property 13: Branch origin positioning
*For any* timeline branch, its visual position should be calculated relative to its originTimestamp on the main timeline.
**Validates: Requirements 5.2**

### Property 14: Branch entry styling
*For any* entry within a branch, the rendered output should include branch-specific styling attributes.
**Validates: Requirements 5.3**

### Property 15: Deserialization validation
*For any* data loaded from localStorage, entries missing required fields should be rejected or have defaults applied.
**Validates: Requirements 6.5**

### Property 16: Timeline display includes all entries
*For any* set of journal entries, all entries should appear in either the main timeline or a branch visualization.
**Validates: Requirements 1.4**

## Data Models

### JournalEntry

```typescript
interface JournalEntry {
  id: string; // UUID
  text: string;
  originalText: string; // Preserved for rewrite detection
  timestamp: Date;
  displayTimestamp: Date; // May differ for future entries
  isFuture: boolean;
  isRewritten: boolean;
  branchId: string | null; // null for main timeline
  createdAt: Date; // Real creation time
}
```

### TimelineBranch

```typescript
interface TimelineBranch {
  id: string;
  name: string; // e.g., "Alternate Path α"
  originTimestamp: Date; // When branch diverges
  entries: string[]; // Entry IDs in this branch
  visualOffset: number; // Horizontal offset for rendering
}
```

### ApplicationState (Zustand Store)

```typescript
interface ApplicationState {
  // UI State
  currentSection: 'landing' | 'journal' | 'settings';
  effectsIntensity: 'low' | 'medium' | 'high';
  selectedEntryId: string | null;
  
  // Journal Data
  entries: JournalEntry[];
  branches: TimelineBranch[];
  
  // Temporal Effects State
  activeGlitches: string[]; // IDs of active glitch effects
  rewritingEntryIds: string[]; // Entries currently rewriting
  
  // Actions
  addEntry: (text: string) => void;
  updateEntry: (id: string, text: string) => void;
  deleteEntry: (id: string) => void;
  triggerRewrite: (entryId: string) => void;
  createBranch: (originTimestamp: Date) => void;
  setEffectsIntensity: (intensity: 'low' | 'medium' | 'high') => void;
  setCurrentSection: (section: 'landing' | 'journal' | 'settings') => void;
  selectEntry: (id: string | null) => void;
}
```

### EffectConfig

```typescript
interface EffectConfig {
  type: 'screenTear' | 'colorAberration' | 'ripple' | 'static';
  duration: number; // milliseconds
  intensity: number; // 0-1
  triggerProbability: number; // 0-1
}
```

## User Flows

### Flow 1: First Visit Experience

1. **Landing Screen Appears**
   - Title glitches into view character by character
   - Subtitle fades in: "A journal that remembers what hasn't happened yet"
   - Background has subtle temporal distortion (slow wave effect)
   - Enter button pulses with eerie glow

2. **User Clicks Enter**
   - Screen tears effect
   - Landing fades out
   - Journal view fades in with stagger animation

3. **Journal View First Impression**
   - Empty timeline ribbon on left
   - Center shows "No entries yet... or are there?" placeholder
   - Entry composer on right with pulsing cursor
   - Subtle ambient glitch effects begin

### Flow 2: Creating First Entry

1. **User Types in Composer**
   - Text appears normally
   - Occasional cursor jump (subtle)
   - Character count updates

2. **User Submits Entry**
   - Composer clears with glitch transition
   - New EntryCard animates into EntryList
   - Timeline marker appears on TimelineRibbon
   - Brief screen ripple effect

3. **Entry Appears**
   - Shows current timestamp
   - Displays in "past" style (normal appearance)
   - Saved to localStorage immediately

### Flow 3: Experiencing Time Anomalies

1. **Future Entry Appears** (triggered automatically after 2-3 entries)
   - User creates a new entry
   - Entry appears with timestamp 2 hours in the future
   - Visual treatment: inverted colors, ethereal glow
   - Timeline marker appears above current time indicator
   - User sees: "Wait, this is from the future?"

2. **Past Entry Rewrites** (triggered randomly every 30-90 seconds)
   - Existing entry begins glitching
   - Text scrambles character by character
   - New text writes itself: altered version of original
   - Timeline marker pulses
   - User sees: "Did that always say that?"

3. **Timeline Branch Appears** (after 5+ entries)
   - Timeline ribbon splits visually
   - Branch curves away from main line
   - New entry appears in branch
   - Branch labeled "Alternate Path α"
   - User can click branch to view alternate entries

### Flow 4: Deep Session (Multiple Anomalies)

1. **Escalating Effects**
   - Multiple entries rewriting simultaneously
   - 2-3 timeline branches visible
   - Glitch effects more frequent
   - Screen tears, color aberration, ripples overlap
   - Still usable: text remains readable, interactions work

2. **User Opens Settings**
   - Clicks gear icon (top right)
   - Settings panel slides in
   - Can reduce intensity if overwhelming
   - Can reset journal (with confirmation)

3. **Emotional Peak**
   - User has 10+ entries across multiple branches
   - Timeline is complex web of paths
   - Entries constantly shifting
   - User feels: "This journal is alive and doesn't obey time"
   - But: can still read entries, create new ones, navigate

## User Experience Flow Diagram

```
[Landing Screen]
     ↓ (Enter)
[Journal View - Empty]
     ↓ (Create Entry)
[Journal View - 1 Entry]
     ↓ (Create More)
[Journal View - Multiple Entries]
     ↓ (Automatic Trigger)
[First Anomaly: Future Entry Appears]
     ↓ (Time Passes)
[Second Anomaly: Past Entry Rewrites]
     ↓ (More Entries)
[Third Anomaly: Timeline Branch]
     ↓ (Deep Session)
[Multiple Branches + Heavy Glitching]
     ↓ (Optional)
[Settings: Adjust Intensity]
```

## Emotional Beats Design

### Beat 1: Curiosity (First 30 seconds)
- Clean, mysterious interface
- Subtle hints something is wrong
- User feels: "This is interesting..."

### Beat 2: Unease (First Entry)
- Entry appears normally but something feels off
- Occasional glitch makes user question reality
- User feels: "Wait, what was that?"

### Beat 3: Disorientation (Future Entry)
- Entry from the future appears
- User double-checks their clock
- User feels: "This journal doesn't obey time"

### Beat 4: Paranoia (Rewrite)
- Past entry changes before their eyes
- User questions their memory
- User feels: "Did that always say that?"

### Beat 5: Awe/Horror (Branches)
- Timeline splits into multiple paths
- User sees alternate versions of their journal
- User feels: "I'm looking at parallel timelines"

### Beat 6: Immersion (Deep Session)
- Multiple anomalies happening
- User accepts the chaos
- User feels: "I'm part of this temporal anomaly"

## Additional UI Ideas for Unforgettable Experience

### 1. Temporal Cursor
- Cursor occasionally leaves "afterimages" trailing behind
- Cursor sometimes jumps to where it will be in 1 second
- Creates feeling of time being unstable even in basic interaction

### 2. Timestamp Drift
- Entry timestamps slowly drift forward/backward
- User watches dates change in real-time
- Subtle but deeply unsettling

### 3. Echo Entries
- Faint, semi-transparent duplicate entries appear briefly
- "Ghosts" of entries from other timelines
- Fade in and out randomly

### 4. Temporal Audio
- Subtle sound design: clock ticking that occasionally reverses
- Whisper-quiet "voices" reading entry text backwards
- Ambient drone that pitch-shifts during anomalies
- (Optional: can be toggled off)

### 5. Entry Decay
- Very old entries start to "decay" visually
- Text becomes harder to read, glitches more
- Creates sense of journal degrading across time

### 6. Predictive Text Anomaly
- Composer sometimes auto-completes with text user hasn't written yet
- Suggestions appear from "future entries"
- User can accept or reject these temporal suggestions

### 7. Date Picker Anomaly
- If user tries to manually set entry date
- Date picker shows impossible dates
- Dates from the future, dates that don't exist
- Reinforces broken time theme

### 8. Loading States as Temporal Rifts
- When saving/loading, show "temporal rift" animation
- Not a spinner, but a tear in reality
- Data "falls through" the rift

### 9. Konami Code Easter Egg
- Entering specific sequence triggers "temporal collapse"
- All entries appear simultaneously
- Timeline becomes circular
- Recovers after 5 seconds

### 10. Persistence Anomaly Message
- On first load after refresh, show message:
- "Recovering timeline from localStorage..."
- "Warning: Temporal integrity at 73%"
- Adds to lore that journal is unstable artifact

## Theme Configuration

### Color Palette

```typescript
const theme = {
  colors: {
    background: {
      primary: '#0a0a0f',    // Deep void black
      secondary: '#151520',  // Slightly lighter
      tertiary: '#1f1f2e',   // Card backgrounds
    },
    text: {
      primary: '#e0e0e8',    // Off-white
      secondary: '#a0a0b0',  // Muted gray
      future: '#6366f1',     // Indigo (future entries)
      rewriting: '#ef4444',  // Red (rewriting)
      branch: '#8b5cf6',     // Purple (branches)
    },
    accent: {
      primary: '#6366f1',    // Indigo
      secondary: '#8b5cf6',  // Purple
      danger: '#ef4444',     // Red
      glow: '#60a5fa',       // Blue glow
    },
    effects: {
      glitch: '#00ff00',     // Matrix green
      aberration: {
        r: '#ff0000',
        g: '#00ff00',
        b: '#0000ff',
      },
    },
  },
  typography: {
    fonts: {
      primary: '"Inter", sans-serif',
      mono: '"JetBrains Mono", monospace',
      display: '"Playfair Display", serif',
    },
  },
  animation: {
    durations: {
      fast: 150,
      normal: 300,
      slow: 500,
      verySlow: 1000,
    },
    easings: {
      smooth: [0.4, 0.0, 0.2, 1],
      bounce: [0.68, -0.55, 0.265, 1.55],
    },
  },
};
```

### Tailwind Configuration Extensions

- Custom animations for glitch effects
- Custom utilities for temporal distortion
- Extended color palette with theme colors
- Custom font families

## State Management Architecture

### Zustand Store Structure

```typescript
// store/useAppStore.ts
const useAppStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSection: 'landing',
      effectsIntensity: 'medium',
      entries: [],
      branches: [],
      // ... actions
    }),
    {
      name: 'time-journal-storage',
      partialPersist: (state) => ({
        entries: state.entries,
        branches: state.branches,
        effectsIntensity: state.effectsIntensity,
      }),
    }
  )
);
```

### Effects System

Autonomous system that triggers anomalies based on rules:

```typescript
// hooks/useAnomalyTrigger.ts
const useAnomalyTrigger = (intensity: 'low' | 'medium' | 'high') => {
  // Calculates trigger probabilities based on:
  // - Number of entries
  // - Time since last anomaly
  // - User intensity setting
  // - Random chance
  
  // Triggers:
  // - Future entry creation
  // - Entry rewriting
  // - Branch creation
  // - Visual glitch effects
};
```

## Error Handling

### localStorage Failures
- Graceful degradation to in-memory storage
- User notification: "Temporal persistence unstable"
- Fits thematically with broken time concept

### Animation Performance
- Detect low frame rate
- Automatically reduce effect intensity
- Maintain usability over aesthetics

### Data Corruption
- Validate entry structure on load
- Discard malformed entries
- Show "Timeline corruption detected" message

## Testing Strategy

### Unit Tests
- Entry creation and validation
- Timestamp manipulation logic
- localStorage serialization/deserialization
- Branch creation logic
- Effect trigger probability calculations

### Property-Based Tests
- Entry data round-trip through localStorage
- Timestamp ordering invariants
- Branch integrity (no orphaned entries)
- Effect intensity scaling

### Integration Tests
- Full user flow: create entry → see anomaly
- Settings changes affect behavior
- localStorage persistence across sessions

### Manual Testing Focus
- Visual effect quality and performance
- Emotional impact of anomalies
- Usability during heavy glitching
- Accessibility (can effects be reduced/disabled)

## Performance Considerations

### Animation Optimization
- Use Framer Motion's `layoutId` for shared element transitions
- Implement `will-change` CSS for animated elements
- Debounce effect triggers to prevent overload
- Use `requestAnimationFrame` for custom animations

### State Updates
- Batch related state updates
- Memoize expensive computations (timeline layout)
- Use React.memo for components that don't need frequent re-renders

### localStorage
- Debounce writes to localStorage
- Compress data if entries exceed threshold
- Implement cleanup for very old entries

## Accessibility

### Reduced Motion
- Respect `prefers-reduced-motion` media query
- Provide toggle in settings
- Disable glitch effects, keep functionality

### Screen Readers
- Proper ARIA labels for all interactive elements
- Announce entry creation/updates
- Describe temporal anomalies in accessible way

### Keyboard Navigation
- Full keyboard support for all interactions
- Focus indicators visible even with effects
- Escape key closes panels/modals

## Development Phases

### Phase 1: Foundation
- Project setup (Vite, React, TypeScript, Tailwind)
- Basic component structure
- Zustand store setup
- localStorage persistence

### Phase 2: Core Journal
- Entry creation and display
- Timeline ribbon (without branches)
- Basic styling and layout

### Phase 3: Temporal Effects
- Future entry generation
- Entry rewriting system
- Timeline branches
- Anomaly trigger system

### Phase 4: Visual Polish
- Glitch effects layer
- Animations with Framer Motion
- Theme refinement
- Sound design (optional)

### Phase 5: Settings & Optimization
- Settings panel
- Intensity controls
- Performance optimization
- Accessibility features

## File Structure

```
time-bending-horror-journal/
├── .kiro/
│   ├── specs/
│   │   └── time-bending-horror-journal/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   ├── hooks/
│   │   └── (agent hooks for development)
│   └── steering/
│       └── (project-specific guidelines)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   └── Section.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Card.tsx
│   ├── features/
│   │   ├── journal/
│   │   │   ├── JournalView.tsx
│   │   │   ├── EntryComposer.tsx
│   │   │   ├── EntryList.tsx
│   │   │   ├── EntryCard.tsx
│   │   │   └── hooks/
│   │   │       ├── useJournalEntries.ts
│   │   │       └── useEntryRewriter.ts
│   │   ├── timeline/
│   │   │   ├── TimelineRibbon.tsx
│   │   │   ├── TimelineBranch.tsx
│   │   │   └── hooks/
│   │   │       ├── useTimelineBranches.ts
│   │   │       └── useTemporalDistortion.ts
│   │   ├── effects/
│   │   │   ├── AnomalyEffectsLayer.tsx
│   │   │   ├── GlitchText.tsx
│   │   │   ├── effects/
│   │   │   │   ├── ScreenTear.tsx
│   │   │   │   ├── ColorAberration.tsx
│   │   │   │   └── TemporalRipple.tsx
│   │   │   └── hooks/
│   │   │       └── useAnomalyTrigger.ts
│   │   ├── landing/
│   │   │   └── LandingScreen.tsx
│   │   └── settings/
│   │       └── SettingsPanel.tsx
│   ├── store/
│   │   └── useAppStore.ts
│   ├── lib/
│   │   ├── storage.ts
│   │   ├── temporal.ts
│   │   └── utils.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── animations.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```
