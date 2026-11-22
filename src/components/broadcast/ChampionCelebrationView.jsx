import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useTournament } from '../../context/TournamentContext';
import TeamBadge from '../common/TeamBadge';
import TrophyIcon from '../common/TrophyIcon';
import { Crown, Sparkles, Award, ShieldCheck, Flame } from 'lucide-react';

export default function ChampionCelebrationView() {
  const { tournament, knockoutBracket, getTeamById } = useTournament();
  const canvasRef = useRef(null);
  const isRtl = tournament.language === 'ar';

  const championTeam = knockoutBracket.championId
    ? getTeamById(knockoutBracket.championId)
    : getTeamById(knockoutBracket.finalMatch?.winnerId) || getTeamById('rma');

  // Trigger continuous celebratory fireworks & confetti
  useEffect(() => {
    let animationFrameId;
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    // First big burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#00D2FF', '#FFFFFF', '#F59E0B', '#3B82F6'],
    });

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const particleCount = 2;
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#00D2FF', '#FFFFFF'],
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#00D2FF', '#FFFFFF'],
      });

      if (Date.now() < animationEnd) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        flex: 1,
        padding: '2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        textAlign: 'center',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* Radial Gold Stadium Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55rem',
          height: '55rem',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.22) 0%, rgba(0, 210, 255, 0.1) 40%, rgba(3, 7, 24, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(3rem)',
        }}
      />

      {/* Top Champions Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.5rem 1.75rem',
          borderRadius: '3rem',
          background: 'linear-gradient(90deg, #FFD700 0%, #F59E0B 100%)',
          boxShadow: '0 0 2rem rgba(255, 215, 0, 0.6)',
          color: '#030718',
          marginBottom: '1rem',
          zIndex: 2,
        }}
      >
        <Crown size="1.5rem" fill="#030718" />
        <span
          style={{
            fontFamily: 'var(--font-sports)',
            fontSize: '1.25rem',
            fontWeight: 900,
            letterSpacing: '0.15rem',
          }}
        >
          {isRtl ? 'أبطال أوروبا لموسم 2026' : 'CHAMPIONS OF EUROPE 2026'}
        </span>
        <Sparkles size="1.25rem" />
      </div>

      {/* Main Champion Presentation Card */}
      <div
        className="glass-panel-gold"
        style={{
          padding: '2.5rem 4rem',
          borderRadius: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          maxWidth: '52rem',
          width: '100%',
          border: '0.125rem solid #FFD700',
          boxShadow: '0 0 4rem rgba(255, 215, 0, 0.35)',
        }}
      >
        {/* Giant Trophy with Team Crest */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <TrophyIcon size="9rem" glow={true} />
          {championTeam && (
            <div
              style={{
                position: 'absolute',
                bottom: '-0.75rem',
                right: '-1.5rem',
                filter: 'drop-shadow(0 0 1.25rem rgba(255, 215, 0, 0.8))',
              }}
            >
              <TeamBadge team={championTeam} size="5.5rem" />
            </div>
          )}
        </div>

        {/* Crowned Club Title */}
        <h1
          style={{
            fontSize: '3.75rem',
            fontWeight: 900,
            lineHeight: 1,
            margin: '0.25rem 0',
            letterSpacing: '0.15rem',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFD700 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 2rem rgba(255, 215, 0, 0.6)',
          }}
        >
          {championTeam ? (isRtl ? (championTeam.nameAr || championTeam.name) : championTeam.name) : 'REAL MADRID CF'}
        </h1>

        <div
          style={{
            fontFamily: 'var(--font-sports)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#CBD5E1',
            letterSpacing: '0.18rem',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}
        >
          {championTeam?.country} • {tournament.subtitle}
        </div>

        {/* Tournament Accolades Summary */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            width: '100%',
            paddingTop: '1.25rem',
            borderTop: '0.0625rem solid rgba(255, 215, 0, 0.3)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.75rem', fontWeight: 900, color: '#FFD700' }}>
              15TH
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.08rem' }}>EUROPEAN CROWNS</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF' }}>
              12 - 0 - 1
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.08rem' }}>TOURNAMENT RECORD</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.75rem', fontWeight: 900, color: '#00D2FF' }}>
              34
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.08rem' }}>GOALS SCORED</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.75rem', fontWeight: 900, color: '#10B981' }}>
              92.3%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.08rem' }}>WIN RATIO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
