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

  // ── 30 additional contacts ──────────────────────────────────────────

  {
    id: '11',
    name: 'Rachel Kim',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 0,
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    interactions: [
      { id: 'i11a', date: daysAgo(6), type: 'Text', note: 'Shared the sprint retro notes' },
      { id: 'i11b', date: daysAgo(13), type: 'Call', note: 'Sync on the new feature scope' },
      { id: 'i11c', date: daysAgo(20), type: 'Coffee', note: 'Caught up before the all-hands' },
    ],
  },
  {
    id: '12',
    name: 'Brendan Walsh',
    relationship: 'professional',
    frequency: 'monthly',
    avatarColor: 1,
    interactions: [
      { id: 'i12a', date: daysAgo(45), type: 'Call', note: 'Quarterly business review — happy with progress' },
      { id: 'i12b', date: daysAgo(78), type: 'Email', note: 'Sent the updated proposal deck' },
      { id: 'i12c', date: daysAgo(110), type: 'Coffee', note: 'Intro meeting downtown' },
    ],
  },
  {
    id: '13',
    name: 'Nina Okonkwo',
    relationship: 'professional',
    frequency: 'quarterly',
    avatarColor: 2,
    interactions: [
      { id: 'i13a', date: daysAgo(60), type: 'Email', note: 'Collaborated on the industry report' },
      { id: 'i13b', date: daysAgo(145), type: 'Coffee', note: 'Conference meetup in Chicago' },
    ],
  },
  {
    id: '14',
    name: 'Tyler Chen',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 3,
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    interactions: [
      { id: 'i14a', date: daysAgo(4), type: 'Call', note: 'Weekly check-in — he\'s crushing the onboarding project' },
      { id: 'i14b', date: daysAgo(11), type: 'Other', note: 'Team lunch, good energy' },
      { id: 'i14c', date: daysAgo(18), type: 'Email', note: 'Reviewed his self-assessment draft' },
    ],
  },
  {
    id: '15',
    name: 'Fatima Al-Rashid',
    relationship: 'professional',
    frequency: 'quarterly',
    avatarColor: 4,
    interactions: [
      { id: 'i15a', date: daysAgo(40), type: 'Call', note: 'She shared advice on navigating a reorg — really helpful' },
      { id: 'i15b', date: daysAgo(130), type: 'Coffee', note: 'Annual catch-up at her office' },
    ],
  },
  {
    id: '16',
    name: 'Gregory Hoffman',
    relationship: 'professional',
    frequency: 'monthly',
    avatarColor: 5,
    interactions: [
      { id: 'i16a', date: daysAgo(38), type: 'Call', note: 'Discussed the partnership renewal terms' },
      { id: 'i16b', date: daysAgo(70), type: 'Email', note: 'Sent the co-marketing brief' },
      { id: 'i16c', date: daysAgo(100), type: 'Coffee', note: 'Kicked off the partnership in person' },
    ],
  },
  {
    id: '17',
    name: 'Yuki Tanaka',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 6,
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
    interactions: [
      { id: 'i17a', date: daysAgo(14), type: 'Email', note: 'She flagged a blocker on the API integration' },
      { id: 'i17b', date: daysAgo(21), type: 'Call', note: 'Design review for the mobile flows' },
    ],
  },
  {
    id: '18',
    name: 'Samantha Lee',
    relationship: 'professional',
    frequency: 'quarterly',
    avatarColor: 7,
    interactions: [
      { id: 'i18a', date: daysAgo(80), type: 'Text', note: 'Congratulated her on the new role' },
      { id: 'i18b', date: daysAgo(210), type: 'Coffee', note: 'Caught up after she left the company' },
    ],
  },
  {
    id: '19',
    name: 'Omar Shaikh',
    relationship: 'professional',
    frequency: 'quarterly',
    avatarColor: 8,
    interactions: [
      { id: 'i19a', date: daysAgo(100), type: 'Call', note: 'Portfolio check-in — discussed the B2B pivot' },
      { id: 'i19b', date: daysAgo(195), type: 'Coffee', note: 'Intro meeting through a mutual connection' },
    ],
  },
  {
    id: '20',
    name: 'Chloe Dubois',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 9,
    photo: 'https://randomuser.me/api/portraits/women/37.jpg',
    interactions: [
      { id: 'i20a', date: daysAgo(9), type: 'Text', note: 'She shared a Figma file for feedback' },
      { id: 'i20b', date: daysAgo(16), type: 'Call', note: 'Reviewed the rebrand direction together' },
      { id: 'i20c', date: daysAgo(23), type: 'Coffee', note: 'Working session at the co-working space' },
    ],
  },
  {
    id: '21',
    name: 'Daniel Foster',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 0,
    interactions: [
      { id: 'i21a', date: daysAgo(25), type: 'Other', note: 'Helped him carry a couch in — owe me one 😄' },
      { id: 'i21b', date: daysAgo(58), type: 'Coffee', note: 'Saturday morning walk and coffee' },
    ],
  },
  {
    id: '22',
    name: 'Keisha Brown',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 1,
    photo: 'https://randomuser.me/api/portraits/women/91.jpg',
    interactions: [
      { id: 'i22a', date: daysAgo(55), type: 'Call', note: 'She\'s moving to Denver — big news' },
      { id: 'i22b', date: daysAgo(88), type: 'Text', note: 'Shared a playlist she\'d love' },
      { id: 'i22c', date: daysAgo(118), type: 'Coffee', note: 'Brunch to celebrate her promotion' },
    ],
  },
  {
    id: '23',
    name: 'Marco Rossi',
    relationship: 'personal',
    frequency: 'quarterly',
    avatarColor: 2,
    interactions: [
      { id: 'i23a', date: daysAgo(70), type: 'Text', note: 'Sent him photos from the Amalfi trip we planned' },
      { id: 'i23b', date: daysAgo(160), type: 'Call', note: 'Caught up after his wedding — so happy for him' },
    ],
  },
  {
    id: '24',
    name: 'Amara Diallo',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 3,
    interactions: [
      { id: 'i24a', date: daysAgo(65), type: 'Call', note: 'Long overdue catch-up — she\'s thriving in London' },
      { id: 'i24b', date: daysAgo(155), type: 'Text', note: 'Happy New Year message' },
    ],
  },
  {
    id: '25',
    name: 'Jake Sullivan',
    relationship: 'personal',
    frequency: 'weekly',
    avatarColor: 4,
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    interactions: [
      { id: 'i25a', date: daysAgo(3), type: 'Other', note: 'Morning run together before work' },
      { id: 'i25b', date: daysAgo(10), type: 'Text', note: 'Trash talk before the big game 😂' },
      { id: 'i25c', date: daysAgo(17), type: 'Other', note: 'Yoga class then grabbed smoothies' },
    ],
  },
  {
    id: '26',
    name: 'Preethi Nair',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 5,
    interactions: [
      { id: 'i26a', date: daysAgo(48), type: 'Email', note: 'Book club thread — loved her take on this month\'s pick' },
      { id: 'i26b', date: daysAgo(80), type: 'Coffee', note: 'Book club meetup at her place' },
    ],
  },
  {
    id: '27',
    name: 'Ben Hartley',
    relationship: 'personal',
    frequency: 'weekly',
    avatarColor: 6,
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    interactions: [
      { id: 'i27a', date: daysAgo(8), type: 'Text', note: 'Fantasy football trash talk 😅' },
      { id: 'i27b', date: daysAgo(15), type: 'Call', note: 'Talked about his house renovation plans' },
      { id: 'i27c', date: daysAgo(22), type: 'Other', note: 'Family dinner at mom\'s' },
    ],
  },
  {
    id: '28',
    name: 'Sophia Andersen',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 7,
    interactions: [
      { id: 'i28a', date: daysAgo(20), type: 'Coffee', note: 'Post-class coffee — she just got a new job!' },
      { id: 'i28b', date: daysAgo(55), type: 'Text', note: 'Recommended the meditation app she mentioned' },
    ],
  },
  {
    id: '29',
    name: 'Liam O\'Brien',
    relationship: 'personal',
    frequency: 'quarterly',
    avatarColor: 8,
    interactions: [
      { id: 'i29a', date: daysAgo(120), type: 'Call', note: 'First proper catch-up in over a year — like no time had passed' },
      { id: 'i29b', date: daysAgo(240), type: 'Other', note: 'Ran into him at a mutual friend\'s housewarming' },
    ],
  },
  {
    id: '30',
    name: 'Maya Goldberg',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 9,
    interactions: [
      { id: 'i30a', date: daysAgo(35), type: 'Coffee', note: 'Long lunch — she\'s thinking about a career change' },
      { id: 'i30b', date: daysAgo(65), type: 'Call', note: 'Talked through her relationship stuff, she needed to vent' },
      { id: 'i30c', date: daysAgo(95), type: 'Text', note: 'Shared an article she\'d love' },
    ],
  },
  {
    id: '31',
    name: 'Carlos Mendez',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 0,
    interactions: [
      { id: 'i31a', date: daysAgo(50), type: 'Call', note: 'Talked about the family reunion plans for summer' },
      { id: 'i31b', date: daysAgo(115), type: 'Other', note: 'Thanksgiving at grandma\'s — great to see everyone' },
    ],
  },
  {
    id: '32',
    name: 'Nia Thompson',
    relationship: 'personal',
    frequency: 'quarterly',
    avatarColor: 1,
    interactions: [
      { id: 'i32a', date: daysAgo(30), type: 'Text', note: 'She texted out of nowhere — so good to hear from her' },
      { id: 'i32b', date: daysAgo(130), type: 'Coffee', note: 'High school reunion drinks' },
    ],
  },
  {
    id: '33',
    name: 'Patrick Kim',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 2,
    interactions: [
      { id: 'i33a', date: daysAgo(12), type: 'Email', note: 'Escalated a client issue — needed my input' },
      { id: 'i33b', date: daysAgo(19), type: 'Call', note: 'End of quarter wrap-up call' },
    ],
  },
  {
    id: '34',
    name: 'Zoe Williams',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 3,
    interactions: [
      { id: 'i34a', date: daysAgo(28), type: 'Call', note: 'Planning a surprise for my brother\'s birthday together' },
      { id: 'i34b', date: daysAgo(60), type: 'Other', note: 'Christmas at the in-laws' },
    ],
  },
  {
    id: '35',
    name: 'Antoine Beaumont',
    relationship: 'personal',
    frequency: 'quarterly',
    avatarColor: 4,
    interactions: [
      { id: 'i35a', date: daysAgo(45), type: 'Text', note: 'He sent a photo from Marseille — jealous' },
      { id: 'i35b', date: daysAgo(180), type: 'Coffee', note: 'He was in SF for a week — showed him around' },
    ],
  },
  {
    id: '36',
    name: 'Iris Nakamura',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 5,
    interactions: [
      { id: 'i36a', date: daysAgo(42), type: 'Other', note: 'Photography walk through the Mission District' },
      { id: 'i36b', date: daysAgo(74), type: 'Text', note: 'She won a photography contest — so well deserved!' },
    ],
  },
  {
    id: '37',
    name: 'Ryan Murphy',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 6,
    photo: 'https://randomuser.me/api/portraits/men/15.jpg',
    interactions: [
      { id: 'i37a', date: daysAgo(70), type: 'Call', note: 'First call in months — he moved back to Boston' },
      { id: 'i37b', date: daysAgo(190), type: 'Other', note: 'College reunion weekend' },
    ],
  },
  {
    id: '38',
    name: 'Leila Hassan',
    relationship: 'professional',
    frequency: 'weekly',
    avatarColor: 7,
    photo: 'https://randomuser.me/api/portraits/women/56.jpg',
    interactions: [
      { id: 'i38a', date: daysAgo(2), type: 'Text', note: 'She flagged an issue with the staging deploy — quick fix' },
      { id: 'i38b', date: daysAgo(9), type: 'Call', note: 'Weekly standup catchup' },
      { id: 'i38c', date: daysAgo(16), type: 'Coffee', note: 'Welcome lunch for her first week on the team' },
    ],
  },
  {
    id: '39',
    name: 'Max Becker',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 8,
    interactions: [
      { id: 'i39a', date: daysAgo(33), type: 'Coffee', note: 'He\'s fundraising for his Series A — gave him some intros' },
      { id: 'i39b', date: daysAgo(70), type: 'Call', note: 'Talked through his co-founder situation' },
    ],
  },
  {
    id: '40',
    name: 'Valentina Cruz',
    relationship: 'personal',
    frequency: 'monthly',
    avatarColor: 9,
    photo: 'https://randomuser.me/api/portraits/women/72.jpg',
    interactions: [
      { id: 'i40a', date: daysAgo(58), type: 'Other', note: 'Block party — her kids are getting so big' },
      { id: 'i40b', date: daysAgo(120), type: 'Text', note: 'Borrowed her pressure washer, returned it clean 😄' },
    ],
  },
];
