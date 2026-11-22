import React from 'react';
import MatchCard from './MatchCard';

// Recursive Bracket Node: Renders two child matches on the left, connector lines, and current match on the right
function TreeNode({
  roundIndex,
  matchIndex,
  rounds,
  isAdmin,
  onSelectWinner,
}) {
  const currentRound = rounds[roundIndex];
  const currentMatch = currentRound?.matches[matchIndex];
  if (!currentMatch) return null;

  // Base case: Leaf node (Round 0)
  if (roundIndex === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MatchCard
          match={currentMatch}
          isAdmin={isAdmin}
          onSelectWinner={onSelectWinner}
        />
      </div>
    );
  }

  // Recursive case: Round > 0
  // Left side has the two feeder matches from roundIndex - 1
  const childMatchIndex1 = 2 * matchIndex;
  const childMatchIndex2 = 2 * matchIndex + 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Two Child Branches Stacked Vertically */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%',
          gap: '1.25rem',
        }}
      >
        <TreeNode
          roundIndex={roundIndex - 1}
          matchIndex={childMatchIndex1}
          rounds={rounds}
          isAdmin={isAdmin}
          onSelectWinner={onSelectWinner}
        />
        <TreeNode
          roundIndex={roundIndex - 1}
          matchIndex={childMatchIndex2}
          rounds={rounds}
          isAdmin={isAdmin}
          onSelectWinner={onSelectWinner}
        />
      </div>

      {/* Orthogonal Fork Connector between children and parent */}
      <div
        style={{
          width: '2rem',
          height: '50%',
          minHeight: '4.5rem',
          borderTop: '0.09375rem solid #CBD5E1',
          borderRight: '0.09375rem solid #CBD5E1',
          borderBottom: '0.09375rem solid #CBD5E1',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Horizontal stem into current parent match */}
        <div
          style={{
            position: 'absolute',
            right: '-2rem',
            top: 'calc(50% - 0.046875rem)',
            width: '2rem',
            height: '0.09375rem',
            backgroundColor: '#CBD5E1',
          }}
        />
      </div>

      {/* Current Match Card */}
      <div style={{ marginLeft: '2rem', flexShrink: 0 }}>
        <MatchCard
          match={currentMatch}
          isAdmin={isAdmin}
          onSelectWinner={onSelectWinner}
        />
      </div>
    </div>
  );
}

export default function BracketTree({
  bracketData,
  isAdmin = false,
  onSelectWinner,
}) {
  const { rounds, totalRounds } = bracketData;
  if (!rounds || rounds.length === 0) return null;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        minWidth: 'max-content',
        userSelect: 'none',
      }}
    >
      {/* Top Round Column Headers */}
      <div
        style={{
          display: 'flex',
          marginBottom: '1.25rem',
          paddingBottom: '0.5rem',
          borderBottom: '0.0625rem solid #E2E8F0',
        }}
      >
        {rounds.map((r, idx) => {
          const isFinal = idx === rounds.length - 1;
          return (
            <div
              key={r.roundIndex}
              style={{
                width: '14.5rem',
                marginRight: isFinal ? 0 : '4rem',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: isFinal ? '#F59E0B' : '#64748B',
                letterSpacing: '0.04rem',
              }}
            >
              {r.name}
            </div>
          );
        })}
      </div>

      {/* Recursive Tournament Tree starting from Final Match */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TreeNode
          roundIndex={totalRounds - 1}
          matchIndex={0}
          rounds={rounds}
          isAdmin={isAdmin}
          onSelectWinner={onSelectWinner}
        />
      </div>
    </div>
  );
}
