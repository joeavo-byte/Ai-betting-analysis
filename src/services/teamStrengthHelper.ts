import type { TeamData, TeamStrength, FormAndStrengthBreakdown } from '../types.ts';

/**
 * Calculates a team's current form index and multi-dimensional strength profile.
 * Incorporates recency weighting (recent fixtures count more heavily),
 * attack/defense power ratings, and streak momentum.
 */
export function calculateTeamStrength(team: TeamData, sport: string = 'football'): TeamStrength {
  if (team.strength && team.strength.overall && team.strength.attack && team.strength.defense) {
    // If team has custom strength provided, ensure formIndex and momentum are synchronized with recentForm
    const formIndex = computeFormIndex(team.recentForm);
    const momentum = determineMomentum(formIndex, team.recentForm);
    const formStreakSummary = getStreakSummary(team.recentForm);
    return {
      ...team.strength,
      formIndex: team.strength.formIndex || formIndex,
      momentum: team.strength.momentum || momentum,
      formStreakSummary: team.strength.formStreakSummary || formStreakSummary,
    };
  }

  // 1. Compute recency-weighted Form Index (0 - 100)
  const formIndex = computeFormIndex(team.recentForm);
  const momentum = determineMomentum(formIndex, team.recentForm);
  const formStreakSummary = getStreakSummary(team.recentForm);

  // 2. Compute Attack and Defense Power based on roster ratings and tactical profiles
  let attack = 82;
  let defense = 80;
  let midfieldOrPace = 81;

  if (team.keyPlayers && team.keyPlayers.length > 0) {
    const attackers = team.keyPlayers.filter((p) => {
      const pos = (p.position || '').toLowerCase();
      return pos.includes('striker') || pos.includes('forward') || pos.includes('wing') || pos.includes('guard') || pos.includes('point');
    });

    const defenders = team.keyPlayers.filter((p) => {
      const pos = (p.position || '').toLowerCase();
      return pos.includes('defen') || pos.includes('back') || pos.includes('keeper') || pos.includes('center') || pos.includes('linebacker');
    });

    const atkSample = attackers.length > 0 ? attackers : team.keyPlayers;
    const defSample = defenders.length > 0 ? defenders : team.keyPlayers;

    const avgAtk = atkSample.reduce((acc, p) => acc + (p.radarStats?.attack || p.rating * 10), 0) / atkSample.length;
    const avgDef = defSample.reduce((acc, p) => acc + (p.radarStats?.defense || p.rating * 9.5), 0) / defSample.length;
    const avgStam = team.keyPlayers.reduce((acc, p) => acc + (p.radarStats?.stamina || 80), 0) / team.keyPlayers.length;

    attack = Math.round(Math.min(99, Math.max(65, avgAtk)));
    defense = Math.round(Math.min(99, Math.max(65, avgDef)));
    midfieldOrPace = Math.round(Math.min(99, Math.max(65, (avgAtk + avgDef + avgStam) / 3)));
  }

  // Derive composite overall rating
  // Form index directly injects a +/- 4 rating swing so cold teams drop and hot teams surge
  const formAdjustment = (formIndex - 60) * 0.08;
  const overall = Math.round(Math.min(99, Math.max(65, (attack * 0.42 + defense * 0.38 + midfieldOrPace * 0.20) + formAdjustment)));

  // Estimate recent goals scored / conceded from form
  const wCount = team.recentForm.filter((f) => f === 'W').length;
  const dCount = team.recentForm.filter((f) => f === 'D').length;
  const lCount = team.recentForm.filter((f) => f === 'L').length;

  const goalsScoredRecent = sport === 'basketball'
    ? Math.round(110 + wCount * 4 - lCount * 3)
    : sport === 'american_football'
    ? Math.round(24 + wCount * 3 - lCount * 2)
    : Math.round(wCount * 2.2 + dCount * 1.0 + lCount * 0.6);

  const goalsConcededRecent = sport === 'basketball'
    ? Math.round(108 - wCount * 3 + lCount * 4)
    : sport === 'american_football'
    ? Math.round(21 - wCount * 2 + lCount * 3)
    : Math.round(lCount * 2.0 + dCount * 1.0 + wCount * 0.5);

  return {
    overall,
    attack,
    defense,
    midfieldOrPace,
    formIndex,
    momentum,
    formStreakSummary,
    goalsScoredRecent,
    goalsConcededRecent,
  };
}

