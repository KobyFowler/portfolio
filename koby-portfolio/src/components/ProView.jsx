import React, { useState } from 'react';

/* =============================================
   PRO VIEW — Clean, functional portfolio view
   Résumé-first, easy to digest
   ============================================= */

const ACCENT = '#CC0000';
const INK    = '#1a1a2e';
const SUB    = '#4a4a6a';
const RULE   = '#e8e8f0';
const CHIP_BG = '#f3f3f9';

const jobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Korio',
    period: 'Oct 2024 – Present',
    location: 'Remote',
    bullets: [
      'Architect clinical intelligence platform processing 100k+ daily patient events across Node.js, TypeScript, and AWS pipelines.',
      'Designed zero-trust RBAC with Okta federation, securing PHI across 12 enterprise clinic tenants at <200ms auth latency.',
      'Reduced cloud spend 38% by re-engineering SQS batching, Lambda right-sizing, and DynamoDB on-demand provisioning.',
      'Built automated FHIR HL7 normalisation layer cutting new-clinic onboarding from 3 weeks to 3 days.',
    ],
  },
  {
    title: 'Full Stack Software Engineer',
    company: 'John Deere',
    period: 'May 2023 – Oct 2024',
    location: 'Urbandale, IA',
    bullets: [
      'Owned Security Access Control (SAC) platform serving 27,000+ internal users — React/Node.js role provisioning across 40 apps.',
      'Integrated Okta Workflows + custom OAuth 2.0 layer, eliminating 95% of manual access tickets and 4× faster provisioning.',
      'Migrated legacy PHP identity flows to cloud-native Node.js microservice on AWS ECS — p99 latency 2.1s → 340ms.',
      'Received Innovation Award for autonomous access-review automation saving ~1,200 eng-hours per quarter.',
    ],
  },
  {
    title: 'Teaching Assistant — Computer Engineering',
    company: 'Iowa State University',
    period: 'Aug 2022 – Dec 2024',
    location: 'Ames, IA',
    bullets: [
      'Labs, grading, and office hours for 80+ students in embedded systems and digital design.',
      'Wrote auto-grading scripts (Python) reducing rubric evaluation time 60%.',
    ],
  },
  {
    title: 'IT Systems Technician',
    company: 'Iowa State University — IT Services',
    period: 'Dec 2021 – Dec 2022',
    location: 'Ames, IA',
    bullets: [
      'Hardware provisioning, network configuration, and AD management for 3,000+ device campus fleet.',
    ],
  },
];

const projects = [
  {
    name: 'HelixTrace',
    desc: 'Zero-config OpenTelemetry-compatible distributed tracing SDK for Node.js. Auto context propagation, pluggable exporters for Jaeger, Zipkin & AWS X-Ray. 300+ ⭐ on GitHub.',
    link: 'https://github.com/kobyfowler-git/helixTrace',
    tags: ['TypeScript', 'OpenTelemetry', 'Node.js', 'AWS X-Ray', 'npm'],
  },
  {
    name: 'VaultShield',
    desc: 'Self-hostable zero-trust API gateway — mutual TLS, Ed25519 token signing, zero-knowledge proof verification, per-route RBAC, real-time audit logs.',
    link: 'https://github.com/kobyfowler-git/vaultShield',
    tags: ['Go', 'Ed25519', 'mTLS', 'Docker', 'AWS CloudWatch'],
  },
  {
    name: 'CloudWatcher',
    desc: 'Unified observability dashboard aggregating AWS CloudWatch, Azure Monitor, and GCP metrics. React frontend, Lambda polling workers, WebSocket live push.',
    link: 'https://github.com/kobyfowler-git/cloudWatcher',
    tags: ['React', 'Node.js', 'AWS Lambda', 'Azure SDK', 'WebSocket'],
  },
  {
    name: 'KobyDex Portfolio',
    desc: 'This portfolio — a fully interactive Pokédex (Gen 4/5 DS era aesthetic). Pixel-art sprites, boot sequence, Oak intro, D-pad navigation. 100% React + CSS.',
    link: 'https://kobyfowler-git.github.io/portfolio',
    tags: ['React 18', 'CSS Animations', 'Pixel Art', 'GitHub Pages'],
  },
];

