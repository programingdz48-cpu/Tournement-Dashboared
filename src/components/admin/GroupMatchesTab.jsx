import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import TeamBadge from '../common/TeamBadge';
import { 
  Plus, 
  Trash2, 
  Radio, 
  CheckCircle, 
  Calendar, 
  Zap, 
  Trophy,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export default function GroupMatchesTab() {
  const { matches, teams, getTeamById, updateMatch, addMatch, deleteMatch, simulateGoal } = useTournament();
  const [selectedGroup, setSelectedGroup] = useState('Group A');
  const [selectedMatchday, setSelectedMatchday] = useState('all');
  const [isAddingMatch, setIsAddingMatch] = useState(false);

  // New Match Form State
  const [newMatch, setNewMatch] = useState({
    group: 'Group A',
    matchday: 4,
    homeTeamId: '',
    awayTeamId: '',
    homeScore: 0,
    awayScore: 0,
    minute: 0,
    status: 'Upcoming',
    date: 'Tonight',
  });

  const groupTeams = teams.filter((t) => t.group === selectedGroup);

  const filteredMatches = matches.filter((m) => {
    if (m.stage !== 'group') return false;
    if (m.group !== selectedGroup) return false;
    if (selectedMatchday !== 'all' && m.matchday !== Number(selectedMatchday)) return false;
    return true;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMatch.homeTeamId || !newMatch.awayTeamId) return;
    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      alert('Home and Away teams must be different');
      return;
    }

    addMatch({
      id: 'm-' + Date.now().toString(36),
      stage: 'group',
      ...newMatch,
      homeScore: Number(newMatch.homeScore) || 0,
      awayScore: Number(newMatch.awayScore) || 0,
      minute: Number(newMatch.minute) || 0,
    });

    setIsAddingMatch(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Filter and Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.8125rem', color: '#94A3B8' }}>
            SELECT GROUP:
          </span>
          {['Group A', 'Group B', 'Group C', 'Group D'].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '0.375rem',
                backgroundColor: selectedGroup === grp ? '#00D2FF' : 'rgba(255, 255, 255, 0.08)',
                color: selectedGroup === grp ? '#03081E' : '#FFFFFF',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {grp}
            </button>
          ))}

          <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.8125rem', color: '#94A3B8', marginLeft: '1rem' }}>
            MATCHDAY:
          </span>
          <select
            value={selectedMatchday}
            onChange={(e) => setSelectedMatchday(e.target.value)}
            style={{
              padding: '0.35rem 0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(3, 8, 25, 0.8)',
              border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sports)',
              fontSize: '0.8125rem',
            }}
          >
            <option value="all">ALL MATCHDAYS</option>
            <option value="1">MATCHDAY 1</option>
            <option value="2">MATCHDAY 2</option>
            <option value="3">MATCHDAY 3</option>
            <option value="4">MATCHDAY 4</option>
            <option value="5">MATCHDAY 5</option>
            <option value="6">MATCHDAY 6</option>
          </select>
        </div>

        <button
          onClick={() => {
            setNewMatch({
              group: selectedGroup,
              matchday: 4,
              homeTeamId: groupTeams[0]?.id || '',
              awayTeamId: groupTeams[1]?.id || '',
              homeScore: 0,
              awayScore: 0,
              minute: 0,
              status: 'Upcoming',
              date: 'Tonight',
            });
            setIsAddingMatch(true);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(90deg, #00D2FF 0%, #0088FF 100%)',
            color: '#03081E',
            border: 'none',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.875rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          <Plus size="1rem" />
          <span>ADD FIXTURE</span>
        </button>
      </div>

      {/* Add Fixture Modal/Card */}
      {isAddingMatch && (
        <form
          onSubmit={handleAddSubmit}
          className="glass-panel-cyan"
          style={{ padding: '1.5rem', borderRadius: '1rem', border: '0.0625rem solid #00D2FF' }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#00D2FF', fontFamily: 'var(--font-sports)' }}>
            CREATE FIXTURE IN {selectedGroup}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                HOME TEAM
              </label>
              <select
                value={newMatch.homeTeamId}
                onChange={(e) => setNewMatch({ ...newMatch, homeTeamId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                {groupTeams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.shortCode})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                AWAY TEAM
              </label>
              <select
                value={newMatch.awayTeamId}
                onChange={(e) => setNewMatch({ ...newMatch, awayTeamId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                {groupTeams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.shortCode})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                STATUS
              </label>
              <select
                value={newMatch.status}
                onChange={(e) => setNewMatch({ ...newMatch, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Live">Live</option>
                <option value="Finished">Finished</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                MATCHDAY
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={newMatch.matchday}
                onChange={(e) => setNewMatch({ ...newMatch, matchday: Number(e.target.value) || 1 })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsAddingMatch(false)}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#CBD5E1', border: 'none', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '0.5rem 1.25rem', borderRadius: '0.375rem', backgroundColor: '#00D2FF', color: '#03081E', border: 'none', fontFamily: 'var(--font-sports)', fontWeight: 800, cursor: 'pointer' }}
            >
              SAVE FIXTURE
            </button>
          </div>
        </form>
      )}

      {/* Matches List with Instant Score Steppers & Live Goal Simulators */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredMatches.map((match) => {
          const home = getTeamById(match.homeTeamId);
          const away = getTeamById(match.awayTeamId);
          const isLive = match.status === 'Live';
          const isFinished = match.status === 'Finished';

          return (
            <div
              key={match.id}
              className="glass-panel"
              style={{
                padding: '1rem 1.5rem',
                display: 'grid',
                gridTemplateColumns: '8rem 1fr 14rem 1fr 12rem',
                alignItems: 'center',
                gap: '1.25rem',
                border: isLive ? '0.0625rem solid rgba(239, 68, 68, 0.5)' : '0.0625rem solid rgba(255, 255, 255, 0.1)',
                backgroundColor: isLive ? 'rgba(239, 68, 68, 0.05)' : 'var(--glass-card)',
              }}
            >
              {/* Matchday & Status Badge */}
              <div>
                <div style={{ fontFamily: 'var(--font-sports)', fontSize: '0.8125rem', fontWeight: 700, color: '#94A3B8' }}>
                  MATCHDAY {match.matchday}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                  <select
                    value={match.status}
                    onChange={(e) => updateMatch(match.id, { status: e.target.value })}
                    style={{
                      padding: '0.2rem 0.4rem',
                      borderRadius: '0.25rem',
                      backgroundColor: isLive ? '#EF4444' : isFinished ? '#10B981' : '#1E293B',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sports)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Live">Live</option>
                    <option value="Finished">Finished</option>
                  </select>

                  {isLive && (
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={match.minute}
                      onChange={(e) => updateMatch(match.id, { minute: Number(e.target.value) || 45 })}
                      title="Current Minute"
                      style={{
                        width: '3.25rem',
                        padding: '0.2rem 0.35rem',
                        borderRadius: '0.25rem',
                        backgroundColor: 'rgba(3, 8, 25, 0.8)',
                        border: '0.0625rem solid rgba(239, 68, 68, 0.5)',
                        color: '#EF4444',
                        fontFamily: 'var(--font-sports)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        textAlign: 'center',
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Home Team & +Goal Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => simulateGoal(match.id, 'home')}
                  title="Simulate Goal for Home Team (+1 and broadcast chime)"
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'rgba(0, 210, 255, 0.15)',
                    border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
                    color: '#00D2FF',
                    fontFamily: 'var(--font-sports)',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  +1 GOAL
                </button>
                <span style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {home?.name}
                </span>
                <TeamBadge team={home} size="2.25rem" />
              </div>

              {/* Score Steppers */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.9)',
                  border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
                }}
              >
                {/* Home Score Stepper */}
                <button
                  onClick={() => updateMatch(match.id, { homeScore: Math.max(0, (Number(match.homeScore) || 0) - 1) })}
                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '1.25rem', cursor: 'pointer', padding: '0 0.25rem' }}
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={match.homeScore}
                  onChange={(e) => updateMatch(match.id, { homeScore: Math.max(0, Number(e.target.value) || 0) })}
                  style={{
                    width: '2.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sports)',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    textAlign: 'center',
                  }}
                />
                <span style={{ color: '#00D2FF', fontWeight: 800 }}>:</span>
                <input
                  type="number"
                  min="0"
                  value={match.awayScore}
                  onChange={(e) => updateMatch(match.id, { awayScore: Math.max(0, Number(e.target.value) || 0) })}
                  style={{
                    width: '2.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sports)',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    textAlign: 'center',
                  }}
                />
                {/* Away Score Stepper */}
                <button
                  onClick={() => updateMatch(match.id, { awayScore: Math.max(0, (Number(match.awayScore) || 0) - 1) })}
                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '1.25rem', cursor: 'pointer', padding: '0 0.25rem' }}
                >
                  -
                </button>
              </div>

              {/* Away Team & +Goal Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.75rem' }}>
                <TeamBadge team={away} size="2.25rem" />
                <span style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {away?.name}
                </span>
                <button
                  onClick={() => simulateGoal(match.id, 'away')}
                  title="Simulate Goal for Away Team (+1 and broadcast chime)"
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'rgba(0, 210, 255, 0.15)',
                    border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
                    color: '#00D2FF',
                    fontFamily: 'var(--font-sports)',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  +1 GOAL
                </button>
              </div>

              {/* Date & Delete Match */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{match.date}</span>
                <button
                  onClick={() => deleteMatch(match.id)}
                  title="Delete match"
                  style={{
                    padding: '0.35rem',
                    borderRadius: '0.25rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: 'none',
                    color: '#F87171',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size="0.875rem" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
