const STATUS_STYLES = {
  green:  { dot: '#22c55e', ring: '#bbf7d0' },
  yellow: { dot: '#f59e0b', ring: '#fde68a' },
  red:    { dot: '#ef4444', ring: '#fecaca' },
};

export function HealthDot({ status, size = 10 }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.red;
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: s.dot,
        boxShadow: `0 0 0 2px ${s.ring}`,
        flexShrink: 0,
      }}
    />
  );
}

export function HealthBar({ status }) {
  const colors = {
    green:  'bg-green-500',
    yellow: 'bg-amber-400',
    red:    'bg-red-400',
  };
  const widths = {
    green:  'w-full',
    yellow: 'w-2/3',
    red:    'w-1/3',
  };
  return (
    <div className="h-1 w-12 bg-stone-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${colors[status]} ${widths[status]}`} />
    </div>
  );
}

export const STATUS_LABELS = {
  green:  'On track',
  yellow: 'Overdue',
  red:    'Way overdue',
};

export const STATUS_TEXT = {
  green:  'text-green-700',
  yellow: 'text-amber-600',
  red:    'text-red-500',
};
