import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

// Mode gate + views
import ModeSelect     from './components/ModeSelect';
import ProView        from './components/ProView';

// Pokemon Game Components
import BootScreen     from './components/BootScreen';
import TitleScreen    from './components/TitleScreen';
import PokedexShell   from './components/PokedexShell';
import ProjectDex     from './components/ProjectDex';
import TeamSection    from './components/TeamSection';
import SkillTypes     from './components/SkillTypes';
import ContactBattle  from './components/ContactBattle';
import TrainerProfile from './components/TrainerProfile';

/* =============================================
   KOBYDEX — Main App
   Flow: mode-select → game (boot→title→game) OR pro
   ============================================= */

// ── Global Error Boundary ──────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 24, textAlign: 'center',
          fontFamily: "'Press Start 2P', monospace",
          color: '#FF4444', background: '#0d0d1a',
          height: '100%', display: 'flex',
          flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 12,
        }}>
          <div style={{ fontSize: 32 }}>💀</div>
          <div style={{ fontSize: 8 }}>A wild ERROR appeared!</div>
          <div style={{ fontFamily: "'VT323', monospace", color: '#AAAACC', fontSize: 16 }}>
            {this.state.error?.message || 'Something went wrong.'}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 6,
              color: '#FFD700', background: 'rgba(255,215,0,0.1)',
              border: '2px solid rgba(255,215,0,0.4)',
              padding: '6px 12px', cursor: 'pointer', marginTop: 8,
            }}
          >
            RETRY
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const SECTION_COMPONENTS = {
  projects: ProjectDex,
  team:     TeamSection,
  skills:   SkillTypes,
  contact:  ContactBattle,
  resume:   TrainerProfile,
};

const TABS = ['projects', 'team', 'skills', 'contact', 'resume'];
const TRANSITION_DURATION = 250;

/* ── Toggle button — always on top via Portal ──────────────────
   Using createPortal mounts directly on document.body so no
   overflow:hidden / transform stacking context can hide it.   */
const SwitchBtn = ({ currentMode, onSwitch }) => {
  const isGame = currentMode === 'game';
  return ReactDOM.createPortal(
    <button
      onClick={onSwitch}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 99999,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 20px', borderRadius: 24,
        border: isGame ? '2px solid #ccccdd' : '2px solid #cc0000',
        cursor: 'pointer', fontWeight: 700, fontSize: 13,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        boxShadow: '0 4px 22px rgba(0,0,0,0.55)',
        background: isGame ? '#ffffff'  : '#cc0000',
        color:      isGame ? '#1a1a2e'  : '#ffffff',
        transition: 'transform 0.15s',
        userSelect: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      title="Switch between Pokédex and professional view"
    >
      {isGame ? '📋 Normal View' : '🎮 Pokédex View'}
    </button>,
    document.body
  );
};

// ── Main App ───────────────────────────────
const App = () => {
  // 'select' shows the mode chooser first; then 'game' or 'pro'
  const [viewMode,   setViewMode]   = useState('select');
  const [gamePhase,  setGamePhase]  = useState('boot');  // boot | title | game
  const [activeTab,  setActiveTab]  = useState('projects');
  const [tabVisible, setTabVisible] = useState(true);

  const handleModeSelect = useCallback((mode) => {
    setViewMode(mode);
    if (mode === 'game') setGamePhase('boot');
  }, []);

  const handleSwitch = useCallback(() => {
    setViewMode(v => (v === 'game' ? 'pro' : 'game'));
  }, []);

  const handleBootComplete = useCallback(() => setGamePhase('title'), []);
  const handleEnterGame    = useCallback(() => setGamePhase('game'),  []);

  const handleTabChange = useCallback((newTab) => {
    if (newTab === activeTab) return;
    setTabVisible(false);
    setTimeout(() => { setActiveTab(newTab); setTabVisible(true); }, TRANSITION_DURATION);
  }, [activeTab]);

  useEffect(() => {
    if (viewMode !== 'game' || gamePhase !== 'game') return;
    const handler = (e) => {
      const idx = TABS.indexOf(activeTab);
      if ((e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   && idx > 0)               handleTabChange(TABS[idx - 1]);
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && idx < TABS.length - 1) handleTabChange(TABS[idx + 1]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [viewMode, gamePhase, activeTab, handleTabChange]);

  // ── Mode Select (first screen) ──
  if (viewMode === 'select') {
    return (
      <ErrorBoundary>
        <ModeSelect onSelect={handleModeSelect} />
      </ErrorBoundary>
    );
  }

  // ── Pro view ──
  if (viewMode === 'pro') {
    return (
      <ErrorBoundary>
        <ProView />
        <SwitchBtn currentMode="pro" onSwitch={handleSwitch} />
      </ErrorBoundary>
    );
  }

  // ── Game: Boot ──
  if (gamePhase === 'boot') {
    return (
      <ErrorBoundary>
        <BootScreen onComplete={handleBootComplete} />
        <SwitchBtn currentMode="game" onSwitch={handleSwitch} />
      </ErrorBoundary>
    );
  }

  // ── Game: Title / Oak intro ──
  if (gamePhase === 'title') {
    return (
      <ErrorBoundary>
        <TitleScreen onEnter={handleEnterGame} />
        <SwitchBtn currentMode="game" onSwitch={handleSwitch} />
      </ErrorBoundary>
    );
  }

  // ── Game: Main Pokédex ──
  const ActiveSection = SECTION_COMPONENTS[activeTab] || ProjectDex;
  return (
    <ErrorBoundary>
      <PokedexShell activeTab={activeTab} onTabChange={handleTabChange}>
        <div style={{
          height: '100%',
          opacity: tabVisible ? 1 : 0,
          transform: tabVisible ? 'none' : 'scale(0.98)',
          transition: `opacity ${TRANSITION_DURATION}ms ease, transform ${TRANSITION_DURATION}ms ease`,
        }}>
          <ErrorBoundary>
            <ActiveSection />
          </ErrorBoundary>
        </div>
      </PokedexShell>
      <SwitchBtn currentMode="game" onSwitch={handleSwitch} />
    </ErrorBoundary>
  );
};

export default App;
