import { LayoutShell } from './components/layout/LayoutShell'
import { JournalView } from './features/journal/JournalView'
import { GlitchOverlayLayer } from './features/effects/GlitchOverlayLayer'
import { TemporalCursorTrail } from './features/effects/TemporalCursorTrail'
import { SettingsPanel } from './features/settings/SettingsPanel'
import { GlitchText } from './components/ui/GlitchText'

function App() {
  return (
    <LayoutShell>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-8 text-center border-b border-background-tertiary">
          <h1 className="text-5xl font-display text-text-primary text-glow">
            <GlitchText as="span" intensity={2}>
              Time-Bending Horror Journal
            </GlitchText>
          </h1>
          <p className="mt-2 text-text-secondary text-sm">
            A journal that remembers what hasn't happened yet
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <JournalView />
        </main>
      </div>
      
      {/* Effects and Controls */}
      <TemporalCursorTrail />
      <GlitchOverlayLayer />
      <SettingsPanel />
    </LayoutShell>
  )
}

export default App
