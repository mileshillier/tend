import { useState, useEffect } from 'react';
import { Avatar } from './Avatar';
import { nextId } from '../data/contacts';

const INTERACTION_TYPES = ['Call', 'Text', 'Coffee', 'Email', 'Other'];

const TYPE_ICONS = {
  Call:   '📞',
  Text:   '💬',
  Coffee: '☕',
  Email:  '✉️',
  Other:  '✨',
};

export function LogInteractionModal({ contacts, preselectedContactId, onSubmit, onClose }) {
  const [selectedContactId, setSelectedContactId] = useState(preselectedContactId || '');
  const [type, setType] = useState('Text');
  const [date, setDate] = useState('2026-05-07');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (preselectedContactId) setSelectedContactId(preselectedContactId);
  }, [preselectedContactId]);

  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedContactId) return;
    onSubmit(selectedContactId, {
      id: nextId(),
      date,
      type,
      note: note.trim(),
    });
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
          <h2 className="text-lg font-semibold text-stone-900">Log an interaction</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
            style={{ border: 'none', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 pb-6 flex flex-col gap-5">
          {/* Contact picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Who'd you connect with?
            </label>
            {selectedContact ? (
              <button
                type="button"
                onClick={() => !preselectedContactId && setSelectedContactId('')}
                className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50 text-left"
                style={{ cursor: preselectedContactId ? 'default' : 'pointer', background: 'none', width: '100%' }}
              >
                <Avatar contact={selectedContact} size={36} />
                <div>
                  <div className="text-sm font-semibold text-stone-900">{selectedContact.name}</div>
                  <div className="text-xs text-stone-500 capitalize">{selectedContact.relationship}</div>
                </div>
                {!preselectedContactId && (
                  <span className="ml-auto text-xs text-clay-500 font-medium" style={{ color: '#c4501f' }}>Change</span>
                )}
              </button>
            ) : (
              <div className="relative">
                <select
                  value={selectedContactId}
                  onChange={(e) => setSelectedContactId(e.target.value)}
                  required
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 pr-10"
                  style={{ outline: 'none' }}
                >
                  <option value="">Select a contact…</option>
                  {sortedContacts.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
                  ▾
                </span>
              </div>
            )}
          </div>

          {/* Interaction type */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              How'd you connect?
            </label>
            <div className="flex gap-2 flex-wrap">
              {INTERACTION_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    border: type === t ? '2px solid #c4501f' : '2px solid #e7e5e4',
                    backgroundColor: type === t ? '#fde8db' : '#faf8f5',
                    color: type === t ? '#9a3412' : '#78716c',
                    cursor: 'pointer',
                  }}
                >
                  <span>{TYPE_ICONS[t]}</span>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              When?
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max="2026-05-07"
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 bg-white"
              style={{ outline: 'none', width: '100%' }}
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Note <span className="normal-case font-normal text-stone-400">(optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What did you talk about?"
              rows={3}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 bg-white resize-none placeholder:text-stone-300"
              style={{ outline: 'none', width: '100%' }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!selectedContactId}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98]"
            style={{
              background: selectedContactId
                ? 'linear-gradient(135deg, #d4602a 0%, #c4501f 100%)'
                : '#d4d0cc',
              border: 'none',
              cursor: selectedContactId ? 'pointer' : 'not-allowed',
              boxShadow: selectedContactId ? '0 4px 12px rgba(196,80,31,0.3)' : 'none',
            }}
          >
            Log interaction
          </button>
        </form>
      </div>
    </div>
  );
}
