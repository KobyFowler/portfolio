import React from 'react';
import PixelSprite, { TRAINER_PIXELS } from './PixelSprites';

/* =============================================
   TRAINER PROFILE — Pokémon Trainer ID card style
   Combines hero + mini-bio + links
   ============================================= */

const BADGES = [
  { name: 'Cloud Badge',      icon: '☁️', earned: true,  subtitleSub: 'AWS & Azure Production' },
  { name: 'Security Badge',   icon: '🛡️', earned: true,  subtitleSub: 'RBAC & Zero-Trust' },
  { name: 'Clinical Badge',   icon: '🏥', earned: true,  subtitleSub: 'Regulated Healthcare' },
  { name: 'Architect Badge',  icon: '🏗️', earned: true,  subtitleSub: 'End-to-End Ownership' },
  { name: 'Mentor Badge',     icon: '🦉', earned: true,  subtitleSub: '50+ Students Taught' },
  { name: 'OSS Badge',        icon: '📦', earned: true,  subtitleSub: 'Open Source Author' },
  { name: 'TypeScript Badge', icon: '⚡', earned: true,  subtitleSub: 'Expert Level' },
  { name: 'SAP Badge',        icon: '🎓', earned: false, subtitleSub: 'AWS SAP (In Progress)' },
];

const TrainerProfile = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 500,
    overflowY: 'auto',
    fontFamily: "'Press Start 2P', monospace",
  }}>
    {/* Header */}
    <div style={{
      padding: '10px 16px',
      borderBottom: '1px solid #222244',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ color: '#FFD700', fontSize: 8 }}>TRAINER ID CARD</div>
      <a
        href="/resume.html"
        target="_blank"
        rel="noreferrer"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 6,
          color: '#00DDFF',
          border: '1px solid rgba(0,200,255,0.4)',
          background: 'rgba(0,200,255,0.08)',
          padding: '3px 8px',
          textDecoration: 'none',
        }}
      >
        📄 DOWNLOAD RÉSUMÉ
      </a>
    </div>

    {/* Trainer card */}
    <div style={{
      margin: '12px',
      background: 'linear-gradient(135deg, rgba(0,0,40,0.8), rgba(0,0,20,0.9))',
      border: '2px solid #2a2a4a',
      boxShadow: '0 0 0 1px rgba(100,150,255,0.1)',
      overflow: 'hidden',
    }}>
      {/* Card top bar */}
      <div style={{
        background: 'linear-gradient(to right, #AA0000, #CC0000, #AA0000)',
        padding: '6px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: 6, color: 'rgba(255,220,220,0.8)', letterSpacing: 2 }}>
          TRAINER CARD
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>
      </div>

      {/* Card body */}
      <div style={{ display: 'flex', gap: 16, padding: '14px 14px 10px' }}>
        {/* Sprite */}
        <div style={{
          padding: 8,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid #222244',
          alignSelf: 'flex-start',
          position: 'relative',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(248,208,48,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <PixelSprite pixels={TRAINER_PIXELS} pixelSize={5} />
        </div>

        {/* Trainer info */}
        <div style={{ flex: 1 }}>
          <div style={{ color: '#FFD700', fontSize: 12, marginBottom: 4, textShadow: '1px 1px 0 #884400' }}>
            KOBY FOWLER
          </div>
          <div style={{
            fontFamily: "'VT323', monospace",
            color: '#CCCCDD',
            fontSize: 18,
            marginBottom: 8,
            lineHeight: 1.4,
          }}>
            Senior Software Engineer
            <br/>Cloud · Distributed Systems · Security
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px 16px',
            marginBottom: 10,
          }}>
            <StatRow label="YRS EXP" value="4+" />
            <StatRow label="REGION" value="Remote" />
            <StatRow label="HOMETOWN" value="Sycamore, IL" />
            <StatRow label="STARTED" value="2021" />
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {[
              { label: '📧 EMAIL',    href: 'mailto:kobymfowler@outlook.com', color: '#F08030' },
              { label: '💼 LINKEDIN', href: 'https://linkedin.com/in/koby-fowler', color: '#6890F0' },
              { label: '🐙 GITHUB',   href: 'https://github.com/kobyfowler-git', color: '#888899' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 5,
                  color: l.color,
                  border: `1px solid ${l.color}55`,
                  background: `${l.color}11`,
                  padding: '3px 7px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Trainer summary */}
    <div style={{
      margin: '0 12px 10px',
      padding: '10px 14px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid #222244',
      borderLeft: '3px solid #6890F0',
    }}>
      <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 8, letterSpacing: 1 }}>
        TRAINER PROFILE
      </div>
      <div style={{
        fontFamily: "'VT323', monospace",
        color: '#CCCCDD',
        fontSize: 17,
        lineHeight: 1.7,
      }}>
        Senior Software Engineer with enterprise and healthcare experience designing and leading
        production-grade cloud systems in regulated environments. Proven ability to own architecture
        end-to-end, lead critical initiatives, and operate as sole engineer on high-impact systems.
        Deep expertise in AWS and Azure, MongoDB and SQL, secure access control systems, and full-stack
        TypeScript platforms.
      </div>
    </div>

    {/* Badge case */}
    <div style={{ margin: '0 12px 12px' }}>
      <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 8, letterSpacing: 1 }}>
        BADGE CASE
      </div>
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '2px solid #222244',
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6,
      }}>
        {BADGES.map(badge => (
          <BadgeSlot key={badge.name} badge={badge} />
        ))}
      </div>
    </div>

    {/* Phone / contact footer */}
    <div style={{
      margin: '0 12px 12px',
      padding: '10px 14px',
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid #222244',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
    }}>
      {[
        ['📞', '815-793-0818'],
        ['📧', 'kobymfowler@outlook.com'],
        ['🌐', 'kobyfowler-git.github.io/portfolio'],
      ].map(([icon, text]) => (
        <div key={text} style={{
          fontFamily: "'VT323', monospace",
          color: '#888899',
          fontSize: 15,
          display: 'flex',
          gap: 6,
          alignItems: 'center',
        }}>
          <span>{icon}</span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  </div>
);

const BadgeSlot = ({ badge }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 4px',
    background: badge.earned ? 'rgba(255,215,0,0.06)' : 'rgba(0,0,0,0.3)',
    border: `1px solid ${badge.earned ? 'rgba(255,215,0,0.3)' : '#221122'}`,
    opacity: badge.earned ? 1 : 0.4,
    gap: 3,
    transition: 'all 0.2s',
    cursor: badge.earned ? 'default' : 'default',
  }}
  title={badge.subtitleSub}
  >
    <div style={{
      fontSize: 18,
      filter: badge.earned ? 'drop-shadow(0 0 4px gold)' : 'grayscale(1)',
    }}>
      {badge.icon}
    </div>
    <div style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 4,
      color: badge.earned ? '#FFD700' : '#555',
      textAlign: 'center',
      lineHeight: 1.5,
      wordBreak: 'break-all',
    }}>
      {badge.name.replace(' Badge', '')}
    </div>
  </div>
);

const StatRow = ({ label, value }) => (
  <div style={{ display: 'flex', gap: 6 }}>
    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 5, color: '#888899', minWidth: 60 }}>{label}</div>
    <div style={{ fontFamily: "'VT323', monospace", color: '#CCCCDD', fontSize: 16 }}>{value}</div>
  </div>
);

export default TrainerProfile;
