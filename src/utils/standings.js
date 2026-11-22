// Pure calculation of group standings according to UEFA Champions League rules
export function calculateStandings(teams, matches, groupId = null) {
  const filteredTeams = groupId 
    ? teams.filter(t => t.group === groupId)
    : teams;

  const standingsMap = {};

  filteredTeams.forEach(team => {
    standingsMap[team.id] = {
      teamId: team.id,
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      form: [], // array of 'W', 'D', 'L'
    };
  });

  // Filter matches for group stage
  const groupMatches = matches.filter(m => m.stage === 'group');

  // Sort matches by matchday or order to determine form
  const sortedMatches = [...groupMatches].sort((a, b) => (a.matchday || 0) - (b.matchday || 0));

  sortedMatches.forEach(match => {
    // Only calculate for Finished or Live matches that have scores
    if (match.status === 'Finished' || match.status === 'Live') {
      const home = standingsMap[match.homeTeamId];
      const away = standingsMap[match.awayTeamId];

      if (home && away) {
        const hScore = Number(match.homeScore) || 0;
        const aScore = Number(match.awayScore) || 0;

        home.played += 1;
        away.played += 1;

        home.goalsFor += hScore;
        home.goalsAgainst += aScore;
        away.goalsFor += aScore;
        away.goalsAgainst += hScore;

        if (hScore > aScore) {
          home.won += 1;
          home.points += 3;
          away.lost += 1;
          home.form.push('W');
          away.form.push('L');
        } else if (hScore === aScore) {
          home.drawn += 1;
          home.points += 1;
          away.drawn += 1;
          away.points += 1;
          home.form.push('D');
          away.form.push('D');
        } else {
          home.lost += 1;
          away.won += 1;
          away.points += 3;
          home.form.push('L');
          away.form.push('W');
        }
      }
    }
  });

  // Calculate GD and trim form to last 5
  Object.values(standingsMap).forEach(s => {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
    s.form = s.form.slice(-5);
  });

  // Group and sort
  const groupNames = Array.from(new Set(filteredTeams.map(t => t.group))).sort();
  const groupedResult = {};

  groupNames.forEach(grp => {
    const groupRows = Object.values(standingsMap)
      .filter(s => s.team.group === grp)
      .sort((a, b) => {
        // Points desc
        if (b.points !== a.points) return b.points - a.points;
        // Goal difference desc
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        // Goals for desc
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        // Team name asc
        return a.team.name.localeCompare(b.team.name);
      });

    // Assign rank and qualification status (Top 2 advance to Knockouts)
    groupRows.forEach((row, index) => {
      row.rank = index + 1;
      row.qualified = index < 2; // Top 2 advance to Round of 16 / QF
      row.consolation = index === 2; // Europa League spot
      row.eliminated = index > 2;
    });

    groupedResult[grp] = groupRows;
  });

  return groupedResult;
}
