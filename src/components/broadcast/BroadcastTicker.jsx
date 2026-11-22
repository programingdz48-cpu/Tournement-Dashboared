import React from 'react';
import { useTournament } from '../../context/TournamentContext';
import { Zap } from 'lucide-react';

export default function BroadcastTicker() {
  const { tournament, matches, getTeamById } = useTournament();

  // Build live score ticker items from matches
  const recentScores = matches
    .filter((m) => m.status === 'Finished' || m.status === 'Live')
    .slice(-6)
    .map((m) => {
      const home = getTeamById(m.homeTeamId);
      const away = getTeamById(m.awayTeamId);
      const isLive = m.status === 'Live';
      return `${home?.shortCode || 'H'} ${m.homeScore} - ${m.awayScore} ${away?.shortCode || 'A'} (${isLive ? `${m.minute}' LIVE` : 'FT'})`;
    });

  const tickerItems = [
    ...(tournament.tickerHeadlines || []),
    ...recentScores,
  ];

  return (
    <div
      style={{
        height: '2.5rem',
        background: 'linear-gradient(90deg, #020617 0%, #0A1B4E 20%, #0A1B4E 80%, #020617 100%)',
        borderTop: '0.0625rem solid rgba(0, 210, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Breaking News Label Pill */}
      <div
        style={{
          height: '100%',
          padding: '0 1.25rem',
          background: 'linear-gradient(90deg, #00D2FF 0%, #0099FF 100%)',
          color: '#03081E',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-sports)',
          fontWeight: 800,
          fontSize: '0.875rem',
          letterSpacing: '0.1rem',
          flexShrink: 0,
          zIndex: 2,
          clipPath: 'polygon(0 0, 92% 0, 100% 100%, 0% 100%)',
          paddingRight: '1.875rem',
        }}
      >
        <Zap size="1rem" fill="#03081E" />
        <span>UCL LIVE DESK</span>
      </div>

      {/* Crawling Marquee Content */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2.5rem',
            animation: 'tickerScroll 38s linear infinite',
            paddingLeft: '1rem',
          }}
        >
          {tickerItems.concat(tickerItems).map((text, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: '#E2E8F0',
                letterSpacing: '0.06rem',
              }}
            >
              <span
                style={{
                  width: '0.375rem',
                  height: '0.375rem',
                  borderRadius: '50%',
                  backgroundColor: '#00D2FF',
                  boxShadow: '0 0 0.375rem #00D2FF',
                }}
              />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
