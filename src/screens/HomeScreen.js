import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { getOverdueRatio, getDaysSince, formatDaysAgo } from '../data/contacts';

const HEADER_H = 80;

function BusinessIcon({ size = 12, color = '#a8a29e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  );
}

// Full-width card for "reach out" urgency
function FullWidthCard({ contact, onOpen }) {
  const days = getDaysSince(contact);
  return (
    <div
      onClick={() => onOpen(contact.id)}
      style={{
        background: 'white', borderRadius: 18, border: '1px solid #f0ece8',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        gap: 12, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ borderRadius: '50%', border: '2px solid #ef4444', padding: 2, flexShrink: 0 }}>
        <Avatar contact={contact} size={48} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {contact.name}
          </span>
          {contact.relationship === 'professional' && <BusinessIcon size={13} />}
        </div>
        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 2 }}>
          Last {formatDaysAgo(days)}
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M9 18l6-6-6-6" stroke="#d4d0cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Smaller square card for "due soon"
function CompactSquareCard({ contact, onOpen }) {
  const days = getDaysSince(contact);
  return (
    <div
      onClick={() => onOpen(contact.id)}
      style={{
        background: 'white', borderRadius: 16, border: '1px solid #f0ece8',
        cursor: 'pointer', aspectRatio: '1', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ borderRadius: '50%', border: '2px solid #f59e0b', padding: 2, flexShrink: 0 }}>
        <Avatar contact={contact} size={40} />
      </div>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {contact.name.split(' ')[0]}
          </span>
          {contact.relationship === 'professional' && <BusinessIcon size={11} />}
        </div>
        <div style={{ fontSize: 10, color: '#a8a29e', marginTop: 1 }}>
          {formatDaysAgo(days)}
        </div>
      </div>
    </div>
  );
}

// Compact flat row for on-track contacts
function TrackRow({ contact, onOpen, divider }) {
  const days = getDaysSince(contact);
  return (
    <>
      {divider && <div style={{ height: 1, background: '#faf8f5', marginLeft: 54 }} />}
      <div
        onClick={() => onOpen(contact.id)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', cursor: 'pointer' }}
      >
        <Avatar contact={contact} size={30} />
        {/* Name + icon inline */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#44403c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {contact.name}
          </span>
          {contact.relationship === 'professional' && <BusinessIcon size={12} />}
        </div>
        <span style={{ fontSize: 11, color: '#c4bdb8', flexShrink: 0 }}>
          {formatDaysAgo(days)}
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M9 18l6-6-6-6" stroke="#d4d0cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'professional', label: 'Business' },
  { value: 'personal', label: 'Personal' },
];

function SectionLabel({ children, muted, filter, onFilter }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 10px' }}>
      <span style={{
        fontSize: 11, fontWeight: 600,
        color: muted ? '#c4bdb8' : '#a8a29e',
        textTransform: 'uppercase', letterSpacing: '0.07em',
      }}>
        {children}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onFilter(opt.value)}
            style={{
              fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
              border: filter === opt.value ? '1.5px solid #4d7c5f' : '1.5px solid #e7e5e4',
              background: filter === opt.value ? '#e4ede8' : 'transparent',
              color: filter === opt.value ? '#2d5a40' : '#a8a29e',
              cursor: 'pointer', letterSpacing: '0.01em',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HomeScreen({ contacts, onOpenContact }) {
  const [filter, setFilter] = useState('all');

  const sorted = [...contacts].sort((a, b) => getOverdueRatio(b) - getOverdueRatio(a));

  function applyFilter(list) {
    if (filter === 'all') return list;
    return list.filter(c => c.relationship === filter);
  }

  const urgent  = applyFilter(sorted.filter(c => getOverdueRatio(c) > 1.5));
  const dueSoon = applyFilter(sorted.filter(c => { const r = getOverdueRatio(c); return r > 1 && r <= 1.5; }));
  const onTrack = applyFilter(sorted.filter(c => getOverdueRatio(c) <= 1));

  const totalOverdue = urgent.length + dueSoon.length;

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 96, paddingTop: HEADER_H, background: '#faf8f5' }}>

      {/* Subtitle */}
      <div style={{ padding: '16px 20px 8px' }}>
        <p style={{ fontSize: 14, color: '#78716c', margin: 0, fontWeight: 400 }}>
          {totalOverdue > 0
            ? `${totalOverdue} ${totalOverdue === 1 ? 'person' : 'people'} could use a hello`
            : 'All your relationships are on track'}
        </p>
      </div>

      {/* Reach out — full-width cards */}
      {urgent.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <SectionLabel filter={filter} onFilter={setFilter}>Reach out · {urgent.length}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
            {urgent.map(c => <FullWidthCard key={c.id} contact={c} onOpen={onOpenContact} />)}
          </div>
        </section>
      )}

      {/* Due soon — compact square grid */}
      {dueSoon.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <SectionLabel filter={filter} onFilter={setFilter}>Due soon · {dueSoon.length}</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '0 16px' }}>
            {dueSoon.map(c => <CompactSquareCard key={c.id} contact={c} onOpen={onOpenContact} />)}
          </div>
        </section>
      )}

      {/* On track — flat list */}
      {onTrack.length > 0 && (
        <section>
          <SectionLabel muted filter={filter} onFilter={setFilter}>Looking good · {onTrack.length}</SectionLabel>
          <div style={{ margin: '0 16px', background: 'white', borderRadius: 16, border: '1px solid #f0ece8', overflow: 'hidden' }}>
            {onTrack.map((c, i) => <TrackRow key={c.id} contact={c} onOpen={onOpenContact} divider={i > 0} />)}
          </div>
        </section>
      )}

      {urgent.length === 0 && dueSoon.length === 0 && onTrack.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌱</div>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#1c1917', margin: '0 0 4px' }}>
            {filter === 'all' ? "You're all caught up" : `No ${filter === 'professional' ? 'business' : 'personal'} contacts to show`}
          </p>
          <p style={{ fontSize: 13, color: '#a8a29e', margin: 0 }}>
            {filter === 'all' ? 'No overdue check-ins right now.' : 'Try switching the filter above.'}
          </p>
        </div>
      )}
    </div>
  );
}
