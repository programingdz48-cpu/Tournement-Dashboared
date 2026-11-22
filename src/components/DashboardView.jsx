import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../context/TournamentContext';
import BracketTree from './BracketTree';
import { Trophy, Settings, Maximize2, Minimize2, Radio, Users } from 'lucide-react';

export default function DashboardView() {
  const { bracketData, participants } = useTournament();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const champion = bracketData.champion;
  const activeParticipantsCount = participants.filter((p) => p && p.name && p.name.trim() !== '').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Simple Navigation & Status Bar */}
      <header
        style={{
          padding: '0.875rem 2rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '0.0625rem solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 0.0625rem 0.25rem rgba(0, 0, 0, 0.04)',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.5rem',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Trophy size="1.25rem" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                TOURNAMENT BRACKET DASHBOARD
              </h1>
              <span
                style={{
                  fontSize: '0.6875rem',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.25rem',
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Users size="0.6875rem" />
                <span>{activeParticipantsCount} متسابق</span>
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              لوحة عرض جدول المباريات والتصفيات (محدثة لحظياً)
            </div>
          </div>
        </div>

        {/* Center: Champion Notice (if determined) */}
        {champion && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: '2rem',
              backgroundColor: '#FEF3C7',
              border: '0.0625rem solid #F59E0B',
              color: '#B45309',
              fontWeight: 700,
              fontSize: '0.875rem',
            }}
          >
            <Trophy size="1rem" color="#D97706" />
            <span>🏆 البطل المتوج: {champion.name}</span>
          </div>
        )}

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Live Sync Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.25rem 0.625rem',
              borderRadius: '1rem',
              backgroundColor: '#F0FDF4',
              border: '0.0625rem solid #86EFAC',
              color: '#16A34A',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            <Radio size="0.75rem" />
            <span>مباشر ومتزامن</span>
          </div>

          <button
            onClick={toggleFullscreen}
            title="ملء الشاشة"
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.45rem',
              color: '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isFullscreen ? <Minimize2 size="1rem" /> : <Maximize2 size="1rem" />}
          </button>

          {/* Link to Admin */}
          <Link
            to="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.45rem 0.875rem',
              borderRadius: '0.375rem',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: 700,
            }}
          >
            <Settings size="0.875rem" />
            <span>لوحة التحكم (Admin)</span>
          </Link>
        </div>
      </header>

      {/* Main Bracket Canvas */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          padding: '1.5rem',
        }}
      >
        <BracketTree
          bracketData={bracketData}
          isAdmin={false}
        />
      </main>
    </div>
  );
}
