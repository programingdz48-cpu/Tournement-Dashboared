import React from 'react';
import { useTournament } from '../../context/TournamentContext';
import { 
  Tv, 
  ExternalLink, 
  Table, 
  Radio, 
  GitBranch, 
  Crown, 
  Volume2, 
  RefreshCw, 
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { playWhistle, playGoalChime, playUclFanfare } from '../../utils/audio';

export default function TvRemoteControl() {
  const { 
    tournament, 
    setTvView, 
    setSelectedGroup, 
    toggleAutoCycle,
    updateTournament 
  } = useTournament();

  const currentView = tournament.currentView || 'groups';
  const autoCycle = tournament.autoCycleGroups;
  const selectedGroup = tournament.selectedGroup || 'all';

  return (
    <div
      className="glass-panel-cyan"
      style={{
        padding: '1.25rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1.5rem',
        border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
        boxShadow: '0 0.5rem 2rem rgba(0, 210, 255, 0.15)',
      }}
    >
      {/* Remote Control Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '0.0625rem solid rgba(0, 210, 255, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.4rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(0, 210, 255, 0.2)',
              color: '#00D2FF',
              display: 'flex',
            }}
          >
            <Tv size="1.25rem" />
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.08rem',
              }}
            >
              TV BROADCAST REMOTE CONTROL (LIVE VIEW SWITCHER)
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.04rem' }}>
              Switches what is displayed on the TV screen (<code>/</code>) in real-time across tabs and screens
            </div>
          </div>
        </div>

        {/* Live Status & Open TV Tab */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '2rem',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '0.0625rem solid rgba(16, 185, 129, 0.5)',
            }}
          >
            <span
              style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 0.5rem #10B981',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#34D399',
                letterSpacing: '0.05rem',
              }}
            >
              CURRENTLY ON AIR: {currentView.toUpperCase()}
            </span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.875rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(0, 210, 255, 0.15)',
              border: '0.0625rem solid rgba(0, 210, 255, 0.4)',
              color: '#00D2FF',
              textDecoration: 'none',
              fontFamily: 'var(--font-sports)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.05rem',
            }}
          >
            <ExternalLink size="0.875rem" />
            <span>OPEN TV VIEW IN NEW TAB</span>
          </a>
        </div>
      </div>

      {/* 4 Broadcast Mode Switcher Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Mode 1: Group Standings */}
        <button
          onClick={() => setTvView('groups')}
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background:
              currentView === 'groups'
                ? 'linear-gradient(135deg, rgba(0, 210, 255, 0.3) 0%, rgba(12, 32, 90, 0.8) 100%)'
                : 'rgba(10, 22, 60, 0.6)',
            border:
              currentView === 'groups'
                ? '0.125rem solid #00D2FF'
                : '0.0625rem solid rgba(255, 255, 255, 0.12)',
            boxShadow:
              currentView === 'groups'
                ? '0 0 1.5rem rgba(0, 210, 255, 0.4)'
                : 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Table size="1.5rem" color={currentView === 'groups' ? '#00D2FF' : '#94A3B8'} />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
                backgroundColor: currentView === 'groups' ? '#00D2FF' : 'rgba(255, 255, 255, 0.1)',
                color: currentView === 'groups' ? '#03081E' : '#94A3B8',
              }}
            >
              MODE 1
            </span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800 }}>
              GROUP STANDINGS
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.125rem' }}>
              Full tables, points, goal diff, & qualification glow
            </div>
          </div>
        </button>

        {/* Mode 2: Live Matches */}
        <button
          onClick={() => setTvView('matches')}
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background:
              currentView === 'matches'
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(12, 32, 90, 0.8) 100%)'
                : 'rgba(10, 22, 60, 0.6)',
            border:
              currentView === 'matches'
                ? '0.125rem solid #EF4444'
                : '0.0625rem solid rgba(255, 255, 255, 0.12)',
            boxShadow:
              currentView === 'matches'
                ? '0 0 1.5rem rgba(239, 68, 68, 0.4)'
                : 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Radio size="1.5rem" color={currentView === 'matches' ? '#EF4444' : '#94A3B8'} />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
                backgroundColor: currentView === 'matches' ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
              }}
            >
              MODE 2
            </span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800 }}>
              LIVE / TODAY'S MATCHES
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.125rem' }}>
              Hero scoreboard, live minute counter, and fixture cards
            </div>
          </div>
        </button>

        {/* Mode 3: Knockout Bracket */}
        <button
          onClick={() => setTvView('bracket')}
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background:
              currentView === 'bracket'
                ? 'linear-gradient(135deg, rgba(0, 210, 255, 0.3) 0%, rgba(12, 32, 90, 0.8) 100%)'
                : 'rgba(10, 22, 60, 0.6)',
            border:
              currentView === 'bracket'
                ? '0.125rem solid #00D2FF'
                : '0.0625rem solid rgba(255, 255, 255, 0.12)',
            boxShadow:
              currentView === 'bracket'
                ? '0 0 1.5rem rgba(0, 210, 255, 0.4)'
                : 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <GitBranch size="1.5rem" color={currentView === 'bracket' ? '#00D2FF' : '#94A3B8'} />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
                backgroundColor: currentView === 'bracket' ? '#00D2FF' : 'rgba(255, 255, 255, 0.1)',
                color: currentView === 'bracket' ? '#03081E' : '#94A3B8',
              }}
            >
              MODE 3
            </span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800 }}>
              KNOCKOUT BRACKET (1V1)
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.125rem' }}>
              Quarter-Finals to The Grand Final with center trophy
            </div>
          </div>
        </button>

        {/* Mode 4: Champion Celebration */}
        <button
          onClick={() => setTvView('champion')}
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background:
              currentView === 'champion'
                ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(12, 32, 90, 0.8) 100%)'
                : 'rgba(10, 22, 60, 0.6)',
            border:
              currentView === 'champion'
                ? '0.125rem solid #FFD700'
                : '0.0625rem solid rgba(255, 215, 0, 0.3)',
            boxShadow:
              currentView === 'champion'
                ? '0 0 2rem rgba(255, 215, 0, 0.5)'
                : 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Crown size="1.5rem" color={currentView === 'champion' ? '#FFD700' : '#E5A210'} />
            <span
              style={{
                fontFamily: 'var(--font-sports)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
                backgroundColor: '#FFD700',
                color: '#03081E',
              }}
            >
              MODE 4
            </span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFD700' }}>
              CHAMPION CELEBRATION
            </div>
            <div style={{ fontSize: '0.75rem', color: '#E2E8F0', marginTop: '0.125rem' }}>
              Full-screen confetti, golden spotlight & victory fanfare
            </div>
          </div>
        </button>
      </div>

      {/* Mode Sub-Controls & Quick Audio Testing */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '0.0625rem solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Group Standings Sub-options (Pin Group / Auto-Cycle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.8125rem', color: '#94A3B8' }}>
            GROUP VIEW PIN:
          </span>
          {['all', 'Group A', 'Group B', 'Group C', 'Group D'].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              style={{
                padding: '0.25rem 0.625rem',
                borderRadius: '0.375rem',
                backgroundColor: selectedGroup === grp ? '#00D2FF' : 'rgba(255, 255, 255, 0.08)',
                color: selectedGroup === grp ? '#03081E' : '#CBD5E1',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {grp === 'all' ? 'ALL 4 GROUPS' : grp}
            </button>
          ))}

          <button
            onClick={toggleAutoCycle}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.25rem 0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: autoCycle ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: autoCycle ? '0.0625rem solid #10B981' : 'none',
              color: autoCycle ? '#34D399' : '#94A3B8',
              fontFamily: 'var(--font-sports)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginLeft: '0.5rem',
            }}
          >
            {autoCycle ? <Play size="0.75rem" /> : <Pause size="0.75rem" />}
            <span>AUTO-CYCLE GROUPS ({autoCycle ? 'ON' : 'OFF'})</span>
          </button>
        </div>

        {/* Audio Effects Testing */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.8125rem', color: '#94A3B8' }}>
            BROADCAST SOUNDS:
          </span>
          <button
            onClick={() => playWhistle()}
            title="Play Referee Whistle Sound"
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '0.0625rem solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sports)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            🔊 WHISTLE
          </button>
          <button
            onClick={() => playGoalChime()}
            title="Play Goal Chime Sound"
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '0.0625rem solid rgba(255, 255, 255, 0.15)',
              color: '#00D2FF',
              fontFamily: 'var(--font-sports)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            ⚽ GOAL CHIME
          </button>
          <button
            onClick={() => playUclFanfare()}
            title="Play Champions Fanfare"
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(255, 215, 0, 0.15)',
              border: '0.0625rem solid rgba(255, 215, 0, 0.4)',
              color: '#FFD700',
              fontFamily: 'var(--font-sports)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            🎺 UCL FANFARE
          </button>
        </div>
      </div>
    </div>
  );
}
