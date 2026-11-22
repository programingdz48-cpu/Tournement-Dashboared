import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'dynamic_tournament_bracket_v4';

const DEFAULT_PARTICIPANTS = [
  { id: 'p1', name: 'Catman', color: '#10B981', status: 'normal' },
  { id: 'p2', name: 'AureliUS', color: '#1E1B4B', status: 'disconnected' },
  { id: 'p3', name: 'BoYata', color: '#D946EF', status: 'freewin' },
  { id: 'p4', name: 'woody', color: '#4F46E5', status: 'normal' },
  { id: 'p5', name: 'rqm', color: '#06B6D4', status: 'normal' },
  { id: 'p6', name: 'EG|Tryhard', color: '#FBCFE8', status: 'normal' },
  { id: 'p7', name: 'ElBee', color: '#991B1B', status: 'normal' },
  { id: 'p8', name: 'Bad Boy', color: '#F59E0B', status: 'normal' },
];

const DEFAULT_STATE = {
  tournamentTitle: 'TOURNAMENT BRACKET',
  participants: DEFAULT_PARTICIPANTS,
  winners: {
    'r0_m0': 'p1',
    'r0_m1': 'p3',
    'r0_m2': 'p4',
    'r0_m3': 'p6',
    'r1_m0': 'p1',
    'r1_m1': 'p6',
    'r2_m0': null,
  },
};

const TournamentContext = createContext(null);

