import React from 'react';
import { useTournament } from '../../context/TournamentContext';
import TeamBadge from '../common/TeamBadge';
import { Radio, Flame, Shield, ArrowRight } from 'lucide-react';

export default function LiveMatchesView() {
  const { tournament, matches, getTeamById } = useTournament();
  const isRtl = tournament.language === 'ar';

  // Find the primary featured live match (or first live match, or finished match)
  const liveMatches = matches.filter((m) => m.status === 'Live');
  const featuredMatch = liveMatches[0] || matches.find((m) => m.id === 'm7') || matches[0];
  const otherMatches = matches.filter((m) => m.id !== featuredMatch?.id).slice(0, 6);

  const homeTeam = featuredMatch ? getTeamById(featuredMatch.homeTeamId) : null;
  const awayTeam = featuredMatch ? getTeamById(featuredMatch.awayTeamId) : null;

  return (
    <div
      style={{
        flex: 1,
        padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* Featured Match Hero Scoreboard */}
      {featuredMatch && homeTeam && awayTeam && (
        <div
          className="glass-panel-cyan"
          style={{
            padding: '1.5rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
            boxShadow: '0 0.5rem 3rem rgba(0, 210, 255, 0.15)',
          }}
        >
          {/* Top Banner inside Hero Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.25rem',
                  backgroundColor: featuredMatch.status === 'Live' ? '#EF4444' : '#1E293B',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sports)',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.1rem',
                }}
              >
                {featuredMatch.status === 'Live' && <Radio size="0.875rem" className="animate-live-pulse" />}
                <span>{featuredMatch.status === 'Live' ? `${featuredMatch.minute}' LIVE` : featuredMatch.status.toUpperCase()}</span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sports)',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: '#00D2FF',
                  letterSpacing: '0.06rem',
                }}
              >
                {featuredMatch.group} • MATCHDAY {featuredMatch.matchday || 4}
              </span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                color: '#94A3B8',
                letterSpacing: '0.06rem',
              }}
            >
              ESTADIO SANTIAGO BERNABÉU • 81,044 ATTENDANCE
            </div>
          </div>

          {/* Core Scoreboard Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '2rem',
              margin: '0.5rem 0',
            }}
          >
            {/* Home Team */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                justifyContent: isRtl ? 'flex-start' : 'flex-end',
              }}
            >
              <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                <h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    margin: 0,
                    color: '#FFFFFF',
                    letterSpacing: '0.08rem',
                    lineHeight: 1.1,
                  }}
                >
                  {isRtl ? (homeTeam.nameAr || homeTeam.name) : homeTeam.name}
                </h2>
                <div
                  style={{
                    fontFamily: 'var(--font-sports)',
                    fontSize: '1rem',
                    color: '#94A3B8',
                    letterSpacing: '0.08rem',
                  }}
                >
                  {homeTeam.shortCode} • {homeTeam.country}
                </div>
              </div>
              <TeamBadge team={homeTeam} size="5rem" />
            </div>

            {/* Score Centerpiece */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.5rem 2rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(180deg, rgba(6, 16, 50, 0.95) 0%, rgba(3, 8, 25, 0.95) 100%)',
                border: '0.0625rem solid rgba(0, 210, 255, 0.5)',
                boxShadow: '0 0 2rem rgba(0, 210, 255, 0.3)',
                minWidth: '13rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sports)',
                  fontSize: '4rem',
                  fontWeight: 900,
                  letterSpacing: '0.2rem',
                  color: '#FFFFFF',
                  lineHeight: 1,
                  textShadow: '0 0 1.5rem rgba(0, 210, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span>{featuredMatch.homeScore}</span>
                <span style={{ color: '#00D2FF', opacity: 0.8 }}>-</span>
                <span>{featuredMatch.awayScore}</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sports)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: featuredMatch.status === 'Live' ? '#EF4444' : '#10B981',
                  letterSpacing: '0.1rem',
                  marginTop: '0.25rem',
                }}
              >
                {featuredMatch.status === 'Live' ? `SECOND HALF (${featuredMatch.minute}')` : 'FULL TIME'}
              </div>
            </div>

            {/* Away Team */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                justifyContent: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              <TeamBadge team={awayTeam} size="5rem" />
              <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                <h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    margin: 0,
                    color: '#FFFFFF',
                    letterSpacing: '0.08rem',
                    lineHeight: 1.1,
                  }}
                >
                  {isRtl ? (awayTeam.nameAr || awayTeam.name) : awayTeam.name}
                </h2>
                <div
                  style={{
                    fontFamily: 'var(--font-sports)',
                    fontSize: '1rem',
                    color: '#94A3B8',
                    letterSpacing: '0.08rem',
                  }}
                >
                  {awayTeam.shortCode} • {awayTeam.country}
                </div>
              </div>
            </div>
          </div>

          {/* Match Live Statistics Bar */}
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '0.85rem',
              borderTop: '0.0625rem solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#00D2FF' }}>58%</div>
              <div style={{ fontSize: '0.6875rem', color: '#94A3B8', letterSpacing: '0.05rem' }}>POSSESSION</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>14 (8)</div>
              <div style={{ fontSize: '0.6875rem', color: '#94A3B8', letterSpacing: '0.05rem' }}>SHOTS (ON TARGET)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>89%</div>
              <div style={{ fontSize: '0.6875rem', color: '#94A3B8', letterSpacing: '0.05rem' }}>PASS ACCURACY</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#00D2FF' }}>42%</div>
              <div style={{ fontSize: '0.6875rem', color: '#94A3B8', letterSpacing: '0.05rem' }}>POSSESSION</div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Matchday Fixtures */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-sports)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#94A3B8',
            letterSpacing: '0.08rem',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Flame size="1rem" color="#00D2FF" />
          <span>{isRtl ? 'مباريات أخرى في هذه الجولة' : 'OTHER SIMULTANEOUS MATCHES ACROSS EUROPE'}</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            flex: 1,
          }}
        >
          {otherMatches.map((m) => {
            const h = getTeamById(m.homeTeamId);
            const a = getTeamById(m.awayTeamId);
            const isLive = m.status === 'Live';
            const isUpcoming = m.status === 'Upcoming';

            return (
              <div
                key={m.id}
                className="glass-panel"
                style={{
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isLive ? '0.0625rem solid rgba(239, 68, 68, 0.5)' : '0.0625rem solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.75rem', color: '#94A3B8' }}>
                    {m.group}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sports)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '0.125rem 0.375rem',
                      borderRadius: '0.25rem',
                      backgroundColor: isLive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: isLive ? '#EF4444' : '#94A3B8',
                    }}
                  >
                    {isLive ? `${m.minute}' LIVE` : isUpcoming ? m.date : 'FT'}
                  </span>
                </div>

                {/* Scoreline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Home */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TeamBadge team={h} size="1.5rem" />
                      <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', fontWeight: 700 }}>
                        {h?.name}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {isUpcoming ? '-' : m.homeScore}
                    </span>
                  </div>

                  {/* Away */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TeamBadge team={a} size="1.5rem" />
                      <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', fontWeight: 700 }}>
                        {a?.name}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {isUpcoming ? '-' : m.awayScore}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