const skillGroups = [
  { label: 'Languages',       items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'Bash'] },
  { label: 'Cloud',           items: ['AWS (EC2, Lambda, S3, RDS, SQS, VPC, IAM, CloudWatch)', 'Azure', 'Docker', 'Terraform'] },
  { label: 'Backend',         items: ['Node.js', 'Express', 'REST', 'GraphQL', 'Microservices', 'WebSocket'] },
  { label: 'Security',        items: ['OAuth 2.0', 'Okta', 'RBAC', 'JWT', 'mTLS', 'FHIR / PHI'] },
  { label: 'Frontend',        items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5'] },
  { label: 'Databases',       items: ['PostgreSQL', 'MySQL', 'DynamoDB', 'MongoDB', 'Redis'] },
  { label: 'DevOps',          items: ['GitHub Actions', 'Jenkins', 'CI/CD', 'Jest', 'OpenTelemetry'] },
];

/* ── Sub-components ── */

const Section = ({ title, children }) => (
  <section style={{ marginBottom: 40 }}>
    <div style={{
      fontWeight: 800, fontSize: 11, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: ACCENT,
      borderBottom: `2px solid ${RULE}`, paddingBottom: 6, marginBottom: 18,
    }}>
      {title}
    </div>
    {children}
  </section>
);

const Chip = ({ label }) => (
  <span style={{
    background: CHIP_BG, color: SUB, fontSize: 11.5, fontWeight: 600,
    padding: '2px 10px', borderRadius: 4, border: `1px solid ${RULE}`,
    display: 'inline-block',
  }}>
    {label}
  </span>
);

/* ── Main ProView ── */

