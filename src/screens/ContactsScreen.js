import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { STATUS_LABELS, STATUS_TEXT } from '../components/HealthDot';
import { getHealthStatus, getDaysSince, formatDaysAgo } from '../data/contacts';

function BusinessIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#a8a29e" style={{ flexShrink: 0 }}>
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  );
}

function ContactRow({ contact, onOpen }) {
  const health = getHealthStatus(contact);
  const days = getDaysSince(contact);

  return (
    <button
      onClick={() => onOpen(contact.id)}
      className="w-full flex items-center gap-3 px-4 py-3 bg-white active:bg-stone-50 transition-colors text-left"
      style={{ border: 'none', cursor: 'pointer', background: 'white' }}
    >
      <Avatar contact={contact} size={44} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-stone-900 truncate">{contact.name}</span>
          {contact.relationship === 'professional' && <BusinessIcon />}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs text-stone-400 capitalize">{contact.relationship}</span>
          <span className="text-xs text-stone-300">·</span>
          <span className="text-xs text-stone-400">
            {days !== null ? `Last ${formatDaysAgo(days)}` : 'Never contacted'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className={`text-xs font-medium ${STATUS_TEXT[health]}`}>
          {STATUS_LABELS[health]}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#d4d0cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}

export function ContactsScreen({ contacts, onOpenContact }) {
  const [query, setQuery] = useState('');

  const q = query.toLowerCase();
  const filtered = contacts
    .filter(c => {
      if (!q) return true;
      if (c.name.toLowerCase().includes(q)) return true;
      if (c.relationship.toLowerCase().includes(q)) return true;
      return c.interactions.some(i =>
        i.type.toLowerCase().includes(q) ||
        (i.note && i.note.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Group by first letter
  const groups = filtered.reduce((acc, c) => {
    const letter = c.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(c);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pb-24" style={{ background: '#faf8f5', paddingTop: 80 }}>
      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="#a8a29e" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search contacts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400"
            style={{ outline: 'none' }}
          />
        </div>
      </div>

      {/* List */}
      <div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-8">
            <div className="text-3xl mb-3">🔍</div>
            <p className="text-sm text-stone-400">No contacts match "{query}"</p>
          </div>
        ) : (
          Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([letter, group]) => (
            <div key={letter}>
              {/* Section header */}
              <div
                className="px-5 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider"
                style={{ background: '#faf8f5' }}
              >
                {letter}
              </div>
              {/* Divider line then contacts in white card */}
              <div className="mx-4 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden mb-3">
                {group.map((contact, idx) => (
                  <div key={contact.id}>
                    {idx > 0 && <div className="mx-4 h-px bg-stone-50" />}
                    <ContactRow contact={contact} onOpen={onOpenContact} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Count */}
      <p className="text-center text-xs text-stone-400 pb-4">
        {contacts.length} contacts
      </p>
    </div>
  );
}
