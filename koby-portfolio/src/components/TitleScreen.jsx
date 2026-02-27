import React, { useState, useEffect, useCallback } from 'react';
import PixelSprite, { TRAINER_PIXELS, PokeballSVG, StarSVG } from './PixelSprites';

/* =============================================
   TITLE SCREEN + PROFESSOR OAK INTRO
   ============================================= */

const OAK_SCRIPT = [
  { id: 0, text: "Hello there!", speaker: "PROF. OAK" },
  { id: 1, text: "Welcome to the world of PORTFOLIO.", speaker: "PROF. OAK" },
  { id: 2, text: "My name is OAK. People call me the Portfolio Professor!", speaker: "PROF. OAK" },
  { id: 3, text: "This world is home to incredible engineers. We call them...", speaker: "PROF. OAK" },
  { id: 4, text: "SENIOR SOFTWARE ENGINEERS!", speaker: "PROF. OAK" },
  { id: 5, text: "This young engineer has set out to conquer Cloud Architecture, Distributed Systems, and Security.", speaker: "PROF. OAK" },
  { id: 6, text: "His name is KOBY FOWLER.", speaker: "PROF. OAK" },
  { id: 7, text: "Navigate his POKÉDEX to learn about his Projects, Experience, and Skills.", speaker: "PROF. OAK" },
  { id: 8, text: "Now, let's begin!", speaker: "PROF. OAK" },
];

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 60,
  delay: Math.random() * 3,
  size: Math.random() > 0.7 ? 14 : 10,
}));

