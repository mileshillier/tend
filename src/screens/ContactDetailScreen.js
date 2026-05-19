import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { HealthDot, STATUS_LABELS, STATUS_TEXT } from '../components/HealthDot';
import {
  getHealthStatus,
  getDaysSince,
  formatDate,
  formatDaysAgo,
  FREQUENCY_LABELS,
  FREQUENCY_DAYS,
} from '../data/contacts';

const FREQUENCIES = ['daily', 'weekly', 'monthly', 'quarterly'];

const TYPE_ICONS = {
  Call:   '📞',
  Text:   '💬',
  Coffee: '☕',
  Email:  '✉️',
  Other:  '✨',
};

function HealthSummary({ contact }) {
  const health = getHealthStatus(contact);
  const days = getDaysSince(contact);
  const target = FREQUENCY_DAYS[contact.frequency];

  const summaryText = {
    green: `Within your ${FREQUENCY_LABELS[contact.frequency].toLowerCase()} goal`,
    yellow: `A bit past your ${FREQUENCY_LABELS[contact.frequency].toLowerCase()} goal`,
    red: `Well past your ${FREQUENCY_LABELS[contact.frequency].toLowerCase()} goal`,
  }[health];

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-3"
      style={{
        backgroundColor: health === 'green' ? '#f0fdf4' : health === 'yellow' ? '#fffbeb' : '#fef2f2',
        border: `1px solid ${health === 'green' ? '#bbf7d0' : health === 'yellow' ? '#fde68a' : '#fecaca'}`,
      }}
    >
      <HealthDot status={health} size={12} />
      <div className="flex-1">
        <div className={`text-sm font-semibold ${STATUS_TEXT[health]}`}>
          {STATUS_LABELS[health]}
        </div>
        <div className="text-xs text-stone-500 mt-0.5">{summaryText}</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-stone-800">{formatDaysAgo(days)}</div>
        <div className="text-xs text-stone-400">last contact</div>
      </div>
    </div>
  );
}

function FrequencyPicker({ value, onChange }) {
  const [saved, setSaved] = useState(false);

  function handleChange(freq) {
    if (freq === value) return;
    onChange(freq);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between h-5">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Contact frequency
        </span>
        <span
          className="text-xs font-semibold text-green-600 flex items-center gap-1 transition-opacity duration-300"
          style={{ opacity: saved ? 1 : 0 }}
        >
          ✓ Saved
        </span>
      </div>
      <div className="flex gap-2">
        {FREQUENCIES.map(freq => (
          <button
            key={freq}
            onClick={() => handleChange(freq)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              border: value === freq ? '2px solid #c4501f' : '2px solid #e7e5e4',
              backgroundColor: value === freq ? '#fde8db' : '#faf8f5',
              color: value === freq ? '#9a3412' : '#78716c',
              cursor: 'pointer',
            }}
          >
            {FREQUENCY_LABELS[freq]}
          </button>
        ))}
      </div>
    </div>
  );
}

function InteractionItem({ interaction }) {
  return (
    <div className="flex gap-3 py-3">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0 mt-0.5"
        style={{ backgroundColor: '#faf8f5' }}
      >
        {TYPE_ICONS[interaction.type] || '✨'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-stone-800">{interaction.type}</span>
          <span className="text-xs text-stone-400 flex-shrink-0">{formatDate(interaction.date)}</span>
        </div>
        {interaction.note && (
          <p className="text-sm text-stone-500 mt-0.5 leading-snug">{interaction.note}</p>
        )}
      </div>
    </div>
  );
}

export function ContactDetailScreen({ contact, onBack, onLog, onFrequencyChange }) {
  const health = getHealthStatus(contact);

  const sortedInteractions = [...contact.interactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen pb-24" style={{ background: '#faf8f5' }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium rounded-xl px-3 py-2 transition-colors"
          style={{
            color: '#c4501f',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#c4501f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <button
          onClick={onLog}
          className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #d4602a 0%, #c4501f 100%)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(196,80,31,0.3)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Log
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center px-5 pb-6">
        <Avatar contact={contact} size={80} />
        <h1
          className="text-xl font-bold mt-3 tracking-tight text-stone-900"
          style={{ letterSpacing: '-0.01em' }}
        >
          {contact.name}
        </h1>
        <span
          className="mt-1.5 text-xs font-medium px-2.5 py-1 rounded-full capitalize"
          style={{
            backgroundColor: contact.relationship === 'personal' ? '#fde8db' : '#dbeafe',
            color: contact.relationship === 'personal' ? '#9a3412' : '#1e40af',
          }}
        >
          {contact.relationship}
        </span>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* Health summary */}
        <HealthSummary contact={contact} />

        {/* Frequency picker */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
          <FrequencyPicker
            value={contact.frequency}
            onChange={(freq) => onFrequencyChange(contact.id, freq)}
          />
        </div>

        {/* Interaction history */}
        <div className="bg-white rounded-2xl px-4 shadow-sm border border-stone-100">
          <div className="flex items-center justify-between py-4 border-b border-stone-50">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              History
            </span>
            <span className="text-xs text-stone-400">{sortedInteractions.length} interactions</span>
          </div>

          {sortedInteractions.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-stone-400">No interactions logged yet</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-50">
              {sortedInteractions.map((interaction) => (
                <InteractionItem key={interaction.id} interaction={interaction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
