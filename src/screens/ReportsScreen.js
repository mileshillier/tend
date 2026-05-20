import { getHealthStatus } from '../data/contacts';

const HEADER_H = 80;

// ── Data helpers ──────────────────────────────────────────────────────────

function getAllInteractions(contacts) {
  return contacts.flatMap(c =>
    c.interactions.map(i => ({ ...i, contactName: c.name, contactId: c.id }))
  );
}

function getMonthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getLast6Months() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });
}

function abbreviate(name) {
  const parts = name.split(' ');
  return parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : name;
}

// ── Donut Chart ───────────────────────────────────────────────────────────

function DonutChart({ segments, total }) {
  const cx = 60, cy = 60, r = 46, sw = 13;
  const C = 2 * Math.PI * r;
  let cumArc = 0;

  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0ece8" strokeWidth={sw} />
      {segments.map((seg, i) => {
        if (!seg.value) return null;
        const arcLen = (seg.value / total) * C;
        const offset = C - cumArc;
        cumArc += arcLen;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={sw}
            strokeDasharray={`${arcLen} ${C - arcLen}`}
            strokeDashoffset={offset}
            transform={`rotate(-90, ${cx}, ${cy})`}
          />
        );
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="central" fontSize={22} fontWeight={700}
        fill="#1c1917" fontFamily="DM Sans, sans-serif">{total}</text>
      <text x={cx} y={cy + 13} textAnchor="middle" dominantBaseline="central" fontSize={10}
        fill="#a8a29e" fontFamily="DM Sans, sans-serif">contacts</text>
    </svg>
  );
}

// ── Vertical Bar Chart ────────────────────────────────────────────────────

function BarChart({ data, color }) {
  const CHART_H = 80;
  const BAR_W = 28;
  const GAP = 8;
  const total_w = data.length * (BAR_W + GAP) - GAP;
  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <svg width="100%" viewBox={`0 0 ${total_w} ${CHART_H + 26}`}
      preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const barH = d.value > 0 ? Math.max((d.value / max) * CHART_H, 6) : 0;
        const x = i * (BAR_W + GAP);
        const y = CHART_H - barH;
        return (
          <g key={d.key}>
            <rect x={x} y={0} width={BAR_W} height={CHART_H} fill="#f8f6f3" rx={4} />
            {barH > 0 && (
              <rect x={x} y={y} width={BAR_W} height={barH} fill={color} rx={4} />
            )}
            {d.value > 0 && (
              <text x={x + BAR_W / 2} y={y - 5} textAnchor="middle"
                fontSize={9} fill="#a8a29e" fontFamily="DM Sans, sans-serif">
                {d.value}
              </text>
            )}
            <text x={x + BAR_W / 2} y={CHART_H + 15} textAnchor="middle"
              fontSize={10} fill="#a8a29e" fontFamily="DM Sans, sans-serif">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Horizontal Bar ────────────────────────────────────────────────────────

function HBar({ label, value, max, color, suffix = '' }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        fontSize: 12, color: '#78716c', width: 80, flexShrink: 0,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 8, background: '#f0ece8', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: color,
          borderRadius: 4, transition: 'width 0.4s ease',
        }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#44403c', width: 32, textAlign: 'right', flexShrink: 0 }}>
        {value}{suffix}
      </span>
    </div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────

function StatPill({ value, label, color, onClick, highlight }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1, background: 'white', borderRadius: 16,
        border: highlight ? '1.5px solid #fecaca' : '1px solid #f0ece8',
        padding: '14px 12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      <span style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 11, color: '#a8a29e', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
      {onClick && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          style={{ position: 'absolute', top: 8, right: 8, opacity: 0.4 }}>
          <path d="M9 18l6-6-6-6" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────

function Card({ title, children }) {
  return (
    <div style={{
      background: 'white', borderRadius: 18, border: '1px solid #f0ece8',
      padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      <p style={{
        fontSize: 11, fontWeight: 600, color: '#a8a29e',
        textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 14px',
      }}>
        {title}
      </p>
      {children}
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────

const TYPE_COLORS = {
  Call: '#4d7c5f', Text: '#5a8a6a', Coffee: '#f59e0b',
  Email: '#6d9e84', Other: '#a8a29e',
};

export function ReportsScreen({ contacts, onGoHome }) {
  const allInteractions = getAllInteractions(contacts);
  const months = getLast6Months();

  // Health breakdown
  const healthCounts = contacts.reduce(
    (acc, c) => { acc[getHealthStatus(c)]++; return acc; },
    { green: 0, yellow: 0, red: 0 }
  );

  // Monthly trend
  const monthlyData = months.map(m => ({
    ...m,
    value: allInteractions.filter(i => getMonthKey(i.date) === m.key).length,
  }));

  // Type breakdown
  const typeCounts = allInteractions.reduce((acc, i) => {
    acc[i.type] = (acc[i.type] || 0) + 1;
    return acc;
  }, {});
  const typeEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const maxType = Math.max(...typeEntries.map(([, v]) => v), 1);

  // Top contacts by interaction count
  const topContacts = [...contacts]
    .map(c => ({ name: abbreviate(c.name), count: c.interactions.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxContact = Math.max(...topContacts.map(c => c.count), 1);

  // Avg interactions per contact
  const avgInteractions = contacts.length
    ? (allInteractions.length / contacts.length).toFixed(1)
    : 0;

  // This month count
  const thisMonthKey = months[months.length - 1].key;
  const thisMonth = allInteractions.filter(i => getMonthKey(i.date) === thisMonthKey).length;

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 96, paddingTop: HEADER_H, background: '#faf8f5' }}>

      {/* Subtitle */}
      <div style={{ padding: '16px 16px 8px' }}>
        <p style={{ fontSize: 14, color: '#78716c', margin: 0, fontWeight: 400 }}>
          {allInteractions.length} interactions across {contacts.length} contacts
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 16px' }}>

        {/* Top stats row */}
        <div style={{ display: 'flex', gap: 10 }}>
          <StatPill
            value={healthCounts.red}
            label="Need outreach"
            color="#ef4444"
            highlight
            onClick={onGoHome}
          />
          <StatPill value={thisMonth} label="This month" color="#4d7c5f" />
          <StatPill value={avgInteractions} label="Avg per contact" color="#4d7c5f" />
        </div>

        {/* Health overview */}
        <Card title="Relationship Health">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <DonutChart
              total={contacts.length}
              segments={[
                { value: healthCounts.green, color: '#22c55e' },
                { value: healthCounts.yellow, color: '#f59e0b' },
                { value: healthCounts.red, color: '#ef4444' },
              ]}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {[
                { label: 'On track', value: healthCounts.green, color: '#22c55e' },
                { label: 'Overdue', value: healthCounts.yellow, color: '#f59e0b' },
                { label: 'Way overdue', value: healthCounts.red, color: '#ef4444' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#78716c', flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1c1917' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Monthly trend */}
        <Card title="Interactions — Last 6 Months">
          <BarChart data={monthlyData} color="#4d7c5f" />
        </Card>

        {/* By type */}
        <Card title="By Type">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {typeEntries.map(([type, count]) => (
              <HBar key={type} label={type} value={count} max={maxType}
                color={TYPE_COLORS[type] || '#a8a29e'} />
            ))}
          </div>
        </Card>

        {/* Most connected */}
        <Card title="Most Connected">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {topContacts.map(c => (
              <HBar key={c.name} label={c.name} value={c.count} max={maxContact}
                color="#4d7c5f" suffix="×" />
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
