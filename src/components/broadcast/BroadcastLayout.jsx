import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../../context/TournamentContext';
import StarfieldBackground from '../common/StarfieldBackground';
import BroadcastHeader from './BroadcastHeader';
import BroadcastTicker from './BroadcastTicker';
import GroupStandingsView from './GroupStandingsView';
import LiveMatchesView from './LiveMatchesView';
import KnockoutBracketView from './KnockoutBracketView';
import ChampionCelebrationView from './ChampionCelebrationView';
import { 
  Tv, 
  Settings, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Table, 
  Radio, 
  GitBranch, 
  Crown 
} from 'lucide-react';

export default function BroadcastLayout() {
  const { tournament, setTvView, updateTournament } = useTournament();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const currentView = tournament.currentView || 'groups';

  return (
    <div className="tv-screen-container" onMouseMove={() => setShowControls(true)}>
      <StarfieldBackground />

      {/* Top Broadcast Header */}
      <BroadcastHeader />

      {/* Main Dynamic Stage Display */}
      <main
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        {currentView === 'groups' && <GroupStandingsView />}
        {currentView === 'matches' && <LiveMatchesView />}
        {currentView === 'bracket' && <KnockoutBracketView />}
        {currentView === 'champion' && <ChampionCelebrationView />}
      </main>

      {/* Lower Third Sports News Ticker */}
      <BroadcastTicker />

      {/* Floating Broadcast Controls Bar (Discreet, auto-fading or on hover for convenient TV display & testing) */}
      <div
        style={{
          position: 'fixed',
          top: '5rem',
          right: '1.5rem',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.625rem',
          borderRadius: '2rem',
          background: 'rgba(3, 8, 25, 0.85)',
          border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
          backdropFilter: 'blur(0.75rem)',
          boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.6)',
          opacity: showControls ? 1 : 0.25,
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={() => setShowControls(true)}
      >
        {/* Quick View Switchers */}
        <button
          onClick={() => setTvView('groups')}
          title="Mode 1: Group Standings"
          style={{
            background: currentView === 'groups' ? 'rgba(0, 210, 255, 0.3)' : 'transparent',
            border: currentView === 'groups' ? '0.0625rem solid #00D2FF' : 'none',
            color: currentView === 'groups' ? '#00F0FF' : '#94A3B8',
            padding: '0.35rem 0.625rem',
            borderRadius: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          <Table size="0.875rem" />
          <span>GROUPS</span>
        </button>

        <button
          onClick={() => setTvView('matches')}
          title="Mode 2: Live Matches"
          style={{
            background: currentView === 'matches' ? 'rgba(0, 210, 255, 0.3)' : 'transparent',
            border: currentView === 'matches' ? '0.0625rem solid #00D2FF' : 'none',
            color: currentView === 'matches' ? '#00F0FF' : '#94A3B8',
            padding: '0.35rem 0.625rem',
            borderRadius: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          <Radio size="0.875rem" />
          <span>LIVE</span>
        </button>

        <button
          onClick={() => setTvView('bracket')}
          title="Mode 3: Knockout Bracket"
          style={{
            background: currentView === 'bracket' ? 'rgba(0, 210, 255, 0.3)' : 'transparent',
            border: currentView === 'bracket' ? '0.0625rem solid #00D2FF' : 'none',
            color: currentView === 'bracket' ? '#00F0FF' : '#94A3B8',
            padding: '0.35rem 0.625rem',
            borderRadius: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          <GitBranch size="0.875rem" />
          <span>BRACKET</span>
        </button>

        <button
          onClick={() => setTvView('champion')}
          title="Mode 4: Champion Celebration"
          style={{
            background: currentView === 'champion' ? 'rgba(255, 215, 0, 0.3)' : 'transparent',
            border: currentView === 'champion' ? '0.0625rem solid #FFD700' : 'none',
            color: currentView === 'champion' ? '#FFD700' : '#94A3B8',
            padding: '0.35rem 0.625rem',
            borderRadius: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          <Crown size="0.875rem" />
          <span>CHAMPION</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => updateTournament({ audioEnabled: !tournament.audioEnabled })}
          title={tournament.audioEnabled ? 'Mute Broadcast Audio' : 'Unmute Broadcast Audio'}
          style={{
            background: 'transparent',
            border: 'none',
            color: tournament.audioEnabled ? '#00D2FF' : '#64748B',
            cursor: 'pointer',
            padding: '0.35rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {tournament.audioEnabled ? <Volume2 size="1rem" /> : <VolumeX size="1rem" />}
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen TV Mode"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#E2E8F0',
            cursor: 'pointer',
            padding: '0.35rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isFullscreen ? <Minimize2 size="1rem" /> : <Maximize2 size="1rem" />}
        </button>

        {/* Link to Admin Control Panel */}
        <Link
          to="/admin"
          title="Open Admin Control Panel"
          style={{
            background: 'linear-gradient(90deg, #00D2FF 0%, #0088FF 100%)',
            color: '#03081E',
            border: 'none',
            padding: '0.35rem 0.75rem',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            textDecoration: 'none',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.05rem',
          }}
        >
          <Settings size="0.875rem" />
          <span>ADMIN</span>
        </Link>
      </div>
    </div>
  );
}
