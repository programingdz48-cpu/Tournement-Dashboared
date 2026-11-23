import React from 'react';

// Geometric Islamic star tessellation pattern for the header
export function HeaderGeometricPattern() {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.18,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="starPattern"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* 8-Pointed Star Motif */}
          <polygon
            points="30,10 34,22 46,22 36,30 40,42 30,34 20,42 24,30 14,22 26,22"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="0.8"
          />
          {/* Connecting diagonal & orthogonal lines */}
          <line x1="0" y1="30" x2="60" y2="30" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="30" y1="0" x2="30" y2="60" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="0" y1="0" x2="60" y2="60" stroke="#38BDF8" strokeWidth="0.5" opacity="0.6" />
          <line x1="60" y1="0" x2="0" y2="60" stroke="#38BDF8" strokeWidth="0.5" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#starPattern)" />
    </svg>
  );
}

// Bottom-left decorative wave and stack of blue books
export function BottomLeftBooksWave() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '26rem',
        height: '16rem',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 400 260"
        style={{ width: '100%', height: '100%' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradDark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="60%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <linearGradient id="waveGradLight" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>

          <linearGradient id="bookCover1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="bookCover2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="bookCover3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
        </defs>

        {/* Outer curved background wave */}
        <path
          d="M0,80 Q120,160 220,210 Q310,250 400,260 L0,260 Z"
          fill="url(#waveGradDark)"
          opacity="0.95"
        />
        <path
          d="M0,120 Q140,190 260,230 L0,260 Z"
          fill="url(#waveGradLight)"
          opacity="0.7"
        />

        {/* Stack of 3 Blue Hardcover Books */}
        {/* Book 1 (Bottom book) */}
        <g transform="translate(10, 165)">
          {/* Spine & Cover */}
          <rect x="0" y="45" width="180" height="22" rx="4" fill="url(#bookCover3)" />
          {/* White pages */}
          <rect x="18" y="49" width="160" height="14" rx="2" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
          {/* Spine ridge lines */}
          <line x1="8" y1="46" x2="8" y2="66" stroke="#38BDF8" strokeWidth="1.2" opacity="0.6" />
        </g>

        {/* Book 2 (Middle book) */}
        <g transform="translate(18, 140)">
          <rect x="0" y="45" width="170" height="22" rx="4" fill="url(#bookCover1)" />
          <rect x="18" y="49" width="150" height="14" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <line x1="8" y1="46" x2="8" y2="66" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.8" />
          {/* Bookmark ribbon */}
          <path d="M120,63 L126,80 L132,63" fill="#38BDF8" opacity="0.8" />
        </g>

        {/* Book 3 (Top book) */}
        <g transform="translate(25, 115)">
          <rect x="0" y="45" width="160" height="22" rx="4" fill="url(#bookCover2)" />
          <rect x="18" y="49" width="140" height="14" rx="2" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
          <line x1="8" y1="46" x2="8" y2="66" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.7" />
          <line x1="12" y1="46" x2="12" y2="66" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

// Right side bookshelf / standing books illustration
export function RightBookshelfIllustration() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2rem',
        right: 0,
        width: '18rem',
        height: '24rem',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        opacity: 0.85,
      }}
    >
      <svg
        viewBox="0 0 280 380"
        style={{ width: '100%', height: '100%' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rightBookBlue1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="rightBookCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <linearGradient id="rightBookNavy" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0C254A" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        {/* Shelf line */}
        <line x1="60" y1="360" x2="280" y2="360" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

        {/* Upright Book 1 (Navy tall) */}
        <rect x="80" y="140" width="28" height="215" rx="3" fill="url(#rightBookNavy)" />
        <rect x="86" y="160" width="16" height="50" rx="2" fill="#38BDF8" opacity="0.4" />
        <line x1="80" y1="150" x2="108" y2="150" stroke="#F8FAFC" strokeWidth="1" opacity="0.6" />
        <line x1="80" y1="340" x2="108" y2="340" stroke="#F8FAFC" strokeWidth="1" opacity="0.6" />

        {/* Upright Book 2 (Cyan medium) */}
        <rect x="112" y="170" width="32" height="185" rx="3" fill="url(#rightBookCyan)" />
        <line x1="112" y1="185" x2="144" y2="185" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        <line x1="112" y1="335" x2="144" y2="335" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />

        {/* Upright Book 3 (Light blue) */}
        <rect x="148" y="125" width="26" height="230" rx="3" fill="url(#rightBookBlue1)" />
        <circle cx="161" cy="160" r="5" fill="#FFFFFF" opacity="0.7" />
        <line x1="154" y1="200" x2="168" y2="200" stroke="#BAE6FD" strokeWidth="1.5" />

        {/* Upright Book 4 (White with blue spine edge) */}
        <rect x="178" y="150" width="34" height="205" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="178" y="150" width="6" height="205" fill="#0284C7" />

        {/* Leaning Book 5 */}
        <g transform="translate(216, 210) rotate(14)">
          <rect x="0" y="0" width="28" height="150" rx="3" fill="url(#rightBookCyan)" />
          <line x1="0" y1="20" x2="28" y2="20" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

// Flowing bottom decorative wave curve
export function BottomWaveCurve() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4.5rem',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg
        viewBox="0 0 1440 90"
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft flowing wave */}
        <path
          d="M0,60 C320,10 680,85 1080,40 C1240,22 1360,50 1440,65 L1440,90 L0,90 Z"
          fill="rgba(56, 189, 248, 0.2)"
        />
        <path
          d="M0,75 C360,35 720,80 1140,55 C1290,45 1390,65 1440,75 L1440,90 L0,90 Z"
          fill="rgba(2, 132, 199, 0.15)"
        />
        <path
          d="M0,82 C420,55 850,88 1260,70 L1440,82 L1440,90 L0,90 Z"
          fill="rgba(3, 105, 161, 0.3)"
        />
      </svg>
    </div>
  );
}