/**
 * Computes a 0 - 100 Form Index with recency weighting.
 * Recent matches are weighted significantly more than earlier fixtures.
 */
function computeFormIndex(formArr: ('W' | 'D' | 'L')[] = []): number {
  if (!formArr || formArr.length === 0) return 55;

  // Weights for up to 5 matches (index 0 is treated as latest fixture)
  const weights = [0.34, 0.26, 0.20, 0.12, 0.08];
  let totalScore = 0;
  let totalWeight = 0;

  for (let i = 0; i < Math.min(formArr.length, weights.length); i++) {
    const res = formArr[i];
    const w = weights[i];
    const val = res === 'W' ? 100 : res === 'D' ? 45 : 10;
    totalScore += val * w;
    totalWeight += w;
  }

  const baseForm = totalWeight > 0 ? totalScore / totalWeight : 55;
  return Math.round(Math.min(99, Math.max(10, baseForm)));
}

function determineMomentum(
  formIndex: number,
  formArr: ('W' | 'D' | 'L')[] = []
): 'Surging' | 'Solid' | 'Slumping' | 'Erratic' {
  // Check immediate streak
  if (formArr[0] === 'W' && formArr[1] === 'W' && formIndex >= 72) return 'Surging';
  if (formArr[0] === 'L' && formArr[1] === 'L' && formIndex < 45) return 'Slumping';
  if (formIndex >= 75) return 'Surging';
  if (formIndex >= 55) return 'Solid';
  if (formIndex < 42) return 'Slumping';
  return 'Erratic';
}

function getStreakSummary(formArr: ('W' | 'D' | 'L')[] = []): string {
  if (!formArr || formArr.length === 0) return 'Form Unrecorded';

  let streakType = formArr[0];
  let streakCount = 0;

  for (const item of formArr) {
    if (item === streakType) {
      streakCount++;
    } else {
      break;
    }
  }

  if (streakType === 'W') {
    return streakCount > 1 ? `${streakCount} Wins Streak 🔥` : 'Won Last Match';
  }
  if (streakType === 'L') {
    return streakCount > 1 ? `${streakCount} Losses Slump ❄️` : 'Lost Last Match';
  }
  return streakCount > 1 ? `${streakCount} Draws in a row` : 'Drew Last Match';
}

/**
 * Compares two teams' current form and multi-dimensional strength,
 * generating expected goals, tactical dynamic clashes, and form verdicts.
 */
