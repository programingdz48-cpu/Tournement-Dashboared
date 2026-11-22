import React from 'react';

export default function UCLStarballLogo({ size = '2.5rem', className = '' }) {
  return (
    <svg
      style={{ width: size, height: size, flexShrink: 0 }}
      viewBox="0 0 100 100"
      className={`animate-starball-glow ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="starballBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B1A4D" />
          <stop offset="100%" stopColor="#03081E" />
        </radialGradient>
        <linearGradient id="starGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#00D2FF" />
        </linearGradient>
      </defs>

      {/* Base Globe */}
      <circle cx="50" cy="50" r="46" fill="url(#starballBg)" stroke="#00D2FF" strokeWidth="1.5" />

      {/* 8 Stars of the UEFA Champions League */}
      <g fill="url(#starGlow)">
        {/* Star 1 (Top) */}
        <polygon points="50,12 52,19 59,19 53,24 55,31 50,27 45,31 47,24 41,19 48,19" />
        {/* Star 2 (Top-Right) */}
        <polygon points="77,23 76,30 83,32 76,35 77,42 72,37 66,40 69,34 65,28 72,29" />
        {/* Star 3 (Right) */}
        <polygon points="88,50 82,53 84,60 78,56 73,61 74,54 68,51 75,49 75,42 80,47" />
        {/* Star 4 (Bottom-Right) */}
        <polygon points="77,77 72,75 69,82 67,75 60,76 65,71 62,65 68,68 73,63 73,70" />
        {/* Star 5 (Bottom) */}
        <polygon points="50,88 48,81 41,81 47,76 45,69 50,73 55,69 53,76 59,81 52,81" />
        {/* Star 6 (Bottom-Left) */}
        <polygon points="23,77 28,75 31,82 33,75 40,76 35,71 38,65 32,68 27,63 27,70" />
        {/* Star 7 (Left) */}
        <polygon points="12,50 18,53 16,60 22,56 27,61 26,54 32,51 25,49 25,42 20,47" />
        {/* Star 8 (Top-Left) */}
        <polygon points="23,23 24,30 17,32 24,35 23,42 28,37 34,40 31,34 35,28 28,29" />
      </g>

      {/* Central pentagon connection lines */}
      <polygon
        points="50,30 68,43 61,64 39,64 32,43"
        fill="none"
        stroke="rgba(0, 210, 255, 0.5)"
        strokeWidth="1"
      />
    </svg>
  );
}
