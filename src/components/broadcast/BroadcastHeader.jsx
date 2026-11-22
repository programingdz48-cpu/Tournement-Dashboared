import React, { useState, useEffect } from 'react';
import { useTournament } from '../../context/TournamentContext';
import UCLStarballLogo from '../common/UCLStarballLogo';
import { Radio, Clock } from 'lucide-react';

export default function BroadcastHeader() {
  const { tournament } = useTournament();
  const [timeStr, setTimeStr] = useState('');

  // Live broadcast real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds} CET`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isRtl = tournament.language === 'ar';

  return (
    <header
      style={{
        height: '4.5rem',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(6, 15, 45, 0.95) 0%, rgba(3, 8, 25, 0.75) 100%)',
        borderBottom: '0.0625rem solid rgba(0, 210, 255, 0.3)',
        backdropFilter: 'blur(1rem)',
        position: 'relative',
        zIndex: 20,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* Top metallic cyan edge glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '0.125rem',
          background: 'linear-gradient(90deg, transparent 0%, #00D2FF 30%, #FFFFFF 50%, #00D2FF 70%, transparent 100%)',
        }}
      />

      {/* Left: Tournament Identity & Starball */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <UCLStarballLogo size="3rem" />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1
              style={{
                fontSize: '1.625rem',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.12rem',
                margin: 0,
                lineHeight: 1.1,
                textShadow: '0 0 1rem rgba(0, 210, 255, 0.5)',
              }}
            >
              {isRtl ? 'دوري أبطال أوروبا' : tournament.title}
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                padding: '0.125rem 0.5rem',
                borderRadius: '0.25rem',
                backgroundColor: 'rgba(0, 210, 255, 0.15)',
                border: '0.0625rem solid rgba(0, 210, 255, 0.5)',
                color: '#00D2FF',
                fontWeight: 700,
                letterSpacing: '0.05rem',
              }}
            >
              {tournament.season}
            </span>
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15rem',
              color: '#94A3B8',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginTop: '0.125rem',
            }}
          >
            {tournament.subtitle}
          </div>
        </div>
      </div>

      {/* Center: Stage Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.45rem 1.25rem',
          borderRadius: '2rem',
          background: 'linear-gradient(135deg, rgba(16, 38, 105, 0.8) 0%, rgba(6, 16, 50, 0.9) 100%)',
          border: '0.0625rem solid rgba(255, 215, 0, 0.4)',
          boxShadow: '0 0 1rem rgba(255, 215, 0, 0.2)',
        }}
      >
        <span
          style={{
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            backgroundColor: '#FFD700',
            boxShadow: '0 0 0.5rem #FFD700',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-sports)',
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: '#FFD700',
            letterSpacing: '0.12rem',
            textTransform: 'uppercase',
          }}
        >
          {tournament.stage}
        </span>
      </div>

      {/* Right: Live ON AIR & Real-time Clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* On Air Beacon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.875rem',
            borderRadius: '0.375rem',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '0.0625rem solid rgba(239, 68, 68, 0.5)',
          }}
        >
          <div
            className="animate-live-pulse"
            style={{
              width: '0.625rem',
              height: '0.625rem',
              borderRadius: '50%',
              backgroundColor: '#EF4444',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sports)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#F87171',
              letterSpacing: '0.1rem',
            }}
          >
            ON AIR
          </span>
        </div>

        {/* Live Clock */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-sports)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#E2E8F0',
            letterSpacing: '0.08rem',
          }}
        >
          <Clock size="1.125rem" color="#00D2FF" />
          <span>{timeStr}</span>
        </div>
      </div>
    </header>
  );
}
