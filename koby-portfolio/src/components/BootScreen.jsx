import React, { useState, useEffect } from 'react';
import { PokeballSVG } from './PixelSprites';

/* =============================================
   BOOT SCREEN
   Simulates DS game boot sequence
   ============================================= */

const BOOT_STEPS = [
  { text: '',                              delay: 200 },
  { text: '© 2024 KOBYDEX LABS',          delay: 600 },
  { text: 'ALL RIGHTS RESERVED',          delay: 1000 },
  { text: '',                              delay: 1400 },
  { text: 'LOADING SAVE DATA...',         delay: 1800 },
  { text: 'TRAINER: KOBY FOWLER',         delay: 2400 },
  { text: 'BADGE COUNT: 8/8',             delay: 2700 },
  { text: 'POKEDEX ENTRIES: 008/008',     delay: 3000 },
  { text: '',                              delay: 3400 },
  { text: '▶ CONTINUE',                   delay: 3700 },
];

const BootScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('black');       // black → logo → text → progress → done
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);

  useEffect(() => {
    // Phase 1: black
    const t1 = setTimeout(() => {
      setPhase('logo');
      setLogoOpacity(0);
      setTimeout(() => setLogoOpacity(1), 100);
    }, 300);

    // Phase 2: logo → text
    const t2 = setTimeout(() => setPhase('text'), 1200);

    // Phase 3: show text lines sequentially
    BOOT_STEPS.forEach(({ text, delay }) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, text]);
      }, delay);
    });

    // Phase 4: progress bar
    const t4 = setTimeout(() => {
      setPhase('progress');
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 8 + 2;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 400);
        }
        setProgress(Math.min(p, 100));
      }, 60);
    }, 4400);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pixel-scanlines"
      style={{
        background: '#000',
        zIndex: 9999,
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      {/* Top screen — Nintendo DS style */}
      {(phase === 'logo' || phase === 'text') && (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            opacity: logoOpacity,
            transition: 'opacity 0.4s',
            marginBottom: 32,
          }}
        >
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <PokeballSVG size={80} spinning={phase === 'logo'} />
            {phase === 'logo' && (
              <div
                style={{
                  position: 'absolute',
                  inset: -12,
                  border: '2px solid rgba(255,215,0,0.3)',
                  borderRadius: '50%',
                  animation: 'lens-pulse 1s ease-in-out infinite',
                }}
              />
            )}
          </div>

          <div style={{ textAlign: 'center', lineHeight: 2 }}>
            <div style={{ color: '#CC0000', fontSize: 18, letterSpacing: 4, marginBottom: 4 }}>
              KOBYDEX
            </div>
            <div style={{ color: '#FFD700', fontSize: 10, letterSpacing: 3 }}>
              PORTFOLIO VERSION
            </div>
          </div>
        </div>
      )}

      {/* Text log */}
      {phase === 'text' && (
        <div
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '16px 24px',
            border: '2px solid #333',
            background: '#0a0a0a',
            minHeight: 180,
          }}
        >
          {visibleLines.map((line, i) => (
            <div
              key={i}
              style={{
                color: line.startsWith('TRAINER') ? '#FFD700'
                  : line.startsWith('▶') ? '#00FF88'
                  : line === '' ? 'transparent'
                  : '#AAAACC',
                fontSize: 8,
                lineHeight: 2.2,
                animation: 'slide-right 0.2s ease-out forwards',
              }}
            >
              {line || '\u00A0'}
            </div>
          ))}
          {phase === 'text' && visibleLines.length < BOOT_STEPS.length && (
            <span style={{ color: '#AAAACC', fontSize: 8, animation: 'led-blink 0.5s infinite' }}>_</span>
          )}
        </div>
      )}

      {/* Progress phase */}
      {phase === 'progress' && (
        <div style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
          <PokeballSVG size={48} spinning />
          <div style={{ marginTop: 24, marginBottom: 12, color: '#00FF88', fontSize: 8, letterSpacing: 2 }}>
            ENTERING WORLD...
          </div>
          <div
            style={{
              height: 12,
              background: '#111',
              border: '2px solid #333',
              borderRadius: 0,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(to right, #CC0000, #FF4444)',
                transition: 'width 0.15s',
                boxShadow: '0 0 8px #FF0000',
              }}
            />
          </div>
          <div style={{ marginTop: 8, color: '#555', fontSize: 7 }}>
            {Math.round(progress)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default BootScreen;
