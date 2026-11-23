import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderGeometricPattern } from './common/AcademicThemeDecorations';
import { Lock, User, KeyRound, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      // Check credentials strictly: username 'remdan', password 'remdanadmin'
      if (username.trim() === 'remdan' && password === 'remdanadmin') {
        localStorage.setItem('tournament_admin_auth', 'true');
        localStorage.setItem('tournament_admin_user', 'remdan');
        onLoginSuccess();
      } else {
        setErrorMsg('اسم المستخدم أو كلمة المرور غير صحيحة');
        setIsSubmitting(false);
      }
    }, 250);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#051D38',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #0B3560 0%, #051D38 60%, #031224 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '1.5rem',
        overflow: 'hidden',
      }}
    >
      <HeaderGeometricPattern />

      {/* Decorative Cyan Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '35rem',
          height: '35rem',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(2, 132, 199, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(3rem)',
        }}
      />

      {/* Login Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '26rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '1rem',
          boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          border: '0.0625rem solid rgba(226, 232, 240, 0.9)',
        }}
      >
        {/* Card Header */}
        <div
          style={{
            padding: '1.75rem 2rem 1.25rem 2rem',
            backgroundColor: '#062548',
            backgroundImage: 'linear-gradient(135deg, #051D38 0%, #0B3560 100%)',
            borderBottom: '0.2rem solid #38BDF8',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '0.0625rem solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto',
            }}
          >
            <Lock size="1.75rem" color="#38BDF8" />
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.02rem',
            }}
          >
            تسجيل دخول الإدارة (Admin Login)
          </h2>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
            الرجاء إدخال بيانات المشرف للوصول إلى لوحة التحكم
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '1.75rem 2rem 2rem 2rem' }}>
          {errorMsg && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                backgroundColor: '#FEF2F2',
                border: '0.0625rem solid #FECACA',
                color: '#DC2626',
                fontSize: '0.8125rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              <AlertCircle size="1rem" flexShrink={0} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Username Input */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#334155',
                  marginBottom: '0.375rem',
                }}
              >
                اسم المستخدم (Username)
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0.875rem',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <User size="1.125rem" />
                </span>
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="remdan"
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem 0.625rem 2.625rem',
                    borderRadius: '0.5rem',
                    border: '0.0625rem solid #CBD5E1',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    direction: 'ltr',
                    backgroundColor: '#F8FAFC',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0284C7')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#334155',
                  marginBottom: '0.375rem',
                }}
              >
                كلمة المرور (Password)
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0.875rem',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <KeyRound size="1.125rem" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.625rem 2.75rem 0.625rem 2.625rem',
                    borderRadius: '0.5rem',
                    border: '0.0625rem solid #CBD5E1',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    direction: 'ltr',
                    backgroundColor: '#F8FAFC',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0284C7')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.875rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff size="1.125rem" /> : <Eye size="1.125rem" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: '#0284C7',
                backgroundImage: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.9375rem',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 0.25rem 0.75rem rgba(2, 132, 199, 0.35)',
                marginTop: '0.5rem',
                transition: 'filter 0.2s',
              }}
              onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.filter = 'brightness(1.08)')}
              onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.filter = 'brightness(1)')}
            >
              <ShieldCheck size="1.125rem" />
              <span>{isSubmitting ? 'جار التحقق...' : 'تسجيل الدخول'}</span>
            </button>
          </form>

          {/* Link back to public Dashboard */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: '#64748B',
                fontSize: '0.8125rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0284C7')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
            >
              <span>العودة إلى شاشة المباريات (Dashboard)</span>
              <ArrowRight size="0.875rem" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
