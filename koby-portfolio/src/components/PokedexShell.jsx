import React, { useState } from 'react';
import { PokeballSVG } from './PixelSprites';

/* =============================================
   POKEDEX SHELL — Main Layout
   The outer red Pokedex device, nav, and content router
   ============================================= */

const NAV_TABS = [
  { id: 'projects',  label: 'POKÉDEX',    icon: '📖', sub: 'ENTRY LOG' },
  { id: 'team',      label: 'TEAM',        icon: '👾', sub: 'PARTY' },
  { id: 'skills',    label: 'TYPES',       icon: '⚡', sub: 'STRENGTHS' },
  { id: 'contact',   label: 'CHALLENGE',   icon: '⚔️', sub: 'BATTLE ME' },
  { id: 'resume',    label: 'TRAINER ID',  icon: '🪪', sub: 'PROFILE' },
];

const PokedexShell = ({ children, activeTab, onTabChange }) => {
  const [dpadActive, setDpadActive] = useState(null);

  const handleDpad = (dir) => {
    setDpadActive(dir);
    setTimeout(() => setDpadActive(null), 150);
    const idx = NAV_TABS.findIndex(t => t.id === activeTab);
    if (dir === 'up'   && idx > 0)                   onTabChange(NAV_TABS[idx - 1].id);
    if (dir === 'down' && idx < NAV_TABS.length - 1) onTabChange(NAV_TABS[idx + 1].id);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-4 px-2"
      style={{
        background: 'linear-gradient(160deg, #0a0a0a 0%, #0d0d1a 100%)',
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      {/* ── POKEDEX DEVICE ── */}
      <div
        className="w-full max-w-5xl flex flex-col"
        style={{
          background: 'linear-gradient(160deg, #DD1111 0%, #AA0000 55%, #880000 100%)',
          border: '3px solid #660000',
          borderRadius: '16px 16px 24px 24px',
          boxShadow: `
            inset 0 4px 0 rgba(255,100,100,0.35),
            inset 0 -4px 0 rgba(0,0,0,0.5),
            0 0 0 3px #000,
            0 12px 50px rgba(200,0,0,0.5),
            0 30px 80px rgba(0,0,0,0.9)
          `,
          minHeight: '90vh',
        }}
      >
        {/* ───── TOP PANEL ───── */}
        <div
          style={{
            padding: '16px 24px 0',
            background: 'linear-gradient(160deg, #EE2222 0%, #BB0000 100%)',
            borderRadius: '13px 13px 0 0',
            borderBottom: '3px solid #770000',
            position: 'relative',
          }}
        >
          {/* Header row: lens + title + LEDs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            {/* Big lens */}
            <div style={{
              width: 56,
              height: 56,
              background: 'radial-gradient(circle at 35% 35%, #AADDFF, #2266CC, #001144)',
              borderRadius: '50%',
              border: '4px solid #BBCCDD',
              boxShadow: '0 0 0 3px #111, 0 0 20px rgba(100,180,255,0.9), inset 0 2px 4px rgba(255,255,255,0.5)',
              animation: 'lens-pulse 3s ease-in-out infinite',
              flexShrink: 0,
            }} />

            {/* Title */}
            <div style={{ flex: 1 }}>
              <div style={{
                color: '#FFD700',
                fontSize: 'clamp(10px, 2.5vw, 18px)',
                textShadow: '2px 2px 0 #AA8800',
                letterSpacing: '0.08em',
              }}>
                KOBYDEX
              </div>
              <div style={{
                fontFamily: "'VT323', monospace",
                color: 'rgba(255,220,220,0.7)',
                fontSize: 16,
                marginTop: 2,
              }}>
                {NAV_TABS.find(t => t.id === activeTab)?.sub || 'POKÉDEX'}
              </div>
            </div>

            {/* LED cluster */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#FF3333',
                boxShadow: '0 0 8px #FF0000, 0 0 3px #FF0000 inset',
                border: '1.5px solid rgba(0,0,0,0.4)',
                animation: 'led-blink 2s ease-in-out infinite',
              }} />
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#FFFF33',
                boxShadow: '0 0 8px #FFCC00',
                border: '1.5px solid rgba(0,0,0,0.4)',
                animation: 'led-blink 2.7s ease-in-out infinite 0.8s',
              }} />
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#33FF33',
                boxShadow: '0 0 8px #00CC00',
                border: '1.5px solid rgba(0,0,0,0.4)',
                animation: 'led-blink 3.2s ease-in-out infinite 1.4s',
              }} />
            </div>

            {/* Small decorative bolts */}
            <PokeballSVG size={28} className="opacity-70" />
          </div>

          {/* Nav tabs (inline horizontally) */}
          <div style={{
            display: 'flex',
            gap: 4,
            overflowX: 'auto',
            paddingBottom: 0,
            scrollbarWidth: 'none',
          }}>
            {NAV_TABS.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 'clamp(6px, 1.2vw, 8px)',
                    padding: '8px 12px',
                    background: active
                      ? '#F8F8F0'
                      : 'rgba(0,0,0,0.3)',
                    color: active ? '#111' : 'rgba(255,220,220,0.6)',
                    border: 'none',
                    borderBottom: active ? '3px solid #F8F8F0' : '3px solid transparent',
                    borderTop: active ? '3px solid #DDDDCC' : '3px solid transparent',
                    borderLeft: active ? '3px solid #DDDDCC' : '3px solid transparent',
                    borderRight: active ? '3px solid #DDDDCC' : '3px solid transparent',
                    borderRadius: '4px 4px 0 0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.05em',
                    transition: 'all 0.15s',
                    position: 'relative',
                    bottom: -3,
                  }}
                >
                  <span style={{ marginRight: 4 }}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ───── LOWER HINGE ───── */}
        <div style={{
          height: 16,
          background: 'linear-gradient(to bottom, #770000, #550000)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#440000', border: '1px solid #220000' }} />
          ))}
        </div>

        {/* ───── BOTTOM PANEL ───── */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(160deg, #AA0000 0%, #880000 70%, #660000 100%)',
          borderRadius: '0 0 21px 21px',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 0 20px',
        }}>
          {/* Main screen */}
          <div style={{
            margin: '0 20px',
            background: '#0d0d1a',
            border: '4px solid #222244',
            borderRadius: 4,
            boxShadow: `
              inset 0 0 40px rgba(0,40,120,0.7),
              inset 0 0 80px rgba(0,0,0,0.9),
              0 0 0 2px #000,
              0 0 0 5px #1a1a3a
            `,
            flex: 1,
            minHeight: 500,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Screen glare */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '35%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)',
              pointerEvents: 'none',
              zIndex: 5,
            }} />
            {/* CRT scanlines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
              pointerEvents: 'none',
              zIndex: 6,
            }} />
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
              {children}
            </div>
          </div>

          {/* ── CONTROLS STRIP ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 32px 0',
          }}>
            {/* D-Pad */}
            <DPad onPress={handleDpad} active={dpadActive} />

            {/* Center label */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7,
                color: '#FFD700',
                marginBottom: 4,
                textShadow: '1px 1px 0 #880000',
              }}>
                KOBYDEX
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#440000', border: '1px solid #220000' }} />
                ))}
              </div>
            </div>

            {/* A/B buttons */}
            <ActionButtons onTabChange={onTabChange} activeTab={activeTab} tabs={NAV_TABS} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 16,
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 6,
        color: '#333',
        textAlign: 'center',
      }}>
        © 2025 KOBY FOWLER  ·  kobymfowler@outlook.com  ·  kobyfowler.github.io/portfolio
      </div>
    </div>
  );
};

