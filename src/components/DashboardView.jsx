import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../context/TournamentContext';
import BracketTree from './BracketTree';
import { 
  HeaderGeometricPattern, 
  BottomLeftBooksWave, 
  RightBookshelfIllustration, 
  BottomWaveCurve 
} from './common/AcademicThemeDecorations';
import { 
  Home, 
  Calendar, 
  Settings, 
  Maximize2, 
  Minimize2, 
  Trophy 
} from 'lucide-react';

export default function DashboardView() {
  const { bracketData } = useTournament();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const champion = bracketData.champion;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        backgroundImage: 'linear-gradient(180deg, #E6F0FA 0%, #F4F8FC 35%, #FFFFFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ================= TOP HEADER BANNER ================= */}
      <header
        style={{
          height: '5rem',
          padding: '0 2rem',
          backgroundColor: '#062548',
          backgroundImage: 'linear-gradient(90deg, #051D38 0%, #0B3560 50%, #072343 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 25,
          boxShadow: '0 0.25rem 1rem rgba(5, 29, 56, 0.25)',
        }}
      >
        {/* Subtle Islamic Geometric Tessellation Pattern */}
        <HeaderGeometricPattern />

        {/* Title: English & Arabic */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '0.04rem',
              textShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
            }}
          >
            <span>TOURNAMENT BRACKET DASHBOARD</span>
            <span style={{ color: '#38BDF8', opacity: 0.8 }}>/</span>
            <span style={{ fontFamily: 'Cairo, sans-serif' }}>لوحة عرض جدول المباريات والتصفيات</span>
          </h1>

          {champion && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                border: '0.0625rem solid #F59E0B',
                color: '#FDE68A',
                fontSize: '0.8125rem',
                fontWeight: 700,
              }}
            >
              <Trophy size="0.875rem" color="#F59E0B" />
              <span>البطل: {champion.name}</span>
            </div>
          )}
        </div>

        {/* Top-Right Navigation Links (Matching Screenshot) */}
        <nav
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* 1. Home Link */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 600,
                opacity: 0.95,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.95')}
            >
              <span>الرئيسية</span>
              <Home size="0.9375rem" color="#38BDF8" />
            </Link>

            {/* 2. Matches Link */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 600,
                opacity: 0.95,
                transition: 'opacity 0.2s',
              }}
            >
              <span>المباريات</span>
              <Calendar size="0.9375rem" color="#38BDF8" />
            </Link>

            {/* 3. Admin Control Panel Link */}
            <Link
              to="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: '#BAE6FD',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '0.25rem',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '0.0625rem solid rgba(56, 189, 248, 0.3)',
              }}
            >
              <span>(Admin) لوحة التحكم</span>
              <Settings size="0.9375rem" color="#38BDF8" />
            </Link>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title="ملء الشاشة"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#BAE6FD',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {isFullscreen ? <Minimize2 size="0.9375rem" /> : <Maximize2 size="0.9375rem" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Cyan Accent Stripe Under Header */}
      <div
        style={{
          height: '0.25rem',
          background: 'linear-gradient(90deg, #0284C7 0%, #38BDF8 50%, #00A3E0 100%)',
          position: 'relative',
          zIndex: 25,
          boxShadow: '0 0.0625rem 0.5rem rgba(56, 189, 248, 0.5)',
        }}
      />

      {/* ================= MAIN BRACKET DISPLAY ================= */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '1rem',
          zIndex: 10,
          overflow: 'auto',
        }}
      >
        <BracketTree
          bracketData={bracketData}
          isAdmin={false}
        />
      </main>

      {/* ================= DECORATIVE ARTWORK (MATCHING SCREENSHOT) ================= */}
      {/* 1. Bottom-Left Stack of 3 Blue Hardcover Books & Wave */}
      <BottomLeftBooksWave />

      {/* 2. Right-Side Bookshelf Illustration */}
      <RightBookshelfIllustration />

      {/* 3. Bottom Smooth Cyan/Blue Wave */}
      <BottomWaveCurve />
    </div>
  );
}
