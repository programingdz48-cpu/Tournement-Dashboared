import React, { useState, useEffect } from 'react';
import { useTournament } from '../../context/TournamentContext';
import TeamBadge from '../common/TeamBadge';
import { CheckCircle2, ChevronRight, Award } from 'lucide-react';

export default function GroupStandingsView() {
  const { tournament, standings, setSelectedGroup } = useTournament();
  const groupKeys = Object.keys(standings).sort();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const selectedGroup = tournament.selectedGroup || 'all';
  const autoCycle = tournament.autoCycleGroups;
  const isRtl = tournament.language === 'ar';

  // Auto-cycle through groups when autoCycleGroups is enabled and not pinned to a single group
  useEffect(() => {
    if (!autoCycle || selectedGroup !== 'all' || groupKeys.length === 0) return;

    const interval = setInterval(() => {
      setActiveGroupIndex((prev) => (prev + 1) % groupKeys.length);
    }, (tournament.cycleInterval || 7) * 1000);

    return () => clearInterval(interval);
  }, [autoCycle, selectedGroup, groupKeys.length, tournament.cycleInterval]);

  // Determine if we show All 4 Groups grid or a single focused group
  const isSingleGroupFocus = selectedGroup !== 'all';
  const displayGroups = isSingleGroupFocus 
    ? [selectedGroup]
    : groupKeys;

  return (
    <div
      style={{
        flex: 1,
        padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* Subheader with Group Selectors & Qualification Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
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
              background: 'rgba(0, 210, 255, 0.1)',
              border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
            }}
          >
            <Award size="1.125rem" color="#00D2FF" />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.08rem',
              }}
            >
              {isRtl ? 'ترتيب المجموعات الرسمي' : 'OFFICIAL GROUP STAGE STANDINGS'}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: '#94A3B8',
              marginLeft: '0.75rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '0.625rem',
                height: '0.625rem',
                borderRadius: '0.125rem',
                backgroundColor: 'var(--cyan-glow)',
                boxShadow: '0 0 0.5rem var(--cyan-glow)',
              }}
            />
            <span style={{ fontFamily: 'var(--font-sports)', letterSpacing: '0.05rem', color: '#CBD5E1' }}>
              {isRtl ? 'المراكز 1-2 تتأهل للأدوار الإقصائية' : 'POS 1-2 ADVANCE TO KNOCKOUT STAGE'}
            </span>
          </div>
        </div>

        {/* Group indicators */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {groupKeys.map((grp, idx) => (
            <div
              key={grp}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.05rem',
                backgroundColor:
                  selectedGroup === grp || (!isSingleGroupFocus && activeGroupIndex === idx)
                    ? 'rgba(0, 210, 255, 0.25)'
                    : 'rgba(255, 255, 255, 0.05)',
                border:
                  selectedGroup === grp || (!isSingleGroupFocus && activeGroupIndex === idx)
                    ? '0.0625rem solid #00D2FF'
                    : '0.0625rem solid rgba(255, 255, 255, 0.1)',
                color:
                  selectedGroup === grp || (!isSingleGroupFocus && activeGroupIndex === idx)
                    ? '#00F0FF'
                    : '#94A3B8',
                transition: 'all 0.3s ease',
              }}
            >
              {grp}
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Groups */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: isSingleGroupFocus ? '1fr' : 'repeat(2, 1fr)',
          gap: '1.25rem',
          minHeight: 0,
        }}
      >
        {displayGroups.map((grpName) => {
          const rows = standings[grpName] || [];

          return (
            <div
              key={grpName}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '0.0625rem solid rgba(0, 210, 255, 0.25)',
              }}
            >
              {/* Group Card Header */}
              <div
                style={{
                  padding: '0.625rem 1.25rem',
                  background: 'linear-gradient(90deg, rgba(0, 210, 255, 0.2) 0%, rgba(12, 26, 75, 0.8) 100%)',
                  borderBottom: '0.0625rem solid rgba(0, 210, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span
                    style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#00D2FF',
                      boxShadow: '0 0 0.5rem #00D2FF',
                    }}
                  />
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.08rem',
                    }}
                  >
                    {grpName}
                  </h3>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-sports)',
                    fontSize: '0.75rem',
                    color: '#94A3B8',
                    letterSpacing: '0.05rem',
                  }}
                >
                  {isRtl ? 'الجولة 4 من 6' : 'MATCHDAY 4 OF 6'}
                </span>
              </div>

              {/* Broadcast Table */}
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Table Headings */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5rem 1fr 2.5rem 2.25rem 2.25rem 2.25rem 2.75rem 3rem 4.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(3, 8, 25, 0.6)',
                    borderBottom: '0.0625rem solid rgba(255, 255, 255, 0.1)',
                    fontFamily: 'var(--font-sports)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#94A3B8',
                    letterSpacing: '0.05rem',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ textAlign: isRtl ? 'right' : 'left' }}>#</span>
                  <span style={{ textAlign: isRtl ? 'right' : 'left' }}>{isRtl ? 'النادي' : 'CLUB'}</span>
                  <span>MP</span>
                  <span>W</span>
                  <span>D</span>
                  <span>L</span>
                  <span>GD</span>
                  <span style={{ color: '#00D2FF', fontWeight: 800 }}>PTS</span>
                  <span>FORM</span>
                </div>

                {/* Table Body Rows */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  {rows.map((row) => {
                    const isQualified = row.rank <= 2;
                    const displayName = isRtl ? (row.team.nameAr || row.team.name) : row.team.name;

                    return (
                      <div
                        key={row.teamId}
                        className={isQualified ? 'row-qualified' : ''}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '2.5rem 1fr 2.5rem 2.25rem 2.25rem 2.25rem 2.75rem 3rem 4.5rem',
                          padding: '0.5rem 1rem',
                          alignItems: 'center',
                          borderBottom: '0.0625rem solid rgba(255, 255, 255, 0.05)',
                          textAlign: 'center',
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        {/* Position Rank */}
                        <div
                          style={{
                            fontFamily: 'var(--font-sports)',
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: isQualified ? '#00F0FF' : '#94A3B8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <span>{row.rank}</span>
                          {isQualified && (
                            <span
                              style={{
                                width: '0.25rem',
                                height: '0.85rem',
                                borderRadius: '0.125rem',
                                backgroundColor: '#00D2FF',
                                display: 'inline-block',
                              }}
                            />
                          )}
                        </div>

                        {/* Team Badge & Name */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            textAlign: isRtl ? 'right' : 'left',
                            overflow: 'hidden',
                          }}
                        >
                          <TeamBadge team={row.team} size="1.875rem" />
                          <div style={{ overflow: 'hidden' }}>
                            <div
                              style={{
                                fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-sports)',
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                letterSpacing: '0.04rem',
                              }}
                            >
                              {displayName}
                            </div>
                            <div
                              style={{
                                fontSize: '0.6875rem',
                                color: '#94A3B8',
                                letterSpacing: '0.05rem',
                              }}
                            >
                              {row.team.shortCode} • {row.team.country}
                            </div>
                          </div>
                        </div>

                        {/* Match Stats */}
                        <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', color: '#E2E8F0' }}>
                          {row.played}
                        </span>
                        <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', color: '#10B981', fontWeight: 700 }}>
                          {row.won}
                        </span>
                        <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', color: '#94A3B8' }}>
                          {row.drawn}
                        </span>
                        <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.9375rem', color: '#F87171' }}>
                          {row.lost}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-sports)',
                            fontSize: '0.9375rem',
                            fontWeight: 700,
                            color: row.goalDifference > 0 ? '#10B981' : row.goalDifference < 0 ? '#F87171' : '#CBD5E1',
                          }}
                        >
                          {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                        </span>

                        {/* Points (Highlighted) */}
                        <span
                          style={{
                            fontFamily: 'var(--font-sports)',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            color: '#00F0FF',
                            textShadow: isQualified ? '0 0 0.75rem rgba(0, 210, 255, 0.6)' : 'none',
                          }}
                        >
                          {row.points}
                        </span>

                        {/* Form Dots */}
                        <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                          {(row.form.length > 0 ? row.form : ['W', 'D']).map((res, fIdx) => (
                            <span
                              key={fIdx}
                              style={{
                                width: '0.85rem',
                                height: '0.85rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.5625rem',
                                fontWeight: 800,
                                fontFamily: 'var(--font-sports)',
                                backgroundColor:
                                  res === 'W'
                                    ? '#10B981'
                                    : res === 'D'
                                    ? '#6B7280'
                                    : '#EF4444',
                                color: '#FFFFFF',
                              }}
                            >
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
