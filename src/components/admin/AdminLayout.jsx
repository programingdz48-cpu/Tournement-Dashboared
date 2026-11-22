import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../../context/TournamentContext';
import UCLStarballLogo from '../common/UCLStarballLogo';
import TvRemoteControl from './TvRemoteControl';
import GroupMatchesTab from './GroupMatchesTab';
import KnockoutManagerTab from './KnockoutManagerTab';
import TeamsManagerTab from './TeamsManagerTab';
import TournamentSettingsTab from './TournamentSettingsTab';
import { 
  Tv, 
  Table, 
  GitBranch, 
  Users, 
  Settings, 
  ExternalLink,
  Shield,
  Radio
} from 'lucide-react';

export default function AdminLayout() {
  const { tournament } = useTournament();
  const [activeTab, setActiveTab] = useState('matches'); // 'matches' | 'bracket' | 'teams' | 'settings'

  const tabs = [
    { id: 'matches', label: 'GROUP STAGE MATCHES & SCORES', icon: Radio },
    { id: 'bracket', label: '1V1 KNOCKOUT BRACKET MANAGER', icon: GitBranch },
    { id: 'teams', label: 'TEAMS & GROUPS (16 CLUBS)', icon: Users },
    { id: 'settings', label: 'TOURNAMENT SETTINGS', icon: Settings },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#030718',
        backgroundImage: 'radial-gradient(circle at 50% 0%, #0E2055 0%, #050E2A 50%, #030718 100%)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Admin Navigation Header */}
      <header
        style={{
          padding: '1rem 2.5rem',
          backgroundColor: 'rgba(3, 8, 25, 0.9)',
          borderBottom: '0.0625rem solid rgba(0, 210, 255, 0.25)',
          backdropFilter: 'blur(1rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <UCLStarballLogo size="2.75rem" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1
                style={{
                  fontSize: '1.375rem',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '0.1rem',
                  color: '#FFFFFF',
                }}
              >
                {tournament.title}
              </h1>
              <span
                style={{
                  fontFamily: 'var(--font-sports)',
                  fontSize: '0.75rem',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: 'rgba(0, 210, 255, 0.2)',
                  color: '#00D2FF',
                  fontWeight: 800,
                }}
              >
                ADMIN DESK
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.04rem' }}>
              Broadcast Production Console & Live Score Synchronization
            </div>
          </div>
        </div>

        {/* Top Right Quick Jump to TV Broadcast */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(90deg, #00D2FF 0%, #0088FF 100%)',
            color: '#03081E',
            textDecoration: 'none',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.875rem',
            fontWeight: 800,
            letterSpacing: '0.05rem',
            boxShadow: '0 0 1.25rem rgba(0, 210, 255, 0.3)',
          }}
        >
          <Tv size="1.125rem" />
          <span>SWITCH TO TV VIEW (/)</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '1.75rem 2.5rem', maxWidth: '96rem', width: '100%', margin: '0 auto' }}>
        {/* TV Broadcast Remote Control (Sticky / prominent live switcher) */}
        <TvRemoteControl />

        {/* Tab Selector Bar */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            borderBottom: '0.0625rem solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '0.5rem',
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.5rem',
                  backgroundColor: isActive ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
                  border: isActive ? '0.0625rem solid #00D2FF' : '0.0625rem solid transparent',
                  color: isActive ? '#00F0FF' : '#94A3B8',
                  fontFamily: 'var(--font-sports)',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  letterSpacing: '0.06rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size="1.125rem" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div style={{ minHeight: '30rem' }}>
          {activeTab === 'matches' && <GroupMatchesTab />}
          {activeTab === 'bracket' && <KnockoutManagerTab />}
          {activeTab === 'teams' && <TeamsManagerTab />}
          {activeTab === 'settings' && <TournamentSettingsTab />}
        </div>
      </main>
    </div>
  );
}
