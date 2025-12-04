# Implementation Plan

- [x] 1. Initialize project and configure build tools
  - Create Vite + React + TypeScript project
  - Install dependencies: zustand, framer-motion, tailwindcss
  - Configure Tailwind with custom theme colors and animations
  - Configure TypeScript with strict mode
  - Set up project directory structure
  - _Requirements: 9.1, 9.3, 9.4_

- [x] 2. Create core type definitions and data models
  - Define JournalEntry interface with all required fields
  - Define TimelineBranch interface
  - Define ApplicationState interface for Zustand store
  - Define EffectConfig interface
  - Create types/index.ts with all exported types
  - _Requirements: 9.5_

- [x] 3. Implement theme configuration
  - Create theme/colors.ts with dark horror palette
  - Create theme/typography.ts with font definitions
  - Create theme/animations.ts with duration and easing configs
  - Export unified theme object
  - _Requirements: 7.1, 9.3_

- [x] 4. Build localStorage persistence layer
  - Create lib/storage.ts with save/load functions
  - Implement JSON serialization for JournalEntry
  - Implement JSON deserialization with validation
  - Handle localStorage errors gracefully
  - _Requirements: 1.3, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 4.1 Write property test for localStorage round-trip
  - **Property 2: localStorage persistence round-trip**
  - **Validates: Requirements 1.3, 6.1, 6.2, 6.3, 6.4**

- [ ]* 4.2 Write property test for deserialization validation
  - **Property 15: Deserialization validation**
  - **Validates: Requirements 6.5**

- [x] 5. Create Zustand store with core state management
  - Implement useAppStore with initial state
  - Implement addEntry action with timestamp assignment
  - Implement updateEntry and deleteEntry actions
  - Implement selectEntry action
  - Implement setCurrentSection action
  - Integrate localStorage persistence middleware
  - _Requirements: 1.1, 1.2, 9.2_

- [ ]* 5.1 Write property test for entry creation
  - **Property 1: Entry creation with valid text**
  - **Validates: Requirements 1.1, 1.2**

- [ ]* 5.2 Write property test for empty input rejection
  - **Property 3: Empty input rejection**
  - **Validates: Requirements 1.5**

- [ ] 6. Build temporal logic utilities
  - Create lib/temporal.ts with timestamp manipulation functions
  - Implement future timestamp generation logic
  - Implement temporal state transition logic (future → past)
  - Implement random entry selection for effects
  - _Requirements: 2.1, 2.2, 2.4, 3.1_

- [ ]* 6.1 Write property test for future entry timestamp validity
  - **Property 4: Future entry timestamp validity**
  - **Validates: Requirements 2.2**

- [ ]* 6.2 Write property test for temporal transition
  - **Property 6: Temporal transition consistency**
  - **Validates: Requirements 2.4**

- [ ] 7. Create base UI components
  - Create components/ui/Button.tsx with hover effects
  - Create components/ui/Input.tsx with glitch-ready styling
  - Create components/ui/Card.tsx for entry containers
  - Style components with Tailwind using theme colors
  - _Requirements: 7.4_

- [ ] 8. Build layout components
  - Create components/layout/AppLayout.tsx as main container
  - Create components/layout/Section.tsx for view sections
  - Implement responsive grid layout
  - _Requirements: 8.3, 9.1_

- [ ] 9. Implement LandingScreen component
  - Create features/landing/LandingScreen.tsx
  - Add title with glitch typography effect
  - Add subtitle text
  - Add Enter button with pulse animation
  - Implement transition to journal view on click
  - _Requirements: 7.2_

- [x] 10. Build EntryComposer component
  - Create features/journal/EntryComposer.tsx
  - Implement textarea with character count
  - Implement submit button
  - Connect to store's addEntry action
  - Add input validation for empty/whitespace
  - Clear input after successful submission
  - _Requirements: 1.1, 1.5_

