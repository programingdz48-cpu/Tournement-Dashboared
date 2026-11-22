import React from 'react';

export default function StarfieldBackground() {
  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="stadium-glow-top-left" />
      <div className="stadium-glow-top-right" />
      <div className="stadium-glow-center" />

      {/* Subtle Starball geometric star constellation watermark */}
      <svg
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65rem',
          height: '65rem',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
        viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="230" fill="none" stroke="#00D2FF" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="250" cy="250" r="150" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
        {/* Constellation lines */}
        <polygon points="250,30 300,180 460,180 330,270 380,420 250,320 120,420 170,270 40,180 200,180" fill="none" stroke="#00D2FF" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
