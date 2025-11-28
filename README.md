# Time-Bending Horror Journal

> A cursed UI diary where time fractures, entries rewrite themselves, and the interface refuses to obey causality.

![Time-Bending Horror Journal](./docs/screenshot-placeholder.png)

## Overview

**Time-Bending Horror Journal** is a single-page web application that transforms the mundane act of journaling into a haunting experience through temporal distortion. The interface itself becomes a horror element—entries appear from the future, past entries rewrite themselves before your eyes, and timelines branch into parallel realities.

This isn't just a journal with a dark theme. It's an exploration of what happens when time becomes unreliable, when your own words betray you, and when the interface you trust becomes an active participant in the horror.

Built for the **Kiroween Costume Contest**, this project showcases how modern web technologies can create genuinely unsettling user experiences while maintaining usability and polish.

## Features

### 📝 Journal & Persistence
- Create and manage journal entries with full CRUD operations
- Automatic localStorage persistence—your temporal chaos survives page refreshes
- Rich entry metadata: creation time, apparent time, version tracking
- Sample entries on first load to demonstrate the concept

### 🌀 Time Anomalies
Three distinct anomaly types that break causality:

- **Future Echo** ⚡ - Entries appear from hours or days in the future, showing what "will" happen
- **Alter Past** ⚠ - Existing entries rewrite themselves with ominous alterations, the original lost forever
- **Branch Timeline** ⑂ - Reality splits, creating parallel timeline branches with divergent content

Each anomaly includes:
- Intelligent text distortion (reversed words, glitch characters, ominous insertions)
- Visual differentiation (color-coded, animated)
- Metadata tracking (parent IDs, version numbers, branch IDs)

### 🕰 Timeline Visualization
- **TimelineRibbon**: Vertical spine showing all entries chronologically
- Visual branch representation—parallel timelines offset from the main spine
- Interactive nodes—click to select entries
- Color-coded anomaly indicators
- "NOW" marker showing current time position
- Comprehensive legend for judges and users

### 👁 Glitch & Horror UI
- **GlitchText**: Reusable component with jittering text and ghost duplicates
- **TemporalCursorTrail**: Mouse afterimages creating time echo effects
- **GlitchOverlayLayer**: Screen distortions on anomaly triggers (RGB splits, screen tears, scanlines)
- **Cinematic Background**: Animated time rift with pulsing crack effect
- **Entry Decay**: Older entries fade slightly, creating a sense of temporal degradation
- **Anomaly Warnings**: Context-aware banners explaining temporal discrepancies

### ⚙ Ritual Controls
Settings panel ("Rituals") for judges to customize the experience:

- **Visual Intensity** (Low/Medium/High) - Controls glitch strength and animation intensity
- **Glitch Overlays** (On/Off) - Toggle screen distortion effects
- **Ambient Horror Mode** (On/Off) - Enhanced contrast and atmospheric effects
- All settings persist across sessions

## Tech Stack

- **React 18** - Component architecture
- **TypeScript** - Type safety and developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling with custom horror theme
- **Framer Motion** - Declarative animations and layout transitions
- **Zustand** - Lightweight state management with persistence
- **localStorage** - Client-side data persistence

## Kiro Usage

This project was built entirely in **Kiro IDE** using its spec-driven development workflow:

- **Specs**: Complete requirements, design, and task breakdown in `.kiro/specs/time-bending-horror-journal/`
  - `requirements.md` - 9 requirements with 45 acceptance criteria using EARS pattern
  - `design.md` - Comprehensive architecture, components, data models, and correctness properties
  - `tasks.md` - 33 sequential implementation tasks
  - `time-bending-horror-journal.yaml` - Machine-readable spec with all behaviors and components

- **Vibe Coding**: Chat-driven development with Kiro generating components, stores, and utilities
- **Incremental Development**: Each task built on previous work, maintaining consistency
- **Type Safety**: TypeScript definitions generated from spec, ensuring correctness

For detailed information on how Kiro was used throughout development, see **[Kiro-Usage.md](./docs/Kiro-Usage.md)**.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/time-bending-horror-journal.git

# Navigate to project directory
cd time-bending-horror-journal

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at the URL shown in your terminal (typically `http://localhost:5173` or `http://localhost:5174`).

## Scripts

- `npm run dev` - Start Vite development server with hot module replacement
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Architecture

The project follows a feature-based architecture:

- **`src/features/journal/`** - Core journal functionality (entries, composer, list, store)
- **`src/features/timeline/`** - Timeline visualization and branch rendering
- **`src/features/settings/`** - UI settings store and ritual controls panel
- **`src/features/effects/`** - Visual effects (glitch overlay, cursor trail)
- **`src/components/`** - Reusable UI components (GlitchText, layout shells)
- **`src/theme/`** - Centralized theme configuration (colors, shadows, gradients)
- **`src/lib/`** - Utilities (temporal logic, storage, text distortion)

State management uses Zustand with localStorage persistence. All temporal logic is centralized in `lib/temporal.ts` for consistency.

## Demo

**[Demo Video Coming Soon]**

What to expect:
- Creating journal entries and seeing them persist
- Triggering Future Echo to see corrupted future entries appear
- Watching Alter Past rewrite history with ominous phrases
- Creating timeline branches and seeing them visualize
- Adjusting Ritual Controls to customize the experience
- Screen glitches and temporal cursor effects in action

## Screenshots

_Add screenshots here showing:_
- Main journal interface with 3-column layout
- Timeline visualization with branches
- Anomaly warning banners
- Settings/Ritual panel
- Glitch effects in action

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built for the **Kiroween Costume Contest** using **Kiro IDE**.

Special thanks to the Kiro team for creating an IDE that makes spec-driven development feel natural and productive.

---

**Note for Judges**: This project demonstrates Kiro's spec-driven workflow, vibe coding capabilities, and how AI-assisted development can produce polished, complex applications quickly. See [Kiro-Usage.md](./docs/Kiro-Usage.md) for detailed documentation of Kiro feature usage.
