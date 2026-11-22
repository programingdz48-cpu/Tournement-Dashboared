import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import TeamBadge from '../common/TeamBadge';
import { Plus, Edit2, Trash2, Check, X, Shield } from 'lucide-react';

export default function TeamsManagerTab() {
  const { teams, addTeam, updateTeam, deleteTeam } = useTournament();
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');
  const [editingTeam, setEditingTeam] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Team Form State
  const [newTeam, setNewTeam] = useState({
    name: '',
    nameAr: '',
    shortCode: '',
    group: 'Group A',
    country: 'Spain',
    primaryColor: '#00D2FF',
    secondaryColor: '#0A1744',
  });

  const groups = ['Group A', 'Group B', 'Group C', 'Group D'];

  const filteredTeams = selectedGroupFilter === 'all'
    ? teams
    : teams.filter((t) => t.group === selectedGroupFilter);

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.shortCode) return;

    const id = newTeam.shortCode.toLowerCase() + '-' + Date.now().toString(36).substring(0, 4);
    addTeam({
      id,
      ...newTeam,
      shortCode: newTeam.shortCode.toUpperCase(),
      accentColor: newTeam.primaryColor,
    });

    setIsAddingNew(false);
    setNewTeam({
      name: '',
      nameAr: '',
      shortCode: '',
      group: 'Group A',
      country: 'Spain',
      primaryColor: '#00D2FF',
      secondaryColor: '#0A1744',
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingTeam) return;
    updateTeam(editingTeam.id, {
      ...editingTeam,
      shortCode: editingTeam.shortCode.toUpperCase(),
      accentColor: editingTeam.primaryColor,
    });
    setEditingTeam(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Bar with Group Filter & Add Team Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Filter pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-sports)', fontSize: '0.8125rem', color: '#94A3B8' }}>
            FILTER BY GROUP:
          </span>
          {['all', ...groups].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroupFilter(grp)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: selectedGroupFilter === grp ? '#00D2FF' : 'rgba(255, 255, 255, 0.08)',
                color: selectedGroupFilter === grp ? '#03081E' : '#E2E8F0',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {grp === 'all' ? 'ALL TEAMS (16)' : grp}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(90deg, #00D2FF 0%, #0088FF 100%)',
            color: '#03081E',
            border: 'none',
            fontFamily: 'var(--font-sports)',
            fontSize: '0.875rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          <Plus size="1rem" />
          <span>ADD NEW TEAM</span>
        </button>
      </div>

      {/* Add New Team Modal / Card */}
      {isAddingNew && (
        <form
          onSubmit={handleAddNew}
          className="glass-panel-cyan"
          style={{ padding: '1.5rem', borderRadius: '1rem', border: '0.0625rem solid #00D2FF' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '0.0625rem solid rgba(0, 210, 255, 0.3)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#00D2FF', fontFamily: 'var(--font-sports)' }}>
              REGISTER NEW TEAM
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size="1.25rem" />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                TEAM NAME (EN)
              </label>
              <input
                type="text"
                required
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                placeholder="e.g. Liverpool FC"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                TEAM NAME (AR)
              </label>
              <input
                type="text"
                value={newTeam.nameAr}
                onChange={(e) => setNewTeam({ ...newTeam, nameAr: e.target.value })}
                placeholder="ليفربول"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                SHORT CODE (3-4 LETTERS)
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={newTeam.shortCode}
                onChange={(e) => setNewTeam({ ...newTeam, shortCode: e.target.value.toUpperCase() })}
                placeholder="LIV"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sports)',
                  fontWeight: 700,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                GROUP ASSIGNMENT
              </label>
              <select
                value={newTeam.group}
                onChange={(e) => setNewTeam({ ...newTeam, group: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                {groups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                COUNTRY
              </label>
              <input
                type="text"
                value={newTeam.country}
                onChange={(e) => setNewTeam({ ...newTeam, country: e.target.value })}
                placeholder="England"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                  PRIMARY COLOR
                </label>
                <input
                  type="color"
                  value={newTeam.primaryColor}
                  onChange={(e) => setNewTeam({ ...newTeam, primaryColor: e.target.value })}
                  style={{ width: '3.5rem', height: '2.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                  SECONDARY COLOR
                </label>
                <input
                  type="color"
                  value={newTeam.secondaryColor}
                  onChange={(e) => setNewTeam({ ...newTeam, secondaryColor: e.target.value })}
                  style={{ width: '3.5rem', height: '2.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#CBD5E1',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '0.375rem',
                backgroundColor: '#00D2FF',
                color: '#03081E',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              SAVE TEAM
            </button>
          </div>
        </form>
      )}

      {/* Edit Team Modal / Card */}
      {editingTeam && (
        <form
          onSubmit={handleUpdate}
          className="glass-panel"
          style={{ padding: '1.5rem', borderRadius: '1rem', border: '0.0625rem solid #FFD700' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '0.0625rem solid rgba(255, 215, 0, 0.3)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#FFD700', fontFamily: 'var(--font-sports)' }}>
              EDIT TEAM: {editingTeam.name}
            </h3>
            <button
              type="button"
              onClick={() => setEditingTeam(null)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size="1.25rem" />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                TEAM NAME (EN)
              </label>
              <input
                type="text"
                required
                value={editingTeam.name}
                onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                TEAM NAME (AR)
              </label>
              <input
                type="text"
                value={editingTeam.nameAr || ''}
                onChange={(e) => setEditingTeam({ ...editingTeam, nameAr: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                SHORT CODE
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={editingTeam.shortCode}
                onChange={(e) => setEditingTeam({ ...editingTeam, shortCode: e.target.value.toUpperCase() })}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sports)',
                  fontWeight: 700,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                GROUP ASSIGNMENT
              </label>
              <select
                value={editingTeam.group}
                onChange={(e) => setEditingTeam({ ...editingTeam, group: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                {groups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                COUNTRY
              </label>
              <input
                type="text"
                value={editingTeam.country || ''}
                onChange={(e) => setEditingTeam({ ...editingTeam, country: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(3, 8, 25, 0.8)',
                  border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                  PRIMARY COLOR
                </label>
                <input
                  type="color"
                  value={editingTeam.primaryColor || '#FFFFFF'}
                  onChange={(e) => setEditingTeam({ ...editingTeam, primaryColor: e.target.value })}
                  style={{ width: '3.5rem', height: '2.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                  SECONDARY COLOR
                </label>
                <input
                  type="color"
                  value={editingTeam.secondaryColor || '#000000'}
                  onChange={(e) => setEditingTeam({ ...editingTeam, secondaryColor: e.target.value })}
                  style={{ width: '3.5rem', height: '2.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setEditingTeam(null)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#CBD5E1',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '0.375rem',
                backgroundColor: '#FFD700',
                color: '#03081E',
                border: 'none',
                fontFamily: 'var(--font-sports)',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              UPDATE TEAM
            </button>
          </div>
        </form>
      )}

      {/* Teams Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="glass-panel"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem',
              borderRadius: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TeamBadge team={team} size="2.5rem" />
              <span
                style={{
                  fontFamily: 'var(--font-sports)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.125rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: 'rgba(0, 210, 255, 0.15)',
                  color: '#00D2FF',
                }}
              >
                {team.group}
              </span>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-sports)', fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>
                {team.name}
              </div>
              {team.nameAr && (
                <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.875rem', color: '#94A3B8' }}>
                  {team.nameAr}
                </div>
              )}
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                {team.shortCode} • {team.country}
              </div>
            </div>

            {/* Colors Preview & Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.5rem',
                borderTop: '0.0625rem solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                <span
                  style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    backgroundColor: team.primaryColor || '#FFFFFF',
                    border: '0.0625rem solid rgba(255, 255, 255, 0.3)',
                  }}
                  title="Primary Color"
                />
                <span
                  style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    backgroundColor: team.secondaryColor || '#000000',
                    border: '0.0625rem solid rgba(255, 255, 255, 0.3)',
                  }}
                  title="Secondary Color"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.375rem' }}>
                <button
                  onClick={() => setEditingTeam(team)}
                  title="Edit Team"
                  style={{
                    padding: '0.35rem',
                    borderRadius: '0.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#E2E8F0',
                    cursor: 'pointer',
                  }}
                >
                  <Edit2 size="0.875rem" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${team.name}?`)) {
                      deleteTeam(team.id);
                    }
                  }}
                  title="Delete Team"
                  style={{
                    padding: '0.35rem',
                    borderRadius: '0.25rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: 'none',
                    color: '#F87171',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size="0.875rem" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
