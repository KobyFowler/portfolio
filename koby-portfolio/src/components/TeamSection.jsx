import React, { useState } from 'react';
import PixelSprite, { TypeBadge, HPBar, StatBar, KORION_PIXELS, DEEREBOT_PIXELS, PROFESSORIX_PIXELS, SYSRAT_PIXELS, CLOUDWING_PIXELS, HAWKITE_PIXELS } from './PixelSprites';

/* =============================================
   TEAM SECTION — Experience as Pokémon Party
   ============================================= */

const TEAM = [
  {
    id: 1,
    name: 'KORION',
    role: 'Senior Software Engineer',
    company: 'Korio, Inc.',
    period: 'Oct 2024 — Present',
    level: 99,
    types: ['electric', 'steel'],
    sprite: KORION_PIXELS,
    hp: { current: 99, max: 99 },
    cardColor: '#F8D030',
    cardGlow: 'rgba(248,208,48,0.35)',
    status: 'ACTIVE',
    description:
      'Sole engineer on multiple production clinical study platforms supporting pharma trial workflows. Architects orchestration-layer features, leads zero-downtime database migrations, owns incident response, and drives deployment reliability for new studies.',
    moves: [
      { name: 'Architect Orchestration', type: 'electric' },
      { name: 'Zero-Downtime Deploy',    type: 'steel' },
      { name: 'Incident Response',       type: 'electric' },
      { name: 'DB Migration',            type: 'steel' },
    ],
    stats: {
      ATTACK:  99,
      DEFENSE: 94,
      SPATK:   96,
      SPDEF:   90,
      SPEED:   88,
    },
    badges: ['Remote Ace', 'Solo Engineer', 'Clinical Grade', 'Zero-Downtime'],
  },
  {
    id: 2,
    name: 'DEEREBOT',
    role: 'Full Stack Engineer',
    company: 'John Deere',
    period: 'May 2023 — Oct 2024',
    level: 85,
    types: ['steel', 'grass'],
    sprite: DEEREBOT_PIXELS,
    hp: { current: 85, max: 85 },
    cardColor: '#367C2B',
    cardGlow: 'rgba(54,124,43,0.35)',
    status: 'BENCHED',
    description:
      'Architected enterprise Security Access Control platform integrated with Okta and IAM. Built full-stack React + Node.js application for enterprise identity workflows and designed MySQL schemas for real-time access operations.',
    moves: [
      { name: 'RBAC Enforcement',   type: 'steel' },
      { name: 'Okta Integration',   type: 'steel' },
      { name: 'React Full Stack',   type: 'grass' },
      { name: 'AWS Infrastructure', type: 'grass' },
    ],
    stats: {
      ATTACK:  88,
      DEFENSE: 92,
      SPATK:   85,
      SPDEF:   87,
      SPEED:   80,
    },
    badges: ['Enterprise Grade', 'Security First', 'AWS Certified', 'IAM Expert'],
  },
  {
    id: 3,
    name: 'PROFESSORIX',
    role: 'Teaching Assistant (CS/Eng)',
    company: 'Iowa State University',
    period: 'Aug 2022 — Dec 2024',
    level: 60,
    types: ['psychic', 'flying'],
    sprite: PROFESSORIX_PIXELS,
    hp: { current: 60, max: 60 },
    cardColor: '#705898',
    cardGlow: 'rgba(112,88,152,0.35)',
    status: 'BENCHED',
    description:
      'Mentored 50+ students per semester in C programming and engineering systems. Delivered debugging workshops, led full-project lifecycle execution reviews, and developed course materials for lab sessions.',
    moves: [
      { name: 'Debug Workshop',    type: 'psychic' },
      { name: 'Code Review',       type: 'psychic' },
      { name: 'Lecture Flight',    type: 'flying' },
      { name: 'Student Guidance',  type: 'psychic' },
    ],
    stats: {
      ATTACK:  72,
      DEFENSE: 70,
      SPATK:   88,
      SPDEF:   80,
      SPEED:   65,
    },
    badges: ['Mentor', '50+ Students', 'C Systems', 'Lab Lead'],
  },
  {
    id: 4,
    name: 'SYSRAT',
    role: 'IT Solutions Engineer',
    company: 'Iowa State University',
    period: 'Dec 2021 — Dec 2022',
    level: 50,
    types: ['rock', 'normal'],
    sprite: SYSRAT_PIXELS,
    hp: { current: 50, max: 50 },
    cardColor: '#B8A038',
    cardGlow: 'rgba(184,160,56,0.35)',
    status: 'BENCHED',
    description:
      'Supported enterprise IAM systems (Okta) for 30,000+ user institution. Resolved complex authentication issues, improved documentation and resolution workflows, and reduced ticket resolution time significantly.',
    moves: [
      { name: 'Okta Support',       type: 'rock' },
      { name: 'Ticket Resolve',     type: 'normal' },
      { name: 'Doc Improvement',    type: 'normal' },
      { name: '30K User Scale',     type: 'rock' },
    ],
    stats: {
      ATTACK:  65,
      DEFENSE: 80,
      SPATK:   70,
      SPDEF:   75,
      SPEED:   55,
    },
    badges: ['30K Users', 'Okta IAM', 'Enterprise IT', 'Doc Writer'],
  },
  {
    id: 5,
    name: 'CLOUDWING',
    role: 'AWS Solutions Architect',
    company: 'Certification (In Progress)',
    period: '2025',
    level: 45,
    types: ['water', 'flying'],
    sprite: CLOUDWING_PIXELS,
    hp: { current: 38, max: 45 },
    cardColor: '#6890F0',
    cardGlow: 'rgba(104,144,240,0.35)',
    status: 'TRAINING',
    description:
      'Pursuing AWS Solutions Architect Professional certification. Deep hands-on experience with IAM, EC2, Lambda, S3, RDS, VPC, CloudWatch — backed by production usage at Korio and John Deere.',
    moves: [
      { name: 'Lambda Deploy',   type: 'flying' },
      { name: 'VPC Architect',   type: 'water' },
      { name: 'S3 Secure',       type: 'water' },
      { name: 'CloudWatch Eye',  type: 'flying' },
    ],
    stats: {
      ATTACK:  80,
      DEFENSE: 76,
      SPATK:   85,
      SPDEF:   78,
      SPEED:   72,
    },
    badges: ['AWS SAP (WIP)', 'Lambda', 'VPC', 'RDS'],
  },
  {
    id: 6,
    name: 'HAWKITE',
    role: 'B.S. Computer Engineering',
    company: 'Iowa State University',
    period: 'Dec 2022',
    level: 40,
    types: ['normal', 'grass'],
    sprite: HAWKITE_PIXELS,
    hp: { current: 40, max: 40 },
    cardColor: '#CC0000',
    cardGlow: 'rgba(200,0,0,0.3)',
    status: 'BENCHED',
    description:
      'Bachelor of Science in Computer Engineering from Iowa State University. Foundation in operating systems, embedded systems, digital logic, computer architecture, algorithms, and software engineering fundamentals.',
    moves: [
      { name: 'OS Fundamentals',  type: 'normal' },
      { name: 'Embedded C',       type: 'grass' },
      { name: 'Algorithm Design', type: 'normal' },
      { name: 'Digital Logic',    type: 'grass' },
    ],
    stats: {
      ATTACK:  70,
      DEFENSE: 70,
      SPATK:   75,
      SPDEF:   70,
      SPEED:   65,
    },
    badges: ['B.S. CompEng', 'ISU 2022', "Dean's List", 'EE Core'],
  },
];