- [x] 11. Create EntryCard component
  - Create features/journal/EntryCard.tsx
  - Display entry text, timestamp, and status
  - Implement different visual styles for past/future/rewriting states
  - Add click handler for entry selection
  - Add hover effects with subtle distortion
  - _Requirements: 2.3, 7.4_

- [ ]* 11.1 Write property test for future entry visual distinction
  - **Property 5: Future entry visual distinction**
  - **Validates: Requirements 2.3**

- [ ]* 11.2 Write property test for branch entry styling
  - **Property 14: Branch entry styling**
  - **Validates: Requirements 5.3**

- [x] 12. Build EntryList component
  - Create features/journal/EntryList.tsx
  - Render list of EntryCard components
  - Implement scrollable container
  - Add stagger animation on mount using Framer Motion
  - Handle empty state with placeholder text
  - _Requirements: 1.4, 7.2_

- [ ]* 12.1 Write property test for timeline display completeness
  - **Property 16: Timeline display includes all entries**
  - **Validates: Requirements 1.4**

- [x] 13. Implement basic TimelineRibbon component
  - Create features/timeline/TimelineRibbon.tsx
  - Render vertical line representing time flow
  - Position entry markers by timestamp
  - Add current time indicator
  - Implement click handlers to scroll to entries
  - _Requirements: 4.1_

- [x] 14. Create JournalView layout component
  - Create features/journal/JournalView.tsx
  - Arrange TimelineRibbon on left
  - Arrange EntryList in center
  - Arrange EntryComposer on right
  - Implement responsive layout
  - _Requirements: 8.3, 9.1_

- [ ] 15. Build entry rewriting system
  - Create features/journal/hooks/useEntryRewriter.ts
  - Implement random entry selection logic
  - Implement text replacement logic
  - Add triggerRewrite action to store
  - Implement rewrite interval timing based on intensity
  - _Requirements: 3.1, 3.3, 3.5_

- [ ]* 15.1 Write property test for rewrite identity preservation
  - **Property 7: Rewrite preserves identity**
  - **Validates: Requirements 3.4**

- [ ]* 15.2 Write property test for rewrite content change
  - **Property 8: Rewrite changes content**
  - **Validates: Requirements 3.3**

- [x] 16. Create GlitchText component
  - Create features/effects/GlitchText.tsx
  - Implement character scrambling animation
  - Implement position jitter effect
  - Implement color shift effect
  - Accept glitchType prop for intensity levels
  - _Requirements: 3.2_

- [ ] 17. Integrate rewrite animations into EntryCard
  - Update EntryCard to use GlitchText when rewriting
  - Animate text changing character by character
  - Trigger rewrite effect from store state
  - _Requirements: 3.2, 3.4_

- [x] 18. Implement future entry generation
  - Update addEntry action to randomly mark entries as future
  - Assign future displayTimestamp when marked
  - Calculate future timestamp (1-6 hours ahead)
  - Store isFuture flag on entry
  - _Requirements: 2.1, 2.2_

- [ ] 19. Build timeline branch system
  - Add branches array to store state
  - Implement createBranch action
  - Create features/timeline/hooks/useTimelineBranches.ts
  - Implement branch creation logic (after 5+ entries)
  - Assign entries to branches
  - _Requirements: 5.1, 5.2_

- [ ] 20. Create TimelineBranch component
  - Create features/timeline/TimelineBranch.tsx
  - Render SVG path curving from main timeline
  - Position based on originTimestamp
  - Display entry markers within branch
  - Add pulsing glow effect
  - Implement hover to reveal branch entries
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 20.1 Write property test for branch rendering
  - **Property 12: Branch rendering presence**
  - **Validates: Requirements 5.1**

- [ ]* 20.2 Write property test for branch positioning
  - **Property 13: Branch origin positioning**
  - **Validates: Requirements 5.2**

- [ ] 21. Integrate branches into TimelineRibbon
  - Update TimelineRibbon to render TimelineBranch components
  - Calculate branch visual offsets
  - Handle branch entry markers
  - Implement branch interaction (click to view entries)
  - _Requirements: 5.4, 5.5_

