import React from 'react';
import { useTournament } from '../../context/TournamentContext';
import TeamBadge from '../common/TeamBadge';
import TrophyIcon from '../common/TrophyIcon';
import { Crown, ArrowRight, Zap, RefreshCw, Award, Check } from 'lucide-react';

export default function KnockoutManagerTab() {
  const { 
    knockoutBracket, 
    teams, 
    getTeamById, 
    advanceTop2ToKnockouts, 
    updateKnockoutMatch,
    setChampion,
    setTvView
  } = useTournament();

  const qf = knockoutBracket.quarterFinals || [];
  const sf = knockoutBracket.semiFinals || [];
  const finalMatch = knockoutBracket.finalMatch || {};
  const championTeam = knockoutBracket.championId ? getTeamById(knockoutBracket.championId) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner: Advance Top 2 from Groups to Knockouts */}
      <div
        className="glass-panel-cyan"
        style={{
          padding: '1.25rem 1.75rem',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              padding: '0.625rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(0, 210, 255, 0.2)',
              color: '#00D2FF',
            }}
          >
            <Crown size="1.75rem" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              SEED KNOCKOUT BRACKET FROM STANDINGS
            </h3>
            <div style={{ fontSize: '0.8125rem', color: '#CBD5E1', marginTop: '0.125rem' }}>
              Calculates official standings and advances Top 2 teams from Group A, B, C, & D into Quarter-Final matchups
            </div>
          </div>
        </div>

        <button
          onClick={advanceTop2ToKnockouts}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.75rem 1.75rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(90deg, #00D2FF 0%, #0088FF 100%)',
            color: '#03081E',
            border: 'none',
            fontFamily: 'var(--font-sports)',
            fontSize: '1rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 0 1.5rem rgba(0, 210, 255, 0.4)',
            letterSpacing: '0.05rem',
          }}
        >
          <Zap size="1.125rem" />
          <span>ADVANCE TOP 2 FROM GROUPS TO KNOCKOUTS</span>
        </button>
      </div>

      {/* Quarter-Finals Manager */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
        <h3
          style={{
            margin: '0 0 1rem 0',
            fontFamily: 'var(--font-sports)',
            fontSize: '1.125rem',
            fontWeight: 800,
            color: '#00D2FF',
            letterSpacing: '0.08rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>QUARTER-FINALS (8 TEAMS)</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {qf.map((m) => {
            const h = getTeamById(m.homeTeamId);
            const a = getTeamById(m.awayTeamId);

            return (
              <div
                key={m.id}
                style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.7)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                  <span style={{ fontFamily: 'var(--font-sports)', fontWeight: 700 }}>{m.label}</span>
                  <span>{m.matchDate}</span>
                </div>

                {/* Score Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Home */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TeamBadge team={h} size="1.75rem" />
                    <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', fontWeight: 700 }}>
                      {h?.name || 'TBD'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="0"
                      value={m.homeScore}
                      onChange={(e) => updateKnockoutMatch('qf', m.id, { homeScore: Number(e.target.value) || 0 })}
                      style={{
                        width: '2.5rem',
                        padding: '0.25rem',
                        backgroundColor: 'rgba(10, 20, 50, 0.9)',
                        border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '1.125rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        borderRadius: '0.25rem',
                      }}
                    />
                    <span style={{ color: '#00D2FF' }}>:</span>
                    <input
                      type="number"
                      min="0"
                      value={m.awayScore}
                      onChange={(e) => updateKnockoutMatch('qf', m.id, { awayScore: Number(e.target.value) || 0 })}
                      style={{
                        width: '2.5rem',
                        padding: '0.25rem',
                        backgroundColor: 'rgba(10, 20, 50, 0.9)',
                        border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '1.125rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        borderRadius: '0.25rem',
                      }}
                    />
                  </div>

                  {/* Away */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', fontWeight: 700 }}>
                      {a?.name || 'TBD'}
                    </span>
                    <TeamBadge team={a} size="1.75rem" />
                  </div>
                </div>

                {/* Winner Advance Selector */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.5rem',
                    borderTop: '0.0625rem solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>ADVANCE WINNER:</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateKnockoutMatch('qf', m.id, { winnerId: m.homeTeamId, status: 'Finished' })}
                      disabled={!m.homeTeamId}
                      style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: '0.25rem',
                        backgroundColor: m.winnerId === m.homeTeamId ? '#00D2FF' : 'rgba(255, 255, 255, 0.1)',
                        color: m.winnerId === m.homeTeamId ? '#03081E' : '#FFFFFF',
                        border: 'none',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {h?.shortCode || 'HOME'} WINS
                    </button>
                    <button
                      onClick={() => updateKnockoutMatch('qf', m.id, { winnerId: m.awayTeamId, status: 'Finished' })}
                      disabled={!m.awayTeamId}
                      style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: '0.25rem',
                        backgroundColor: m.winnerId === m.awayTeamId ? '#00D2FF' : 'rgba(255, 255, 255, 0.1)',
                        color: m.winnerId === m.awayTeamId ? '#03081E' : '#FFFFFF',
                        border: 'none',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {a?.shortCode || 'AWAY'} WINS
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Semi-Finals Manager */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
        <h3
          style={{
            margin: '0 0 1rem 0',
            fontFamily: 'var(--font-sports)',
            fontSize: '1.125rem',
            fontWeight: 800,
            color: '#FFD700',
            letterSpacing: '0.08rem',
          }}
        >
          SEMI-FINALS (4 TEAMS)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {sf.map((m) => {
            const h = getTeamById(m.homeTeamId);
            const a = getTeamById(m.awayTeamId);

            return (
              <div
                key={m.id}
                style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.7)',
                  border: '0.0625rem solid rgba(255, 215, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                  <span style={{ fontFamily: 'var(--font-sports)', fontWeight: 700 }}>{m.label}</span>
                  <span>{m.matchDate}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TeamBadge team={h} size="1.75rem" />
                    <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', fontWeight: 700 }}>
                      {h?.name || 'Winner QF'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="0"
                      value={m.homeScore}
                      onChange={(e) => updateKnockoutMatch('sf', m.id, { homeScore: Number(e.target.value) || 0 })}
                      style={{
                        width: '2.5rem',
                        padding: '0.25rem',
                        backgroundColor: 'rgba(10, 20, 50, 0.9)',
                        border: '0.0625rem solid rgba(255, 215, 0, 0.4)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '1.125rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        borderRadius: '0.25rem',
                      }}
                    />
                    <span style={{ color: '#FFD700' }}>:</span>
                    <input
                      type="number"
                      min="0"
                      value={m.awayScore}
                      onChange={(e) => updateKnockoutMatch('sf', m.id, { awayScore: Number(e.target.value) || 0 })}
                      style={{
                        width: '2.5rem',
                        padding: '0.25rem',
                        backgroundColor: 'rgba(10, 20, 50, 0.9)',
                        border: '0.0625rem solid rgba(255, 215, 0, 0.4)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '1.125rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        borderRadius: '0.25rem',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', fontWeight: 700 }}>
                      {a?.name || 'Winner QF'}
                    </span>
                    <TeamBadge team={a} size="1.75rem" />
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.5rem',
                    borderTop: '0.0625rem solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>ADVANCE TO FINAL:</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateKnockoutMatch('sf', m.id, { winnerId: m.homeTeamId, status: 'Finished' })}
                      disabled={!m.homeTeamId}
                      style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: '0.25rem',
                        backgroundColor: m.winnerId === m.homeTeamId ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                        color: m.winnerId === m.homeTeamId ? '#03081E' : '#FFFFFF',
                        border: 'none',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {h?.shortCode || 'HOME'} ADVANCES
                    </button>
                    <button
                      onClick={() => updateKnockoutMatch('sf', m.id, { winnerId: m.awayTeamId, status: 'Finished' })}
                      disabled={!m.awayTeamId}
                      style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: '0.25rem',
                        backgroundColor: m.winnerId === m.awayTeamId ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                        color: m.winnerId === m.awayTeamId ? '#03081E' : '#FFFFFF',
                        border: 'none',
                        fontFamily: 'var(--font-sports)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {a?.shortCode || 'AWAY'} ADVANCES
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Grand Final & Crown Champion */}
      <div
        className="glass-panel-gold"
        style={{
          padding: '1.75rem',
          borderRadius: '1rem',
          border: '0.125rem solid #FFD700',
          boxShadow: '0 0 2rem rgba(255, 215, 0, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '0.0625rem solid rgba(255, 215, 0, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TrophyIcon size="2.5rem" glow={true} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#FFD700', fontFamily: 'var(--font-sports)' }}>
                THE GRAND FINAL: ROAD TO MUNICH 2026
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#E2E8F0' }}>
                Allianz Arena, Munich • Determine Champion & Trigger TV Celebration
              </div>
            </div>
          </div>

          {championTeam && (
            <button
              onClick={() => setTvView('champion')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '0.5rem',
                backgroundColor: '#FFD700',
                color: '#03081E',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.875rem',
                fontWeight: 900,
                cursor: 'pointer',
              }}
            >
              <Crown size="1rem" />
              <span>SHOW TV CELEBRATION</span>
            </button>
          )}
        </div>

        {/* Final Match Details */}
        {(() => {
          const fh = getTeamById(finalMatch.homeTeamId);
          const fa = getTeamById(finalMatch.awayTeamId);

          return (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                backgroundColor: 'rgba(3, 8, 25, 0.85)',
              }}
            >
              {/* Home */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {fh?.name || 'FINALIST 1'}
                  </div>
                  <button
                    onClick={() => {
                      if (finalMatch.homeTeamId) {
                        setChampion(finalMatch.homeTeamId);
                      }
                    }}
                    disabled={!finalMatch.homeTeamId}
                    style={{
                      marginTop: '0.35rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: finalMatch.winnerId === finalMatch.homeTeamId ? '#FFD700' : 'rgba(255, 215, 0, 0.2)',
                      color: finalMatch.winnerId === finalMatch.homeTeamId ? '#03081E' : '#FFD700',
                      border: '0.0625rem solid #FFD700',
                      fontFamily: 'var(--font-sports)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    👑 CROWN CHAMPION
                  </button>
                </div>
                <TeamBadge team={fh} size="3.5rem" />
              </div>

              {/* Score Editor */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(10, 22, 60, 0.9)',
                  border: '0.0625rem solid #FFD700',
                }}
              >
                <input
                  type="number"
                  min="0"
                  value={finalMatch.homeScore}
                  onChange={(e) => updateKnockoutMatch('final', 'final', { homeScore: Number(e.target.value) || 0 })}
                  style={{
                    width: '3rem',
                    padding: '0.25rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sports)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    textAlign: 'center',
                  }}
                />
                <span style={{ color: '#FFD700', fontSize: '1.5rem', fontWeight: 900 }}>-</span>
                <input
                  type="number"
                  min="0"
                  value={finalMatch.awayScore}
                  onChange={(e) => updateKnockoutMatch('final', 'final', { awayScore: Number(e.target.value) || 0 })}
                  style={{
                    width: '3rem',
                    padding: '0.25rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sports)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    textAlign: 'center',
                  }}
                />
              </div>

              {/* Away */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
                <TeamBadge team={fa} size="3.5rem" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {fa?.name || 'FINALIST 2'}
                  </div>
                  <button
                    onClick={() => {
                      if (finalMatch.awayTeamId) {
                        setChampion(finalMatch.awayTeamId);
                      }
                    }}
                    disabled={!finalMatch.awayTeamId}
                    style={{
                      marginTop: '0.35rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: finalMatch.winnerId === finalMatch.awayTeamId ? '#FFD700' : 'rgba(255, 215, 0, 0.2)',
                      color: finalMatch.winnerId === finalMatch.awayTeamId ? '#03081E' : '#FFD700',
                      border: '0.0625rem solid #FFD700',
                      fontFamily: 'var(--font-sports)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    👑 CROWN CHAMPION
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
