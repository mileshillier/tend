import { BrandMark } from './BrandMark';

// Height constants exported so screens can offset their content correctly
export const HEADER_H = 80; // 44px status-bar sim + 36px content row

export function AppHeader({ selectedContact, onBack, onLog }) {
  const isDetail = !!selectedContact;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 390,
        zIndex: 200,
        background: isDetail
          ? 'rgba(250,248,245,0.96)'
          : 'linear-gradient(180deg, #edf5f0 0%, rgba(250,248,245,0.97) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(240,232,224,0.7)',
      }}
    >
      {/* Status-bar spacer */}
      <div style={{ height: 44 }} />

      {/* Content row */}
      <div
        style={{
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 8px',
        }}
      >
        {isDetail ? (
          /* Contact detail — back + log */
          <>
            <button
              onClick={onBack}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                color: '#4d7c5f', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 14, fontWeight: 500,
                padding: '4px 0',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#4d7c5f" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            <span style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              fontSize: 14, fontWeight: 600, color: '#1c1917',
              maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {selectedContact.name}
            </span>

            <button
              onClick={onLog}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'linear-gradient(135deg, #5a8a6a 0%, #4d7c5f 100%)',
                color: '#fff', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                padding: '5px 14px', borderRadius: 999,
                boxShadow: '0 2px 8px rgba(77,124,95,0.3)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Log
            </button>
          </>
        ) : (
          /* Home / Contacts — brand lockup + date */
          <>
            <BrandMark size="sm" />
            <span style={{ fontSize: 12, color: '#c4bdb8', fontWeight: 500 }}>
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </>
        )}
      </div>
    </header>
  );
}
