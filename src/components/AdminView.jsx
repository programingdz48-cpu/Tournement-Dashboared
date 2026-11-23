import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../context/TournamentContext';
import BracketTree from './BracketTree';
import { HeaderGeometricPattern } from './common/AcademicThemeDecorations';
import { 
  Trophy, 
  Tv, 
  UserPlus, 
  Trash2, 
  RotateCcw, 
  Sparkles,
  Users,
  Edit2,
  Check,
  X,
  Layers,
  ListPlus,
  Home
} from 'lucide-react';

export default function AdminView() {
  const { 
    participants, 
    bracketData, 
    setMatchWinner, 
    addParticipant, 
    deleteParticipant, 
    updateParticipant, 
    resetBracket 
  } = useTournament();

  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#10B981');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [multiAddMode, setMultiAddMode] = useState(false);

  const colorOptions = [
    '#10B981', // green
    '#1E1B4B', // navy
    '#D946EF', // magenta
    '#0284C7', // blue
    '#06B6D4', // cyan
    '#F472B6', // pink
    '#DC2626', // red
    '#F59E0B', // amber
    '#4F46E5', // indigo
    '#84CC16', // lime
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!newName.trim()) return;

    setIsSubmitting(true);
    addParticipant(newName.trim(), newColor);
    setNewName('');

    const nextIdx = (colorOptions.indexOf(newColor) + 1) % colorOptions.length;
    setNewColor(colorOptions[nextIdx]);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  const handleEditSubmit = (id) => {
    if (!editName.trim()) return;
    updateParticipant(id, { name: editName.trim() });
    setEditingId(null);
    setEditName('');
  };

  const champion = bracketData.champion;
  const activeCount = participants.filter((p) => p && p.name && p.name.trim() !== '').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header Banner matching the design */}
      <header
        style={{
          height: '5rem',
          padding: '0 2rem',
          backgroundColor: '#062548',
          backgroundImage: 'linear-gradient(90deg, #051D38 0%, #0B3560 50%, #072343 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          boxShadow: '0 0.25rem 1rem rgba(5, 29, 56, 0.25)',
        }}
      >
        <HeaderGeometricPattern />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                لوحة التحكم والإدارة (Admin Panel)
              </h1>
              <span
                style={{
                  fontSize: '0.6875rem',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                  border: '0.0625rem solid rgba(56, 189, 248, 0.4)',
                  color: '#BAE6FD',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Layers size="0.6875rem" />
                <span>حجم الشجرة: {bracketData.bracketSize} مقاعد ({activeCount} متسابق)</span>
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              التحكم بمن سيفوز، إضافة أو مسح المتسابقين، والتأهل الأوتوماتيكي
            </div>
          </div>
        </div>

        {/* Top Right Actions */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => {
              if (window.confirm('هل تريد إعادة تعيين المتسابقين والمباريات إلى الحالة الافتراضية؟')) {
                resetBracket();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '0.0625rem solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size="0.875rem" />
            <span>إعادة التعيين</span>
          </button>

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: '#0284C7',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: 700,
              boxShadow: '0 0.125rem 0.5rem rgba(2, 132, 199, 0.3)',
            }}
          >
            <Tv size="1rem" />
            <span>عرض الشاشة العامة (Dashboard)</span>
          </Link>
        </div>
      </header>

      {/* Cyan Accent Stripe */}
      <div
        style={{
          height: '0.25rem',
          background: 'linear-gradient(90deg, #0284C7 0%, #38BDF8 50%, #00A3E0 100%)',
          position: 'sticky',
          top: '5rem',
          zIndex: 30,
        }}
      />

      {/* Main Container */}
      <main style={{ padding: '1.5rem 2rem', maxWidth: '96rem', margin: '0 auto', width: '100%' }}>
        {/* Helper Banner */}
        <div
          style={{
            padding: '0.875rem 1.25rem',
            borderRadius: '0.5rem',
            backgroundColor: '#EFF6FF',
            border: '0.0625rem solid #BFDBFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size="1.25rem" color="#0284C7" />
            <div style={{ fontSize: '0.875rem', color: '#0369A1', fontWeight: 600 }}>
              💡 <strong>التحكم المباشر:</strong> اضغط على أي متسابق داخل المربع لتحديده كفائز، وسيقوم النظام بنقله أوتوماتيكياً للدور التالي لملاقاة الفائز الآخر!
            </div>
          </div>
          {champion && (
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#B45309' }}>
              👑 البطل المتوج: {champion.name}
            </div>
          )}
        </div>

        {/* 1. Interactive Tournament Bracket with Click-To-Win */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0.75rem',
            padding: '1.5rem 1rem',
            boxShadow: '0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05)',
            border: '0.0625rem solid #E2E8F0',
            marginBottom: '2rem',
            overflowX: 'auto',
          }}
        >
          <div
            style={{
              padding: '0 1rem 0.75rem 1rem',
              borderBottom: '0.0625rem solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                مخطط المباريات التفاعلي (اضغط على الفائز للتأهل أوتوماتيكياً)
              </h2>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              كل متسابق في خانة مستقلة تماماً
            </span>
          </div>

          <BracketTree
            bracketData={bracketData}
            isAdmin={true}
            onSelectWinner={setMatchWinner}
          />
        </div>

        {/* 2. Contestant Management */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2fr',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {/* Add Contestant Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              boxShadow: '0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05)',
              border: '0.0625rem solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {multiAddMode ? 'إضافة مجموعة متسابقين دفعة واحدة' : 'إضافة متسابق جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setMultiAddMode(!multiAddMode)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {multiAddMode ? 'إضافة فردية' : 'إضافة عدة أسماء معاً'}
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                  {multiAddMode ? 'اكتب أو الصق الأسماء (اسم في كل سطر أو مفصولة بفاصلة)' : 'اسم المتسابق'}
                </label>
                {multiAddMode ? (
                  <textarea
                    rows={4}
                    required
                    placeholder={'Ahmed\nMohamed\nKarim\nSami'}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      border: '0.0625rem solid #CBD5E1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    required
                    placeholder="مثال: Catman أو BoYata"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      border: '0.0625rem solid #CBD5E1',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                  لون الشريط الجانبي للمتسابق
                </label>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewColor(c)}
                      style={{
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '0.25rem',
                        backgroundColor: c,
                        border: newColor === c ? '0.125rem solid #0F172A' : '0.0625rem solid transparent',
                        cursor: 'pointer',
                        transform: newColor === c ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.15s ease',
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    title="اختر لوناً مخصصاً"
                    style={{
                      width: '1.75rem',
                      height: '1.75rem',
                      borderRadius: '0.25rem',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem',
                  borderRadius: '0.375rem',
                  backgroundColor: isSubmitting ? '#94A3B8' : '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                {multiAddMode ? <ListPlus size="1rem" /> : <UserPlus size="1rem" />}
                <span>{isSubmitting ? 'جار الإضافة...' : multiAddMode ? 'إضافة كل المتسابقين' : 'إضافة المتسابق الآن'}</span>
              </button>
            </form>
          </div>

          {/* List of Current Contestants */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              boxShadow: '0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05)',
              border: '0.0625rem solid #E2E8F0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                قائمة المتسابقين المشاركين ({participants.length})
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                يمكنك مسح أي متسابق أو تعديل اسمه مباشرة
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                maxHeight: '26rem',
                overflowY: 'auto',
                paddingRight: '0.25rem',
              }}
            >
              {participants.map((p, idx) => {
                const isEditingThis = editingId === p.id;

                return (
                  <div
                    key={p.id}
                    style={{
                      padding: '0.625rem 0.875rem',
                      borderRadius: '0.5rem',
                      border: '0.0625rem solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', overflow: 'hidden', flex: 1 }}>
                      <div
                        style={{
                          width: '0.3125rem',
                          height: '1.75rem',
                          borderRadius: '0.125rem',
                          backgroundColor: p.color || '#CBD5E1',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                        #{idx + 1}
                      </span>

                      {isEditingThis ? (
                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flex: 1 }}>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            style={{
                              fontSize: '0.8125rem',
                              padding: '0.2rem 0.4rem',
                              borderRadius: '0.25rem',
                              border: '0.0625rem solid #0284C7',
                              width: '100%',
                            }}
                          />
                          <button
                            onClick={() => handleEditSubmit(p.id)}
                            style={{
                              backgroundColor: '#10B981',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                            }}
                            title="حفظ"
                          >
                            <Check size="0.875rem" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            style={{
                              backgroundColor: '#E2E8F0',
                              color: '#64748B',
                              border: 'none',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                            }}
                            title="إلغاء"
                          >
                            <X size="0.875rem" />
                          </button>
                        </div>
                      ) : (
                        <div style={{ overflow: 'hidden' }}>
                          <span
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: '#0F172A',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: 'block',
                            }}
                          >
                            {p.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {!isEditingThis && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingId(p.id);
                            setEditName(p.name);
                          }}
                          style={{
                            background: '#F1F5F9',
                            border: 'none',
                            borderRadius: '0.25rem',
                            color: '#475569',
                            padding: '0.25rem 0.4rem',
                            cursor: 'pointer',
                          }}
                          title="تعديل الاسم"
                        >
                          <Edit2 size="0.75rem" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنت متأكد من مسح المتسابق "${p.name}"؟`)) {
                              deleteParticipant(p.id);
                            }
                          }}
                          style={{
                            background: '#FEE2E2',
                            border: 'none',
                            borderRadius: '0.25rem',
                            color: '#DC2626',
                            padding: '0.25rem 0.4rem',
                            cursor: 'pointer',
                          }}
                          title="مسح المتسابق"
                        >
                          <Trash2 size="0.75rem" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
