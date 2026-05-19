import { AVATAR_COLORS, initials } from '../data/contacts';

export function Avatar({ contact, size = 48 }) {
  const color = AVATAR_COLORS[contact.avatarColor % AVATAR_COLORS.length];
  const fontSize = size * 0.38;

  if (contact.photo) {
    return (
      <img
        src={contact.photo}
        alt={contact.name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          display: 'block',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color.bg,
        color: color.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 600,
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
    >
      {initials(contact.name)}
    </div>
  );
}
