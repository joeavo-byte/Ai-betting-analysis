import type { Match } from '../types.ts';
import { computeStatisticalPrediction } from '../services/statisticalPredictor.ts';

export const EXPANDED_FIXTURE_LIBRARY: Match[] = [
  // ==========================================
  // PREMIER LEAGUE (ENGLAND)
  // ==========================================
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
          keyMetrics: { 'Goals (All)': 16, 'Assists': 13, 'Key Passes / 90': 2.8, 'Take-ons Won %': '63.2%' },
          radarStats: { attack: 93, defense: 62, clutch: 91, consistency: 90, stamina: 89, tactical: 92 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Tottenham', score: '3-1', statSummary: '1 Goal, 1 Assist, 4 Key Passes', rating: 9.1, date: '2026-04-25' }],
          historicalNotes: 'Has 7 goal contributions in 9 London derbies against Chelsea.'
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
          keyMetrics: { 'Pass Completion': '88.9%', 'Shot-Creating Actions / 90': 5.4, 'High Regains': 31 },
          radarStats: { attack: 90, defense: 72, clutch: 88, consistency: 91, stamina: 93, tactical: 95 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Tottenham', score: '3-1', statSummary: '2 Key Passes, 8 Recoveries', rating: 8.9, date: '2026-04-25' }],
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
          keyMetrics: { 'Goals (All)': 19, 'Assists': 11, 'Penalty Conversion': '100% (9/9)' },
          radarStats: { attack: 94, defense: 48, clutch: 96, consistency: 92, stamina: 87, tactical: 93 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Man United', score: '2-1', statSummary: '2 Goals (1 free kick), 5 Key passes', rating: 9.4, date: '2026-04-26' }],
          historicalNotes: 'Scores in 72% of big-six meetings. Cold under maximum defensive pressure.'
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
  {
    id: 'm-pl-liv-mci',
    sport: 'football',
    tournament: 'Premier League',
    roundOrStage: 'Title Decider Matchday 34',
    date: '2026-05-17',
    time: '16:30 BST',
    venue: 'Anfield',
    city: 'Liverpool',
    country: 'England',
    importanceScore: 99,
    headline: 'Anfield Title Showdown: Slot Ball Intensity vs Pep\'s Machine',
    homeTeam: {
      id: 'team-liv',
      name: 'Liverpool',
      shortName: 'LIV',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#C8102E',
      secondaryColor: '#F6EB61',
      league: 'Premier League (1st)',
      ranking: '#3 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '24W - 4D - 3L (Home: 14W - 1D - 0L)',
      tacticalStyle: 'High-tempo vertical pressing, inverted full-back delivery, lethal wide cutbacks',
      coach: 'Arne Slot',
      keyPlayers: [
        {
          id: 'liv-salah',
          name: 'Mohamed Salah',
          position: 'Right Winger',
          number: 11,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Egypt',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.1,
          keyMetrics: { 'Goals (All)': 24, 'Assists': 15, 'xG': 21.4, 'Big Chance Conversion': '58%' },
          radarStats: { attack: 97, defense: 42, clutch: 98, consistency: 95, stamina: 92, tactical: 91 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Everton', score: '2-0', statSummary: '1 Goal, 1 Assist, 6 Dribbles', rating: 9.2, date: '2026-05-02' }],
          historicalNotes: 'Has scored 12 career goals against Manchester City, the most of any active player.'
        }
      ]
    },
    awayTeam: {
      id: 'team-mci',
      name: 'Manchester City',
      shortName: 'MCI',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#6CABDD',
      secondaryColor: '#1C2C5B',
      league: 'Premier League (2nd)',
      ranking: '#2 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '23W - 6D - 3L (Away: 10W - 4D - 2L)',
      tacticalStyle: 'Dominant 68% positional control, central overload, Haaland predatory box gravity',
      coach: 'Pep Guardiola',
      keyPlayers: [
        {
          id: 'mci-haaland',
          name: 'Erling Haaland',
          position: 'Striker',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          nationality: 'Norway',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 9.2,
          keyMetrics: { 'Goals (All)': 32, 'xG': 29.8, 'Box Touches / 90': 6.8 },
          radarStats: { attack: 98, defense: 35, clutch: 91, consistency: 94, stamina: 88, tactical: 84 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Newcastle', score: '3-0', statSummary: '2 Goals, 4 Aerial Duels', rating: 9.0, date: '2026-05-03' }],
          historicalNotes: 'Scores every 84 minutes in the Premier League.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 14,
      homeWins: 6,
      awayWins: 3,
      draws: 5,
      lastMeetings: [
        { date: '2025-12-01', homeScore: 2, awayScore: 0, winner: 'home', competition: 'Premier League', topPerformer: 'Mohamed Salah' }
      ]
    }
  },
  {
    id: 'm-pl-mun-tot',
    sport: 'football',
    tournament: 'Premier League',
    roundOrStage: 'Matchday 35',
    date: '2026-05-20',
    time: '20:00 BST',
    venue: 'Old Trafford',
    city: 'Manchester',
    country: 'England',
    importanceScore: 94,
    headline: 'Top-4 Champions League Ticket: Amorim High-Intensity 3-4-3 vs Postecoglou All-Out Attack',
    homeTeam: {
      id: 'team-mun',
      name: 'Manchester United',
      shortName: 'MUN',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#DA291C',
      secondaryColor: '#FBE122',
      league: 'Premier League (5th)',
      ranking: '#11 UEFA Club Ranking',
      recentForm: ['W', 'W', 'L', 'W', 'D'],
      recordSummary: '17W - 6D - 9L',
      tacticalStyle: 'Aggressive 3-4-2-1 counter-press, dynamic wingbacks, direct vertical playmaking',
      coach: 'Rúben Amorim',
      keyPlayers: [
        {
          id: 'mun-bruno',
          name: 'Bruno Fernandes',
          position: 'Attacking Midfielder',
          number: 8,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Portugal',
          form: ['W', 'W', 'L', 'W', 'D'],
          rating: 8.8,
          keyMetrics: { 'Chances Created': 98, 'Goals': 14, 'Assists': 12 },
          radarStats: { attack: 91, defense: 68, clutch: 93, consistency: 89, stamina: 96, tactical: 92 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'West Ham', score: '3-1', statSummary: '1 Goal, 2 Assists', rating: 9.3, date: '2026-05-04' }],
          historicalNotes: 'Leads Europe in total big chances created over the past 3 seasons.'
        }
      ]
    },
    awayTeam: {
      id: 'team-tot',
      name: 'Tottenham Hotspur',
      shortName: 'TOT',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#132257',
      secondaryColor: '#FFFFFF',
      league: 'Premier League (6th)',
      ranking: '#14 UEFA Club Ranking',
      recentForm: ['W', 'L', 'W', 'W', 'D'],
      recordSummary: '16W - 6D - 10L',
      tacticalStyle: 'High-line relentless pressing, inverted wingers, fast one-touch box combinations',
      coach: 'Ange Postecoglou',
      keyPlayers: [
        {
          id: 'tot-son',
          name: 'Son Heung-min',
          position: 'Forward',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'South Korea',
          form: ['W', 'L', 'W', 'W', 'D'],
          rating: 8.7,
          keyMetrics: { 'Goals': 17, 'Shot Conversion': '24%', 'Fast Break xG': 5.2 },
          radarStats: { attack: 92, defense: 45, clutch: 91, consistency: 88, stamina: 89, tactical: 87 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Brighton', score: '2-1', statSummary: '1 Goal, 1 Assist', rating: 8.8, date: '2026-05-03' }],
          historicalNotes: 'Lethal finisher on counter-attacks against aggressive high blocks.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 10,
      homeWins: 4,
      awayWins: 3,
      draws: 3,
      lastMeetings: [
        { date: '2025-10-18', homeScore: 2, awayScore: 2, winner: 'draw', competition: 'Premier League', topPerformer: 'Bruno Fernandes' }
      ]
    }
  },

  // ==========================================
  // LA LIGA (SPAIN)
  // ==========================================
  {
    id: 'm-ll-rma-bar',
    sport: 'football',
    tournament: 'La Liga',
    roundOrStage: 'El Clásico Matchday 33',
    date: '2026-05-12',
    time: '21:00 CEST',
    venue: 'Santiago Bernabéu',
    city: 'Madrid',
    country: 'Spain',
    importanceScore: 100,
    headline: 'El Clásico de Oro: Mbappé & Vinícius vs Lamine Yamal & Lewandowski',
    homeTeam: {
      id: 'team-rma',
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#FFFFFF',
      secondaryColor: '#DDA032',
      league: 'La Liga (1st)',
      ranking: '#1 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '26W - 4D - 2L',
      tacticalStyle: 'Devastating transition speed via Mbappé and Vinícius, elite box midfield arriving with Bellingham',
      coach: 'Carlo Ancelotti',
      keyPlayers: [
        {
          id: 'rma-mbappe',
          name: 'Kylian Mbappé',
          position: 'Forward',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'France',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.4,
          keyMetrics: { 'Goals (All)': 31, 'Top Speed': '36.8 km/h', 'xG per 90': 0.94 },
          radarStats: { attack: 99, defense: 30, clutch: 97, consistency: 95, stamina: 92, tactical: 88 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Sevilla', score: '3-0', statSummary: '2 Goals, 4 Dribbles', rating: 9.4, date: '2026-05-03' }],
          historicalNotes: 'Historical tormentor of high defensive lines in marquee derbies.'
        }
      ]
    },
    awayTeam: {
      id: 'team-bar',
      name: 'Barcelona',
      shortName: 'BAR',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#004D98',
      secondaryColor: '#A50044',
      league: 'La Liga (2nd)',
      ranking: '#5 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '25W - 3D - 4L',
      tacticalStyle: 'Flick high-tempo vertical pressing, extreme offside trap trap-line, Lamine Yamal magic on the right wing',
      coach: 'Hansi Flick',
      keyPlayers: [
        {
          id: 'bar-yamal',
          name: 'Lamine Yamal',
          position: 'Right Winger',
          number: 19,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'Spain',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 9.2,
          keyMetrics: { 'Assists': 16, 'Key Passes': 68, 'Take-on Win %': '71.2%' },
          radarStats: { attack: 96, defense: 54, clutch: 95, consistency: 93, stamina: 88, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Valencia', score: '4-1', statSummary: '1 Goal, 2 Assists, Man of the Match', rating: 9.5, date: '2026-05-02' }],
          historicalNotes: 'Youngest ever El Clásico goalscorer with unmatched 1v1 separation.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 12,
      homeWins: 6,
      awayWins: 5,
      draws: 1,
      lastMeetings: [
        { date: '2025-10-26', homeScore: 0, awayScore: 4, winner: 'away', competition: 'La Liga', topPerformer: 'Lamine Yamal' },
        { date: '2025-04-21', homeScore: 3, awayScore: 2, winner: 'home', competition: 'La Liga', topPerformer: 'Jude Bellingham' }
      ]
    }
  },
  {
    id: 'm-ll-atm-ath',
    sport: 'football',
    tournament: 'La Liga',
    roundOrStage: 'Matchday 34',
    date: '2026-05-16',
    time: '18:30 CEST',
    venue: 'Civitas Metropolitano',
    city: 'Madrid',
    country: 'Spain',
    importanceScore: 93,
    headline: 'Metropolitano Battle: Simeone Steel vs Williams Brothers Lightning',
    homeTeam: {
      id: 'team-atm',
      name: 'Atlético Madrid',
      shortName: 'ATM',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#CB3524',
      secondaryColor: '#FFFFFF',
      league: 'La Liga (3rd)',
      ranking: '#7 UEFA Club Ranking',
      recentForm: ['W', 'D', 'W', 'W', 'L'],
      recordSummary: '20W - 7D - 5L',
      tacticalStyle: 'Disciplined compact 5-3-2 low block, rapid Griezmann orchestration, physical set-piece execution',
      coach: 'Diego Simeone',
      keyPlayers: [
        {
          id: 'atm-griezmann',
          name: 'Antoine Griezmann',
          position: 'Second Striker / Playmaker',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'France',
          form: ['W', 'D', 'W', 'W', 'L'],
          rating: 8.8,
          keyMetrics: { 'Goals + Assists': 27, 'Tackles from Front': 34, 'Passing IQ': '94%' },
          radarStats: { attack: 92, defense: 75, clutch: 93, consistency: 92, stamina: 91, tactical: 97 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Getafe', score: '2-0', statSummary: '1 Goal, 1 Assist', rating: 8.9, date: '2026-05-03' }],
          historicalNotes: 'All-time leading goalscorer in Atlético Madrid history.'
        }
      ]
    },
    awayTeam: {
      id: 'team-ath',
      name: 'Athletic Club',
      shortName: 'ATH',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#EE2524',
      secondaryColor: '#FFFFFF',
      league: 'La Liga (4th)',
      ranking: '#18 UEFA Club Ranking',
      recentForm: ['W', 'W', 'D', 'L', 'W'],
      recordSummary: '18W - 8D - 6L',
      tacticalStyle: 'Relentless flank isolation with Nico Williams, intense Basque pressing, high aerial dominance',
      coach: 'Ernesto Valverde',
      keyPlayers: [
        {
          id: 'ath-nico',
          name: 'Nico Williams',
          position: 'Left Winger',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Spain',
          form: ['W', 'W', 'D', 'L', 'W'],
          rating: 8.8,
          keyMetrics: { 'Successful Dribbles / 90': 4.1, 'Assists': 12, 'Sprint Speed': '35.9 km/h' },
          radarStats: { attack: 94, defense: 51, clutch: 92, consistency: 89, stamina: 92, tactical: 86 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Betis', score: '2-1', statSummary: '1 Goal, 1 Assist', rating: 9.1, date: '2026-05-02' }],
          historicalNotes: 'Euro 2024 final star whose 1v1 burst unbalances tight defensive systems.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 8,
      homeWins: 4,
      awayWins: 3,
      draws: 1,
      lastMeetings: [
        { date: '2025-08-31', homeScore: 1, awayScore: 0, winner: 'home', competition: 'La Liga', topPerformer: 'Ángel Correa' }
      ]
    }
  },

  // ==========================================
  // SERIE A (ITALY)
  // ==========================================
  {
    id: 'm-sa-int-juv',
    sport: 'football',
    tournament: 'Serie A',
    roundOrStage: 'Derby d\'Italia Matchday 33',
    date: '2026-05-09',
    time: '20:45 CEST',
    venue: 'San Siro (Stadio Giuseppe Meazza)',
    city: 'Milan',
    country: 'Italy',
    importanceScore: 98,
    headline: 'Derby d\'Italia: Inzaghi Fluid Machine vs Motta Tactical Renaissance',
    homeTeam: {
      id: 'team-int',
      name: 'Inter Milan',
      shortName: 'INT',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#0068A8',
      secondaryColor: '#000000',
      league: 'Serie A (1st)',
      ranking: '#6 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '24W - 5D - 3L (Home: 13W - 2D - 1L)',
      tacticalStyle: 'Ultra-fluid 3-5-2 with overlapping center-backs, Calhanoglu tempo control, Lautaro-Thuram partnership',
      coach: 'Simone Inzaghi',
      keyPlayers: [
        {
          id: 'int-lautaro',
          name: 'Lautaro Martínez',
          position: 'Striker / Captain',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Argentina',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 9.0,
          keyMetrics: { 'Goals (Serie A)': 23, 'Shot Precision': '64%', 'Pressing Recoveries': 29 },
          radarStats: { attack: 96, defense: 62, clutch: 95, consistency: 93, stamina: 91, tactical: 92 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Lazio', score: '2-0', statSummary: '1 Goal, 1 Assist, 4 Tackles', rating: 8.9, date: '2026-05-02' }],
          historicalNotes: 'Capocannoniere talisman with 8 goals in Derby d\'Italia career fixtures.'
        }
      ]
    },
    awayTeam: {
      id: 'team-juv',
      name: 'Juventus',
      shortName: 'JUV',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      league: 'Serie A (2nd)',
      ranking: '#10 UEFA Club Ranking',
      recentForm: ['W', 'W', 'D', 'W', 'W'],
      recordSummary: '21W - 8D - 3L (Away: 9W - 5D - 2L)',
      tacticalStyle: 'Disciplined ball circulation, high pressing triggers, lethal Yildiz-Vlahovic counter-combinations',
      coach: 'Thiago Motta',
      keyPlayers: [
        {
          id: 'juv-vlahovic',
          name: 'Dušan Vlahović',
          position: 'Center Forward',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Serbia',
          form: ['W', 'W', 'D', 'W', 'W'],
          rating: 8.7,
          keyMetrics: { 'Goals': 18, 'Aerial Duel Win %': '68%', 'Direct Free Kick Goals': 3 },
          radarStats: { attack: 93, defense: 42, clutch: 89, consistency: 88, stamina: 89, tactical: 85 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Bologna', score: '2-1', statSummary: '2 Goals (1 header)', rating: 9.1, date: '2026-05-03' }],
          historicalNotes: 'Physical powerhouse capable of holding up play against Inter\'s three-man defence.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 10,
      homeWins: 4,
      awayWins: 3,
      draws: 3,
      lastMeetings: [
        { date: '2025-10-27', homeScore: 4, awayScore: 4, winner: 'draw', competition: 'Serie A', topPerformer: 'Kenan Yildiz' }
      ]
    }
  },
  {
    id: 'm-sa-mil-nap',
    sport: 'football',
    tournament: 'Serie A',
    roundOrStage: 'Matchday 35',
    date: '2026-05-17',
    time: '20:45 CEST',
    venue: 'San Siro',
    city: 'Milan',
    country: 'Italy',
    importanceScore: 94,
    headline: 'San Siro Clash: Rafael Leão Electric Burst vs Conte Concrete Structure',
    homeTeam: {
      id: 'team-mil',
      name: 'AC Milan',
      shortName: 'MIL',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#FB090B',
      secondaryColor: '#000000',
      league: 'Serie A (4th)',
      ranking: '#12 UEFA Club Ranking',
      recentForm: ['W', 'D', 'W', 'L', 'W'],
      recordSummary: '19W - 6D - 7L',
      tacticalStyle: 'Explosive left-sided transition through Theo Hernández and Leão, dynamic Christian Pulisic half-space runs',
      coach: 'Paulo Fonseca',
      keyPlayers: [
        {
          id: 'mil-leao',
          name: 'Rafael Leão',
          position: 'Left Winger',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'Portugal',
          form: ['W', 'D', 'W', 'L', 'W'],
          rating: 8.9,
          keyMetrics: { 'Completed Dribbles / 90': 4.8, 'Top Speed': '36.5 km/h', 'Goals + Assists': 21 },
          radarStats: { attack: 95, defense: 38, clutch: 92, consistency: 86, stamina: 88, tactical: 84 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Monza', score: '3-0', statSummary: '1 Goal, 2 Assists, 7 Dribbles', rating: 9.3, date: '2026-05-03' }],
          historicalNotes: 'Game-breaker who single-handedly stretches low-block backlines.'
        }
      ]
    },
    awayTeam: {
      id: 'team-nap',
      name: 'Napoli',
      shortName: 'NAP',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#003B70',
      secondaryColor: '#FFFFFF',
      league: 'Serie A (3rd)',
      ranking: '#15 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '22W - 4D - 6L',
      tacticalStyle: 'Conte trademark defensive rigidity, aggressive wingback pressure, Lukaku focal point hold-up',
      coach: 'Antonio Conte',
      keyPlayers: [
        {
          id: 'nap-kvara',
          name: 'Khvicha Kvaratskhelia',
          position: 'Winger / Playmaker',
          number: 77,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Georgia',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 8.9,
          keyMetrics: { 'Take-ons Won': 74, 'Goals': 14, 'Assists': 10 },
          radarStats: { attack: 94, defense: 52, clutch: 93, consistency: 91, stamina: 92, tactical: 90 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Torino', score: '2-0', statSummary: '1 Goal, 5 Key Passes', rating: 9.0, date: '2026-05-02' }],
          historicalNotes: 'Unpredictable two-footed magician adept at cutting inside and finding corners.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 8,
      homeWins: 3,
      awayWins: 3,
      draws: 2,
      lastMeetings: [
        { date: '2025-10-29', homeScore: 0, awayScore: 2, winner: 'away', competition: 'Serie A', topPerformer: 'Lukaku' }
      ]
    }
  },

  // ==========================================
  // BUNDESLIGA (GERMANY)
  // ==========================================
  {
    id: 'm-bl-bay-dor',
    sport: 'football',
    tournament: 'Bundesliga',
    roundOrStage: 'Der Klassiker Matchday 31',
    date: '2026-05-09',
    time: '18:30 CEST',
    venue: 'Allianz Arena',
    city: 'Munich',
    country: 'Germany',
    importanceScore: 98,
    headline: 'Der Klassiker: Harry Kane Golden Boot Chase vs Dortmund Yellow Wall Pride',
    homeTeam: {
      id: 'team-bay',
      name: 'Bayern Munich',
      shortName: 'BAY',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#DC052D',
      secondaryColor: '#FFFFFF',
      league: 'Bundesliga (1st)',
      ranking: '#3 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '24W - 4D - 2L (Home: 13W - 1D - 1L)',
      tacticalStyle: 'Suffocating counter-press, Musiala line-breaking dribbles, Kane deep playmaking and clinical finishing',
      coach: 'Vincent Kompany',
      keyPlayers: [
        {
          id: 'bay-kane',
          name: 'Harry Kane',
          position: 'Striker',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.3,
          keyMetrics: { 'Goals (All)': 36, 'Assists': 14, 'Passing Range Accuracy': '88%' },
          radarStats: { attack: 98, defense: 48, clutch: 96, consistency: 97, stamina: 90, tactical: 96 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Stuttgart', score: '4-0', statSummary: '3 Goals (Hat-trick)', rating: 9.8, date: '2026-05-02' }],
          historicalNotes: 'Has scored in every single Klassiker appearance at the Allianz Arena.'
        },
        {
          id: 'bay-musiala',
          name: 'Jamal Musiala',
          position: 'Attacking Midfielder',
          number: 42,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'Germany',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.1,
          keyMetrics: { 'Tight Space Escapes': '84%', 'Goals': 15, 'Key Passes': 62 },
          radarStats: { attack: 95, defense: 58, clutch: 94, consistency: 92, stamina: 91, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Stuttgart', score: '4-0', statSummary: '1 Goal, 2 Assists, 8 Dribbles', rating: 9.4, date: '2026-05-02' }],
          historicalNotes: 'Regarded as the premiere agile dribbler in world football.'
        }
      ]
    },
    awayTeam: {
      id: 'team-dor',
      name: 'Borussia Dortmund',
      shortName: 'BVB',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#FDE100',
      secondaryColor: '#000000',
      league: 'Bundesliga (3rd)',
      ranking: '#8 UEFA Club Ranking',
      recentForm: ['W', 'W', 'L', 'W', 'D'],
      recordSummary: '19W - 5D - 6L',
      tacticalStyle: 'Vertical counter-striking through Gittens and Brandt, physical midfield presence with Emre Can',
      coach: 'Nuri Şahin',
      keyPlayers: [
        {
          id: 'dor-brandt',
          name: 'Julian Brandt',
          position: 'Attacking Midfielder',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Germany',
          form: ['W', 'W', 'L', 'W', 'D'],
          rating: 8.6,
          keyMetrics: { 'Through Balls': 29, 'Assists': 13, 'Distance Covered / 90': '11.8 km' },
          radarStats: { attack: 88, defense: 60, clutch: 87, consistency: 89, stamina: 93, tactical: 92 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Freiburg', score: '2-1', statSummary: '2 Assists, 4 Key Passes', rating: 8.8, date: '2026-05-03' }],
          historicalNotes: 'Dortmund\'s creative hub who dictates transition tempo.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 12,
      homeWins: 8,
      awayWins: 2,
      draws: 2,
      lastMeetings: [
        { date: '2025-11-30', homeScore: 1, awayScore: 1, winner: 'draw', competition: 'Bundesliga', topPerformer: 'Jamal Musiala' }
      ]
    }
  },
  {
    id: 'm-bl-lev-rbl',
    sport: 'football',
    tournament: 'Bundesliga',
    roundOrStage: 'Matchday 33',
    date: '2026-05-16',
    time: '15:30 CEST',
    venue: 'BayArena',
    city: 'Leverkusen',
    country: 'Germany',
    importanceScore: 94,
    headline: 'BayArena Chess Match: Xabi Alonso Champions DNA vs Red Bull High Octane',
    homeTeam: {
      id: 'team-lev',
      name: 'Bayer Leverkusen',
      shortName: 'B04',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#E32221',
      secondaryColor: '#000000',
      league: 'Bundesliga (2nd)',
      ranking: '#4 UEFA Club Ranking',
      recentForm: ['W', 'W', 'D', 'W', 'W'],
      recordSummary: '22W - 6D - 2L',
      tacticalStyle: 'Patience in possession, sudden vertical switches, late stoppage-time winning conviction',
      coach: 'Xabi Alonso',
      keyPlayers: [
        {
          id: 'lev-wirtz',
          name: 'Florian Wirtz',
          position: 'Attacking Midfielder',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Germany',
          form: ['W', 'W', 'D', 'W', 'W'],
          rating: 9.2,
          keyMetrics: { 'Goals + Assists': 29, 'Key Passes / 90': 3.4, 'xG Created': 14.8 },
          radarStats: { attack: 96, defense: 64, clutch: 97, consistency: 94, stamina: 92, tactical: 96 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Wolfsburg', score: '3-1', statSummary: '1 Goal, 2 Assists', rating: 9.3, date: '2026-05-02' }],
          historicalNotes: 'Bundesliga Player of the Season with extraordinary clutch vision.'
        }
      ]
    },
    awayTeam: {
      id: 'team-rbl',
      name: 'RB Leipzig',
      shortName: 'RBL',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#FFFFFF',
      secondaryColor: '#DD0031',
      league: 'Bundesliga (4th)',
      ranking: '#13 UEFA Club Ranking',
      recentForm: ['W', 'L', 'W', 'W', 'D'],
      recordSummary: '18W - 7D - 5L',
      tacticalStyle: 'Furious gegenpressing, rapid turnover conversion with Šeško and Openda',
      coach: 'Marco Rose',
      keyPlayers: [
        {
          id: 'rbl-sesko',
          name: 'Benjamin Šeško',
          position: 'Striker',
          number: 30,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Slovenia',
          form: ['W', 'L', 'W', 'W', 'D'],
          rating: 8.7,
          keyMetrics: { 'Goals': 17, 'Jump Reach': '2.95m', 'Shot Power': '112 km/h' },
          radarStats: { attack: 92, defense: 44, clutch: 89, consistency: 88, stamina: 91, tactical: 85 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Hoffenheim', score: '2-0', statSummary: '2 Goals', rating: 9.0, date: '2026-05-03' }],
          historicalNotes: 'Tall, rapid physical specimen who thrives on early crosses.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 8,
      homeWins: 4,
      awayWins: 3,
      draws: 1,
      lastMeetings: [
        { date: '2025-08-31', homeScore: 2, awayScore: 3, winner: 'away', competition: 'Bundesliga', topPerformer: 'Openda' }
      ]
    }
  },

  // ==========================================
  // LIGUE 1 (FRANCE)
  // ==========================================
  {
    id: 'm-l1-psg-om',
    sport: 'football',
    tournament: 'Ligue 1',
    roundOrStage: 'Le Classique Matchday 32',
    date: '2026-05-10',
    time: '20:45 CEST',
    venue: 'Parc des Princes',
    city: 'Paris',
    country: 'France',
    importanceScore: 96,
    headline: 'Le Classique Fierce Rivalry: Luis Enrique Youth Wave vs De Zerbi Bold Ambition',
    homeTeam: {
      id: 'team-psg',
      name: 'Paris Saint-Germain',
      shortName: 'PSG',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#004170',
      secondaryColor: '#DA291C',
      league: 'Ligue 1 (1st)',
      ranking: '#5 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'D'],
      recordSummary: '23W - 6D - 1L',
      tacticalStyle: 'Total ball dominance, hyper-dynamic wingers with Barcola and Dembélé, high counter-press',
      coach: 'Luis Enrique',
      keyPlayers: [
        {
          id: 'psg-barcola',
          name: 'Bradley Barcola',
          position: 'Left Winger',
          number: 29,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'France',
          form: ['W', 'W', 'W', 'W', 'D'],
          rating: 8.9,
          keyMetrics: { 'Goals (Ligue 1)': 16, 'Assists': 11, 'Accelerations / 90': 6.2 },
          radarStats: { attack: 94, defense: 55, clutch: 90, consistency: 91, stamina: 92, tactical: 89 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Lille', score: '3-1', statSummary: '1 Goal, 2 Assists', rating: 9.2, date: '2026-05-02' }],
          historicalNotes: 'Ligue 1 breakout superstar leading the league in progressive carries.'
        }
      ]
    },
    awayTeam: {
      id: 'team-om',
      name: 'Marseille',
      shortName: 'OM',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#00A3E0',
      secondaryColor: '#FFFFFF',
      league: 'Ligue 1 (2nd)',
      ranking: '#20 UEFA Club Ranking',
      recentForm: ['W', 'W', 'L', 'W', 'W'],
      recordSummary: '20W - 4D - 6L',
      tacticalStyle: 'De Zerbi possession build-up from deep goalkeeper baiting, Mason Greenwood clinical finishing',
      coach: 'Roberto De Zerbi',
      keyPlayers: [
        {
          id: 'om-greenwood',
          name: 'Mason Greenwood',
          position: 'Right Winger / Forward',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'L', 'W', 'W'],
          rating: 8.8,
          keyMetrics: { 'Goals': 18, 'Shot Conversion': '27%', 'Two-Footed Scoring %': '50/50' },
          radarStats: { attack: 94, defense: 38, clutch: 91, consistency: 90, stamina: 87, tactical: 86 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Lens', score: '3-0', statSummary: '2 Goals', rating: 9.1, date: '2026-05-03' }],
          historicalNotes: 'Deadly finishing from both feet with rapid shot release.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 10,
      homeWins: 7,
      awayWins: 2,
      draws: 1,
      lastMeetings: [
        { date: '2025-10-27', homeScore: 0, awayScore: 3, winner: 'away', competition: 'Ligue 1', topPerformer: 'Bradley Barcola' }
      ]
    }
  },

  // ==========================================
  // BASKETBALL / NBA
  // ==========================================
  {
    id: 'm-nba-lal-gsw',
    sport: 'basketball',
    tournament: 'NBA Playoffs',
    roundOrStage: 'Western Conference Semifinals Game 7',
    date: '2026-05-14',
    time: '22:00 EDT',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    country: 'USA',
    importanceScore: 99,
    headline: 'Epic Rivalry Chapter: LeBron & Anthony Davis vs Steph Curry & Warriors',
    homeTeam: {
      id: 'team-lal',
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#552583',
      secondaryColor: '#FDB927',
      league: 'NBA Western Conference',
      ranking: '#3 Seed West',
      recentForm: ['W', 'W', 'L', 'W', 'W'],
      recordSummary: '48W - 34L',
      tacticalStyle: 'Paint dominance, AD defensive anchor rim deterrence, LeBron pick-and-roll dissection',
      coach: 'JJ Redick',
      keyPlayers: [
        {
          id: 'lal-ad',
          name: 'Anthony Davis',
          position: 'Center / Power Forward',
          number: 3,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'L', 'W', 'W'],
          rating: 9.3,
          keyMetrics: { 'Points/Game': 26.2, 'Rebounds': 12.8, 'Blocks': 2.6, 'Field Goal %': '56.4%' },
          radarStats: { attack: 94, defense: 99, clutch: 93, consistency: 92, stamina: 90, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Warriors', score: '115-112', statSummary: '28 Pts, 15 Reb, 4 Blk', rating: 9.5, date: '2026-05-10' }],
          historicalNotes: 'Dominates paint scoring against smaller Golden State frontline rotations.'
        },
        {
          id: 'lal-lebron',
          name: 'LeBron James',
          position: 'Forward / Floor General',
          number: 23,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'L', 'W', 'W'],
          rating: 9.2,
          keyMetrics: { 'Points/Game': 23.8, 'Assists': 8.6, 'True Shooting %': '61.8%' },
          radarStats: { attack: 94, defense: 78, clutch: 98, consistency: 95, stamina: 89, tactical: 99 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Warriors', score: '115-112', statSummary: '24 Pts, 9 Reb, 11 Ast', rating: 9.4, date: '2026-05-10' }],
          historicalNotes: 'Unrivaled Game 7 experience and late-game possession manipulation.'
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
      league: 'NBA Western Conference',
      ranking: '#6 Seed West',
      recentForm: ['L', 'W', 'W', 'L', 'W'],
      recordSummary: '46W - 36L',
      tacticalStyle: 'Perimeter barrage, Steph off-ball relocation gravity, Draymond defensive quarterbacking',
      coach: 'Steve Kerr',
      keyPlayers: [
        {
          id: 'gsw-curry',
          name: 'Stephen Curry',
          position: 'Point Guard',
          number: 30,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['L', 'W', 'W', 'L', 'W'],
          rating: 9.4,
          keyMetrics: { 'Points/Game': 27.8, '3-Pointers Made / Game': 4.8, '3PT %': '41.8%' },
          radarStats: { attack: 99, defense: 68, clutch: 98, consistency: 93, stamina: 96, tactical: 97 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Lakers', score: '112-115', statSummary: '34 Pts, 7 3PM, 6 Ast', rating: 9.3, date: '2026-05-10' }],
          historicalNotes: 'Greatest shooter in basketball history with unlimited range and game-tilting gravity.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 14,
      homeWins: 8,
      awayWins: 6,
      draws: 0,
      lastMeetings: [
        { date: '2026-05-10', homeScore: 115, awayScore: 112, winner: 'home', competition: 'NBA Playoffs Game 6', topPerformer: 'Anthony Davis' }
      ]
    }
  },
  {
    id: 'm-nba-okc-dal',
    sport: 'basketball',
    tournament: 'NBA Playoffs',
    roundOrStage: 'Western Conference Semifinals',
    date: '2026-05-15',
    time: '20:30 CDT',
    venue: 'Paycom Center',
    city: 'Oklahoma City',
    country: 'USA',
    importanceScore: 97,
    headline: 'Generational MVP Duel: Shai Gilgeous-Alexander Drive Mastery vs Luka Dončić Wizardry',
    homeTeam: {
      id: 'team-okc',
      name: 'Oklahoma City Thunder',
      shortName: 'OKC',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#007AC1',
      secondaryColor: '#EF3B24',
      league: 'NBA Western Conference',
      ranking: '#1 Seed West',
      recentForm: ['W', 'W', 'W', 'W', 'L'],
      recordSummary: '57W - 25L',
      tacticalStyle: 'Tenacious perimeter turnover pressure, five-out spacing, SGA mid-range isolation supremacy',
      coach: 'Mark Daigneault',
      keyPlayers: [
        {
          id: 'okc-sga',
          name: 'Shai Gilgeous-Alexander',
          position: 'Point Guard',
          number: 2,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Canada',
          form: ['W', 'W', 'W', 'W', 'L'],
          rating: 9.4,
          keyMetrics: { 'Points/Game': 30.8, 'Steals': 2.1, 'Free Throw %': '88.5%', 'Drive Points': 16.4 },
          radarStats: { attack: 98, defense: 88, clutch: 97, consistency: 98, stamina: 94, tactical: 95 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Mavericks', score: '118-110', statSummary: '34 Pts, 8 Reb, 7 Ast, 3 Stl', rating: 9.6, date: '2026-05-08' }],
          historicalNotes: 'Most consistent 30-point scorer in modern basketball.'
        }
      ]
    },
    awayTeam: {
      id: 'team-dal',
      name: 'Dallas Mavericks',
      shortName: 'DAL',
      logo: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#00538C',
      secondaryColor: '#002B5E',
      league: 'NBA Western Conference',
      ranking: '#5 Seed West',
      recentForm: ['W', 'L', 'W', 'W', 'W'],
      recordSummary: '50W - 32L',
      tacticalStyle: 'Luka-Kyrie dual wizardry, lob threat rim finishing with Lively, step-back three orchestration',
      coach: 'Jason Kidd',
      keyPlayers: [
        {
          id: 'dal-luka',
          name: 'Luka Dončić',
          position: 'Point Forward',
          number: 77,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Slovenia',
          form: ['W', 'L', 'W', 'W', 'W'],
          rating: 9.5,
          keyMetrics: { 'Points/Game': 32.4, 'Assists': 9.8, 'Rebounds': 9.2, 'Triple-Doubles': 21 },
          radarStats: { attack: 99, defense: 65, clutch: 99, consistency: 94, stamina: 90, tactical: 99 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Thunder', score: '110-118', statSummary: '36 Pts, 11 Reb, 9 Ast', rating: 9.4, date: '2026-05-08' }],
          historicalNotes: 'Historical playoff scoring monster with step-back clutch gene.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 10,
      homeWins: 5,
      awayWins: 5,
      draws: 0,
      lastMeetings: [
        { date: '2026-05-08', homeScore: 118, awayScore: 110, winner: 'home', competition: 'NBA Playoffs Game 2', topPerformer: 'SGA' }
      ]
    }
  },
  {
    id: 'm-nba-bos-den',
    sport: 'basketball',
    tournament: 'NBA Finals',
    roundOrStage: 'Finals Game 1',
    date: '2026-06-04',
    time: '20:30 EDT',
    venue: 'TD Garden',
    city: 'Boston',
    country: 'USA',
    importanceScore: 100,
    headline: 'The Ultimate Heavyweight Finals: Boston Five-Out Perfection vs Jokić Triple-Double Dynasty',
    homeTeam: {
      id: 'team-bos',
      name: 'Boston Celtics',
      shortName: 'BOS',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#007A33',
      secondaryColor: '#BA9653',
      league: 'NBA Eastern Conference',
      ranking: '#1 Overall NBA',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '64W - 18L (Home: 37W - 4L)',
      tacticalStyle: 'Historic 3-point volume, switch-everything defensive perimeter, Tatum & Brown dual wings',
      coach: 'Joe Mazzulla',
      keyPlayers: [
        {
          id: 'bos-tatum',
          name: 'Jayson Tatum',
          position: 'Forward',
          number: 0,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.3,
          keyMetrics: { 'Points/Game': 27.1, 'Rebounds': 8.5, 'Assists': 5.2 },
          radarStats: { attack: 95, defense: 91, clutch: 93, consistency: 93, stamina: 94, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Knicks', score: '116-102', statSummary: '31 Pts, 10 Reb, 6 Ast', rating: 9.4, date: '2026-05-24' }],
          historicalNotes: 'Defending NBA champion carrying Boston\'s two-way punch.'
        }
      ]
    },
    awayTeam: {
      id: 'team-den',
      name: 'Denver Nuggets',
      shortName: 'DEN',
      logo: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#0E2240',
      secondaryColor: '#FEC524',
      league: 'NBA Western Conference',
      ranking: '#2 Overall NBA',
      recentForm: ['W', 'W', 'W', 'L', 'W'],
      recordSummary: '58W - 24L',
      tacticalStyle: 'Jokić high-post playmaking vortex, Murray two-man clutch chemistry, Gordon baseline cutter dunks',
      coach: 'Michael Malone',
      keyPlayers: [
        {
          id: 'den-jokic',
          name: 'Nikola Jokić',
          position: 'Center / Point Center',
          number: 15,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Serbia',
          form: ['W', 'W', 'W', 'L', 'W'],
          rating: 9.8,
          keyMetrics: { 'Points/Game': 28.5, 'Rebounds': 13.2, 'Assists': 9.8, 'True Shooting %': '66.4%' },
          radarStats: { attack: 99, defense: 78, clutch: 99, consistency: 99, stamina: 92, tactical: 100 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Timberwolves', score: '112-106', statSummary: '34 Pts, 16 Reb, 12 Ast', rating: 9.9, date: '2026-05-22' }],
          historicalNotes: '3x NBA MVP widely recognized as the most efficient offensive engine of his era.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 6,
      homeWins: 3,
      awayWins: 3,
      draws: 0,
      lastMeetings: [
        { date: '2026-03-07', homeScore: 109, awayScore: 115, winner: 'away', competition: 'NBA Regular Season', topPerformer: 'Nikola Jokić' }
      ]
    }
  },

  // ==========================================
  // GRAND SLAM TENNIS
  // ==========================================
  {
    id: 'm-ten-alc-sin',
    sport: 'tennis',
    tournament: 'Roland Garros (French Open)',
    roundOrStage: 'Men\'s Singles Final',
    date: '2026-06-07',
    time: '15:00 CEST',
    venue: 'Court Philippe-Chatrier',
    city: 'Paris',
    country: 'France',
    importanceScore: 100,
    headline: 'The Rivalry of the Millennium: Alcaraz Drop-Shot Mastery vs Sinner Baseline Lasers',
    homeTeam: {
      id: 'player-alcaraz',
      name: 'Carlos Alcaraz',
      shortName: 'ALC',
      logo: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#F59E0B',
      secondaryColor: '#10B981',
      league: 'ATP Tour (World #2)',
      ranking: 'World #2',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '4 Grand Slam Titles (2024 RG Champion)',
      tacticalStyle: 'Forehand nuclear power, disguised drop-shot finesse, electrifying court coverage',
      coach: 'Juan Carlos Ferrero',
      keyPlayers: [
        {
          id: 'ten-alc',
          name: 'Carlos Alcaraz',
          position: 'Right-Handed (Two-Handed Backhand)',
          number: 1,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Spain',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.6,
          keyMetrics: { 'Clay Win %': '83.8%', 'Break Points Converted': '46%', 'First Serve Pts Won': '77%' },
          radarStats: { attack: 98, defense: 96, clutch: 98, consistency: 93, stamina: 97, tactical: 96 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Tsitsipas', score: '6-3, 7-6, 6-4', statSummary: '42 Winners, 12 Drop-shot points', rating: 9.6, date: '2026-06-05' }],
          historicalNotes: 'Defending Roland Garros champion having triumphed in a 5-set semifinal thriller in 2024.'
        }
      ]
    },
    awayTeam: {
      id: 'player-sinner',
      name: 'Jannik Sinner',
      shortName: 'SIN',
      logo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#3B82F6',
      secondaryColor: '#FFFFFF',
      league: 'ATP Tour (World #1)',
      ranking: 'World #1',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: 'World No. 1 (Australian & US Open Champion)',
      tacticalStyle: 'Unrelenting baseline speed, heaviest two-handed backhand on tour, upgraded 130mph serve',
      coach: 'Darren Cahill',
      keyPlayers: [
        {
          id: 'ten-sin',
          name: 'Jannik Sinner',
          position: 'Right-Handed (Two-Handed Backhand)',
          number: 1,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Italy',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.7,
          keyMetrics: { 'Hard/Clay Avg Win %': '87.4%', 'Break Points Saved': '74%', 'Ace / Match': 9.2 },
          radarStats: { attack: 99, defense: 94, clutch: 97, consistency: 99, stamina: 95, tactical: 95 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Zverev', score: '6-4, 6-3, 7-5', statSummary: '38 Winners, 6 Unforced Errors', rating: 9.7, date: '2026-06-05' }],
          historicalNotes: 'Reigning ATP World No. 1 who has taken his physical conditioning to elite heights.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 10,
      homeWins: 6,
      awayWins: 4,
      draws: 0,
      lastMeetings: [
        { date: '2024-10-02', homeScore: 2, awayScore: 1, winner: 'home', competition: 'Beijing ATP 500 Final (6-7, 6-4, 7-6)', topPerformer: 'Carlos Alcaraz' },
        { date: '2024-06-07', homeScore: 3, awayScore: 2, winner: 'home', competition: 'Roland Garros SF (2-6, 6-3, 3-6, 6-4, 6-3)', topPerformer: 'Carlos Alcaraz' }
      ]
    }
  },
  {
    id: 'm-ten-djo-med',
    sport: 'tennis',
    tournament: 'Wimbledon Championships',
    roundOrStage: 'Men\'s Semifinal',
    date: '2026-07-10',
    time: '14:00 BST',
    venue: 'Centre Court, All England Club',
    city: 'London',
    country: 'United Kingdom',
    importanceScore: 98,
    headline: 'Centre Court Masterclass: 24-Time Major Champion Djokovic vs Medvedev Chessboard Defense',
    homeTeam: {
      id: 'ten-djo',
      name: 'Novak Djokovic',
      shortName: 'DJO',
      logo: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#10B981',
      secondaryColor: '#FFFFFF',
      league: 'ATP Tour Legend',
      ranking: 'World #4',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '24 Grand Slam Titles (7 Wimbledon Crowns)',
      tacticalStyle: 'Flawless return of serve, surgical change of direction, mental fortress under pressure',
      coach: 'Goran Ivanišević / Boris Becker Alumni',
      keyPlayers: [
        {
          id: 'ten-novak',
          name: 'Novak Djokovic',
          position: 'Right-Handed',
          number: 1,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Serbia',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.5,
          keyMetrics: { 'Return Points Won %': '43.2%', 'Tiebreak Win %': '81.4%', 'Wimbledon Match Record': '97-12' },
          radarStats: { attack: 94, defense: 98, clutch: 100, consistency: 97, stamina: 92, tactical: 100 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Hurkacz', score: '7-6, 7-6, 6-4', statSummary: '36 Winners, 0 Break Points Faced', rating: 9.5, date: '2026-07-08' }],
          historicalNotes: 'The greatest returner and clutch tiebreak player in tennis history.'
        }
      ]
    },
    awayTeam: {
      id: 'ten-med',
      name: 'Daniil Medvedev',
      shortName: 'MED',
      logo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E293B',
      league: 'ATP Tour',
      ranking: 'World #5',
      recentForm: ['W', 'W', 'W', 'W', 'L'],
      recordSummary: 'US Open Champion & 6-Time Major Finalist',
      tacticalStyle: 'Deep return positioning, flat suffocating rhythm, octopus baseline redirection',
      coach: 'Gilles Cervara',
      keyPlayers: [
        {
          id: 'ten-daniil',
          name: 'Daniil Medvedev',
          position: 'Right-Handed',
          number: 1,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Neutral / Russia',
          form: ['W', 'W', 'W', 'W', 'L'],
          rating: 9.1,
          keyMetrics: { 'Rallies 9+ Shots Won': '58%', 'First Serve Speed': '134 mph', 'Aces / Match': 12.1 },
          radarStats: { attack: 90, defense: 97, clutch: 91, consistency: 93, stamina: 95, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Paul', score: '6-4, 6-3, 6-4', statSummary: '44 Winners, 16 Aces', rating: 9.2, date: '2026-07-08' }],
          historicalNotes: 'Defeated Djokovic in straight sets at 2021 US Open Final to deny the Calendar Grand Slam.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 15,
      homeWins: 10,
      awayWins: 5,
      draws: 0,
      lastMeetings: [
        { date: '2023-09-10', homeScore: 3, awayScore: 0, winner: 'home', competition: 'US Open Final (6-3, 7-6, 6-3)', topPerformer: 'Novak Djokovic' }
      ]
    }
  },

  // ==========================================
  // AMERICAN FOOTBALL / NFL
  // ==========================================
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
  },
  {
    id: 'm-nfl-rav-bil',
    sport: 'american_football',
    tournament: 'NFL AFC Showdown',
    roundOrStage: 'Primetime Battle',
    date: '2026-10-25',
    time: '20:15 EDT',
    venue: 'M&T Bank Stadium',
    city: 'Baltimore',
    country: 'USA',
    importanceScore: 96,
    headline: 'MVP Titans Collide: Lamar Jackson Dynamic Electric Ground vs Josh Allen Bazooka Arm',
    homeTeam: {
      id: 'team-bal',
      name: 'Baltimore Ravens',
      shortName: 'BAL',
      logo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#241773',
      secondaryColor: '#000000',
      league: 'NFL AFC North',
      ranking: '#2 AFC Seed',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '6W - 1L',
      tacticalStyle: 'Derrick Henry and Lamar read-option punishing ground attack, high third-down scramble conversion',
      coach: 'John Harbaugh',
      keyPlayers: [
        {
          id: 'bal-lamar',
          name: 'Lamar Jackson',
          position: 'Quarterback',
          number: 8,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.5,
          keyMetrics: { 'Passer Rating': 114.2, 'Rushing Yds / Game': 58.4, 'TDs Total': 19 },
          radarStats: { attack: 99, defense: 45, clutch: 96, consistency: 94, stamina: 96, tactical: 95 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Bengals', score: '38-34', statSummary: '348 Pass Yds, 4 TD, 55 Rush Yds', rating: 9.7, date: '2026-10-12' }],
          historicalNotes: '2x NFL MVP capable of breaking defensive coverages with legs and pinpoint arm.'
        }
      ]
    },
    awayTeam: {
      id: 'team-buf',
      name: 'Buffalo Bills',
      shortName: 'BUF',
      logo: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#00338D',
      secondaryColor: '#C60C30',
      league: 'NFL AFC East',
      ranking: '#3 AFC Seed',
      recentForm: ['W', 'W', 'L', 'W', 'W'],
      recordSummary: '5W - 2L',
      tacticalStyle: 'Josh Allen power running and deep shots, Joe Brady balanced spread offense',
      coach: 'Sean McDermott',
      keyPlayers: [
        {
          id: 'buf-allen',
          name: 'Josh Allen',
          position: 'Quarterback',
          number: 17,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'L', 'W', 'W'],
          rating: 9.4,
          keyMetrics: { 'Total TDs': 21, 'Air Yards / Attempt': 8.8, 'Rushing First Downs': 32 },
          radarStats: { attack: 97, defense: 50, clutch: 95, consistency: 92, stamina: 95, tactical: 93 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Dolphins', score: '30-27', statSummary: '235 Pass Yds, 3 TD, 0 INT', rating: 9.3, date: '2026-10-15' }],
          historicalNotes: 'Unstoppable physical force near the goal line with cannon arm.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 7,
      homeWins: 4,
      awayWins: 3,
      draws: 0,
      lastMeetings: [
        { date: '2024-09-29', homeScore: 35, awayScore: 10, winner: 'home', competition: 'NFL Regular Season', topPerformer: 'Derrick Henry' }
      ]
    }
  },

  // ==========================================
  // UEFA COMPETITIONS (UCL, UEL, UECL, UNL)
  // ==========================================
  {
    id: 'm-ucl-liv-rma',
    sport: 'football',
    tournament: 'UEFA Champions League',
    roundOrStage: 'League Phase Matchday 5',
    date: '2026-11-26',
    time: '20:00 GMT',
    venue: 'Anfield',
    city: 'Liverpool',
    country: 'England',
    importanceScore: 99,
    headline: 'Anfield Under the Lights: Unstoppable Slot Machine vs European Kings Real Madrid',
    homeTeam: {
      id: 'team-liv-ucl',
      name: 'Liverpool',
      shortName: 'LIV',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#C8102E',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Champions League (1st)',
      ranking: '#3 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '17W - 2D - 1L (Home: 9W - 0D - 1L)',
      tacticalStyle: 'Controlled pressing triggers, devastating transitional counter-attacks via Salah & Díaz',
      coach: 'Arne Slot',
      keyPlayers: [
        {
          id: 'ucl-liv-salah',
          name: 'Mohamed Salah',
          position: 'Right Winger',
          number: 11,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Egypt',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.2,
          keyMetrics: { 'UCL G+A': 9, 'Goals (All)': 18, 'Key Passes / 90': 3.2 },
          radarStats: { attack: 97, defense: 54, clutch: 96, consistency: 95, stamina: 90, tactical: 93 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Bayer Leverkusen', score: '4-0', statSummary: '2 Assists, 4 Chances Created', rating: 9.1, date: '2026-11-05' }],
          historicalNotes: 'Directly involved in a goal every 68 minutes in European nights at Anfield.'
        }
      ]
    },
    awayTeam: {
      id: 'team-rma-ucl',
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#FEBE10',
      secondaryColor: '#00529F',
      league: 'UEFA Champions League (12th)',
      ranking: '#1 UEFA Club Ranking',
      recentForm: ['W', 'L', 'W', 'W', 'L'],
      recordSummary: '13W - 3D - 4L (Away: 5W - 2D - 3L)',
      tacticalStyle: 'Explosive vertical counter-thrusts via Mbappé and Bellingham, deep late-game resilience',
      coach: 'Carlo Ancelotti',
      keyPlayers: [
        {
          id: 'ucl-rma-mbappe',
          name: 'Kylian Mbappé',
          position: 'Striker',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'France',
          form: ['W', 'L', 'W', 'W', 'L'],
          rating: 8.9,
          keyMetrics: { 'Sprint Peak (km/h)': 36.8, 'xG / 90': 0.84, 'UCL Goals': 4 },
          radarStats: { attack: 97, defense: 32, clutch: 93, consistency: 87, stamina: 91, tactical: 86 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Leganés', score: '3-0', statSummary: '1 Goal, 5 Shots on Target', rating: 8.8, date: '2026-11-21' }],
          historicalNotes: 'Always threatens high defensive lines in open-field transition.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 11,
      homeWins: 3,
      awayWins: 7,
      draws: 1,
      lastMeetings: [
        { date: '2023-03-15', homeScore: 0, awayScore: 1, winner: 'away', competition: 'UEFA Champions League R16', topPerformer: 'Karim Benzema' }
      ]
    }
  },
  {
    id: 'm-ucl-bay-psg',
    sport: 'football',
    tournament: 'UEFA Champions League',
    roundOrStage: 'League Phase Clash',
    date: '2026-11-26',
    time: '21:00 CET',
    venue: 'Allianz Arena',
    city: 'Munich',
    country: 'Germany',
    importanceScore: 97,
    headline: 'Heavyweight Knockout Tension: Kompany High-Press Bayern vs Enrique Fluid PSG',
    homeTeam: {
      id: 'team-bay-ucl',
      name: 'Bayern Munich',
      shortName: 'BAY',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#DC052D',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Champions League (10th)',
      ranking: '#3 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '15W - 2D - 2L (Home: 9W - 1D - 0L)',
      tacticalStyle: 'Relentless territorial counter-press, Musiala central-pocket overload, Kane finishing',
      coach: 'Vincent Kompany',
      keyPlayers: [
        {
          id: 'ucl-bay-kane',
          name: 'Harry Kane',
          position: 'Striker',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.2,
          keyMetrics: { 'UCL Goals': 7, 'Shot Conversion': '31.4%', 'Key Passes / 90': 2.1 },
          radarStats: { attack: 97, defense: 50, clutch: 94, consistency: 96, stamina: 88, tactical: 95 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Augsburg', score: '3-0', statSummary: 'Hat-trick (3 Goals)', rating: 9.8, date: '2026-11-22' }],
          historicalNotes: 'Lethal from 18 yards and elite link-up play dropping between center-backs.'
        }
      ]
    },
    awayTeam: {
      id: 'team-psg-ucl',
      name: 'Paris Saint-Germain',
      shortName: 'PSG',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#004170',
      secondaryColor: '#DA291C',
      league: 'UEFA Champions League (16th)',
      ranking: '#5 UEFA Club Ranking',
      recentForm: ['W', 'W', 'L', 'W', 'D'],
      recordSummary: '13W - 4D - 3L (Away: 6W - 2D - 2L)',
      tacticalStyle: 'Fluid possession rotation, wide winger isolation via Dembélé & Barcola',
      coach: 'Luis Enrique',
      keyPlayers: [
        {
          id: 'ucl-psg-dembele',
          name: 'Ousmane Dembélé',
          position: 'Right Winger',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'France',
          form: ['W', 'W', 'L', 'W', 'D'],
          rating: 8.7,
          keyMetrics: { 'Progressive Carries / 90': 7.8, 'Take-ons Won': '64%', 'Chances Created': 34 },
          radarStats: { attack: 92, defense: 46, clutch: 85, consistency: 83, stamina: 88, tactical: 86 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Toulouse', score: '3-0', statSummary: '1 Assist, 7 Dribbles', rating: 8.6, date: '2026-11-22' }],
          historicalNotes: 'Two-footed unpredictable ball carrier who stretches compact back fours.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 13,
      homeWins: 7,
      awayWins: 6,
      draws: 0,
      lastMeetings: [
        { date: '2023-03-08', homeScore: 2, awayScore: 0, winner: 'home', competition: 'UEFA Champions League R16', topPerformer: 'Choupo-Moting' }
      ]
    }
  },
  {
    id: 'm-uel-tot-rom',
    sport: 'football',
    tournament: 'UEFA Europa League',
    roundOrStage: 'League Phase Matchday 5',
    date: '2026-11-28',
    time: '20:00 GMT',
    venue: 'Tottenham Hotspur Stadium',
    city: 'London',
    country: 'England',
    importanceScore: 93,
    headline: 'Europa League Heavyweight Showdown: Postecoglou High-Octane Attack vs AS Roma Tactical Grit',
    homeTeam: {
      id: 'team-tot-uel',
      name: 'Tottenham Hotspur',
      shortName: 'TOT',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#132257',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Europa League (4th)',
      ranking: '#14 UEFA Club Ranking',
      recentForm: ['W', 'L', 'W', 'W', 'L'],
      recordSummary: '11W - 2D - 5L (Home: 7W - 0D - 2L)',
      tacticalStyle: 'Ultra-aggressive high defensive line, inverted fullbacks, relentless wave attacks',
      coach: 'Ange Postecoglou',
      keyPlayers: [
        {
          id: 'uel-tot-son',
          name: 'Son Heung-min',
          position: 'Left Forward',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'South Korea',
          form: ['W', 'L', 'W', 'W', 'L'],
          rating: 8.8,
          keyMetrics: { 'xG Overperformance': '+3.9', 'Goals + Assists': 14, 'Sprint Burst': '94%' },
          radarStats: { attack: 93, defense: 48, clutch: 92, consistency: 89, stamina: 90, tactical: 88 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Man City', score: '4-0', statSummary: '1 Assist, Lethal Transition', rating: 8.9, date: '2026-11-23' }],
          historicalNotes: 'Clinical two-footed finisher thriving in North London European nights.'
        }
      ]
    },
    awayTeam: {
      id: 'team-rom-uel',
      name: 'AS Roma',
      shortName: 'ROM',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#8E1F2F',
      secondaryColor: '#F0BC42',
      league: 'UEFA Europa League (18th)',
      ranking: '#9 UEFA Club Ranking',
      recentForm: ['L', 'D', 'L', 'W', 'L'],
      recordSummary: '7W - 5D - 7L (Away: 2W - 3D - 4L)',
      tacticalStyle: 'Mid-block 3-4-2-1 structure relying on Dybala creativity and set-piece aerial battles',
      coach: 'Claudio Ranieri',
      keyPlayers: [
        {
          id: 'uel-rom-dybala',
          name: 'Paulo Dybala',
          position: 'Attacking Midfielder',
          number: 21,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Argentina',
          form: ['L', 'D', 'L', 'W', 'L'],
          rating: 8.5,
          keyMetrics: { 'Key Passes / 90': 3.0, 'Dribble Success': '66%', 'Dead-ball Accuracy': '91%' },
          radarStats: { attack: 89, defense: 40, clutch: 88, consistency: 82, stamina: 76, tactical: 92 },
          injuryStatus: 'minor_knock',
          recentPerformances: [{ opponent: 'Napoli', score: '0-1', statSummary: '2 Chances Created in tight space', rating: 7.7, date: '2026-11-24' }],
          historicalNotes: 'Primary creative spark unlocking compact defenses via half-space passes.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 2,
      homeWins: 1,
      awayWins: 1,
      draws: 0,
      lastMeetings: [
        { date: '2022-07-30', homeScore: 0, awayScore: 1, winner: 'away', competition: 'International Showcase', topPerformer: 'Paulo Dybala' }
      ]
    }
  },
  {
    id: 'm-uel-mun-fen',
    sport: 'football',
    tournament: 'UEFA Europa League',
    roundOrStage: 'League Phase Primetime',
    date: '2026-11-28',
    time: '20:00 GMT',
    venue: 'Old Trafford',
    city: 'Manchester',
    country: 'England',
    importanceScore: 92,
    headline: 'Europa League Grudge Tie: Amorim Resurgent Man United vs Mourinho Tactical Fortress',
    homeTeam: {
      id: 'team-mun-uel',
      name: 'Manchester United',
      shortName: 'MUN',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#DA291C',
      secondaryColor: '#FBE122',
      league: 'UEFA Europa League (7th)',
      ranking: '#11 UEFA Club Ranking',
      recentForm: ['W', 'W', 'D', 'W', 'W'],
      recordSummary: '11W - 5D - 4L (Home: 7W - 2D - 1L)',
      tacticalStyle: '3-4-2-1 high-tempo wing-back overlaps and quick vertical switches through Bruno Fernandes',
      coach: 'Ruben Amorim',
      keyPlayers: [
        {
          id: 'uel-mun-bruno',
          name: 'Bruno Fernandes',
          position: 'Attacking Midfielder',
          number: 8,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Portugal',
          form: ['W', 'W', 'D', 'W', 'W'],
          rating: 8.8,
          keyMetrics: { 'Big Chances Created': 15, 'Through Balls / 90': 2.4, 'Distance (km)': 11.6 },
          radarStats: { attack: 90, defense: 67, clutch: 90, consistency: 89, stamina: 96, tactical: 92 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'PAOK', score: '2-0', statSummary: '1 Assist, 6 Key Passes', rating: 8.7, date: '2026-11-07' }],
          historicalNotes: 'Leads Europa League in progressive passes into the penalty area.'
        }
      ]
    },
    awayTeam: {
      id: 'team-fen-uel',
      name: 'Fenerbahçe',
      shortName: 'FEN',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#FFED00',
      secondaryColor: '#00205B',
      league: 'UEFA Europa League (15th)',
      ranking: '#28 UEFA Club Ranking',
      recentForm: ['W', 'D', 'W', 'W', 'L'],
      recordSummary: '12W - 4D - 3L (Away: 5W - 3D - 2L)',
      tacticalStyle: 'Disciplined mid-low block transition with physical target strikers and experienced midfielders',
      coach: 'José Mourinho',
      keyPlayers: [
        {
          id: 'uel-fen-tadic',
          name: 'Dušan Tadić',
          position: 'Playmaker / Winger',
          number: 10,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Serbia',
          form: ['W', 'D', 'W', 'W', 'L'],
          rating: 8.4,
          keyMetrics: { 'Assists (All)': 11, 'Pass Accuracy Final 3rd': '84.5%', 'Clutch Set Pieces': 6 },
          radarStats: { attack: 85, defense: 49, clutch: 87, consistency: 90, stamina: 81, tactical: 93 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'AZ Alkmaar', score: '1-3', statSummary: '4 Key Passes, 1 Big Chance Created', rating: 7.9, date: '2026-11-07' }],
          historicalNotes: 'Crafty veteran creator capable of unlocking compact high lines with pinpoint crosses.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 7,
      homeWins: 3,
      awayWins: 3,
      draws: 1,
      lastMeetings: [
        { date: '2024-10-24', homeScore: 1, awayScore: 1, winner: 'draw', competition: 'UEFA Europa League', topPerformer: 'André Onana' }
      ]
    }
  },
  {
    id: 'm-uecl-che-fio',
    sport: 'football',
    tournament: 'UEFA Conference League',
    roundOrStage: 'League Phase Marquee Tie',
    date: '2026-11-28',
    time: '20:00 GMT',
    venue: 'Stamford Bridge',
    city: 'London',
    country: 'England',
    importanceScore: 90,
    headline: 'Conference League Title Favorites Clash: Chelsea Firepower vs Viola High-Tempo Press',
    homeTeam: {
      id: 'team-che-uecl',
      name: 'Chelsea',
      shortName: 'CHE',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#034694',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Conference League (1st)',
      ranking: '#8 UEFA Club Ranking',
      recentForm: ['W', 'W', 'D', 'W', 'W'],
      recordSummary: '14W - 4D - 2L (UECL: 4W - 0D - 0L)',
      tacticalStyle: 'Expansive inverted-wing possession, Cole Palmer half-space orchestration, high xG output',
      coach: 'Enzo Maresca',
      keyPlayers: [
        {
          id: 'uecl-che-palmer',
          name: 'Cole Palmer',
          position: 'Attacking Midfielder',
          number: 20,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'D', 'W', 'W'],
          rating: 9.0,
          keyMetrics: { 'Goal Contributions': 19, 'Penalty Conversion': '100%', 'Chances / 90': 3.4 },
          radarStats: { attack: 94, defense: 51, clutch: 95, consistency: 92, stamina: 88, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Leicester', score: '2-1', statSummary: '4 Key Passes, High Tempo', rating: 8.6, date: '2026-11-23' }],
          historicalNotes: 'Unrivaled creative fulcrum turning Conference League matches into attacking clinics.'
        }
      ]
    },
    awayTeam: {
      id: 'team-fio-uecl',
      name: 'Fiorentina',
      shortName: 'FIO',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#482E92',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Conference League (3rd)',
      ranking: '#24 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '13W - 4D - 2L (Serie A & UECL surging)',
      tacticalStyle: 'Aggressive man-oriented press, swift counter-transitions through Moise Kean',
      coach: 'Raffaele Palladino',
      keyPlayers: [
        {
          id: 'uecl-fio-kean',
          name: 'Moise Kean',
          position: 'Striker',
          number: 20,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Italy',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 8.6,
          keyMetrics: { 'Goals (All)': 12, 'Aerial Duels Won %': '62%', 'xG / 90': 0.72 },
          radarStats: { attack: 89, defense: 45, clutch: 86, consistency: 87, stamina: 90, tactical: 84 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Verona', score: '3-1', statSummary: 'Hat-trick (3 Goals)', rating: 9.6, date: '2026-11-10' }],
          historicalNotes: 'In career-best goalscoring form driving Fiorentina to back-to-back Conference League contention.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 2,
      homeWins: 1,
      awayWins: 0,
      draws: 1,
      lastMeetings: [
        { date: '2015-08-05', homeScore: 0, awayScore: 1, winner: 'away', competition: 'Pre-Season', topPerformer: 'Gonzalo Rodríguez' }
      ]
    }
  },
  {
    id: 'm-uecl-bet-pan',
    sport: 'football',
    tournament: 'UEFA Conference League',
    roundOrStage: 'League Phase Matchday 5',
    date: '2026-11-29',
    time: '18:45 CET',
    venue: 'Estadio Benito Villamarín',
    city: 'Seville',
    country: 'Spain',
    importanceScore: 86,
    headline: 'Conference League Contender Test: Real Betis Possession Craft vs Panathinaikos Counter Surge',
    homeTeam: {
      id: 'team-bet-uecl',
      name: 'Real Betis',
      shortName: 'BET',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#0BB363',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Conference League (14th)',
      ranking: '#32 UEFA Club Ranking',
      recentForm: ['W', 'D', 'W', 'L', 'W'],
      recordSummary: '9W - 5D - 5L (Home: 6W - 2D - 1L)',
      tacticalStyle: 'Technical 4-2-3-1 ball progression, Lo Celso pockets, disciplined home atmosphere',
      coach: 'Manuel Pellegrini',
      keyPlayers: [
        {
          id: 'uecl-bet-locelso',
          name: 'Giovani Lo Celso',
          position: 'Attacking Midfielder',
          number: 20,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Argentina',
          form: ['W', 'D', 'W', 'L', 'W'],
          rating: 8.5,
          keyMetrics: { 'Goals': 7, 'Progressive Passes / 90': 8.9, 'Key Passes': 29 },
          radarStats: { attack: 87, defense: 59, clutch: 85, consistency: 86, stamina: 84, tactical: 91 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Celje', score: '2-1', statSummary: '1 Goal, 5 Chances Created', rating: 8.7, date: '2026-11-07' }],
          historicalNotes: 'Betis tempo setter excelling against mid-block European opposition.'
        }
      ]
    },
    awayTeam: {
      id: 'team-pan-uecl',
      name: 'Panathinaikos',
      shortName: 'PAO',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#007A33',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Conference League (21st)',
      ranking: '#54 UEFA Club Ranking',
      recentForm: ['W', 'W', 'D', 'L', 'W'],
      recordSummary: '10W - 4D - 4L (Away: 4W - 2D - 3L)',
      tacticalStyle: 'Compact mid-block 4-3-3 transitioning rapidly through Tetê & Ioannidis',
      coach: 'Rui Vitória',
      keyPlayers: [
        {
          id: 'uecl-pan-ioannidis',
          name: 'Fotis Ioannidis',
          position: 'Striker',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Greece',
          form: ['W', 'W', 'D', 'L', 'W'],
          rating: 8.2,
          keyMetrics: { 'Hold-up Duels Won': '61%', 'xG / 90': 0.56, 'Shots on Target %': '52%' },
          radarStats: { attack: 85, defense: 47, clutch: 84, consistency: 83, stamina: 88, tactical: 82 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Chelsea', score: '1-4', statSummary: '4 Aerial Wins, 1 Big Chance', rating: 7.5, date: '2026-10-24' }],
          historicalNotes: 'Physical focal point carrying Panathinaikos threat on the break.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 2,
      homeWins: 1,
      awayWins: 0,
      draws: 1,
      lastMeetings: [
        { date: '2024-08-01', homeScore: 1, awayScore: 1, winner: 'draw', competition: 'UEFA Friendly', topPerformer: 'Lo Celso' }
      ]
    }
  },
  {
    id: 'm-unl-fra-ita',
    sport: 'football',
    tournament: 'UEFA Nations League',
    roundOrStage: 'League A Quarter-Final Clash',
    date: '2026-11-30',
    time: '20:45 CET',
    venue: 'Stade de France',
    city: 'Paris',
    country: 'France',
    importanceScore: 95,
    headline: 'UEFA Nations League Titans: Les Bleus Pace & Power vs Spalletti Resurgent Azzurri',
    homeTeam: {
      id: 'team-fra-unl',
      name: 'France',
      shortName: 'FRA',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#002395',
      secondaryColor: '#ED2939',
      league: 'UEFA Nations League A (1st)',
      ranking: '#2 FIFA / UEFA Ranking',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '5W - 1D - 1L (Nations League Group A2 Winners)',
      tacticalStyle: 'Midfield physicality with Rabiot/Koné, explosive transitions via Thuram, Dembélé & Olise',
      coach: 'Didier Deschamps',
      keyPlayers: [
        {
          id: 'unl-fra-olise',
          name: 'Michael Olise',
          position: 'Attacking Midfielder',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'France',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 8.8,
          keyMetrics: { 'Key Passes / 90': 3.3, 'Set-Piece Assists': 4, 'Dribble Success': '67%' },
          radarStats: { attack: 91, defense: 58, clutch: 88, consistency: 89, stamina: 87, tactical: 91 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Italy', score: '3-1', statSummary: '3 Assists / Direct Free-Kick Impact', rating: 8.9, date: '2026-11-17' }],
          historicalNotes: 'Creative left-footed specialist driving France set-piece dominance.'
        }
      ]
    },
    awayTeam: {
      id: 'team-ita-unl',
      name: 'Italy',
      shortName: 'ITA',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#0066CC',
      secondaryColor: '#FFFFFF',
      league: 'UEFA Nations League A (2nd)',
      ranking: '#9 FIFA / UEFA Ranking',
      recentForm: ['L', 'W', 'W', 'D', 'W'],
      recordSummary: '4W - 1D - 1L (Away: 3W - 0D - 0L)',
      tacticalStyle: '3-5-1-1 dynamic midfield overload via Barella, Tonali & Dimarco wing-back surges',
      coach: 'Luciano Spalletti',
      keyPlayers: [
        {
          id: 'unl-ita-barella',
          name: 'Nicolò Barella',
          position: 'Central Midfielder',
          number: 18,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Italy',
          form: ['L', 'W', 'W', 'D', 'W'],
          rating: 8.7,
          keyMetrics: { 'Ball Recoveries / 90': 7.4, 'Progressive Carries': 5.8, 'Pass Accuracy': '90.4%' },
          radarStats: { attack: 83, defense: 82, clutch: 89, consistency: 91, stamina: 96, tactical: 93 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Belgium', score: '1-0', statSummary: 'Controlled midfield tempo, 92% passing', rating: 8.6, date: '2026-11-14' }],
          historicalNotes: 'Tireless engine dictating Italy transition tempo and pressing intensity.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 41,
      homeWins: 13,
      awayWins: 19,
      draws: 9,
      lastMeetings: [
        { date: '2026-11-17', homeScore: 1, awayScore: 3, winner: 'home', competition: 'UEFA Nations League Group A2', topPerformer: 'Adrien Rabiot' }
      ]
    }
  },
  {
    id: 'm-unl-esp-por',
    sport: 'football',
    tournament: 'UEFA Nations League',
    roundOrStage: 'Iberian Derby Quarter-Final',
    date: '2026-12-01',
    time: '20:45 CET',
    venue: 'Estadio Santiago Bernabéu',
    city: 'Madrid',
    country: 'Spain',
    importanceScore: 96,
    headline: 'Iberian Nations League Epic: Euro Champions Spain vs Ronaldo & Bruno Portugal',
    homeTeam: {
      id: 'team-esp-unl',
      name: 'Spain',
      shortName: 'ESP',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#AA151B',
      secondaryColor: '#F1BF00',
      league: 'UEFA Nations League A (1st)',
      ranking: '#3 FIFA / UEFA Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: '11W - 1D - 0L (Unbeaten Champions Streak)',
      tacticalStyle: 'Relentless technical possession, Lamine Yamal & Nico Williams inverted wing devastation',
      coach: 'Luis de la Fuente',
      keyPlayers: [
        {
          id: 'unl-esp-yamal',
          name: 'Lamine Yamal',
          position: 'Right Winger',
          number: 19,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Spain',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.1,
          keyMetrics: { 'Big Chances Created': 14, 'Take-ons Won %': '68%', 'Assists (Int)': 9 },
          radarStats: { attack: 95, defense: 50, clutch: 93, consistency: 91, stamina: 88, tactical: 94 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Switzerland', score: '3-2', statSummary: '5 Key Passes, 6 Dribbles', rating: 8.9, date: '2026-11-18' }],
          historicalNotes: 'Most creative wide threat in European international football.'
        }
      ]
    },
    awayTeam: {
      id: 'team-por-unl',
      name: 'Portugal',
      shortName: 'POR',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#006600',
      secondaryColor: '#FF0000',
      league: 'UEFA Nations League A (1st Group A1)',
      ranking: '#6 FIFA / UEFA Ranking',
      recentForm: ['D', 'W', 'D', 'W', 'W'],
      recordSummary: '4W - 2D - 0L (Group A1 Unbeaten)',
      tacticalStyle: 'Technical Vitinha-Bruno ball control feeding Rafael Leão & Ronaldo inside the box',
      coach: 'Roberto Martínez',
      keyPlayers: [
        {
          id: 'unl-por-leao',
          name: 'Rafael Leão',
          position: 'Left Winger',
          number: 17,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Portugal',
          form: ['D', 'W', 'D', 'W', 'W'],
          rating: 8.7,
          keyMetrics: { 'Sprint Speed (km/h)': 36.1, 'Progressive Carries': 7.5, 'Goals + Assists': 8 },
          radarStats: { attack: 92, defense: 39, clutch: 86, consistency: 84, stamina: 89, tactical: 84 },
          injuryStatus: 'healthy',
          recentPerformances: [{ opponent: 'Poland', score: '5-1', statSummary: '1 Goal, 1 Assist, 7 Dribbles', rating: 9.0, date: '2026-11-15' }],
          historicalNotes: 'Explosive left-flank ball carrier testing opposing right-backs relentlessly.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 40,
      homeWins: 17,
      awayWins: 6,
      draws: 17,
      lastMeetings: [
        { date: '2022-09-27', homeScore: 0, awayScore: 1, winner: 'home', competition: 'UEFA Nations League', topPerformer: 'Álvaro Morata' }
      ]
    }
  }
];

// Ensure all fixtures in library have realistic AI predictions precomputed
EXPANDED_FIXTURE_LIBRARY.forEach((m) => {
  if (!m.prediction) {
    m.prediction = computeStatisticalPrediction(m);
  }
});

// Search helper that matches teams, leagues, sports, players, and venues
export function searchFixtureLibrary(sport?: string, query?: string): Match[] {
  const q = (query || '').toLowerCase().trim();
  return EXPANDED_FIXTURE_LIBRARY.filter((m) => {
    if (sport && sport !== 'all' && m.sport !== sport) return false;
    if (!q) return true;
    const homeName = m.homeTeam.name.toLowerCase();
    const homeShort = (m.homeTeam.shortName || '').toLowerCase();
    const homeLeague = (m.homeTeam.league || '').toLowerCase();
    const awayName = m.awayTeam.name.toLowerCase();
    const awayShort = (m.awayTeam.shortName || '').toLowerCase();
    const awayLeague = (m.awayTeam.league || '').toLowerCase();
    const tournament = m.tournament.toLowerCase();
    const sportName = m.sport.toLowerCase();
    const headline = m.headline.toLowerCase();
    const city = (m.city || '').toLowerCase();
    const country = (m.country || '').toLowerCase();
    const players = [
      ...m.homeTeam.keyPlayers.map((p) => p.name.toLowerCase()),
      ...m.awayTeam.keyPlayers.map((p) => p.name.toLowerCase())
    ];

    return (
      homeName.includes(q) ||
      homeShort.includes(q) ||
      homeLeague.includes(q) ||
      awayName.includes(q) ||
      awayShort.includes(q) ||
      awayLeague.includes(q) ||
      tournament.includes(q) ||
      sportName.includes(q) ||
      headline.includes(q) ||
      city.includes(q) ||
      country.includes(q) ||
      players.some((p) => p.includes(q))
    );
  });
}
