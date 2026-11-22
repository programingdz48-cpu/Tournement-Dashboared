import React from 'react';

export default function TrophyIcon({ size = '3.5rem', glow = true, className = '' }) {
  return (
    <svg
      style={{ width: size, height: size, flexShrink: 0 }}
      viewBox="0 0 100 120"
      className={`${glow ? 'animate-trophy-glow' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#CBD5E1" />
          <stop offset="65%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="40%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FFE082" />
        </linearGradient>

        <radialGradient id="trophyAura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 215, 0, 0.4)" />
          <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
        </radialGradient>
      </defs>

      {/* Ambient background glow */}
      <circle cx="50" cy="50" r="45" fill="url(#trophyAura)" />

      {/* Handles (The iconic 'Big Ears' of the European Cup) */}
      <path
        d="M26,30 C6,25 3,65 30,70 L32,64 C12,60 14,35 28,36 Z"
        fill="url(#silverGradient)"
        stroke="#FFFFFF"
        strokeWidth="0.5"
      />
      <path
        d="M74,30 C94,25 97,65 70,70 L68,64 C88,60 86,35 72,36 Z"
        fill="url(#silverGradient)"
        stroke="#FFFFFF"
        strokeWidth="0.5"
      />

      {/* Main Cup Body */}
      <path
        d="M25,25 Q50,22 75,25 L70,68 Q50,92 30,68 Z"
        fill="url(#silverGradient)"
        stroke="#F8FAFC"
        strokeWidth="0.8"
      />

      {/* Cup Rim Top */}
      <ellipse cx="50" cy="24" rx="25" ry="4" fill="url(#silverGradient)" stroke="#FFFFFF" strokeWidth="0.6" />

      {/* Star ball ornament engraved on cup */}
      <polygon
        points="50,42 53,50 61,50 55,55 57,63 50,58 43,63 45,55 39,50 47,50"
        fill="url(#goldGradient)"
      />

      {/* Stem */}
      <path d="M46,80 L44,95 L56,95 L54,80 Z" fill="url(#silverGradient)" />

      {/* Pedestal Base */}
      <path d="M34,95 L28,108 L72,108 L66,95 Z" fill="url(#silverGradient)" stroke="#64748B" strokeWidth="0.5" />
      <rect x="25" y="108" width="50" height="6" rx="1.5" fill="#1E293B" stroke="url(#goldGradient)" strokeWidth="0.8" />
    </svg>
  );
}