export function TournamentProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return DEFAULT_STATE;
  });

  // Automatically persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [state]);

  // Synchronize across browser tabs in real-time
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setState(parsed);
        } catch (err) {
          console.error('Error parsing storage sync:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Helper to find participant by id
  const getParticipant = useCallback(
    (id) => {
      if (!id) return null;
      return state.participants.find((p) => p.id === id) || null;
    },
    [state.participants]
  );

  // Dynamic bracket builder for any number of contestants (2, 3, 4, 5, 8, 12, 16, 24, 32...)
  const bracketData = useMemo(() => {
    const rawList = state.participants.filter((p) => p && p.name && p.name.trim() !== '');
    const count = Math.max(rawList.length, 2);

    // Calculate bracket size as next power of 2
    let bracketSize = 2;
    while (bracketSize < count) {
      bracketSize *= 2;
    }
    if (bracketSize < 4 && count > 1) {
      bracketSize = 4;
    }

    const totalRounds = Math.log2(bracketSize);

    const getRoundName = (roundIdx, total) => {
      const remaining = total - roundIdx;
      if (remaining === 1) return 'Finals';
      if (remaining === 2) return 'Semifinals';
      if (remaining === 3) return 'Quarterfinals';
      if (remaining === 4) return 'Round of 16';
      if (remaining === 5) return 'Round of 32';
      return `Round ${roundIdx + 1}`;
    };

    // Round 0 Matches: strictly one unique player per slot!
    const round0Matches = [];
    const numRound0Matches = bracketSize / 2;

    for (let i = 0; i < numRound0Matches; i++) {
      const p1 = rawList[2 * i] || null;
      const p2 = rawList[2 * i + 1] || null;

      let p1Status = p1 ? (p1.status || 'normal') : 'no_opponent';
      let p2Status = p2 ? (p2.status || 'normal') : 'no_opponent';

      // Bye / Free win handling
      if (p1 && !p2) {
        p1Status = 'freewin';
      } else if (!p1 && p2) {
        p2Status = 'freewin';
      }

      const matchKey = `r0_m${i}`;
      let winnerId = state.winners[matchKey] || null;
      if (!winnerId) {
        if (p1 && !p2) winnerId = p1.id;
        else if (!p1 && p2) winnerId = p2.id;
      }

      round0Matches.push({
        id: matchKey,
        roundIndex: 0,
        matchIndex: i,
        player1: p1 ? { ...p1, status: p1Status } : { id: `empty_0_${2 * i}`, name: '', status: 'no_opponent', color: '#CBD5E1' },
        player2: p2 ? { ...p2, status: p2Status } : { id: `empty_0_${2 * i + 1}`, name: '', status: 'no_opponent', color: '#CBD5E1' },
        winnerId,
      });
    }

    // Build subsequent rounds dynamically
    const allRounds = [
      {
        roundIndex: 0,
        name: getRoundName(0, totalRounds),
        matches: round0Matches,
      },
    ];

    let prevRoundMatches = round0Matches;

    for (let r = 1; r < totalRounds; r++) {
      const numMatches = prevRoundMatches.length / 2;
      const currentMatches = [];

      for (let m = 0; m < numMatches; m++) {
        const prevMatch1 = prevRoundMatches[2 * m];
        const prevMatch2 = prevRoundMatches[2 * m + 1];

        const p1 = prevMatch1 ? getParticipant(prevMatch1.winnerId) : null;
        const p2 = prevMatch2 ? getParticipant(prevMatch2.winnerId) : null;

        const matchKey = `r${r}_m${m}`;
        const winnerId = state.winners[matchKey] || null;

        currentMatches.push({
          id: matchKey,
          roundIndex: r,
          matchIndex: m,
          player1: p1 || { id: `tbd_${r}_${2 * m}`, name: '', status: 'tbd', color: '#CBD5E1' },
          player2: p2 || { id: `tbd_${r}_${2 * m + 1}`, name: '', status: 'tbd', color: '#CBD5E1' },
          winnerId,
        });
      }

      allRounds.push({
        roundIndex: r,
        name: getRoundName(r, totalRounds),
        matches: currentMatches,
      });

      prevRoundMatches = currentMatches;
    }

    const lastRound = allRounds[allRounds.length - 1];
    const finalMatch = lastRound?.matches[0];
    const champion = finalMatch && finalMatch.winnerId ? getParticipant(finalMatch.winnerId) : null;

    return {
      bracketSize,
      totalRounds,
      rounds: allRounds,
      finalMatch,
      champion,
    };
  }, [state.participants, state.winners, getParticipant]);

  // Set match winner and advance to next round
  const setMatchWinner = useCallback((matchId, winnerId) => {
    setState((prev) => {
      const isAlreadyWinner = prev.winners[matchId] === winnerId;
      const newWinnerId = isAlreadyWinner ? null : winnerId;

      const nextWinners = {
        ...prev.winners,
        [matchId]: newWinnerId,
      };

      // Cascade clear downstream if winner changed
      const [rStr, mStr] = matchId.split('_');
      const roundIdx = parseInt(rStr.replace('r', ''), 10);
      const matchIdx = parseInt(mStr.replace('m', ''), 10);

      let curRound = roundIdx + 1;
      let curMatch = Math.floor(matchIdx / 2);

      while (true) {
        const nextKey = `r${curRound}_m${curMatch}`;
        if (nextWinners[nextKey] !== undefined) {
          if (nextWinners[nextKey] === prev.winners[matchId] && newWinnerId !== prev.winners[matchId]) {
            nextWinners[nextKey] = null;
          }
          curRound += 1;
          curMatch = Math.floor(curMatch / 2);
        } else {
          break;
        }
      }

      return {
        ...prev,
        winners: nextWinners,
      };
    });
  }, []);

  // Add a single participant or multiple participants
  const addParticipant = useCallback((names, color = '#10B981') => {
    if (!names) return;

    // Support single name string or array of names or multi-line string
    let namesList = [];
    if (Array.isArray(names)) {
      namesList = names;
    } else if (typeof names === 'string') {
      namesList = names
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (namesList.length === 0) return;

    setState((prev) => {
      const newEntries = namesList.map((name, idx) => ({
        id: 'p_' + Date.now().toString(36) + '_' + idx + '_' + Math.random().toString(36).substring(2, 6),
        name,
        color: color || '#10B981',
        status: 'normal',
      }));

      return {
        ...prev,
        participants: [...prev.participants, ...newEntries],
      };
    });
  }, []);

  // Delete participant
  const deleteParticipant = useCallback((participantId) => {
    setState((prev) => {
      const filtered = prev.participants.filter((p) => p.id !== participantId);
      const cleanedWinners = {};
      Object.entries(prev.winners).forEach(([k, v]) => {
        if (v !== participantId) {
          cleanedWinners[k] = v;
        }
      });

      return {
        ...prev,
        participants: filtered,
        winners: cleanedWinners,
      };
    });
  }, []);

  // Update participant details
  const updateParticipant = useCallback((participantId, updates) => {
    setState((prev) => ({
      ...prev,
      participants: prev.participants.map((p) =>
        p.id === participantId ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  // Reset to default sample
  const resetBracket = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const value = {
    participants: state.participants,
    winners: state.winners,
    bracketData,
    setMatchWinner,
    addParticipant,
    deleteParticipant,
    updateParticipant,
    resetBracket,
    getParticipant,
  };

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
}

export function useTournament() {
  const context = useContext(TournamentContext);
  if (!context) throw new Error('useTournament must be used within TournamentProvider');
  return context;
}
