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
import logoImg from '../assets/logo.jpg';

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
          minHeight: '4rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#062548',
          backgroundImage: 'linear-gradient(90deg, #051D38 0%, #0B3560 50%, #072343 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          position: 'relative',
          zIndex: 25,
          boxShadow: '0 0.25rem 1rem rgba(5, 29, 56, 0.25)',
        }}
      >
        {/* Subtle Islamic Geometric Tessellation Pattern */}
        <HeaderGeometricPattern />

        {/* Title: English & Arabic */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h1
            className="dash-header-title"
            style={{
              fontSize: 'clamp(0.7rem, 2.5vw, 1.25rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '0.02rem',
              textShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              flexWrap: 'wrap',
            }}
          >
            <span>TOURNAMENT BRACKET</span>
            <span style={{ color: '#38BDF8', opacity: 0.8 }}>/</span>
            <span style={{ fontFamily: 'Cairo, sans-serif' }}>لوحة عرض التصفيات</span>
          </h1>

          {champion && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                border: '0.0625rem solid #F59E0B',
                color: '#FDE68A',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <Trophy size="0.875rem" color="#F59E0B" />
              <span>البطل: {champion.name}</span>
            </div>
          )}
        </div>

        {/* Top-Right Navigation Links */}
        <nav
          className="dash-nav"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 'clamp(0.65rem, 2vw, 0.8125rem)',
              fontWeight: 600,
            }}
          >
            <span>الرئيسية</span>
            <Home size="0.875rem" color="#38BDF8" />
          </Link>

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 'clamp(0.65rem, 2vw, 0.8125rem)',
              fontWeight: 600,
            }}
          >
            <span>المباريات</span>
            <Calendar size="0.875rem" color="#38BDF8" />
          </Link>

          <Link
            to="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#BAE6FD',
              textDecoration: 'none',
              fontSize: 'clamp(0.65rem, 2vw, 0.8125rem)',
              fontWeight: 700,
              padding: '0.2rem 0.5rem',
              borderRadius: '0.25rem',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '0.0625rem solid rgba(56, 189, 248, 0.3)',
            }}
          >
            <span>Admin</span>
            <Settings size="0.875rem" color="#38BDF8" />
          </Link>

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
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
          padding: '1rem 0',
          zIndex: 10,
          overflowY: 'auto',
        }}
      >
        <div className="bracket-scroll-wrapper">
          <div style={{ display: 'inline-block', minWidth: 'max-content', padding: '0 1rem' }}>
            <BracketTree
              bracketData={bracketData}
              isAdmin={false}
            />
          </div>
        </div>
      </main>

      {/* ================= DECORATIVE ARTWORK (MATCHING SCREENSHOT) ================= */}
      {/* Club Logo in the white space above the right-side books (TV & Desktop only) */}
      <div
        className="dashboard-right-logo"
        style={{
          position: 'absolute',
          top: '6.5rem',
          right: '3.5rem',
          width: 'clamp(9rem, 12vw, 15rem)',
          height: 'clamp(9rem, 12vw, 15rem)',
          zIndex: 6,
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <img
          src={logoImg}
          alt="شعار نادي وسطاء الكتاب، القراءة والمطالعة - جامعة جيلالي ليابس"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%',
            filter: 'drop-shadow(0 0.5rem 1.5rem rgba(6, 37, 72, 0.25))',
          }}
        />
      </div>

      {/* 1. Bottom-Left Stack of 3 Blue Hardcover Books & Wave */}
      <BottomLeftBooksWave />

      {/* 2. Right-Side Bookshelf Illustration */}
      <RightBookshelfIllustration />

      {/* 3. Bottom Smooth Cyan/Blue Wave */}
      <BottomWaveCurve />
    </div>
  );
}
