// All dates are relative to the prototype's "today" for a stable usability test
const TODAY = new Date('2026-05-07T12:00:00');

function daysAgo(days) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export const FREQUENCY_DAYS = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  quarterly: 90,
};

export const FREQUENCY_LABELS = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
};

export const AVATAR_COLORS = [
  { bg: '#fde8db', text: '#9a3412' }, // warm orange
  { bg: '#fce7f3', text: '#9d174d' }, // rose
  { bg: '#d1fae5', text: '#065f46' }, // emerald
  { bg: '#dbeafe', text: '#1e40af' }, // blue
  { bg: '#ede9fe', text: '#5b21b6' }, // violet
  { bg: '#fef3c7', text: '#92400e' }, // amber
  { bg: '#ccfbf1', text: '#134e4a' }, // teal
  { bg: '#fce7f3', text: '#831843' }, // pink
  { bg: '#e0e7ff', text: '#3730a3' }, // indigo
  { bg: '#ecfccb', text: '#365314' }, // lime
];

export function getHealthStatus(contact) {
  if (!contact.interactions.length) return 'red';
  const sorted = [...contact.interactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const daysSince = Math.floor(
    (TODAY - new Date(sorted[0].date + 'T12:00:00')) / 86400000
  );
  const ratio = daysSince / FREQUENCY_DAYS[contact.frequency];
  if (ratio <= 1) return 'green';
  if (ratio <= 1.5) return 'yellow';
  return 'red';
}

export function getOverdueRatio(contact) {
  if (!contact.interactions.length) return Infinity;
  const sorted = [...contact.interactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const daysSince = Math.floor(
    (TODAY - new Date(sorted[0].date + 'T12:00:00')) / 86400000
  );
  return daysSince / FREQUENCY_DAYS[contact.frequency];
}

export function getDaysSince(contact) {
  if (!contact.interactions.length) return null;
  const sorted = [...contact.interactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return Math.floor(
    (TODAY - new Date(sorted[0].date + 'T12:00:00')) / 86400000
  );
}

export function getLastContactDate(contact) {
  if (!contact.interactions.length) return null;
  return [...contact.interactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0].date;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDaysAgo(days) {
  if (days === null) return 'Never';
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return `${w}w ago`;
  }
  const m = Math.floor(days / 30);
  return `${m}mo ago`;
}

export function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

let _nextId = 1000;
export function nextId() {
  return String(++_nextId);
}

export const initialContacts = [
  {
    id: '1',
    name: 'James Rodriguez',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 0,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    interactions: [
      { id: 'i1a', date: daysAgo(81), type: 'Call', note: 'Talked about his move to Austin — want to plan a visit soon' },
      { id: 'i1b', date: daysAgo(138), type: 'Text', note: 'Holiday greetings' },
      { id: 'i1c', date: daysAgo(209), type: 'Coffee', note: 'Visited while he was in town for a work trip' },
    ],
  },
  {
    id: '2',
    name: 'Aisha Williams',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 1,
    interactions: [
      { id: 'i2a', date: daysAgo(58), type: 'Text', note: 'Recommended a book she had been wanting to read' },
      { id: 'i2b', date: daysAgo(107), type: 'Email', note: 'Book club recommendations for the quarter' },
      { id: 'i2c', date: daysAgo(143), type: 'Coffee', note: 'End of year meetup at the usual spot' },
    ],
  },
  {
    id: '3',
    name: 'Sarah Chen',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 2,
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    interactions: [
      { id: 'i3a', date: daysAgo(50), type: 'Coffee', note: "Caught up over lunch — she's starting a new job next month" },
      { id: 'i3b', date: daysAgo(96), type: 'Text', note: 'Happy birthday!' },
      { id: 'i3c', date: daysAgo(122), type: 'Call', note: 'New year check-in, talked for over an hour' },
    ],
  },
  {
    id: '4',
    name: 'Priya Patel',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 3,
    photo: 'https://randomuser.me/api/portraits/women/63.jpg',
    interactions: [
      { id: 'i4a', date: daysAgo(10), type: 'Text', note: 'Quick sync about the Q2 roadmap priorities' },
      { id: 'i4b', date: daysAgo(19), type: 'Call', note: 'Discussed the team restructuring news' },
      { id: 'i4c', date: daysAgo(27), type: 'Coffee', note: 'Lunch to debrief after the product review' },
      { id: 'i4d', date: daysAgo(34), type: 'Email', note: 'Sent over the meeting notes and action items' },
    ],
  },
  {
    id: '5',
    name: 'Luna Santos',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 4,
    interactions: [
      { id: 'i5a', date: daysAgo(40), type: 'Other', note: 'Ran into her at the farmers market' },
      { id: 'i5b', date: daysAgo(83), type: 'Coffee', note: "Valentine's brunch in the neighborhood" },
      { id: 'i5c', date: daysAgo(117), type: 'Text', note: 'Asked for her contractor recommendation' },
    ],
  },
  {
    id: '6',
    name: 'David Kim',
    relationship: 'professional',
    frequency: 'monthly',
    avatarColor: 5,
    interactions: [
      { id: 'i6a', date: daysAgo(36), type: 'Call', note: 'Quarterly check-in on the portfolio progress' },
      { id: 'i6b', date: daysAgo(76), type: 'Email', note: 'Sent the annual update deck and metrics' },
      { id: 'i6c', date: daysAgo(112), type: 'Coffee', note: 'Kicked off the year at Blue Bottle downtown' },
    ],
  },
  {
    id: '7',
    name: 'Tom Bradley',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 6,
    photo: 'https://randomuser.me/api/portraits/men/59.jpg',
    interactions: [
      { id: 'i7a', date: daysAgo(5), type: 'Call', note: 'Weekly 1:1, discussed Q2 OKRs and team morale' },
      { id: 'i7b', date: daysAgo(12), type: 'Email', note: 'Performance review prep and self-assessment' },
      { id: 'i7c', date: daysAgo(19), type: 'Coffee', note: 'Sync on the team reorg implications' },
    ],
  },
  {
    id: '8',
    name: 'Emily Foster',
    relationship: 'personal',
    frequency: 'weekly',
    avatarColor: 7,
    photo: 'https://randomuser.me/api/portraits/women/17.jpg',
    interactions: [
      { id: 'i8a', date: daysAgo(3), type: 'Call', note: "Weekly call — talked about mom's birthday plans" },
      { id: 'i8b', date: daysAgo(10), type: 'Text', note: 'Sent her a meme, had a good laugh' },
      { id: 'i8c', date: daysAgo(17), type: 'Call', note: 'Easter weekend check-in' },
      { id: 'i8d', date: daysAgo(24), type: 'Text', note: 'Shared Netflix recommendations' },
    ],
  },
  {
    id: '9',
    name: 'Chris Park',
    relationship: 'personal',
    frequency: 'quarterly',
    avatarColor: 8,
    interactions: [
      { id: 'i9a', date: daysAgo(22), type: 'Text', note: 'Cheered him on for his first triathlon!' },
      { id: 'i9b', date: daysAgo(69), type: 'Coffee', note: 'Alumni meetup in the city — great turnout' },
      { id: 'i9c', date: daysAgo(127), type: 'Other', note: 'NYE party at his place' },
    ],
  },
  {
    id: '10',
    name: 'Marcus Thompson',
    relationship: 'professional',
    frequency: 'quarterly',
    avatarColor: 9,
    interactions: [
      { id: 'i10a', date: daysAgo(17), type: 'Call', note: 'Mentorship call — shared advice on leadership transitions' },
      { id: 'i10b', date: daysAgo(112), type: 'Coffee', note: 'Kickoff for the year, set goals for 2026' },
      { id: 'i10c', date: daysAgo(214), type: 'Call', note: 'Mid-year check-in and career planning' },
    ],
  },
];
