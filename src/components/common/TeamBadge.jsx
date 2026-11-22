import React from 'react';

export default function TeamBadge({ team, size = '2.25rem', showCode = false, className = '' }) {
  if (!team) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '0.0625rem dashed rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-sports)',
        }}
        className={className}
      >
        ?
      </div>
    );
  }

  const primary = team.primaryColor || '#FFFFFF';
  const secondary = team.secondaryColor || '#111827';
  const accent = team.accentColor || '#00D2FF';

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      className={className}
      title={team.name}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          filter: `drop-shadow(0 0 0.25rem ${accent}66)`,
        }}
      >
        <defs>
          <linearGradient id={`grad-${team.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={secondary} />
          </linearGradient>
        </defs>

        {/* Shield outline */}
        <path
          d="M50,8 L85,22 C85,58 50,90 50,90 C50,90 15,58 15,22 Z"
          fill={`url(#grad-${team.id})`}
          stroke={accent}
          strokeWidth="3.5"
        />

        {/* Inner diagonal chevron stripe */}
        <path
          d="M30,28 L70,28 L50,75 Z"
          fill="rgba(255, 255, 255, 0.2)"
        />

        {/* Short Code Text inside badge */}
        <text
          x="50"
          y="56"
          fill={primary === '#FFFFFF' ? '#070F2B' : '#FFFFFF'}
          fontSize="24"
          fontWeight="900"
          fontFamily="Rajdhani, Oswald, sans-serif"
          textAnchor="middle"
          style={{ letterSpacing: '0.05rem', filter: 'drop-shadow(0 0.0625rem 0.125rem rgba(0,0,0,0.8))' }}
        >
          {team.shortCode || team.name?.substring(0, 3).toUpperCase()}
        </text>
      </svg>
      {showCode && (
        <span
          style={{
            position: 'absolute',
            bottom: '-0.85rem',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: '#CBD5E1',
            letterSpacing: '0.05rem',
          }}
        >
          {team.shortCode}
        </span>
      )}
    </div>
  );
}
