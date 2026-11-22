import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { 
  Trophy, 
  RotateCcw, 
  Languages, 
  Check, 
  Sparkles, 
  Layers,
  Save,
  AlertTriangle
} from 'lucide-react';

export default function TournamentSettingsTab() {
  const { tournament, updateTournament, resetToDefaultData } = useTournament();
  const [formData, setFormData] = useState({
    title: tournament.title || '',
    subtitle: tournament.subtitle || '',
    season: tournament.season || '',
    stage: tournament.stage || 'GROUP STAGE',
    language: tournament.language || 'en',
    cycleInterval: tournament.cycleInterval || 7,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTournament(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    resetToDefaultData();
    setShowResetConfirm(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '56rem' }}>
      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '0.0625rem solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Trophy size="1.5rem" color="#FFD700" />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                TOURNAMENT BROADCAST CONFIGURATION
              </h2>
              <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
                Manage tournament identity, active phase, and display preferences
              </div>
            </div>
          </div>

          {savedSuccess && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '0.375rem',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '0.0625rem solid #10B981',
                color: '#34D399',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                fontWeight: 700,
              }}
            >
              <Check size="1rem" />
              <span>SAVED & SYNCED TO TV</span>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
          {/* Tournament Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', marginBottom: '0.375rem', fontFamily: 'var(--font-sports)', fontWeight: 700 }}>
              OFFICIAL TOURNAMENT TITLE
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(3, 8, 25, 0.8)',
                border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sports)',
                fontSize: '1rem',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', marginBottom: '0.375rem', fontFamily: 'var(--font-sports)', fontWeight: 700 }}>
              BROADCAST SUBTITLE
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(3, 8, 25, 0.8)',
                border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
                color: '#FFFFFF',
                fontSize: '0.9375rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Season / Edition */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', marginBottom: '0.375rem', fontFamily: 'var(--font-sports)', fontWeight: 700 }}>
              SEASON / EDITION
            </label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(3, 8, 25, 0.8)',
                border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sports)',
                fontSize: '1rem',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>

          {/* Current Stage Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', marginBottom: '0.375rem', fontFamily: 'var(--font-sports)', fontWeight: 700 }}>
              CURRENT ACTIVE STAGE
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(3, 8, 25, 0.8)',
                border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sports)',
                fontSize: '1rem',
                fontWeight: 700,
                outline: 'none',
              }}
            >
              <option value="GROUP STAGE - MATCHDAY 4">GROUP STAGE - MATCHDAY 4</option>
              <option value="GROUP STAGE - MATCHDAY 5">GROUP STAGE - MATCHDAY 5</option>
              <option value="GROUP STAGE - MATCHDAY 6">GROUP STAGE - MATCHDAY 6</option>
              <option value="ROUND OF 16">ROUND OF 16</option>
              <option value="QUARTER-FINALS">QUARTER-FINALS</option>
              <option value="SEMI-FINALS">SEMI-FINALS</option>
              <option value="THE GRAND FINAL">THE GRAND FINAL</option>
              <option value="CHAMPIONS CROWNED">CHAMPIONS CROWNED</option>
            </select>
          </div>

          {/* Language Toggle (English / Arabic RTL) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', marginBottom: '0.375rem', fontFamily: 'var(--font-sports)', fontWeight: 700 }}>
              DISPLAY LANGUAGE & DIRECTION
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'en' })}
                style={{
                  flex: 1,
                  padding: '0.625rem',
                  borderRadius: '0.5rem',
                  backgroundColor: formData.language === 'en' ? '#00D2FF' : 'rgba(3, 8, 25, 0.8)',
                  color: formData.language === 'en' ? '#03081E' : '#FFFFFF',
                  border: formData.language === 'en' ? 'none' : '0.0625rem solid rgba(255, 255, 255, 0.15)',
                  fontFamily: 'var(--font-sports)',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                ENGLISH (LTR)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'ar' })}
                style={{
                  flex: 1,
                  padding: '0.625rem',
                  borderRadius: '0.5rem',
                  backgroundColor: formData.language === 'ar' ? '#00D2FF' : 'rgba(3, 8, 25, 0.8)',
                  color: formData.language === 'ar' ? '#03081E' : '#FFFFFF',
                  border: formData.language === 'ar' ? 'none' : '0.0625rem solid rgba(255, 255, 255, 0.15)',
                  fontFamily: 'var(--font-arabic)',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                العربية (RTL)
              </button>
            </div>
          </div>

          {/* TV Group Cycle Seconds */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', marginBottom: '0.375rem', fontFamily: 'var(--font-sports)', fontWeight: 700 }}>
              TV GROUP ROTATION SPEED (SECONDS)
            </label>
            <input
              type="number"
              min="3"
              max="60"
              value={formData.cycleInterval}
              onChange={(e) => setFormData({ ...formData, cycleInterval: Number(e.target.value) || 7 })}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(3, 8, 25, 0.8)',
                border: '0.0625rem solid rgba(0, 210, 255, 0.3)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sports)',
                fontSize: '1rem',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.75rem',
              borderRadius: '0.5rem',
              background: 'linear-gradient(90deg, #00D2FF 0%, #0088FF 100%)',
              color: '#03081E',
              border: 'none',
              fontFamily: 'var(--font-sports)',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '0.05rem',
            }}
          >
            <Save size="1.125rem" />
            <span>SAVE TOURNAMENT SETTINGS</span>
          </button>
        </div>
      </form>

      {/* Reset Mock Data Section */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem 1.75rem',
          borderRadius: '1rem',
          border: '0.0625rem solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              padding: '0.625rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#EF4444',
            }}
          >
            <RotateCcw size="1.5rem" />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>
              RESTORE INITIAL TOURNAMENT SAMPLE DATA
            </h4>
            <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
              Resets all 16 teams, 4 groups, live scores, and knockout bracket back to factory sample defaults
            </div>
          </div>
        </div>

        {showResetConfirm ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: '#F87171', fontWeight: 700 }}>Confirm Reset?</span>
            <button
              onClick={handleReset}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              YES, RESET DATA
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#CBD5E1',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              CANCEL
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '0.0625rem solid rgba(239, 68, 68, 0.5)',
              color: '#F87171',
              fontFamily: 'var(--font-sports)',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size="1rem" />
            <span>RESET TO DEFAULT DATA</span>
          </button>
        )}
      </div>
    </div>
  );
}
