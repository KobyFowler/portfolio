import React, { useState } from 'react';
import { TypeBadge } from './PixelSprites';

/* =============================================
   SKILLS SECTION — Type Chart + Skill Tree
   Skills displayed as Pokémon types
   ============================================= */

const SKILL_TYPES = [
  {
    type: 'cloud',
    label: 'CLOUD ARCHITECT',
    icon: '☁️',
    color: '#6890F0',
    glow: 'rgba(104,144,240,0.4)',
    level: 'EXPERT',
    power: 94,
    skills: [
      { name: 'AWS (IAM, EC2, Lambda, S3, RDS, VPC, CloudWatch)', level: 94 },
      { name: 'Azure (App Services, SQL, Blob Storage, AD)', level: 88 },
      { name: 'Multi-region Architecture', level: 85 },
      { name: 'Serverless Design', level: 88 },
      { name: 'IaC (Terraform, CDK)', level: 76 },
    ],
    note: 'Production-grade AWS & Azure at scale. Korio + John Deere.',
  },
  {
    type: 'backend',
    label: 'BACKEND SYSTEMS',
    icon: '⚡',
    color: '#F08030',
    glow: 'rgba(240,128,48,0.4)',
    level: 'MASTER',
    power: 97,
    skills: [
      { name: 'TypeScript / Node.js', level: 97 },
      { name: 'REST API Design', level: 95 },
      { name: 'Distributed Systems', level: 92 },
      { name: 'Microservices Architecture', level: 88 },
      { name: 'Python', level: 82 },
      { name: 'Express.js', level: 94 },
    ],
    note: 'Sole engineer on production clinical platforms. TypeScript daily.',
  },
  {
    type: 'security',
    label: 'SECURITY & AUTH',
    icon: '🛡️',
    color: '#705898',
    glow: 'rgba(112,88,152,0.4)',
    level: 'EXPERT',
    power: 93,
    skills: [
      { name: 'IAM / RBAC', level: 96 },
      { name: 'OAuth2 & Okta', level: 93 },
      { name: 'Secure API Design', level: 90 },
      { name: 'Zero-Trust Architecture', level: 85 },
      { name: 'Cryptographic Auth', level: 80 },
    ],
    note: 'Designed enterprise security at John Deere. Zero breaches.',
  },
  {
    type: 'database',
    label: 'DATA ENGINEERING',
    icon: '🗄️',
    color: '#B8A038',
    glow: 'rgba(184,160,56,0.4)',
    level: 'EXPERT',
    power: 91,
    skills: [
      { name: 'MongoDB', level: 93 },
      { name: 'MySQL / SQL', level: 91 },
      { name: 'AWS RDS / Aurora', level: 88 },
      { name: 'Azure SQL', level: 84 },
      { name: 'Schema Design & Migration', level: 92 },
      { name: 'Query Optimization', level: 88 },
    ],
    note: 'Led zero-downtime DB migrations. Regulated clinical data.',
  },
  {
    type: 'frontend',
    label: 'FRONTEND',
    icon: '🎨',
    color: '#F85888',
    glow: 'rgba(248,88,136,0.4)',
    level: 'PROFICIENT',
    power: 82,
    skills: [
      { name: 'React', level: 88 },
      { name: 'TypeScript (UI)', level: 85 },
      { name: 'HTML5 / CSS3', level: 82 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'SVG & Animation', level: 75 },
    ],
    note: 'React + Node.js full-stack at John Deere. Built this site.',
  },
  {
    type: 'devops',
    label: 'DEVOPS & INFRA',
    icon: '🔧',
    color: '#B8B8D0',
    glow: 'rgba(184,184,208,0.4)',
    level: 'EXPERT',
    power: 89,
    skills: [
      { name: 'Docker', level: 88 },
      { name: 'GitHub Actions / CI-CD', level: 92 },
      { name: 'Azure DevOps', level: 84 },
      { name: 'Linux / Bash', level: 86 },
      { name: 'Monitoring & Alerting', level: 88 },
    ],
    note: 'Owned full deployment pipelines. Improved reliability metrics.',
  },
  {
    type: 'system',
    label: 'SYSTEMS DESIGN',
    icon: '🏗️',
    color: '#7038F8',
    glow: 'rgba(112,56,248,0.4)',
    level: 'EXPERT',
    power: 90,
    skills: [
      { name: 'Distributed Systems', level: 92 },
      { name: 'Architecture Design', level: 90 },
      { name: 'Event-Driven Systems', level: 86 },
      { name: 'Fault Tolerance', level: 88 },
      { name: 'Scalability Patterns', level: 87 },
    ],
    note: 'End-to-end ownership of orchestration layers at scale.',
  },
  {
    type: 'language',
    label: 'LANGUAGES',
    icon: '💬',
    color: '#F8D030',
    glow: 'rgba(248,208,48,0.4)',
    level: 'EXPERT',
    power: 96,
    skills: [
      { name: 'TypeScript', level: 97 },
      { name: 'JavaScript', level: 96 },
      { name: 'Python', level: 82 },
      { name: 'C / C++', level: 74 },
      { name: 'SQL', level: 91 },
      { name: 'Bash / Shell', level: 80 },
    ],
    note: 'TypeScript is the primary weapon. JavaScript is the sidearm.',
  },
];

