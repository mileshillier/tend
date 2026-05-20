import { useState } from 'react';
import { FREQUENCY_LABELS } from '../data/contacts';

const HEADER_H = 80;

function Row({ label, value, onToggle, toggle, href, chevron, danger }) {
  return (
    <div
      onClick={onToggle || (href ? () => window.open(href) : undefined)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '13px 16px',
        cursor: onToggle || href ? 'pointer' : 'default',
      }}
    >
      <span style={{ flex: 1, fontSize: 14, color: danger ? '#ef4444' : '#1c1917', fontWeight: 400 }}>
        {label}
      </span>

      {toggle !== undefined && (
        <div
          style={{
            width: 44, height: 26, borderRadius: 13,
            background: toggle ? '#4d7c5f' : '#d4d0cc',
            position: 'relative', transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <div style={{
            position: 'absolute', top: 3, left: toggle ? 21 : 3,
            width: 20, height: 20, borderRadius: '50%', background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s',
          }} />
        </div>
      )}

      {value && !chevron && (
        <span style={{ fontSize: 13, color: '#a8a29e', flexShrink: 0 }}>{value}</span>
      )}

      {chevron && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M9 18l6-6-6-6" stroke="#d4d0cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      {title && (
        <p style={{ fontSize: 11, fontWeight: 600, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px', padding: '0 4px' }}>
          {title}
        </p>
      )}
      <div style={{ background: 'white', borderRadius: 18, border: '1px solid #f0ece8', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: '#faf8f5', marginLeft: 16 }} />;
}

const FREQUENCY_OPTIONS = ['daily', 'weekly', 'monthly', 'quarterly'];

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [defaultFreq, setDefaultFreq] = useState('monthly');
  const [showFreqPicker, setShowFreqPicker] = useState(false);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 96, paddingTop: HEADER_H, background: '#faf8f5' }}>

      <div style={{ padding: '16px 16px 0' }}>
        <p style={{ fontSize: 14, color: '#78716c', margin: '0 0 20px', fontWeight: 400 }}>
          Manage your preferences
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '0 16px' }}>

        {/* Notifications */}
        <Section title="Notifications">
          <Row label="Push notifications" toggle={notifications} onToggle={() => setNotifications(p => !p)} />
          <Divider />
          <Row label="Weekly digest email" toggle={weeklyDigest} onToggle={() => setWeeklyDigest(p => !p)} />
        </Section>

        {/* Defaults */}
        <Section title="Defaults">
          <div>
            <Row
              label="Default check-in frequency"
              value={FREQUENCY_LABELS[defaultFreq]}
              chevron
              onToggle={() => setShowFreqPicker(p => !p)}
            />
            {showFreqPicker && (
              <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
                {FREQUENCY_OPTIONS.map(f => (
                  <button
                    key={f}
                    onClick={() => { setDefaultFreq(f); setShowFreqPicker(false); }}
                    style={{
                      flex: 1, padding: '7px 0', borderRadius: 10, fontSize: 12, fontWeight: 600,
                      border: defaultFreq === f ? '2px solid #4d7c5f' : '2px solid #e7e5e4',
                      backgroundColor: defaultFreq === f ? '#e4ede8' : '#faf8f5',
                      color: defaultFreq === f ? '#2d5a40' : '#78716c',
                      cursor: 'pointer',
                    }}
                  >
                    {FREQUENCY_LABELS[f]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Account */}
        <Section title="Account">
          <Row label="Profile" chevron />
          <Divider />
          <Row label="Privacy & data" chevron />
          <Divider />
          <Row label="Export contacts" chevron />
        </Section>

        {/* About */}
        <Section title="About">
          <Row label="Version" value="0.1.0 (prototype)" />
          <Divider />
          <Row label="Give feedback" chevron href="mailto:feedback@tend.app" />
        </Section>

        {/* Danger zone */}
        <Section>
          <Row label="Sign out" danger />
        </Section>

      </div>
    </div>
  );
}