- [ ] 22. Create visual glitch effect components
  - Create features/effects/effects/ScreenTear.tsx
  - Create features/effects/effects/ColorAberration.tsx
  - Create features/effects/effects/TemporalRipple.tsx
  - Implement each effect with Framer Motion animations
  - Accept intensity and duration props
  - _Requirements: 4.2_

- [x] 23. Build AnomalyEffectsLayer component
  - Create features/effects/AnomalyEffectsLayer.tsx
  - Position absolutely over viewport
  - Set pointer-events: none
  - Render active glitch effects from store
  - Accept intensity prop to scale effects
  - _Requirements: 4.2, 4.3_

- [x] 24. Implement anomaly trigger system
  - Create features/effects/hooks/useAnomalyTrigger.ts
  - Calculate trigger probabilities based on intensity
  - Implement periodic effect triggering
  - Add activeGlitches array to store
  - Implement effect cleanup after duration
  - Trigger future entries, rewrites, branches, and visual glitches
  - _Requirements: 3.5, 4.1, 4.3, 4.4, 4.5_

- [ ]* 24.1 Write property test for glitch effect cleanup
  - **Property 9: Glitch effects are temporary**
  - **Validates: Requirements 4.3**

- [ ]* 24.2 Write property test for glitch selection
  - **Property 10: Glitch effect selection**
  - **Validates: Requirements 4.4**

- [ ]* 24.3 Write property test for effect duration bounds
  - **Property 11: Effect duration bounds**
  - **Validates: Requirements 4.5**

- [x] 25. Create SettingsPanel component
  - Create features/settings/SettingsPanel.tsx
  - Implement slide-in animation from right
  - Add intensity slider (low/medium/high)
  - Add reset journal button with confirmation
  - Connect to store's setEffectsIntensity action
  - Style as "ritual configuration" panel
  - _Requirements: 7.2_

- [ ] 26. Build main App component
  - Update App.tsx to orchestrate all sections
  - Render LandingScreen, JournalView, or SettingsPanel based on currentSection
  - Render AnomalyEffectsLayer overlay
  - Implement section transitions with Framer Motion
  - Add settings button (gear icon) in top right
  - _Requirements: 7.2, 9.1_

- [x] 27. Implement temporal cursor effect
  - Add cursor afterimage trail effect
  - Implement cursor position prediction
  - Apply effect globally via CSS or effect layer
  - _Requirements: 4.2_

- [ ] 28. Add timestamp drift effect
  - Create hook to slowly drift timestamps
  - Update EntryCard to show drifting timestamps
  - Implement subtle animation for timestamp changes
  - _Requirements: 2.4_

- [x] 29. Polish animations and transitions
  - Refine all Framer Motion animations
  - Ensure smooth 60fps performance
  - Add loading states with temporal rift animation
  - Implement reduced motion support
  - _Requirements: 7.2, 8.4_

- [ ] 30. Implement accessibility features
  - Add ARIA labels to all interactive elements
  - Ensure keyboard navigation works throughout
  - Add focus indicators visible with effects
  - Respect prefers-reduced-motion media query
  - Add toggle in settings to disable effects
  - _Requirements: 8.5_

- [ ] 31. Optimize performance
  - Memoize expensive computations (timeline layout)
  - Use React.memo for components that don't need frequent re-renders
  - Implement will-change CSS for animated elements
  - Debounce localStorage writes
  - Test and optimize frame rate during heavy glitching
  - _Requirements: 8.1, 8.4_

- [ ] 32. Final integration and testing
  - Test complete user flow from landing to deep session
  - Verify localStorage persistence across page refreshes
  - Test all anomaly types trigger correctly
  - Verify settings changes affect behavior
  - Test responsive layout on different screen sizes
  - Ensure all effects are temporary and don't break usability
  - _Requirements: All_

- [ ] 33. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