const LEVEL_COLORS = {
  MASTER:     '#FFD700',
  EXPERT:     '#00DDFF',
  PROFICIENT: '#78C850',
  LEARNING:   '#F08030',
};

const SkillTypes = () => {
  const [selected, setSelected] = useState(SKILL_TYPES[0]);
  const [animKey, setAnimKey] = useState(0);

  const handleSelect = (t) => {
    setSelected(t);
    setAnimKey(k => k + 1);
  };

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
        <div style={{ color: '#6890F0', fontSize: 8 }}>TYPE CHART</div>
        <div style={{ fontFamily: "'VT323', monospace", color: '#AAAACC', fontSize: 14 }}>
          SELECT TYPE TO INSPECT
        </div>
      </div>

      {/* Type badge grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 4,
        padding: '10px 12px',
        borderBottom: '1px solid #222244',
      }}>
        {SKILL_TYPES.map(t => (
          <button
            key={t.type}
            onClick={() => handleSelect(t)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '8px 4px',
              background: selected.type === t.type
                ? `rgba(${hexToRgb(t.color)},0.25)`
                : 'rgba(0,0,0,0.3)',
              border: `2px solid ${selected.type === t.type ? t.color : '#222244'}`,
              cursor: 'pointer',
              transition: 'all 0.15s',
              boxShadow: selected.type === t.type ? `0 0 12px ${t.glow}` : 'none',
              gap: 4,
            }}
          >
            <div style={{ fontSize: 16 }}>{t.icon}</div>
            <div style={{ fontSize: 4, letterSpacing: '0.05em', color: '#CCCCEE' }}>
              {t.label.split(' ')[0]}
            </div>
            {/* Power bar */}
            <div style={{
              width: '100%',
              height: 3,
              background: '#111',
              marginTop: 2,
            }}>
              <div style={{
                height: '100%',
                width: `${t.power}%`,
                background: t.color,
                animation: 'health-fill 1s ease-out',
              }} />
            </div>
          </button>
        ))}
      </div>

      {/* Selected type detail */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div
          key={animKey}
          style={{
            padding: '14px 16px',
            animation: 'pixel-fadein 0.3s ease-out',
          }}
        >
          {/* Type header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 14,
            paddingBottom: 12,
            borderBottom: '1px solid #222244',
          }}>
            <div style={{ fontSize: 28 }}>{selected.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ color: selected.color, fontSize: 9 }}>{selected.label}</div>
                <div style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: `1px solid ${LEVEL_COLORS[selected.level]}`,
                  color: LEVEL_COLORS[selected.level],
                  fontSize: 5,
                  padding: '2px 5px',
                }}>
                  {selected.level}
                </div>
              </div>
              <div style={{
                fontFamily: "'VT323', monospace",
                color: '#888899',
                fontSize: 15,
              }}>
                {selected.note}
              </div>
            </div>
            {/* Power badge */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 2 }}>POWER</div>
              <div style={{ color: selected.color, fontSize: 14 }}>{selected.power}</div>
            </div>
          </div>

          {/* Skills list */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 10, letterSpacing: 1 }}>
              ABILITIES
            </div>
            {selected.skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}>
                  <div style={{
                    fontFamily: "'VT323', monospace",
                    color: '#CCCCDD',
                    fontSize: 18,
                  }}>
                    {skill.name}
                  </div>
                  <div style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: selected.color,
                    fontSize: 7,
                  }}>
                    {skill.level}
                  </div>
                </div>
                <div style={{
                  height: 6,
                  background: '#111',
                  border: '1px solid #111',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${skill.level}%`,
                    background: `linear-gradient(to right, ${adjustColor(selected.color, -30)}, ${selected.color})`,
                    boxShadow: `0 0 4px ${selected.glow}`,
                    animation: 'health-fill 1.2s ease-out',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: '50%',
                      background: 'rgba(255,255,255,0.3)',
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Type matchup — shows "supereffective" tech combos */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid #222244',
            borderLeft: `3px solid ${selected.color}`,
            padding: '8px 12px',
          }}>
            <div style={{ color: '#AAAACC', fontSize: 5, marginBottom: 6 }}>SUPER EFFECTIVE AGAINST</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {getSuperEffective(selected.type).map(t => (
                <TypeBadge key={t} type={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : '100,150,255';
};

const adjustColor = (hex, amount) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const [, r, g, b] = result;
  const clamp = v => Math.max(0, Math.min(255, v));
  return `#${[parseInt(r,16), parseInt(g,16), parseInt(b,16)]
    .map(v => clamp(v + amount).toString(16).padStart(2, '0'))
    .join('')}`;
};

/* What skills combos are "super effective" from a resume perspective */
const getSuperEffective = (type) => {
  const map = {
    cloud:    ['backend', 'devops', 'system', 'security'],
    backend:  ['cloud', 'database', 'system', 'language'],
    security: ['cloud', 'backend', 'database', 'system'],
    database: ['backend', 'cloud', 'system'],
    frontend: ['backend', 'language'],
    devops:   ['cloud', 'backend', 'system'],
    system:   ['cloud', 'backend', 'security', 'devops'],
    language: ['backend', 'system', 'frontend'],
  };
  return map[type] || [];
};

export default SkillTypes;
