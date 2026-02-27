import React, { useState } from 'react';
import PixelSprite, { TRAINER_PIXELS } from './PixelSprites';

/* =============================================
   CONTACT BATTLE — Trainer challenge UI
   ============================================= */

const BATTLE_STATES = {
  idle:      'idle',
  challenged:'challenged',
  sending:   'sending',
  sent:      'sent',
  error:     'error',
};

const ContactBattle = () => {
  const [state, setState] = useState(BATTLE_STATES.idle);
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [battleLog, setBattleLog] = useState([]);
  const [selected, setSelected] = useState(null);

  const MOVES = [
    { id: 'job',      label: 'JOB OFFER',       type: 'electric', icon: '⚡', desc: 'Challenge Koby to a new role' },
    { id: 'collab',   label: 'COLLABORATE',      type: 'grass',    icon: '🌿', desc: 'Build something together' },
    { id: 'consult',  label: 'CONSULT',           type: 'psychic',  icon: '🔮', desc: 'Get architecture advice' },
    { id: 'chat',     label: 'JUST SAY HI',       type: 'normal',   icon: '💬', desc: 'Start a conversation' },
  ];

  const addLog = (msg) => setBattleLog(prev => [...prev, msg]);

  const handleChallenge = () => {
    setState(BATTLE_STATES.challenged);
    setBattleLog(['A WILD OPPORTUNITY appeared!', 'KOBY is ready for battle!']);
  };

  const handleMoveSelect = (move) => {
    setSelected(move);
    setBattleLog(prev => [...prev, `TRAINER used ${move.label}!`, 'Fill in your details below...']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addLog("MISSED! Fill in all fields to attack.");
      return;
    }
    setState(BATTLE_STATES.sending);
    addLog("KOBY opened his inbox...");

    // Simulate send / integrate with your actual form endpoint
    await new Promise(r => setTimeout(r, 1800));
    // Placeholder: you'd do a fetch POST here
    addLog("It's SUPER EFFECTIVE! Message delivered!");
    addLog("KOBY gained contact info EXP.");
    setState(BATTLE_STATES.sent);
  };

  const handleReset = () => {
    setState(BATTLE_STATES.idle);
    setForm({ name: '', company: '', email: '', message: '' });
    setBattleLog([]);
    setSelected(null);
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
        <div style={{ color: '#F08030', fontSize: 8 }}>TRAINER BATTLE</div>
        <div style={{ fontFamily: "'VT323', monospace", color: '#AAAACC', fontSize: 14 }}>
          kobymfowler@outlook.com
        </div>
      </div>

      {/* Battle scene */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 0 0 0',
      }}>
        {/* Arena */}
        <div style={{
          position: 'relative',
          height: 140,
          background: 'linear-gradient(to bottom, #0a1040, #001020)',
          borderBottom: '2px solid #111133',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {/* Ground */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 30,
            background: 'linear-gradient(to bottom, #1a3a1a, #0d1a0d)',
            borderTop: '2px dashed #2a4a2a',
          }} />

          {/* Stars */}
          {[...Array(15)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 2, height: 2,
              background: '#FFFFFF',
              left: `${(i * 7.3 + 5) % 100}%`,
              top: `${(i * 9.1 + 10) % 50}%`,
              opacity: 0.4 + (i % 3) * 0.2,
              animation: `led-blink ${1.5 + (i % 3) * 0.7}s infinite`,
            }} />
          ))}

          {/* Challenger sprite (left) */}
          <div style={{
            position: 'absolute',
            left: 30,
            bottom: 28,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Challenger placeholder - flip sprite */}
            <div style={{ fontSize: 32, lineHeight: 1 }}>
              {state === BATTLE_STATES.idle ? '👤' : '🧑‍💻'}
            </div>
            {state !== BATTLE_STATES.idle && (
              <div style={{
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid #444',
                padding: '2px 6px',
                fontSize: 5,
                color: '#AACCFF',
                marginTop: 2,
              }}>
                {form.name || 'CHALLENGER'}
              </div>
            )}
          </div>

          {/* Koby sprite (right) */}
          <div style={{
            position: 'absolute',
            right: 30,
            bottom: 28,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <PixelSprite pixels={TRAINER_PIXELS} pixelSize={3} />
            <div style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid #444',
              padding: '2px 6px',
              fontSize: 5,
              color: '#FFD700',
              marginTop: 2,
            }}>
              KOBY  Lv.99
            </div>
          </div>

          {/* HP bars overlay */}
          {state !== BATTLE_STATES.idle && (
            <div style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(0,0,0,0.8)',
              border: '2px solid #222244',
              padding: '4px 8px',
              minWidth: 100,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <div style={{ fontSize: 5, color: '#DDDDFF' }}>KOBY</div>
                <div style={{ fontSize: 5, color: '#AAAACC' }}>99/99</div>
              </div>
              <div style={{ height: 5, background: '#111', border: '1px solid #000' }}>
                <div style={{
                  height: '100%',
                  width: state === BATTLE_STATES.sent ? '100%' : '88%',
                  background: 'linear-gradient(to right, #22AA44, #44FF66)',
                  transition: 'width 0.8s ease-out',
                }} />
              </div>
            </div>
          )}
        </div>

        {/* Battle log */}
        <div style={{
          background: '#F0F0E8',
          border: '4px solid #111',
          margin: '8px 10px 0',
          padding: '10px 14px',
          minHeight: 56,
          position: 'relative',
        }}>
          <div style={{
            fontFamily: "'VT323', monospace",
            color: '#111',
            fontSize: 20,
            lineHeight: 1.4,
          }}>
            {battleLog.length > 0
              ? battleLog.slice(-2).map((line, i) => <div key={i}>{line}</div>)
              : state === BATTLE_STATES.idle
              ? 'KOBY wants to battle! Choose your action.'
              : '...'}
          </div>
          {/* Triangle corner */}
          {battleLog.length > 1 && (
            <div style={{
              position: 'absolute',
              right: 10,
              bottom: 8,
              width: 0, height: 0,
              borderLeft: '6px solid #555',
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              animation: 'dialog-bounce 0.6s ease-in-out infinite',
            }} />
          )}
        </div>

        {/* Action panel */}
        <div style={{ padding: '8px 10px 10px', flex: 1 }}>
          {/* INITIAL — challenge button */}
          {state === BATTLE_STATES.idle && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 6,
              marginTop: 8,
            }}>
              <button
                onClick={handleChallenge}
                style={battleBtnStyle('#CC0000', '#880000')}
              >
                ⚔️  CHALLENGE
              </button>
              <a
                href="mailto:kobymfowler@outlook.com"
                style={{ ...battleBtnStyle('#0040A0', '#002266'), textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                📧  EMAIL
              </a>
              <a
                href="https://linkedin.com/in/koby-fowler"
                target="_blank"
                rel="noreferrer"
                style={{ ...battleBtnStyle('#0057B8', '#003878'), textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                💼  LINKEDIN
              </a>
              <a
                href="https://github.com/kobyfowler-git"
                target="_blank"
                rel="noreferrer"
                style={{ ...battleBtnStyle('#222222', '#000000'), textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                🐙  GITHUB
              </a>
            </div>
          )}

          {/* MOVEselect — pick a reason */}
          {state === BATTLE_STATES.challenged && !selected && (
            <div>
              <div style={{ color: '#AAAACC', fontSize: 6, marginBottom: 8 }}>WHAT WILL YOU DO?</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                {MOVES.map(move => (
                  <button
                    key={move.id}
                    onClick={() => handleMoveSelect(move)}
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: '2px solid #333355',
                      color: '#DDDDFF',
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 6,
                      padding: '8px 6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.1s',
                      lineHeight: 1.8,
                    }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#6890F0'}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#333355'}
                  >
                    <span style={{ marginRight: 4 }}>{move.icon}</span>
                    {move.label}
                    <div style={{ fontFamily: "'VT323', monospace", color: '#888899', fontSize: 13, marginTop: 2 }}>
                      {move.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FORM — after move selected */}
          {(state === BATTLE_STATES.challenged || state === BATTLE_STATES.sending) && selected && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <InputField
                  label="NAME"
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                  placeholder="Your name"
                />
                <InputField
                  label="COMPANY"
                  value={form.company}
                  onChange={v => setForm(f => ({ ...f, company: v }))}
                  placeholder="Company (opt)"
                />
              </div>
              <InputField
                label="EMAIL"
                type="email"
                value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))}
                placeholder="your@email.com"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ fontSize: 5, color: '#AAAACC' }}>MESSAGE</div>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="What's your challenge?"
                  rows={3}
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                disabled={state === BATTLE_STATES.sending}
                style={{
                  ...battleBtnStyle('#CC0000', '#880000'),
                  opacity: state === BATTLE_STATES.sending ? 0.7 : 1,
                  cursor: state === BATTLE_STATES.sending ? 'not-allowed' : 'pointer',
                }}
              >
                {state === BATTLE_STATES.sending ? '⏳  SENDING...' : `${selected.icon}  SEND ${selected.label}`}
              </button>
            </form>
          )}

          {/* SENT success */}
          {state === BATTLE_STATES.sent && (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🎉</div>
              <div style={{ color: '#00FF88', fontSize: 9, marginBottom: 8 }}>
                MESSAGE DELIVERED!
              </div>
              <div style={{ fontFamily: "'VT323', monospace", color: '#AAAACC', fontSize: 18, marginBottom: 16 }}>
                Koby will respond within 24 hours.
              </div>
              <button onClick={handleReset} style={battleBtnStyle('#333', '#111')}>
                BATTLE AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <div style={{ fontSize: 5, color: '#AAAACC' }}>{label}</div>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputStyle}
    />
  </div>
);

const inputStyle = {
  background: 'rgba(0,0,0,0.6)',
  border: '2px solid #333355',
  color: '#DDDDFF',
  fontFamily: "'VT323', monospace",
  fontSize: 18,
  padding: '5px 8px',
  outline: 'none',
  width: '100%',
  resize: 'vertical',
};

const battleBtnStyle = (bg, shadow) => ({
  background: `linear-gradient(to bottom, ${bg}, ${shadow})`,
  border: '2px solid rgba(0,0,0,0.5)',
  boxShadow: `0 3px 0 rgba(0,0,0,0.6)`,
  color: '#FFFFFF',
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 6,
  padding: '9px 8px',
  cursor: 'pointer',
  transition: 'all 0.1s',
  letterSpacing: '0.05em',
  textAlign: 'center',
});

export default ContactBattle;