/* ── D-PAD ── */
const DPad = ({ onPress, active }) => {
  const dirs = [
    { id: 'up',    style: { gridColumn: 2, gridRow: 1 }, symbol: '▲' },
    { id: 'left',  style: { gridColumn: 1, gridRow: 2 }, symbol: '◄' },
    { id: 'center',style: { gridColumn: 2, gridRow: 2 }, symbol: '' },
    { id: 'right', style: { gridColumn: 3, gridRow: 2 }, symbol: '►' },
    { id: 'down',  style: { gridColumn: 2, gridRow: 3 }, symbol: '▼' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 28px)',
      gridTemplateRows: 'repeat(3, 28px)',
      gap: 1,
    }}>
      {dirs.map(d => (
        <button
          key={d.id}
          onClick={d.id !== 'center' ? () => onPress(d.id) : undefined}
          style={{
            ...d.style,
            background: active === d.id
              ? 'linear-gradient(135deg, #444, #222)'
              : d.id === 'center'
              ? 'linear-gradient(135deg, #333, #1a1a1a)'
              : 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
            border: '2px solid #111',
            boxShadow: active === d.id
              ? 'none'
              : 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 0 rgba(0,0,0,0.5)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 8,
            cursor: d.id !== 'center' ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.1s',
            transform: active === d.id ? 'translateY(2px)' : 'none',
          }}
        >
          {d.symbol}
        </button>
      ))}
    </div>
  );
};

/* ── A/B/X/Y Buttons ── */
const ActionButtons = ({ onTabChange, activeTab, tabs }) => {
  const idx = tabs.findIndex(t => t.id === activeTab);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 34px)',
      gridTemplateRows: 'repeat(2, 34px)',
      gap: 4,
    }}>
      {/* X - previous tab */}
      <button
        title="Previous"
        onClick={() => idx > 0 && onTabChange(tabs[idx - 1].id)}
        style={btnStyle('#FFDD00', '#AA9900', '#333')}
      >X</button>
      {/* Y - next tab */}
      <button
        title="Next"
        onClick={() => idx < tabs.length - 1 && onTabChange(tabs[idx + 1].id)}
        style={btnStyle('#44CC44', '#228822', 'white')}
      >Y</button>
      {/* A - confirm */}
      <button
        title="Select"
        style={btnStyle('#FF4444', '#AA0000', 'white')}
      >A</button>
      {/* B - back */}
      <button
        title="Back"
        onClick={() => idx > 0 && onTabChange(tabs[idx - 1].id)}
        style={btnStyle('#4444FF', '#0000AA', 'white')}
      >B</button>
    </div>
  );
};

const btnStyle = (bg, shadow, color) => ({
  width: 34, height: 34,
  borderRadius: '50%',
  background: `radial-gradient(circle at 38% 35%, ${bg}, ${shadow})`,
  border: '2px solid rgba(0,0,0,0.5)',
  boxShadow: `0 3px 0 rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)`,
  color,
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 7,
  cursor: 'pointer',
  transition: 'all 0.1s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default PokedexShell;
