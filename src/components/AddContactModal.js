import { useState } from 'react';
import { nextId, FREQUENCY_LABELS } from '../data/contacts';

const FREQUENCIES = ['daily', 'weekly', 'monthly', 'quarterly'];
const AVATAR_COLOR_COUNT = 10;

export function AddContactModal({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('personal');
  const [frequency, setFrequency] = useState('monthly');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const newContact = {
      id: nextId(),
      name: name.trim(),
      relationship,
      frequency,
      avatarColor: Math.floor(Math.random() * AVATAR_COLOR_COUNT),
      interactions: [],
    };
    onAdd(newContact);
    onClose();
  }

  return (
    <div
      className="sheet-backdrop fixed inset-0 z-50 flex items-end"
      style={{ backgroundColor: 'rgba(28,21,18,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="sheet-panel w-full bg-white rounded-t-2xl overflow-hidden"
        style={{ maxWidth: 390, margin: '0 auto', paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 rounded-full bg-stone-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4">
          <h2 className="text-lg font-semibold text-stone-900">Add a contact</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
            style={{ border: 'none', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 pb-6 flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoFocus
              required
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 bg-white placeholder:text-stone-300"
              style={{ outline: 'none', width: '100%' }}
            />
          </div>

          {/* Relationship */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Relationship
            </label>
            <div className="flex gap-2">
              {['personal', 'professional'].map(rel => (
                <button
                  key={rel}
                  type="button"
                  onClick={() => setRelationship(rel)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all"
                  style={{
                    border: relationship === rel ? '2px solid #4d7c5f' : '2px solid #e7e5e4',
                    backgroundColor: relationship === rel ? '#e4ede8' : '#faf8f5',
                    color: relationship === rel ? '#2d5a40' : '#78716c',
                    cursor: 'pointer',
                  }}
                >
                  {rel}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              How often do you want to stay in touch?
            </label>
            <div className="flex gap-2">
              {FREQUENCIES.map(freq => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    border: frequency === freq ? '2px solid #4d7c5f' : '2px solid #e7e5e4',
                    backgroundColor: frequency === freq ? '#e4ede8' : '#faf8f5',
                    color: frequency === freq ? '#2d5a40' : '#78716c',
                    cursor: 'pointer',
                  }}
                >
                  {FREQUENCY_LABELS[freq]}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98]"
            style={{
              background: name.trim()
                ? 'linear-gradient(135deg, #5a8a6a 0%, #4d7c5f 100%)'
                : '#d4d0cc',
              border: 'none',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              boxShadow: name.trim() ? '0 4px 12px rgba(77,124,95,0.3)' : 'none',
            }}
          >
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
}
