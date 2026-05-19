// Sprout icon — two curving leaves from a central stem
function TendIcon({ size = 34 }) {
  const iconSize = Math.round(size * 0.53);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        background: 'linear-gradient(145deg, #5a8a6a 0%, #3d6b4f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 10px rgba(61, 107, 79, 0.32)',
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="none">
        {/* Stem */}
        <path
          d="M10 18V11"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Left leaf */}
        <path
          d="M10 11C10 7.5 6.5 5 3 6C3.5 10 6.5 13 10 11Z"
          fill="white"
          fillOpacity="0.9"
        />
        {/* Right leaf */}
        <path
          d="M10 11C10 7.5 13.5 5 17 6C16.5 10 13.5 13 10 11Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export function BrandMark({ size = 'md' }) {
  const sizes = {
    sm: { icon: 30, wordmark: 19, gap: 8 },
    md: { icon: 34, wordmark: 21, gap: 9 },
    lg: { icon: 44, wordmark: 27, gap: 11 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
      <TendIcon size={s.icon} />
      <span
        style={{
          fontSize: s.wordmark,
          fontWeight: 700,
          color: '#1a0f09',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        tend
      </span>
    </div>
  );
}