const TitleScreen = ({ onEnter }) => {
  const [phase, setPhase] = useState('title');   // title → intro → ready
  const [oakLine, setOakLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [trainerVisible, setTrainerVisible] = useState(false);
  const [pressBlinking, setPressBlinking] = useState(false);

  // Typewriter for Oak dialog
  useEffect(() => {
    if (phase !== 'intro') return;
    const fullText = OAK_SCRIPT[oakLine]?.text || '';
    setDisplayText('');
    setShowCursor(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setShowCursor(true);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [oakLine, phase]);

  // Title screen blinking "PRESS START"
  useEffect(() => {
    if (phase !== 'title') return;
    const timeout = setTimeout(() => setPressBlinking(true), 800);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Trainer reveal during intro
  useEffect(() => {
    if (oAkLine === 6 || oakLine === 5) setTrainerVisible(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oakLine]);

  const oAkLine = oakLine; // alias for above

  const handleTitleClick = useCallback(() => {
    if (phase === 'title') {
      setPhase('intro');
      setOakLine(0);
    }
  }, [phase]);

  const handleAdvance = useCallback(() => {
    if (phase === 'intro') {
      if (!showCursor) return; // still typing
      if (oakLine < OAK_SCRIPT.length - 1) {
        setOakLine(prev => prev + 1);
      } else {
        setPhase('ready');
        setTimeout(() => onEnter?.(), 600);
      }
    }
  }, [phase, showCursor, oakLine, onEnter]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
        if (phase === 'title') handleTitleClick();
        else handleAdvance();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, handleTitleClick, handleAdvance]);

  /* ── TITLE SCREEN ── */
  if (phase === 'title') {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-between overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #000018 0%, #001230 50%, #000818 100%)', cursor: 'pointer' }}
        onClick={handleTitleClick}
      >
        {/* Stars */}
        {STARS.map(s => (
          <div
            key={s.id}
            className="absolute animate-star-twinkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <StarSVG size={s.size} color={s.size > 12 ? '#FFD700' : '#AAAACC'} />
          </div>
        ))}

        {/* Big logo area */}
        <div className="flex flex-col items-center" style={{ marginTop: '10vh' }}>
          {/* Pokeball glow */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{
              position: 'absolute',
              inset: -20,
              background: 'radial-gradient(circle, rgba(200,0,0,0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'lens-pulse 2s ease-in-out infinite',
            }}/>
            <PokeballSVG size={100} />
          </div>

          {/* Title text */}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(20px, 5vw, 36px)',
              color: '#CC0000',
              textShadow: '0 0 20px #FF000088, 4px 4px 0 #880000',
              letterSpacing: '0.05em',
              marginBottom: 12,
            }}>
              KOBYDEX
            </div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(8px, 2vw, 13px)',
              color: '#FFD700',
              textShadow: '2px 2px 0 #AA8800',
              letterSpacing: '0.15em',
              marginBottom: 6,
            }}>
              PORTFOLIO VERSION
            </div>
            <div style={{
              fontFamily: "'VT323', monospace",
              fontSize: 20,
              color: '#6890F0',
              letterSpacing: '0.2em',
            }}>
              SENIOR SOFTWARE ENGINEER
            </div>
          </div>
        </div>

        {/* Center trainer */}
        <div style={{ position: 'relative', marginBottom: '6vh' }}>
          {/* Tile/map decoration */}
          <div style={{
            position: 'absolute',
            bottom: -20,
            left: '50%', transform: 'translateX(-50%)',
            width: 120, height: 12,
            background: 'linear-gradient(to right, transparent, #234, transparent)',
            borderRadius: 8,
            filter: 'blur(4px)',
          }}/>
          <PixelSprite pixels={TRAINER_PIXELS} pixelSize={5} />
        </div>

        {/* Press start blinking */}
        <div style={{ marginBottom: '8vh', textAlign: 'center' }}>
          {pressBlinking && (
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(7px, 1.5vw, 11px)',
              color: '#FFFFFF',
              animation: 'led-blink 1s ease-in-out infinite',
              letterSpacing: '0.1em',
            }}>
              PRESS START
            </div>
          )}
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 14,
            color: '#444',
            marginTop: 8,
          }}>
            (click or press SPACE)
          </div>
        </div>

        {/* Version info */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 20,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 6,
          color: '#333',
        }}>
          v2.0 · © 2025 KOBY FOWLER
        </div>
      </div>
    );
  }

  /* ── OAK INTRO SCREEN ── */
  if (phase === 'intro') {
    return (
      <div
        className="fixed inset-0 flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #0a0a1a 0%, #001018 100%)',
          fontFamily: "'Press Start 2P', monospace",
        }}
        onClick={handleAdvance}
      >
        {/* Scene */}
        <div className="flex-1 flex items-end justify-around" style={{ padding: '40px 40px 20px' }}>
          {/* Professor Oak pixel art placeholder */}
          <div style={{ textAlign: 'center' }}>
            <OakSprite />
            <div style={{ fontSize: 7, color: '#AAAACC', marginTop: 8 }}>PROF. OAK</div>
          </div>

          {/* Trainer (revealed at line 6+) */}
          <div
            style={{
              textAlign: 'center',
              transition: 'opacity 0.6s, transform 0.6s',
              opacity: trainerVisible ? 1 : 0,
              transform: trainerVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <PixelSprite pixels={TRAINER_PIXELS} pixelSize={6} />
            <div style={{ fontSize: 7, color: '#FFD700', marginTop: 8 }}>KOBY</div>
          </div>
        </div>

        {/* Dialogue box */}
        <div style={{
          margin: '0 16px 40px',
          background: '#F8F8F0',
          border: '4px solid #111',
          boxShadow: '4px 4px 0 #111',
          padding: '16px 20px',
          minHeight: 90,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: -1,
            left: 20,
            background: '#F8F8F0',
            border: '4px solid #111',
            borderBottom: 'none',
            padding: '2px 10px',
            fontSize: 7,
            color: '#111',
            transform: 'translateY(-100%)',
          }}>
            {OAK_SCRIPT[oakLine]?.speaker}
          </div>

          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 22,
            color: '#111',
            lineHeight: 1.5,
            minHeight: 54,
          }}>
            {displayText}
            {showCursor && <span style={{ animation: 'led-blink 0.7s step-end infinite' }}>_</span>}
          </div>

          {/* Advance prompt */}
          {showCursor && (
            <div style={{
              position: 'absolute',
              bottom: 8,
              right: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <div style={{ fontSize: 7, color: '#555' }}>
                {oakLine < OAK_SCRIPT.length - 1 ? 'NEXT' : 'ENTER'}
              </div>
              <div style={{
                width: 0, height: 0,
                borderLeft: '6px solid #555',
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                animation: 'dialog-bounce 0.6s ease-in-out infinite',
              }} />
            </div>
          )}

          {/* Progress dots */}
          <div style={{
            position: 'absolute',
            bottom: 8,
            left: 16,
            display: 'flex',
            gap: 4,
          }}>
            {OAK_SCRIPT.map((_, i) => (
              <div key={i} style={{
                width: 6, height: 6,
                borderRadius: '50%',
                background: i <= oakLine ? '#CC0000' : '#CCC',
                transition: 'background 0.2s',
              }} />
            ))}
          </div>
        </div>

        {/* Keyboard hint */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 20,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 6,
          color: '#333',
        }}>
          SPACE / CLICK to advance
        </div>
      </div>
    );
  }

  return null;
};