const ProView = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7f7fb',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: INK,
    }}>
      {/* ── HERO HEADER ── */}
      <div style={{
        background: '#fff',
        borderBottom: `4px solid ${ACCENT}`,
        padding: '36px 0 28px',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px' }}>
          {/* Name row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 34, fontWeight: 900, letterSpacing: -0.5, margin: 0, lineHeight: 1 }}>
                Koby Fowler
              </h1>
              <div style={{ fontSize: 14, color: SUB, marginTop: 6, fontWeight: 500 }}>
                Senior Software Engineer &nbsp;·&nbsp; Full-Stack &nbsp;·&nbsp; Cloud &nbsp;·&nbsp; Security
              </div>
              <div style={{ fontSize: 13, color: SUB, marginTop: 4 }}>
                <a href="mailto:kobymfowler@outlook.com" style={{ color: ACCENT, textDecoration: 'none' }}>kobymfowler@outlook.com</a>
                {' '}&nbsp;·&nbsp;{' '}
                <a href="https://linkedin.com/in/koby-fowler" target="_blank" rel="noreferrer" style={{ color: ACCENT, textDecoration: 'none' }}>LinkedIn</a>
                {' '}&nbsp;·&nbsp;{' '}
                <a href="https://github.com/kobyfowler-git" target="_blank" rel="noreferrer" style={{ color: ACCENT, textDecoration: 'none' }}>GitHub</a>
                {' '}&nbsp;·&nbsp;{' '}
                <span style={{ color: SUB }}>815-793-0818</span>
              </div>
            </div>

            {/* Resume button — most prominent CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              <a
                href="/portfolio/resume.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: ACCENT, color: '#fff',
                  fontWeight: 700, fontSize: 14,
                  padding: '10px 22px', borderRadius: 6,
                  textDecoration: 'none',
                  boxShadow: '0 2px 12px rgba(204,0,0,0.30)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>📄</span> View Résumé
              </a>
              <a
                href="/portfolio/resume.html"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 11, color: SUB, textDecoration: 'underline', textAlign: 'right' }}
              >
                print-ready PDF
              </a>
            </div>
          </div>

          {/* Summary */}
          <p style={{
            fontSize: 14.5, color: SUB, marginTop: 18, lineHeight: 1.6,
            maxWidth: 680, margin: '18px 0 0',
          }}>
            Senior engineer with 3+ years in full-stack, cloud infrastructure, and security.
            Specialises in TypeScript/Node.js services, AWS architecture, enterprise OAuth2/Okta,
            and developer tooling. Delivered production systems in healthcare, agtech, and enterprise SaaS.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '36px 28px 60px' }}>

        {/* ── EXPERIENCE ── */}
        <Section title="Experience">
          {jobs.map((job, i) => (
            <div
              key={i}
              style={{
                marginBottom: 16,
                background: '#fff',
                borderRadius: 8,
                border: `1px solid ${RULE}`,
                overflow: 'hidden',
              }}
            >
              {/* Job header — always visible */}
              <button
                onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', background: 'none',
                  border: 'none', cursor: 'pointer', padding: '14px 18px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>{job.title}</div>
                  <div style={{ fontSize: 13, color: SUB, marginTop: 2 }}>
                    <strong style={{ color: INK }}>{job.company}</strong>
                    {' '}&nbsp;·&nbsp;{' '}{job.location}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 12, color: SUB, fontWeight: 500, whiteSpace: 'nowrap' }}>{job.period}</span>
                  <span style={{ fontSize: 16, color: SUB, transition: 'transform 0.2s', transform: expandedJob === i ? 'rotate(180deg)' : 'none' }}>▼</span>
                </div>
              </button>

              {/* Bullets — expandable */}
              {expandedJob === i && (
                <div style={{ padding: '0 18px 14px', borderTop: `1px solid ${RULE}` }}>
                  <ul style={{ paddingLeft: 18, margin: '12px 0 0', listStyleType: 'disc' }}>
                    {job.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 13.5, color: SUB, marginBottom: 6, lineHeight: 1.55 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </Section>

        {/* ── PROJECTS ── */}
        <Section title="Projects">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
            {projects.map((p, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 8, border: `1px solid ${RULE}`,
                padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: INK }}>{p.name}</span>
                  <a href={p.link} target="_blank" rel="noreferrer"
                    style={{ fontSize: 11.5, color: ACCENT, textDecoration: 'none', flexShrink: 0 }}>
                    GitHub ↗
                  </a>
                </div>
                <p style={{ fontSize: 13, color: SUB, margin: 0, lineHeight: 1.55 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
                  {p.tags.map(t => <Chip key={t} label={t} />)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SKILLS ── */}
        <Section title="Skills">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
            {skillGroups.map(g => (
              <div key={g.label} style={{
                background: '#fff', borderRadius: 8, border: `1px solid ${RULE}`,
                padding: '12px 16px',
              }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 8 }}>
                  {g.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {g.items.map(item => <Chip key={item} label={item} />)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── EDUCATION ── */}
        <Section title="Education">
          <div style={{
            background: '#fff', borderRadius: 8, border: `1px solid ${RULE}`,
            padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 8,
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>B.S. Computer Engineering</div>
              <div style={{ fontSize: 13, color: SUB, marginTop: 2 }}>Iowa State University — Ames, IA</div>
            </div>
            <div style={{ fontSize: 13, color: SUB, fontWeight: 500 }}>Graduated Dec 2024</div>
          </div>
        </Section>

        {/* ── CONTACT / RESUME again at bottom ── */}
        <div style={{
          background: INK, borderRadius: 10, padding: '28px 32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 20,
          color: '#fff',
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Let's work together</div>
            <div style={{ fontSize: 13, color: '#aaaacc' }}>Open to senior + staff engineering opportunities, especially in security-focused or infrastructure teams.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="mailto:kobymfowler@outlook.com"
              style={{
                background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 13,
                padding: '9px 18px', borderRadius: 6, textDecoration: 'none',
              }}>
              Email Me
            </a>
            <a href="/portfolio/resume.html" target="_blank" rel="noreferrer"
              style={{
                background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: 13,
                padding: '9px 18px', borderRadius: 6, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
              Full Résumé ↗
            </a>
            <a href="https://linkedin.com/in/koby-fowler" target="_blank" rel="noreferrer"
              style={{
                background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: 13,
                padding: '9px 18px', borderRadius: 6, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
              LinkedIn ↗
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProView;