export function compareTeamFormAndStrength(
  homeTeam: TeamData,
  awayTeam: TeamData,
  sport: string = 'football',
  customModifiers?: any
): FormAndStrengthBreakdown {
  const homeStrength = calculateTeamStrength(homeTeam, sport);
  const awayStrength = calculateTeamStrength(awayTeam, sport);

  // Apply What-If simulator modifiers if requested
  if (customModifiers?.formMomentumShift === 'Home Surging / Away Slump') {
    homeStrength.formIndex = Math.min(98, homeStrength.formIndex + 22);
    homeStrength.momentum = 'Surging';
    awayStrength.formIndex = Math.max(15, awayStrength.formIndex - 25);
    awayStrength.momentum = 'Slumping';
  } else if (customModifiers?.formMomentumShift === 'Away Surging / Home Slump') {
    homeStrength.formIndex = Math.max(15, homeStrength.formIndex - 25);
    homeStrength.momentum = 'Slumping';
    awayStrength.formIndex = Math.min(98, awayStrength.formIndex + 22);
    awayStrength.momentum = 'Surging';
  } else if (customModifiers?.formMomentumShift === 'Both Peak Form') {
    homeStrength.formIndex = 95;
    homeStrength.momentum = 'Surging';
    awayStrength.formIndex = 92;
    awayStrength.momentum = 'Surging';
  }

  const formDiff = homeStrength.formIndex - awayStrength.formIndex;
  const overallDiff = homeStrength.overall - awayStrength.overall;
  const attackVsDefenseHome = homeStrength.attack - awayStrength.defense;
  const attackVsDefenseAway = awayStrength.attack - homeStrength.defense;

  let strengthAdvantage: 'home' | 'away' | 'balanced' = 'balanced';
  if (overallDiff >= 4 || formDiff >= 15) {
    strengthAdvantage = 'home';
  } else if (overallDiff <= -4 || formDiff <= -15) {
    strengthAdvantage = 'away';
  }

  // Calculate Expected Goals (xG) based on attack-vs-defense and current form
  let homeXG = 1.6;
  let awayXG = 1.1;

  if (sport === 'football') {
    const venueFactor = customModifiers?.venueAdvantage === 'Hostile Cauldron (80,000+ Fans)' ? 1.25 : 1.12;
    const homeFormFactor = 0.85 + (homeStrength.formIndex / 100) * 0.35;
    const awayFormFactor = 0.85 + (awayStrength.formIndex / 100) * 0.35;

    homeXG = (homeStrength.attack / 82) * ((110 - awayStrength.defense) / 28) * homeFormFactor * venueFactor;
    awayXG = (awayStrength.attack / 82) * ((110 - homeStrength.defense) / 32) * awayFormFactor;

    // Weather impact
    if (customModifiers?.weather?.includes('Rain')) {
      homeXG *= 0.90;
      awayXG *= 0.88;
    }

    homeXG = Math.round(Math.min(3.8, Math.max(0.4, homeXG)) * 10) / 10;
    awayXG = Math.round(Math.min(3.5, Math.max(0.3, awayXG)) * 10) / 10;
  } else if (sport === 'basketball') {
    homeXG = Math.round(108 + (homeStrength.overall - 80) * 1.5 + (homeStrength.formIndex - 50) * 0.2);
    awayXG = Math.round(104 + (awayStrength.overall - 80) * 1.5 + (awayStrength.formIndex - 50) * 0.2);
  }

  // Narrative synthesis
  let formClashVerdict = '';
  if (Math.abs(formDiff) >= 20) {
    const hotTeam = formDiff > 0 ? homeTeam.name : awayTeam.name;
    const coldTeam = formDiff > 0 ? awayTeam.name : homeTeam.name;
    const hotForm = formDiff > 0 ? homeStrength.formIndex : awayStrength.formIndex;
    const coldForm = formDiff > 0 ? awayStrength.formIndex : homeStrength.formIndex;
    formClashVerdict = `Severe Form Disparity: ${hotTeam} enters in peak momentum (${hotForm}% form index) having dominated recent fixtures, clashing directly with ${coldTeam}'s noticeable statistical dip (${coldForm}% form).`;
  } else if (homeStrength.momentum === 'Surging' && awayStrength.momentum === 'Surging') {
    formClashVerdict = `High-Voltage Clash: Both sides arrive in scorching form (${homeStrength.formIndex}% vs ${awayStrength.formIndex}%). Historical conversion efficiency will hinge on high-leverage transition duels.`;
  } else if (homeStrength.momentum === 'Slumping' && awayStrength.momentum === 'Slumping') {
    formClashVerdict = `Grudge Match of Vulnerability: Both clubs have struggled for consistency in their last 5 outings (${homeStrength.formIndex}% vs ${awayStrength.formIndex}%), creating a high-variance environment.`;
  } else {
    formClashVerdict = `Balanced Form Profile: ${homeTeam.name} (${homeStrength.formIndex}% form, ${homeStrength.momentum}) and ${awayTeam.name} (${awayStrength.formIndex}% form, ${awayStrength.momentum}) exhibit comparable operational rhythm.`;
  }

  const attackVsDefenseDynamic = attackVsDefenseHome > 6
    ? `${homeTeam.name}'s attack (${homeStrength.attack}) possesses a distinct tactical edge over ${awayTeam.name}'s defense (${awayStrength.defense}), projecting sustained pressure in high-danger zones.`
    : attackVsDefenseAway > 6
    ? `${awayTeam.name}'s attack (${awayStrength.attack}) presents serious transitional danger to ${homeTeam.name}'s backline (${homeStrength.defense}).`
    : `Both attacks and defensive systems project a tightly contested territorial stalemate with minimal tactical separation.`;

  const momentumDifferential = `${homeTeam.name} (${homeStrength.momentum} - ${homeStrength.formStreakSummary}) vs ${awayTeam.name} (${awayStrength.momentum} - ${awayStrength.formStreakSummary})`;

  return {
    homeStrength,
    awayStrength,
    formClashVerdict,
    strengthAdvantage,
    attackVsDefenseDynamic,
    momentumDifferential,
    expectedGoals: {
      home: homeXG,
      away: awayXG,
    },
  };
}
