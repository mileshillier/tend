function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        stroke={active ? '#c4501f' : '#a8a29e'}
        strokeWidth="1.75"
        strokeLinejoin="round"
        fill={active ? '#fde8db' : 'none'}
      />
      <path
        d="M9 21V12h6v9"
        stroke={active ? '#c4501f' : '#a8a29e'}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PeopleIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="9" cy="8" r="3.25"
        stroke={active ? '#c4501f' : '#a8a29e'}
        strokeWidth="1.75"
        fill={active ? '#fde8db' : 'none'}
      />
      <path
        d="M3 20c0-3.314 2.686-5 6-5s6 1.686 6 5"
        stroke={active ? '#c4501f' : '#a8a29e'}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle
        cx="17" cy="9" r="2.5"
        stroke={active ? '#c4501f' : '#a8a29e'}
        strokeWidth="1.5"
        fill={active ? '#fde8db' : 'none'}
      />
      <path
        d="M21 20c0-2.761-1.791-4-4-4"
        stroke={active ? '#c4501f' : '#a8a29e'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BottomNav({ activeTab, onTabChange, onAddPress }) {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 390,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f5f0eb',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around px-2 h-16">
        {/* Home tab */}
        <button
          onClick={() => onTabChange('home')}
          className="flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-colors"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <HomeIcon active={activeTab === 'home'} />
          <span
            style={{
              fontSize: 11,
              fontWeight: activeTab === 'home' ? 600 : 400,
              color: activeTab === 'home' ? '#c4501f' : '#a8a29e',
              letterSpacing: '0.01em',
            }}
          >
            Home
          </span>
        </button>

        {/* Center + FAB */}
        <button
          onClick={onAddPress}
          className="flex items-center justify-center rounded-full shadow-lg transition-transform active:scale-95"
          style={{
            width: 54,
            height: 54,
            background: 'linear-gradient(135deg, #d4602a 0%, #c4501f 100%)',
            border: 'none',
            cursor: 'pointer',
            marginTop: -16,
            boxShadow: '0 4px 16px rgba(196,80,31,0.4)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="#fff"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Contacts tab */}
        <button
          onClick={() => onTabChange('contacts')}
          className="flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-colors"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <PeopleIcon active={activeTab === 'contacts'} />
          <span
            style={{
              fontSize: 11,
              fontWeight: activeTab === 'contacts' ? 600 : 400,
              color: activeTab === 'contacts' ? '#c4501f' : '#a8a29e',
              letterSpacing: '0.01em',
            }}
          >
            Contacts
          </span>
        </button>
      </div>
    </nav>
  );
}
