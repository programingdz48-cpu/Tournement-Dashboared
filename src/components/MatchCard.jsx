import React from 'react';

export default function MatchCard({
  match,
  isAdmin = false,
  onSelectWinner,
}) {
  const { player1, player2, winnerId } = match;

  const isPlayer1Winner = Boolean(player1 && player1.id && winnerId === player1.id);
  const isPlayer2Winner = Boolean(player2 && player2.id && winnerId === player2.id);

  const isP1Playable = Boolean(player1 && player1.name && player1.status !== 'no_opponent' && player1.status !== 'tbd');
  const isP2Playable = Boolean(player2 && player2.name && player2.status !== 'no_opponent' && player2.status !== 'tbd');

  const handlePlayerClick = (player) => {
    if (!isAdmin || !player || !player.id) return;
    if (player.status === 'no_opponent' || player.status === 'tbd') return;
    onSelectWinner(match.id, player.id);
  };

  return (
    <div className="bracket-match-card">
      {/* ================= Player 1 Slot ================= */}
      <div
        className={`player-slot ${isPlayer1Winner ? 'is-winner' : ''} ${!isP1Playable ? 'is-empty' : ''} ${isAdmin && isP1Playable ? 'admin-player-button' : ''}`}
        onClick={() => handlePlayerClick(player1)}
        title={isAdmin && isP1Playable ? 'اضغط لتحديده كفائز والتأهل للدور التالي' : ''}
      >
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', flex: 1 }}>
          {/* Color strip on left */}
          <div
            className="player-color-strip"
            style={{
              backgroundColor: isP1Playable ? (player1.color || '#CBD5E1') : 'transparent',
            }}
          />

          {/* Name */}
          <span
            className="player-name"
            style={{
              fontSize: '0.9375rem',
              color: isPlayer1Winner ? '#0F172A' : isP1Playable ? '#334155' : '#94A3B8',
              fontWeight: isPlayer1Winner ? 700 : isP1Playable ? 500 : 400,
              fontStyle: !isP1Playable ? 'italic' : 'normal',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {player1?.name || (player1?.status === 'no_opponent' ? 'No opponent' : 'TBD')}
          </span>

          {/* Badges */}
          {player1?.status === 'disconnected' && (
            <span className="badge-disconnected" style={{ marginLeft: '0.5rem' }}>
              Disconnected
            </span>
          )}
          {player1?.status === 'freewin' && (
            <span className="badge-freewin" style={{ marginLeft: '0.5rem' }}>
              Free win
            </span>
          )}
        </div>

        {/* Score */}
        <span
          className="player-score"
          style={{
            fontSize: '0.9375rem',
            color: isPlayer1Winner ? '#0284C7' : '#94A3B8',
            fontWeight: isPlayer1Winner ? 700 : 400,
            paddingLeft: '0.5rem',
          }}
        >
          {isP1Playable ? (isPlayer1Winner ? 1 : 0) : ''}
        </span>
      </div>

      {/* Divider Line */}
      <div style={{ height: '0.0625rem', backgroundColor: '#F1F5F9' }} />

      {/* ================= Player 2 Slot ================= */}
      <div
        className={`player-slot ${isPlayer2Winner ? 'is-winner' : ''} ${!isP2Playable ? 'is-empty' : ''} ${isAdmin && isP2Playable ? 'admin-player-button' : ''}`}
        onClick={() => handlePlayerClick(player2)}
        title={isAdmin && isP2Playable ? 'اضغط لتحديده كفائز والتأهل للدور التالي' : ''}
      >
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', flex: 1 }}>
          {/* Color strip on left */}
          <div
            className="player-color-strip"
            style={{
              backgroundColor: isP2Playable ? (player2.color || '#CBD5E1') : 'transparent',
            }}
          />

          {/* Name */}
          <span
            className="player-name"
            style={{
              fontSize: '0.9375rem',
              color: isPlayer2Winner ? '#0F172A' : isP2Playable ? '#334155' : '#94A3B8',
              fontWeight: isPlayer2Winner ? 700 : isP2Playable ? 500 : 400,
              fontStyle: !isP2Playable ? 'italic' : 'normal',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {player2?.name || (player2?.status === 'no_opponent' ? 'No opponent' : 'TBD')}
          </span>

          {/* Badges */}
          {player2?.status === 'disconnected' && (
            <span className="badge-disconnected" style={{ marginLeft: '0.5rem' }}>
              Disconnected
            </span>
          )}
          {player2?.status === 'freewin' && (
            <span className="badge-freewin" style={{ marginLeft: '0.5rem' }}>
              Free win
            </span>
          )}
        </div>

        {/* Score */}
        <span
          className="player-score"
          style={{
            fontSize: '0.9375rem',
            color: isPlayer2Winner ? '#0284C7' : '#94A3B8',
            fontWeight: isPlayer2Winner ? 700 : 400,
            paddingLeft: '0.5rem',
          }}
        >
          {isP2Playable ? (isPlayer2Winner ? 1 : 0) : ''}
        </span>
      </div>
    </div>
  );
}