/* Oak sprite (simple geometric art) */
const OakSprite = () => (
  <svg width="80" height="96" viewBox="0 0 20 24" style={{ imageRendering: 'pixelated' }}>
    {/* Lab coat body */}
    <rect x="5" y="10" width="10" height="10" fill="#F0F0F0" />
    <rect x="4" y="11" width="2" height="8" fill="#F0F0F0" />
    <rect x="14" y="11" width="2" height="8" fill="#F0F0F0" />
    <rect x="6" y="10" width="8" height="1" fill="#DDD" />
    {/* Buttons */}
    <rect x="9" y="12" width="2" height="1" fill="#888" />
    <rect x="9" y="14" width="2" height="1" fill="#888" />
    <rect x="9" y="16" width="2" height="1" fill="#888" />
    {/* Shirt collar */}
    <rect x="8" y="10" width="4" height="2" fill="#4488CC" />
    {/* Pants */}
    <rect x="5" y="20" width="4" height="4" fill="#334" />
    <rect x="11" y="20" width="4" height="4" fill="#334" />
    <rect x="5" y="20" width="10" height="1" fill="#222" />
    {/* Shoes */}
    <rect x="4" y="23" width="5" height="1" fill="#111" />
    <rect x="11" y="23" width="5" height="1" fill="#111" />
    {/* Head */}
    <rect x="6" y="3" width="8" height="7" fill="#FDBCB4" />
    {/* Hair */}
    <rect x="6" y="2" width="8" height="3" fill="#888866" />
    <rect x="5" y="3" width="2" height="2" fill="#888866" />
    <rect x="13" y="3" width="2" height="2" fill="#888866" />
    {/* Eyes */}
    <rect x="8" y="6" width="1" height="1" fill="#111" />
    <rect x="11" y="6" width="1" height="1" fill="#111" />
    {/* Glasses */}
    <rect x="7" y="5" width="3" height="3" fill="none" stroke="#663300" strokeWidth="0.3" />
    <rect x="10" y="5" width="3" height="3" fill="none" stroke="#663300" strokeWidth="0.3" />
    <rect x="10" y="6" width="1" height="1" fill="none" />
    {/* Mouth */}
    <rect x="9" y="8" width="2" height="1" fill="#CC9999" />
    {/* Arms */}
    <rect x="2" y="11" width="2" height="6" fill="#FDBCB4" />
    <rect x="16" y="11" width="2" height="6" fill="#FDBCB4" />
    {/* Hands */}
    <rect x="2" y="17" width="2" height="2" fill="#FDBCB4" />
    <rect x="16" y="17" width="2" height="2" fill="#FDBCB4" />
  </svg>
);

export default TitleScreen;
