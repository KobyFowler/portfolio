import React, { useState, useEffect } from 'react';

/* =============================================
   MODE SELECT — Choose your experience
   Shows before boot / pro view loads
   ============================================= */

const ModeSelect = ({ onSelect }) => {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const choose = (mode) => {
    setVisible(false);
    setTimeout(() => onSelect(mode), 300);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0a16',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: '24px 16px',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
      zIndex: 9999,
    }}>

      {/* Title */}
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 'clamp(10px, 2.5vw, 18px)',
        color: '#CC0000',
        letterSpacing: '0.08em',
        marginBottom: 6,
        textAlign: 'center',
      }}>
        KOBY FOWLER
      </div>
      <div style={{
        fontFamily: "'VT323', monospace",
        fontSize: 'clamp(16px, 3vw, 26px)',
        color: '#8888aa',
        marginBottom: 48,
        letterSpacing: '0.06em',
        textAlign: 'center',
      }}>
        Software Engineer · Portfolio
      </div>

      {/* Cards row */}
      <div style={{
        display: 'flex',
        gap: 20,
        width: '100%',
        maxWidth: 720,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>

        {/* ── POKÉDEX / GAME card ── */}
        <button
          onClick={() => choose('game')}
          onMouseEnter={() => setHovered('game')}
          onMouseLeave={() => setHovered(null)}
          style={{
            flex: '1 1 280px',
            maxWidth: 320,
            padding: '32px 24px',
            borderRadius: 12,
            border: `2px solid ${hovered === 'game' ? '#CC0000' : '#2a2a44'}`,
            background: hovered === 'game'
              ? 'linear-gradient(145deg, #1a0505 0%, #1a0a0a 100%)'
              : 'linear-gradient(145deg, #111122 0%, #0e0e1c 100%)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            transform: hovered === 'game' ? 'translateY(-4px)' : 'none',
            boxShadow: hovered === 'game'
              ? '0 8px 32px rgba(204,0,0,0.3)'
              : '0 2px 12px rgba(0,0,0,0.4)',
            outline: 'none',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 14, lineHeight: 1 }}>🎮</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(7px, 1.4vw, 11px)',
            color: hovered === 'game' ? '#FF4444' : '#CC3333',
            letterSpacing: '0.06em',
            marginBottom: 12,
          }}>
            POKÉDEX MODE
          </div>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 20,
            color: '#8888aa',
            lineHeight: 1.5,
            marginBottom: 20,
          }}>
            Full interactive experience.
            Projects as Pokédex entries,
            experience as your Party,
            skills as a type chart.
          </div>
          <div style={{
            display: 'inline-block',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 7,
            color: hovered === 'game' ? '#fff' : '#aaaacc',
            background: hovered === 'game' ? '#CC0000' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${hovered === 'game' ? '#CC0000' : '#3a3a55'}`,
            padding: '7px 14px',
            borderRadius: 4,
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}>
            PLAY ▶
          </div>
        </button>

        {/* ── PROFESSIONAL / CLEAN card ── */}
        <button
          onClick={() => choose('pro')}
          onMouseEnter={() => setHovered('pro')}
          onMouseLeave={() => setHovered(null)}
          style={{
            flex: '1 1 280px',
            maxWidth: 320,
            padding: '32px 24px',
            borderRadius: 12,
            border: `2px solid ${hovered === 'pro' ? '#4488ff' : '#2a2a44'}`,
            background: hovered === 'pro'
              ? 'linear-gradient(145deg, #050a1a 0%, #080e1e 100%)'
              : 'linear-gradient(145deg, #111122 0%, #0e0e1c 100%)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            transform: hovered === 'pro' ? 'translateY(-4px)' : 'none',
            boxShadow: hovered === 'pro'
              ? '0 8px 32px rgba(68,136,255,0.25)'
              : '0 2px 12px rgba(0,0,0,0.4)',
            outline: 'none',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 14, lineHeight: 1 }}>📋</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(7px, 1.4vw, 11px)',
            color: hovered === 'pro' ? '#6699ff' : '#4466cc',
            letterSpacing: '0.06em',
            marginBottom: 12,
          }}>
            PROFESSIONAL VIEW
          </div>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 20,
            color: '#8888aa',
            lineHeight: 1.5,
            marginBottom: 20,
          }}>
            Clean, readable layout.
            Résumé front-and-center,
            easy to skim experience
            and share with recruiters.
          </div>
          <div style={{
            display: 'inline-block',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 7,
            color: hovered === 'pro' ? '#fff' : '#aaaacc',
            background: hovered === 'pro' ? '#2255cc' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${hovered === 'pro' ? '#4488ff' : '#3a3a55'}`,
            padding: '7px 14px',
            borderRadius: 4,
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}>
            VIEW →
          </div>
        </button>

      </div>

      {/* Keyboard hint */}
      <div style={{
        marginTop: 40,
        fontFamily: "'VT323', monospace",
        fontSize: 15,
        color: '#444466',
        letterSpacing: '0.06em',
        textAlign: 'center',
      }}>
        You can switch between views at any time from the menu.
      </div>

    </div>
  );
};

export default ModeSelect;