const STATUS_COLORS = {
  ACTIVE:   '#00FF88',
  BENCHED:  '#AAAACC',
  TRAINING: '#FFD700',
};

const TeamSection = () => {
  const [selected, setSelected] = useState(TEAM[0]);
  const [detailMode, setDetailMode] = useState('overview');   // overview | moves | stats

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 500,
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
        <div style={{ color: '#6890F0', fontSize: 8 }}>TRAINER'S PARTY</div>
        <div style={{ fontFamily: "'VT323', monospace", color: '#AAAACC', fontSize: 16 }}>
          {TEAM.filter(t => t.status === 'ACTIVE').length}/6 ACTIVE
        </div>
      </div>

      {/* Party grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 6,
        padding: '12px 12px 0',
      }}>
        {TEAM.map(member => (
          <PartySlot
            key={member.id}
            member={member}
            selected={selected.id === member.id}
            onSelect={() => setSelected(member)}
          />
        ))}
      </div>

      {/* Detail panel */}
      <div style={{
        flex: 1,
        margin: '10px 12px 12px',
        background: 'rgba(0,0,20,0.5)',
        border: '1px solid #222244',
      }}>
        {/* Detail header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px',
          borderBottom: '1px solid #222244',
          background: 'rgba(0,0,0,0.3)',
        }}>
          <div style={{ flexShrink: 0 }}>
            <PixelSprite pixels={selected.sprite} pixelSize={3} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <div style={{ color: '#FFD700', fontSize: 8 }}>{selected.name}</div>
              <div style={{
                background: 'rgba(0,0,0,0.5)',
                border: `1px solid ${STATUS_COLORS[selected.status] || '#444'}`,
                color: STATUS_COLORS[selected.status] || '#AAA',
                fontSize: 5,
                padding: '2px 5px',
              }}>
                {selected.status}
              </div>
            </div>
            <div style={{
              fontFamily: "'VT323', monospace",
              color: '#CCCCDD',
              fontSize: 16,
              marginBottom: 3,
            }}>
              {selected.role}
            </div>
            <div style={{ fontFamily: "'VT323', monospace", color: '#888899', fontSize: 14 }}>
              {selected.company}  ·  {selected.period}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 2 }}>LEVEL</div>
            <div style={{ color: '#FFD700', fontSize: 12 }}>{selected.level}</div>
            <div style={{ display: 'flex', gap: 3, marginTop: 4, justifyContent: 'flex-end' }}>
              {selected.types.map(t => <TypeBadge key={t} type={t} />)}
            </div>
          </div>
        </div>

        {/* Detail tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #222244' }}>
          {['overview', 'moves', 'stats'].map(mode => (
            <button
              key={mode}
              onClick={() => setDetailMode(mode)}
              style={{
                flex: 1,
                padding: '5px 4px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 5,
                background: detailMode === mode ? 'rgba(100,150,255,0.2)' : 'transparent',
                border: 'none',
                borderBottom: detailMode === mode ? '2px solid #6890F0' : '2px solid transparent',
                color: detailMode === mode ? '#6890F0' : '#555577',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Detail content */}
        <div style={{ padding: '10px 14px' }}>
          {detailMode === 'overview' && (
            <div>
              <div style={{
                fontFamily: "'VT323', monospace",
                color: '#CCCCDD',
                fontSize: 17,
                lineHeight: 1.6,
                marginBottom: 12,
              }}>
                {selected.description}
              </div>
              <HPBar current={selected.hp.current} max={selected.hp.max} />
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {selected.badges.map(b => (
                  <div key={b} style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 5,
                    color: '#FFD700',
                    border: '1px solid rgba(255,215,0,0.4)',
                    background: 'rgba(255,215,0,0.08)',
                    padding: '2px 6px',
                  }}>
                    ★ {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailMode === 'moves' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {selected.moves.map((move, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 10px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid #222244',
                }}>
                  <div style={{
                    width: 20, height: 20,
                    background: 'rgba(100,100,200,0.2)',
                    border: '1px solid #444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#AAAACC',
                    fontSize: 8,
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <TypeBadge type={move.type} />
                  <div style={{
                    flex: 1,
                    fontFamily: "'VT323', monospace",
                    color: '#DDDDFF',
                    fontSize: 18,
                  }}>
                    {move.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {detailMode === 'stats' && (
            <div>
              {Object.entries(selected.stats).map(([stat, val]) => (
                <StatBar
                  key={stat}
                  label={stat}
                  value={val}
                  max={100}
                  color={stat === 'ATTACK' ? 'red' : stat === 'DEFENSE' ? 'blue' : stat === 'SPATK' ? 'purple' : stat === 'SPDEF' ? 'green' : 'yellow'}
                  className="mb-2"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* Individual party slot */
const PartySlot = ({ member, selected, onSelect }) => (
  <button
    onClick={onSelect}
    style={{
      background: selected
        ? `linear-gradient(135deg, rgba(${hexToRgb(member.cardColor)},0.25), rgba(0,0,30,0.8))`
        : 'linear-gradient(135deg, rgba(0,0,30,0.7), rgba(0,0,20,0.9))',
      border: `2px solid ${selected ? member.cardColor : '#222244'}`,
      borderTop: selected ? `3px solid ${member.cardColor}` : '3px solid transparent',
      boxShadow: selected ? `0 0 16px ${member.cardGlow}` : 'none',
      padding: '8px 6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'left',
      position: 'relative',
    }}
  >
    {/* Status dot */}
    <div style={{
      position: 'absolute',
      top: 4, right: 4,
      width: 5, height: 5,
      borderRadius: '50%',
      background: STATUS_COLORS[member.status] || '#555',
      boxShadow: `0 0 4px ${STATUS_COLORS[member.status] || '#555'}`,
    }} />

    {/* Sprite */}
    <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
      <PixelSprite pixels={member.sprite} pixelSize={2} />
    </div>

    {/* Info */}
    <div style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 5,
      color: selected ? '#FFFFFF' : '#AAAACC',
      marginBottom: 2,
      lineHeight: 1.5,
    }}>
      {member.name}
    </div>
    <div style={{ fontFamily: "'VT323', monospace", color: '#FFD700', fontSize: 13 }}>
      Lv.{member.level}
    </div>

    {/* Mini HP bar */}
    <div style={{
      height: 3,
      background: '#111',
      border: '1px solid #000',
      marginTop: 4,
    }}>
      <div style={{
        height: '100%',
        width: `${(member.hp.current / member.hp.max) * 100}%`,
        background: member.hp.current / member.hp.max > 0.5 ? '#22CC44'
          : member.hp.current / member.hp.max > 0.2 ? '#FFEE22' : '#FF3333',
        animation: 'health-fill 1s ease-out',
      }} />
    </div>
  </button>
);

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : '100,150,255';
};

export default TeamSection;
