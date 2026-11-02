import { Match } from '../types.ts';

export const EXPANDED_FIXTURE_LIBRARY: Match[] = [
  // 1. Arsenal vs Chelsea
  {
    id: 'm-pl-ars-che',
    sport: 'football',
    tournament: 'Premier League',
    roundOrStage: 'Matchday 32 Derby',
    date: '2026-05-10',
    time: '16:30 BST',
    venue: 'Emirates Stadium',
    city: 'London',
    country: 'England',
    importanceScore: 97,
    headline: 'London Derby Showdown: High-Press Masters vs Counter-Surge Blues',
    homeTeam: {
      id: 'team-ars',
      name: 'Arsenal',
      shortName: 'ARS',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#DC2626',
      secondaryColor: '#FFFFFF',
      league: 'Premier League (2nd)',
      ranking: '#4 UEFA Club Ranking',
      recentForm: ['W', 'W', 'D', 'W', 'W'],
      recordSummary: '22W - 6D - 3L (Home: 12W - 2D - 1L)',
      tacticalStyle: 'Dominant territorial possession, suffocating rest-defense counter-press, set-piece dominance',
      coach: 'Mikel Arteta',
      keyPlayers: [
        {
          id: 'ars-saka',
          name: 'Bukayo Saka',
          position: 'Right Winger',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'D', 'W', 'W'],
          rating: 8.8,
          keyMetrics: {
            'Goals (All)': 16,
            'Assists': 13,
            'Key Passes / 90': 2.8,
            'Take-ons Won %': '63.2%',
            'Big Chances Created': 14
          },
          radarStats: {
            attack: 93,
            defense: 62,
            clutch: 91,
            consistency: 90,
            stamina: 89,
            tactical: 92
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Tottenham', score: '3-1', statSummary: '1 Goal, 1 Assist, 4 Key Passes', rating: 9.1, date: '2026-04-25' },
            { opponent: 'Aston Villa', score: '2-0', statSummary: '1 Goal, 3 Progressive Carries', rating: 8.5, date: '2026-04-18' }
          ],
          historicalNotes: 'Has 7 goal contributions in 9 London derbies against Chelsea. Deadly when isolating fullbacks 1v1.'
        },
        {
          id: 'ars-odegaard',
          name: 'Martin Ødegaard',
          position: 'Central Attacking Midfielder',
          number: 8,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Norway',
          form: ['W', 'W', 'D', 'W', 'W'],
          rating: 8.7,
          keyMetrics: {
            'Pass Completion': '88.9%',
            'Shot-Creating Actions / 90': 5.4,
            'High Regains': 31,
            'Through Balls Completed': 24
          },
          radarStats: {
            attack: 90,
            defense: 72,
            clutch: 88,
            consistency: 91,
            stamina: 93,
            tactical: 95
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Tottenham', score: '3-1', statSummary: '2 Key Passes, 8 Recoveries, Man of the Match', rating: 8.9, date: '2026-04-25' }
          ],
          historicalNotes: 'Orchestrates the entire right-triangle overload with Saka and White.'
        }
      ]
    },
    awayTeam: {
      id: 'team-che',
      name: 'Chelsea',
      shortName: 'CHE',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#2563EB',
      secondaryColor: '#FFFFFF',
      league: 'Premier League (4th)',
      ranking: '#9 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'L', 'W'],
      recordSummary: '18W - 7D - 6L (Away: 8W - 4D - 3L)',
      tacticalStyle: 'High-speed vertical transitions through Cole Palmer, inverted fullbacks, aggressive midfield ball winning',
      coach: 'Enzo Maresca',
      keyPlayers: [
        {
          id: 'che-palmer',
          name: 'Cole Palmer',
          position: 'Attacking Midfielder / Right',
          number: 20,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'W', 'L', 'W'],
          rating: 8.9,
          keyMetrics: {
            'Goals (All)': 19,
            'Assists': 11,
            'Penalty Conversion': '100% (9/9)',
            'Expected Assists (xA)': 9.4
          },
          radarStats: {
            attack: 94,
            defense: 48,
            clutch: 96,
            consistency: 92,
            stamina: 87,
            tactical: 93
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Man United', score: '2-1', statSummary: '2 Goals (1 free kick), 5 Key passes', rating: 9.4, date: '2026-04-26' }
          ],
          historicalNotes: 'Scores in 72% of big-six meetings. Cold under maximum defensive pressure.'
        },
        {
          id: 'che-caicedo',
          name: 'Moisés Caicedo',
          position: 'Defensive Midfielder',
          number: 25,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Ecuador',
          form: ['W', 'W', 'W', 'L', 'W'],
          rating: 8.4,
          keyMetrics: {
            'Tackles + Interceptions / 90': 5.8,
            'Ground Duels Won %': '66.1%',
            'Pass Accuracy': '91.2%'
          },
          radarStats: {
            attack: 68,
            defense: 91,
            clutch: 85,
            consistency: 89,
            stamina: 94,
            tactical: 89
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Man United', score: '2-1', statSummary: '6 Tackles, 4 Interceptions', rating: 8.3, date: '2026-04-26' }
          ],
          historicalNotes: 'The defensive anchor breaking up central transition counter-attacks.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 10,
      homeWins: 6,
      awayWins: 2,
      draws: 2,
      lastMeetings: [
        { date: '2025-11-23', homeScore: 1, awayScore: 1, winner: 'draw', competition: 'Premier League', topPerformer: 'Cole Palmer' },
        { date: '2025-04-23', homeScore: 5, awayScore: 0, winner: 'home', competition: 'Premier League', topPerformer: 'Martin Ødegaard' }
      ]
    }
  },

  // 2. Real Madrid vs Barcelona (El Clásico)
  {
    id: 'm-ll-rma-bar',
    sport: 'football',
    tournament: 'La Liga EA Sports',
    roundOrStage: 'El Clásico Matchday 35',
    date: '2026-05-17',
    time: '21:00 CEST',
    venue: 'Santiago Bernabéu',
    city: 'Madrid',
    country: 'Spain',
    importanceScore: 100,
    headline: 'El Clásico Title Showdown: The World\'s Biggest Football Rivalry',
    homeTeam: {
      id: 'team-rma',
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#EEEDED',
      secondaryColor: '#DDA032',
      league: 'La Liga (1st)',
      ranking: '#1 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '26W - 4D - 2L',
      tacticalStyle: 'Devastating direct transitions, Vinicius-Mbappe pace combo, high technical midfield control',
      coach: 'Carlo Ancelotti',
      keyPlayers: [
        {
          id: 'rma-vini-clasico',
          name: 'Vinícius Júnior',
          position: 'Left Winger',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'Brazil',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.1,
          keyMetrics: { 'Clásico Goals': 7, 'Assists': 8, 'Top Speed': '35.8 km/h' },
          radarStats: { attack: 97, defense: 45, clutch: 96, consistency: 90, stamina: 92, tactical: 86 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Bayern', score: '2-1', statSummary: '2 Goals', rating: 9.3, date: '2026-04-30' }],
          historicalNotes: 'Historical hat-trick scorer against Barcelona in major finals.'
        }
      ]
    },
    awayTeam: {
      id: 'team-bar',
      name: 'FC Barcelona',
      shortName: 'BAR',
      logo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#004D98',
      secondaryColor: '#A50044',
      league: 'La Liga (2nd)',
      ranking: '#3 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'D'],
      recordSummary: '25W - 5D - 2L',
      tacticalStyle: 'Extreme high defensive offside trap, dynamic wing isolation through Lamine Yamal, central combination play',
      coach: 'Hansi Flick',
      keyPlayers: [
        {
          id: 'bar-lamine',
          name: 'Lamine Yamal',
          position: 'Right Winger',
          number: 19,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Spain',
          form: ['W', 'W', 'W', 'W', 'D'],
          rating: 9.0,
          keyMetrics: { 'Goals (All)': 14, 'Assists': 15, 'Dribble Success %': '71.5%' },
          radarStats: { attack: 95, defense: 55, clutch: 94, consistency: 92, stamina: 90, tactical: 93 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Atletico Madrid', score: '3-1', statSummary: '1 Goal, 2 Assists', rating: 9.5, date: '2026-05-02' }],
          historicalNotes: 'Youngest ever El Clásico scorer, elite crossing precision from the right half-space.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 10,
      homeWins: 5,
      awayWins: 4,
      draws: 1,
      lastMeetings: [
        { date: '2025-10-26', homeScore: 0, awayScore: 4, winner: 'away', competition: 'La Liga', topPerformer: 'Lamine Yamal' },
        { date: '2025-04-21', homeScore: 3, awayScore: 2, winner: 'home', competition: 'La Liga', topPerformer: 'Jude Bellingham' }
      ]
    }
  },

  // 3. LA Lakers vs Golden State Warriors (NBA)
  {
    id: 'm-nba-lal-gsw',
    sport: 'basketball',
    tournament: 'NBA Western Conference Playoffs',
    roundOrStage: 'Western Conference Semifinals Game 7',
    date: '2026-05-14',
    time: '22:00 EDT',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    country: 'USA',
    importanceScore: 98,
    headline: 'LeBron vs Steph Chapter VIII: Game 7 Elimination Clash',
    homeTeam: {
      id: 'team-lal',
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#552583',
      secondaryColor: '#FDB927',
      league: 'NBA Western Conference (3rd)',
      ranking: '#3 Seed',
      recentForm: ['W', 'L', 'W', 'W', 'L'],
      recordSummary: '51W - 31L (Home: 32W - 9L)',
      tacticalStyle: 'Paint dominance, transition bulldozing, pick-and-roll defense anchor with Anthony Davis',
      coach: 'JJ Redick',
      keyPlayers: [
        {
          id: 'lal-lebron',
          name: 'LeBron James',
          position: 'Point Forward',
          number: 23,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'L', 'W', 'W', 'L'],
          rating: 9.1,
          keyMetrics: { 'PPG (Playoffs)': 26.4, 'APG': 9.2, 'RPG': 8.5, 'True Shooting %': '61.4%' },
          radarStats: { attack: 94, defense: 78, clutch: 98, consistency: 94, stamina: 88, tactical: 99 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Warriors Game 6', score: '109-114', statSummary: '31 Pts, 11 Ast, 9 Reb', rating: 9.1, date: '2026-05-11' }],
          historicalNotes: 'Holds highest scoring average in Game 7 history (34.9 PPG). Unmatched clutch basketball IQ.'
        },
        {
          id: 'lal-ad',
          name: 'Anthony Davis',
          position: 'Center / Power Forward',
          number: 3,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'L', 'W', 'W', 'L'],
          rating: 9.2,
          keyMetrics: { 'PPG': 24.8, 'RPG': 13.6, 'BPG': 2.7, 'Defensive Rating': 104.2 },
          radarStats: { attack: 91, defense: 97, clutch: 90, consistency: 89, stamina: 88, tactical: 92 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Warriors Game 6', score: '109-114', statSummary: '22 Pts, 15 Reb, 4 Blk', rating: 8.8, date: '2026-05-11' }],
          historicalNotes: 'Rim protector holding opponents to 41.2% shooting at the rim in postseason.'
        }
      ]
    },
    awayTeam: {
      id: 'team-gsw',
      name: 'Golden State Warriors',
      shortName: 'GSW',
      logo: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#1D428A',
      secondaryColor: '#FFC72C',
      league: 'NBA Western Conference (4th)',
      ranking: '#4 Seed',
      recentForm: ['L', 'W', 'L', 'L', 'W'],
      recordSummary: '49W - 33L (Away: 22W - 19L)',
      tacticalStyle: 'Pace and space, non-stop off-ball relocation gravity, motion passing, split-action screens',
      coach: 'Steve Kerr',
      keyPlayers: [
        {
          id: 'gsw-steph',
          name: 'Stephen Curry',
          position: 'Point Guard',
          number: 30,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['L', 'W', 'L', 'L', 'W'],
          rating: 9.3,
          keyMetrics: { 'PPG (Playoffs)': 28.7, '3PM / Game': 4.8, '3P%': '42.6%', 'Plus/Minus': '+8.4' },
          radarStats: { attack: 98, defense: 64, clutch: 97, consistency: 93, stamina: 96, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Lakers Game 6', score: '114-109', statSummary: '38 Pts, 7 3PM, 6 Ast', rating: 9.6, date: '2026-05-11' }],
          historicalNotes: 'Greatest shooter in sports history. Scored 50 points in his last Game 7 on the road.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 12,
      homeWins: 7,
      awayWins: 5,
      draws: 0,
      lastMeetings: [
        { date: '2026-05-11', homeScore: 109, awayScore: 114, winner: 'away', competition: 'NBA Playoffs', topPerformer: 'Stephen Curry' },
        { date: '2026-05-09', homeScore: 118, awayScore: 112, winner: 'home', competition: 'NBA Playoffs', topPerformer: 'Anthony Davis' }
      ]
    }
  },

  // 4. Tennis: Novak Djokovic vs Daniil Medvedev
  {
    id: 'm-ten-djo-med',
    sport: 'tennis',
    tournament: 'Wimbledon Championships',
    roundOrStage: 'Men\'s Singles Semi-Final',
    date: '2026-07-10',
    time: '14:00 BST',
    venue: 'Centre Court, All England Club',
    city: 'London',
    country: 'United Kingdom',
    importanceScore: 96,
    headline: 'Master Returners Duel: 24-Time Major Champion vs The Hardcourt Wall',
    homeTeam: {
      id: 'ten-djo',
      name: 'Novak Djokovic',
      shortName: 'DJO',
      logo: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#10B981',
      secondaryColor: '#FFFFFF',
      league: 'ATP Tour',
      ranking: 'World No. 3',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '42W - 8L in 2026 (Grass: 9W - 0L)',
      tacticalStyle: 'Unbreakable baseline depth, surgical first-serve placement, clutch tiebreak dominance',
      coach: 'Goran Ivanišević / Marian Vajda',
      keyPlayers: [
        {
          id: 'p-djokovic',
          name: 'Novak Djokovic',
          position: 'Singles Star',
          number: 1,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Serbia',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.3,
          keyMetrics: { '1st Serve Win %': '78.2%', 'Break Points Saved %': '71.0%', 'Return Games Won': '34.2%' },
          radarStats: { attack: 92, defense: 98, clutch: 99, consistency: 97, stamina: 93, tactical: 98 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Taylor Fritz', score: '6-4, 7-6, 6-3', statSummary: '14 Aces, 88% Net points won', rating: 9.2, date: '2026-07-08' }],
          historicalNotes: 'Has won 7 Wimbledon titles and 85% of tiebreaks in major championships.'
        }
      ]
    },
    awayTeam: {
      id: 'ten-med',
      name: 'Daniil Medvedev',
      shortName: 'MED',
      logo: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#3B82F6',
      secondaryColor: '#FFFFFF',
      league: 'ATP Tour',
      ranking: 'World No. 4',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '39W - 11L in 2026 (Grass: 7W - 1L)',
      tacticalStyle: 'Deep return position, flat low-skidding groundstrokes, relentless defensive counter-punching',
      coach: 'Gilles Cervara',
      keyPlayers: [
        {
          id: 'p-medvedev',
          name: 'Daniil Medvedev',
          position: 'Singles Star',
          number: 4,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Individual Neutral Athlete',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 8.9,
          keyMetrics: { '1st Serve Win %': '77.5%', 'Aces / Match': 12.3, 'Unforced Errors / Set': 4.1 },
          radarStats: { attack: 88, defense: 95, clutch: 90, consistency: 93, stamina: 95, tactical: 92 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Holger Rune', score: '7-6, 6-4, 6-2', statSummary: '18 Aces, 3 Breaks of serve', rating: 9.0, date: '2026-07-08' }],
          historicalNotes: 'Known for defeating Djokovic in straight sets at the US Open final with flawless serving.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 15,
      homeWins: 10,
      awayWins: 5,
      draws: 0,
      lastMeetings: [
        { date: '2024-09-10', homeScore: 3, awayScore: 0, winner: 'home', competition: 'US Open Final', topPerformer: 'Novak Djokovic' }
      ]
    }
  },

  // 5. NFL: Kansas City Chiefs vs San Francisco 49ers
  {
    id: 'm-nfl-kc-sf',
    sport: 'american_football',
    tournament: 'NFL Game of the Week',
    roundOrStage: 'Primetime Showdown',
    date: '2026-10-18',
    time: '20:20 EDT',
    venue: 'GEHA Field at Arrowhead Stadium',
    city: 'Kansas City',
    country: 'USA',
    importanceScore: 97,
    headline: 'Super Bowl Heavyweight Rematch: Mahomes Magic vs Shanahan Scheme',
    homeTeam: {
      id: 'team-kc',
      name: 'Kansas City Chiefs',
      shortName: 'KC',
      logo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#E31837',
      secondaryColor: '#FFB81C',
      league: 'NFL AFC West',
      ranking: '#1 AFC Seed',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '6W - 0L',
      tacticalStyle: 'Mahomes improvisation, Spagnuolo blitz packages, high third-down conversion efficiency',
      coach: 'Andy Reid',
      keyPlayers: [
        {
          id: 'kc-mahomes',
          name: 'Patrick Mahomes',
          position: 'Quarterback',
          number: 15,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.5,
          keyMetrics: { 'Passer Rating': 108.4, 'TD/INT': '18 / 3', 'Clutch 4th Qtr Comebacks': 16 },
          radarStats: { attack: 98, defense: 50, clutch: 99, consistency: 94, stamina: 92, tactical: 98 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Ravens', score: '27-20', statSummary: '291 Yds, 2 TD, 0 INT', rating: 9.3, date: '2026-10-05' }],
          historicalNotes: 'Has never lost to the 49ers in his career (4-0, including 2 Super Bowl titles).'
        }
      ]
    },
    awayTeam: {
      id: 'team-sf',
      name: 'San Francisco 49ers',
      shortName: 'SF',
      logo: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#AA0000',
      secondaryColor: '#B3995D',
      league: 'NFL NFC West',
      ranking: '#1 NFC Contender',
      recentForm: ['W', 'W', 'L', 'W', 'W'],
      recordSummary: '5W - 1L',
      tacticalStyle: 'Outside-zone rushing attack with Christian McCaffrey, middle-field play-action, fierce 4-man pass rush',
      coach: 'Kyle Shanahan',
      keyPlayers: [
        {
          id: 'sf-cmc',
          name: 'Christian McCaffrey',
          position: 'Running Back',
          number: 23,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'L', 'W', 'W'],
          rating: 9.3,
          keyMetrics: { 'Scrimmage Yds / Game': 128.5, 'TDs': 9, 'Yards After Contact': 4.2 },
          radarStats: { attack: 96, defense: 60, clutch: 92, consistency: 95, stamina: 94, tactical: 93 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Cowboys', score: '30-24', statSummary: '142 Total Yds, 2 TDs', rating: 9.4, date: '2026-10-08' }],
          historicalNotes: 'Elite dual-threat weapon leading NFL in all-purpose yards and red-zone conversions.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 5,
      homeWins: 4,
      awayWins: 1,
      draws: 0,
      lastMeetings: [
        { date: '2024-02-11', homeScore: 25, awayScore: 22, winner: 'home', competition: 'Super Bowl LVIII', topPerformer: 'Patrick Mahomes' }
      ]
    }
  }
];
