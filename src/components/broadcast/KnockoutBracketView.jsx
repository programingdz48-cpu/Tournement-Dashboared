import React from 'react';
import { useTournament } from '../../context/TournamentContext';
import TeamBadge from '../common/TeamBadge';
import TrophyIcon from '../common/TrophyIcon';
import { Award, Crown, Sparkles } from 'lucide-react';

export default function KnockoutBracketView() {
  const { tournament, knockoutBracket, getTeamById } = useTournament();
  const isRtl = tournament.language === 'ar';

  const qf = knockoutBracket.quarterFinals || [];
  const sf = knockoutBracket.semiFinals || [];
  const finalMatch = knockoutBracket.finalMatch || {};
  const championTeam = knockoutBracket.championId ? getTeamById(knockoutBracket.championId) : null;

  // Bracket Match Card Helper
  const renderMatchCard = (match, roundLabel) => {
    if (!match) return null;
    const home = getTeamById(match.homeTeamId);
    const away = getTeamById(match.awayTeamId);
    const hasWinner = Boolean(match.winnerId);
    const isHomeWinner = match.winnerId === match.homeTeamId;
    const isAwayWinner = match.winnerId === match.awayTeamId;

    return (
      <div
        className="glass-panel"
        style={{
          width: '15rem',
          padding: '0.625rem 0.875rem',
          border: hasWinner
            ? '0.0625rem solid rgba(0, 210, 255, 0.4)'
            : '0.0625rem solid rgba(255, 255, 255, 0.12)',
          boxShadow: hasWinner ? '0 0 1rem rgba(0, 210, 255, 0.2)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          position: 'relative',
        }}
      >
        {/* Match Header Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.6875rem',
            color: '#94A3B8',
            letterSpacing: '0.06rem',
            paddingBottom: '0.25rem',
            borderBottom: '0.0625rem solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span>{match.label || roundLabel}</span>
          <span style={{ color: match.status === 'Finished' ? '#10B981' : '#00D2FF' }}>
            {match.status === 'Finished' ? 'FT' : match.matchDate || 'UPCOMING'}
          </span>
        </div>

        {/* Home Team */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.25rem 0.375rem',
            borderRadius: '0.25rem',
            backgroundColor: isHomeWinner ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
            border: isHomeWinner ? '0.0625rem solid rgba(0, 210, 255, 0.4)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
            <TeamBadge team={home} size="1.5rem" />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.9375rem',
                fontWeight: isHomeWinner ? 800 : 600,
                color: isHomeWinner ? '#FFFFFF' : home ? '#CBD5E1' : '#64748B',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {home ? home.name : 'TBD'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            {match.penaltyHome !== undefined && (
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontFamily: 'var(--font-sports)' }}>
                ({match.penaltyHome}p)
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '1.125rem',
                fontWeight: 800,
                color: isHomeWinner ? '#00F0FF' : '#FFFFFF',
              }}
            >
              {match.status === 'Upcoming' && !home ? '-' : match.homeScore ?? '-'}
            </span>
          </div>
        </div>

        {/* Away Team */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.25rem 0.375rem',
            borderRadius: '0.25rem',
            backgroundColor: isAwayWinner ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
            border: isAwayWinner ? '0.0625rem solid rgba(0, 210, 255, 0.4)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
            <TeamBadge team={away} size="1.5rem" />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.9375rem',
                fontWeight: isAwayWinner ? 800 : 600,
                color: isAwayWinner ? '#FFFFFF' : away ? '#CBD5E1' : '#64748B',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {away ? away.name : 'TBD'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            {match.penaltyAway !== undefined && (
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontFamily: 'var(--font-sports)' }}>
                ({match.penaltyAway}p)
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '1.125rem',
                fontWeight: 800,
                color: isAwayWinner ? '#00F0FF' : '#FFFFFF',
              }}
            >
              {match.status === 'Upcoming' && !away ? '-' : match.awayScore ?? '-'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        flex: 1,
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* Knockout Stage Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '0.5rem',
              background: 'linear-gradient(90deg, rgba(255, 215, 0, 0.15) 0%, rgba(0, 210, 255, 0.15) 100%)',
              border: '0.0625rem solid rgba(255, 215, 0, 0.4)',
            }}
          >
            <Crown size="1.125rem" color="#FFD700" />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#FFD700',
                letterSpacing: '0.08rem',
              }}
            >
              {isRtl ? 'الأدوار الإقصائية والنهائي الحاسم' : 'ROAD TO GLORY: 1V1 KNOCKOUT TREE'}
            </span>
          </div>
          <span style={{ fontSize: '0.8125rem', color: '#94A3B8', fontFamily: 'var(--font-sports)' }}>
            SINGLE ELIMINATION • ALLIANZ ARENA, MUNICH
          </span>
        </div>

        {championTeam && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: '2rem',
              background: 'linear-gradient(90deg, #FFD700 0%, #F59E0B 100%)',
              color: '#030718',
              fontFamily: 'var(--font-sports)',
              fontWeight: 800,
              fontSize: '0.875rem',
              boxShadow: '0 0 1rem rgba(255, 215, 0, 0.5)',
            }}
          >
            <Crown size="1rem" fill="#030718" />
            <span>CROWNED CHAMPION: {championTeam.name.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Symmetrical 5-Column Bracket Layout */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '15rem 1fr 18rem 1fr 15rem',
          alignItems: 'center',
          gap: '1rem',
          minHeight: 0,
        }}
      >
        {/* Left Side: Quarter-Finals (QF 1 & QF 2) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', justifyContent: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#00D2FF', fontFamily: 'var(--font-sports)', marginBottom: '0.25rem', fontWeight: 700 }}>
              QUARTER-FINAL 1
            </div>
            {renderMatchCard(qf[0], 'QF 1')}
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#00D2FF', fontFamily: 'var(--font-sports)', marginBottom: '0.25rem', fontWeight: 700 }}>
              QUARTER-FINAL 2
            </div>
            {renderMatchCard(qf[1], 'QF 2')}
          </div>
        </div>

        {/* Semi-Final 1 (Left branch to center) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#FFD700', fontFamily: 'var(--font-sports)', marginBottom: '0.25rem', fontWeight: 700 }}>
            SEMI-FINAL 1
          </div>
          {renderMatchCard(sf[0], 'SEMI-FINAL 1')}
        </div>

        {/* Center: The Champions Trophy Pedestal & Grand Final */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.875rem',
          }}
        >
          {/* Animated Trophy */}
          <div style={{ textAlign: 'center' }}>
            <TrophyIcon size="5.5rem" glow={true} />
            <div
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '1rem',
                fontWeight: 800,
                color: '#FFD700',
                letterSpacing: '0.12rem',
                textShadow: '0 0 1rem rgba(255, 215, 0, 0.6)',
                marginTop: '0.25rem',
              }}
            >
              THE GRAND FINAL
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#94A3B8', letterSpacing: '0.06rem' }}>
              MUNICH 2026
            </div>
          </div>

          {/* Grand Final Match Card */}
          <div
            className="glass-panel-gold"
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              position: 'relative',
              borderRadius: '0.75rem',
            }}
          >
            {finalMatch && (
              <>
                {/* Final Home */}
                {(() => {
                  const fh = getTeamById(finalMatch.homeTeamId);
                  const isWinner = finalMatch.winnerId === finalMatch.homeTeamId;
                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.375rem 0.5rem',
                        borderRadius: '0.375rem',
                        backgroundColor: isWinner ? 'rgba(255, 215, 0, 0.25)' : 'transparent',
                        border: isWinner ? '0.0625rem solid #FFD700' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <TeamBadge team={fh} size="2rem" />
                        <div>
                          <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                            {fh ? fh.name : 'FINALIST 1'}
                          </div>
                          {isWinner && (
                            <div style={{ fontSize: '0.6875rem', color: '#FFD700', fontWeight: 700, fontFamily: 'var(--font-sports)' }}>
                              WINNER & CHAMPION
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-sports)',
                          fontSize: '1.5rem',
                          fontWeight: 900,
                          color: isWinner ? '#FFD700' : '#FFFFFF',
                        }}
                      >
                        {finalMatch.homeScore ?? '-'}
                      </span>
                    </div>
                  );
                })()}

                <div
                  style={{
                    height: '0.0625rem',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
                  }}
                />

                {/* Final Away */}
                {(() => {
                  const fa = getTeamById(finalMatch.awayTeamId);
                  const isWinner = finalMatch.winnerId === finalMatch.awayTeamId;
                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.375rem 0.5rem',
                        borderRadius: '0.375rem',
                        backgroundColor: isWinner ? 'rgba(255, 215, 0, 0.25)' : 'transparent',
                        border: isWinner ? '0.0625rem solid #FFD700' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <TeamBadge team={fa} size="2rem" />
                        <div>
                          <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                            {fa ? fa.name : 'FINALIST 2'}
                          </div>
                          {isWinner && (
                            <div style={{ fontSize: '0.6875rem', color: '#FFD700', fontWeight: 700, fontFamily: 'var(--font-sports)' }}>
                              WINNER & CHAMPION
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-sports)',
                          fontSize: '1.5rem',
                          fontWeight: 900,
                          color: isWinner ? '#FFD700' : '#FFFFFF',
                        }}
                      >
                        {finalMatch.awayScore ?? '-'}
                      </span>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>

        {/* Semi-Final 2 (Right branch to center) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#FFD700', fontFamily: 'var(--font-sports)', marginBottom: '0.25rem', fontWeight: 700 }}>
            SEMI-FINAL 2
          </div>
          {renderMatchCard(sf[1], 'SEMI-FINAL 2')}
        </div>

        {/* Right Side: Quarter-Finals (QF 3 & QF 4) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', justifyContent: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#00D2FF', fontFamily: 'var(--font-sports)', marginBottom: '0.25rem', fontWeight: 700 }}>
              QUARTER-FINAL 3
            </div>
            {renderMatchCard(qf[2], 'QF 3')}
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#00D2FF', fontFamily: 'var(--font-sports)', marginBottom: '0.25rem', fontWeight: 700 }}>
              QUARTER-FINAL 4
            </div>
            {renderMatchCard(qf[3], 'QF 4')}
          </div>
        </div>
      </div>
    </div>
  );
}
