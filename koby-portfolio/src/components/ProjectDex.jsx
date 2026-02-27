import React, { useState, useEffect, useRef } from 'react';
import PixelSprite, { TypeBadge, StatBar, CLINICOR_PIXELS, OKTAFORGE_PIXELS, PIXELDEX_PIXELS, CLOUDWING_PIXELS, HELIXTRACE_PIXELS, VAULTSHIELD_PIXELS } from './PixelSprites';

/* =============================================
   PROJECT DEX — Pokédex-style project entries
   Each project = a Pokédex entry
   ============================================= */

const PROJECTS = [
  {
    id: '001',
    name: 'CLINICOR',
    subtitle: 'Clinical Study Platform',
    company: 'Korio, Inc.',
    types: ['electric', 'steel'],
    sprite: CLINICOR_PIXELS,
    spriteSize: 6,
    description:
      'A production-grade TypeScript backend powering pharmaceutical clinical study workflows. Handles secure, regulated clinical data across MongoDB and SQL environments with zero-downtime guarantees.',
    flavor:
      '"It stores and protects clinical trial data with lightning speed. Researchers trust it completely."',
    stats: {
      scale:      94,
      security:   92,
      reliability:96,
      speed:      87,
      innovation: 78,
      impact:     95,
    },
    moves: [
      { name: 'Zero Downtime Deploy', type: 'electric', power: 95 },
      { name: 'Schema Migration',     type: 'steel',    power: 80 },
      { name: 'Incident Response',    type: 'electric', power: 70 },
      { name: 'Data Pipeline Sync',   type: 'steel',    power: 85 },
    ],
    tech: ['TypeScript', 'Node.js', 'MongoDB', 'AWS', 'SQL', 'REST APIs'],
    github: null,
    live: null,
    classification: 'CLINICAL PLATFORM',
    height: '∞',
    weight: '∞',
  },
  {
    id: '002',
    name: 'OKTAFORGE',
    subtitle: 'Security Access Control Platform',
    company: 'John Deere',
    types: ['steel', 'psychic'],
    sprite: OKTAFORGE_PIXELS,
    spriteSize: 6,
    description:
      'Enterprise-grade Security Access Control system integrated with Okta and AWS IAM. Built React + Node.js full-stack with RBAC enforcement, serving identity workflows across John Deere globally.',
    flavor:
      '"Forged from enterprise steel. Its shield of authentication has never been breached."',
    stats: {
      scale:      90,
      security:   98,
      reliability:88,
      speed:      82,
      innovation: 86,
      impact:     91,
    },
    moves: [
      { name: 'RBAC Enforcement',   type: 'steel',   power: 100 },
      { name: 'Okta Integration',   type: 'psychic', power: 90 },
      { name: 'IAM Policy Craft',   type: 'steel',   power: 85 },
      { name: 'Access Token Forge', type: 'psychic', power: 78 },
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'MySQL', 'Okta', 'AWS IAM', 'RBAC'],
    github: null,
    live: null,
    classification: 'SECURITY SYSTEM',
    height: '∞',
    weight: '∞',
  },
  {
    id: '003',
    name: 'PIXELDEX',
    subtitle: 'Pokémon Portfolio Website',
    company: 'Personal Project',
    types: ['normal', 'fairy'],
    sprite: PIXELDEX_PIXELS,
    spriteSize: 6,
    description:
      'A fully custom React portfolio built around the Pokémon DS-era aesthetic. Features animated pixel sprites, Pokédex UI shell, stat bars, and a complete retro game feel.',
    flavor:
      '"A curious creature that contains an entire career inside its pages. Press A to learn more."',
    stats: {
      scale:      75,
      security:   65,
      reliability:80,
      speed:      88,
      innovation: 99,
      impact:     82,
    },
    moves: [
      { name: 'Pixel Art Render',    type: 'fairy',  power: 80 },
      { name: 'React Animation',     type: 'normal', power: 70 },
      { name: 'CSS Box Shadow Art',  type: 'fairy',  power: 60 },
      { name: 'Tailwind Blast',      type: 'normal', power: 65 },
    ],
    tech: ['React', 'CSS3', 'Tailwind', 'JavaScript', 'SVG Animation'],
    github: 'https://github.com/kobyfowler/portfolio',
    live: 'https://kobyfowler.github.io/portfolio',
    classification: 'WEB PORTFOLIO',
    height: '16px',
    weight: '∞',
  },
  {
    id: '004',
    name: 'CLOUDWING',
    subtitle: 'Multi-Cloud Monitoring System',
    company: 'Open Source / Side Project',
    types: ['water', 'flying'],
    sprite: CLOUDWING_PIXELS,
    spriteSize: 6,
    description:
      'AWS Lambda-based distributed monitoring system with custom CloudWatch metrics, multi-region alerting, and automated incident correlation. Unifies AWS and Azure observability into a single dashboard.',
    flavor:
      '"It soars between clouds invisible to the eye, always watching, never missing a metric."',
    stats: {
      scale:      88,
      security:   82,
      reliability:90,
      speed:      84,
      innovation: 88,
      impact:     86,
    },
    moves: [
      { name: 'Lambda Sweep',       type: 'flying', power: 85 },
      { name: 'CloudWatch Pulse',   type: 'water',  power: 80 },
      { name: 'Multi-Region Dash',  type: 'flying', power: 75 },
      { name: 'Incident Correlate', type: 'water',  power: 90 },
    ],
    tech: ['AWS Lambda', 'CloudWatch', 'Azure Monitor', 'TypeScript', 'Node.js', 'Terraform'],
    github: 'https://github.com/kobyfowler/cloudwing',
    live: null,
    classification: 'CLOUD MONITOR',
    height: '∞',
    weight: '∞',
  },
  {
    id: '005',
    name: 'VAULTSHIELD',
    subtitle: 'Zero-Trust API Gateway',
    company: 'Open Source / Side Project',
    types: ['ghost', 'steel'],
    sprite: VAULTSHIELD_PIXELS,
    spriteSize: 6,
    description:
      'Zero-trust API gateway with cryptographic request validation using Ed25519 signatures, automated credential rotation, and a policy engine for fine-grained access control at the network edge.',
    flavor:
      '"Nothing passes through it without proving itself. Even those who built it must authenticate."',
    stats: {
      scale:      80,
      security:   99,
      reliability:88,
      speed:      78,
      innovation: 94,
      impact:     89,
    },
    moves: [
      { name: 'Ed25519 Sign',      type: 'ghost',  power: 95 },
      { name: 'Zero Trust Block',  type: 'steel',  power: 100 },
      { name: 'Cred Rotation',     type: 'ghost',  power: 85 },
      { name: 'Policy Engine',     type: 'steel',  power: 88 },
    ],
    tech: ['Node.js', 'TypeScript', 'Ed25519', 'JWT', 'OAuth2', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/kobyfowler/vaultshield',
    live: null,
    classification: 'SECURITY GATEWAY',
    height: '∞',
    weight: '∞',
  },
  {
    id: '006',
    name: 'HELIXTRACE',
    subtitle: 'Distributed Tracing Library',
    company: 'Open Source — npm',
    types: ['dragon', 'electric'],
    sprite: HELIXTRACE_PIXELS,
    spriteSize: 6,
    description:
      'Open-source OpenTelemetry-compatible distributed tracing library for TypeScript microservices. Automatic span propagation, async context tracking, and a plug-and-play SDK with 300+ GitHub stars.',
    flavor:
      '"Its double helix body traces every request from birth to death. Nothing escapes its memory."',
    stats: {
      scale:      85,
      security:   76,
      reliability:92,
      speed:      90,
      innovation: 96,
      impact:     88,
    },
    moves: [
      { name: 'Span Propagate',    type: 'dragon',   power: 90 },
      { name: 'Async Context',     type: 'electric', power: 85 },
      { name: 'Trace Visualize',   type: 'dragon',   power: 80 },
      { name: 'npm Publish',       type: 'electric', power: 70 },
    ],
    tech: ['TypeScript', 'OpenTelemetry', 'Node.js', 'gRPC', 'Jaeger', 'Zipkin'],
    github: 'https://github.com/kobyfowler/helixtrace',
    live: 'https://npmjs.com/package/helixtrace',
    classification: 'TRACE LIBRARY',
    height: '0.5m',
    weight: '∞',
  },
];

const STAT_COLORS = {
  scale:       'blue',
  security:    'purple',
  reliability: 'green',
  speed:       'yellow',
  innovation:  'orange',
  impact:      'red',
};

const ProjectDex = () => {
  const [selected, setSelected] = useState(PROJECTS[0]);
  const [viewMode, setViewMode] = useState('stats');   // stats | moves | info | tech
  const [revealed, setRevealed] = useState(false);
  const detailRef = useRef(null);

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => {
      setRevealed(true);
    }, 60);
    return () => clearTimeout(t);
  }, [selected]);

  const selectProject = (proj) => {
    if (proj.id !== selected.id) setSelected(proj);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      minHeight: 500,
      fontFamily: "'Press Start 2P', monospace",
    }}>
      {/* ── LEFT: Entry list ── */}
      <div style={{
        width: 180,
        borderRight: '2px solid #222244',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: 0,
        background: 'rgba(0,0,20,0.4)',
        flexShrink: 0,
      }}>
        <div style={{
          padding: '8px 10px',
          borderBottom: '1px solid #222244',
          color: '#6890F0',
          fontSize: 7,
          letterSpacing: 1,
        }}>
          POKÉDEX  {PROJECTS.length.toString().padStart(3, '0')}/{PROJECTS.length.toString().padStart(3, '0')}
        </div>

        {PROJECTS.map(p => (
          <button
            key={p.id}
            onClick={() => selectProject(p)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 10px',
              background: selected.id === p.id
                ? 'rgba(100,150,255,0.15)'
                : 'transparent',
              border: 'none',
              borderBottom: '1px solid #111122',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.15s',
              borderLeft: selected.id === p.id ? '3px solid #6890F0' : '3px solid transparent',
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <PixelSprite pixels={p.sprite} pixelSize={2} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 2 }}>#{p.id}</div>
              <div style={{
                color: selected.id === p.id ? '#FFFFFF' : '#CCCCEE',
                fontSize: 6,
                lineHeight: 1.4,
                wordBreak: 'break-word',
              }}>
                {p.name}
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 3, flexWrap: 'wrap' }}>
                {p.types.map(t => <TypeBadge key={t} type={t} />)}
              </div>
            </div>
            {selected.id === p.id && (
              <div style={{
                width: 0, height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderLeft: '6px solid #6890F0',
                flexShrink: 0,
              }} />
            )}
          </button>
        ))}
      </div>

      {/* ── RIGHT: Detail view ── */}
      <div
        ref={detailRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateX(8px)',
          transition: 'opacity 0.25s, transform 0.25s',
        }}
      >
        {/* Entry header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: '16px 16px 12px',
          gap: 16,
          borderBottom: '1px solid #222244',
        }}>
          {/* Sprite */}
          <div style={{
            padding: 8,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid #222244',
            flexShrink: 0,
            position: 'relative',
          }}>
            {/* Sprite background glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle, rgba(${typeGlow(selected.types[0])},0.3) 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
            <PixelSprite pixels={selected.sprite} pixelSize={selected.spriteSize} />
          </div>

          {/* Entry info */}
          <div style={{ flex: 1 }}>
            <div style={{ color: '#AAAACC', fontSize: 7, marginBottom: 4 }}>
              No.{selected.id} — {selected.classification}
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 'clamp(9px, 2vw, 13px)', marginBottom: 6, textShadow: '1px 1px 0 #000' }}>
              {selected.name}
            </div>
            <div style={{ fontFamily: "'VT323', monospace", color: '#BBBBCC', fontSize: 18, marginBottom: 8 }}>
              {selected.subtitle}
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
              {selected.types.map(t => <TypeBadge key={t} type={t} />)}
            </div>
            <div style={{ fontFamily: "'VT323', monospace", color: '#888899', fontSize: 15 }}>
              {selected.company}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {selected.github && (
                <a href={selected.github} target="_blank" rel="noreferrer" style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 6,
                  color: '#00DDFF',
                  background: 'rgba(0,200,255,0.1)',
                  border: '1px solid rgba(0,200,255,0.3)',
                  padding: '3px 7px',
                  textDecoration: 'none',
                }}>GitHub</a>
              )}
              {selected.live && (
                <a href={selected.live} target="_blank" rel="noreferrer" style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 6,
                  color: '#FFD700',
                  background: 'rgba(255,200,0,0.1)',
                  border: '1px solid rgba(255,200,0,0.3)',
                  padding: '3px 7px',
                  textDecoration: 'none',
                }}>Live</a>
              )}
            </div>
          </div>
        </div>

        {/* View mode tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #222244',
          background: 'rgba(0,0,0,0.3)',
        }}>
          {['stats', 'moves', 'info', 'tech'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                flex: 1,
                padding: '6px 4px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 6,
                background: viewMode === mode ? 'rgba(100,150,255,0.2)' : 'transparent',
                border: 'none',
                borderBottom: viewMode === mode ? '2px solid #6890F0' : '2px solid transparent',
                color: viewMode === mode ? '#6890F0' : '#666688',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all 0.1s',
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* View content */}
        <div style={{ padding: '14px 16px' }}>
          {viewMode === 'stats' && (
            <div>
              <div style={{ color: '#AAAACC', fontSize: 6, marginBottom: 12, letterSpacing: 1 }}>BASE STATS</div>
              {Object.entries(selected.stats).map(([stat, val]) => (
                <StatBar
                  key={stat}
                  label={stat.slice(0, 5).toUpperCase()}
                  value={val}
                  max={100}
                  color={STAT_COLORS[stat] || 'blue'}
                  className="mb-3"
                />
              ))}
              <div style={{
                marginTop: 12,
                paddingTop: 10,
                borderTop: '1px solid #222244',
                color: '#888899',
                fontFamily: "'VT323', monospace",
                fontSize: 14,
              }}>
                TOTAL: {Object.values(selected.stats).reduce((a, b) => a + b, 0)} / 600
              </div>
            </div>
          )}

          {viewMode === 'moves' && (
            <div>
              <div style={{ color: '#AAAACC', fontSize: 6, marginBottom: 12, letterSpacing: 1 }}>MOVE SET</div>
              {selected.moves.map((move, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 10px',
                  marginBottom: 6,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #222244',
                }}>
                  <TypeBadge type={move.type} />
                  <div style={{
                    flex: 1,
                    fontFamily: "'VT323', monospace",
                    color: '#DDDDFF',
                    fontSize: 18,
                  }}>
                    {move.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ color: '#AAAACC', fontSize: 5 }}>PWR</div>
                    <div style={{ color: '#FFD700', fontSize: 7 }}>{move.power}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'info' && (
            <div>
              <div style={{ color: '#AAAACC', fontSize: 6, marginBottom: 12, letterSpacing: 1 }}>ENTRY</div>
              <div style={{
                fontFamily: "'VT323', monospace",
                color: '#CCCCDD',
                fontSize: 19,
                lineHeight: 1.6,
                marginBottom: 16,
              }}>
                {selected.description}
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid #222244',
                borderLeft: '3px solid #6890F0',
                padding: '10px 12px',
                marginBottom: 14,
              }}>
                <div style={{
                  fontFamily: "'VT323', monospace",
                  color: '#8888AA',
                  fontSize: 17,
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}>
                  {selected.flavor}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <InfoPill label="HT." value={selected.height} />
                <InfoPill label="WT." value={selected.weight} />
              </div>
            </div>
          )}

          {viewMode === 'tech' && (
            <div>
              <div style={{ color: '#AAAACC', fontSize: 6, marginBottom: 12, letterSpacing: 1 }}>TECH STACK</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selected.tech.map(t => (
                  <div
                    key={t}
                    style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: 18,
                      color: '#CCDDFF',
                      background: 'rgba(100,150,255,0.12)',
                      border: '1px solid rgba(100,150,255,0.3)',
                      padding: '4px 10px',
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoPill = ({ label, value }) => (
  <div style={{
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid #222244',
    padding: '6px 10px',
  }}>
    <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 3 }}>{label}</div>
    <div style={{ fontFamily: "'VT323', monospace", color: '#DDDDFF', fontSize: 18 }}>{value}</div>
  </div>
);

const typeGlow = (type) => {
  const map = {
    electric: '248,208,48',
    steel: '184,184,208',
    psychic: '248,88,136',
    water: '104,144,240',
    ghost: '112,88,152',
    dragon: '112,56,248',
    normal: '168,168,120',
    fairy: '238,153,172',
    grass: '120,200,80',
    fire: '240,128,48',
  };
  return map[type] || '100,150,255';
};

export default ProjectDex;
