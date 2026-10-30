import { Match, PredictionTrackRecord } from '../types.ts';

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'm-ucl-01',
    sport: 'football',
    tournament: 'UEFA Champions League',
    roundOrStage: 'Semi-Final 1st Leg',
    date: '2026-05-06',
    time: '20:00 BST',
    venue: 'Santiago Bernabéu',
    city: 'Madrid',
    country: 'Spain',
    importanceScore: 99,
    headline: 'Clash of the Titans: The European Royalty Showdown',
    homeTeam: {
      id: 'rma',
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#EEEDED',
      secondaryColor: '#DDA032',
      league: 'La Liga (1st)',
      ranking: '#1 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '24W - 5D - 2L (Home: 13W - 2D - 0L)',
      tacticalStyle: 'Explosive vertical transitions, lethal left-flank overload, counter-press resistance',
      coach: 'Carlo Ancelotti',
      keyPlayers: [
        {
          id: 'rma-vini',
          name: 'Vinícius Júnior',
          position: 'Left Winger',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'Brazil',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 8.9,
          keyMetrics: {
            'Goals (UCL)': 7,
            'Assists': 6,
            'Take-ons Won %': '68.4%',
            'Key Passes / 90': 3.1,
            'Expected Goals (xG)': 6.2,
            'Big Chances Created': 11
          },
          radarStats: {
            attack: 96,
            defense: 45,
            clutch: 95,
            consistency: 88,
            stamina: 91,
            tactical: 84
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Barcelona', score: '3-2', statSummary: '1 Goal, 2 Assists, 8 Dribbles completed', rating: 9.3, date: '2026-04-21' },
            { opponent: 'Bayern Munich', score: '2-1', statSummary: '2 Goals, 4 Key Passes, Man of the Match', rating: 9.1, date: '2026-04-14' },
            { opponent: 'Athletic Club', score: '2-0', statSummary: '1 Assist, 5 Progressive Carries', rating: 8.2, date: '2026-04-07' }
          ],
          historicalNotes: 'Has scored or assisted in 7 of his last 8 UCL knockout appearances at the Bernabéu. Historically torches high defensive lines.'
        },
        {
          id: 'rma-bellingham',
          name: 'Jude Bellingham',
          position: 'Attacking Midfielder',
          number: 5,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 8.7,
          keyMetrics: {
            'Goals (All)': 21,
            'Duels Won %': '64.2%',
            'Box Recoveries': 84,
            'Pass Accuracy': '89.1%',
            'Clutch 85+ Mins Goals': 5,
            'Distance (km/game)': 11.4
          },
          radarStats: {
            attack: 92,
            defense: 78,
            clutch: 97,
            consistency: 91,
            stamina: 94,
            tactical: 93
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Barcelona', score: '3-2', statSummary: '1 Match-Winning Goal (91\'), 8 Duels Won', rating: 9.0, date: '2026-04-21' },
            { opponent: 'Bayern Munich', score: '2-1', statSummary: '1 Assist, 4 Tackles, Controlled tempo', rating: 8.6, date: '2026-04-14' }
          ],
          historicalNotes: 'Premier clutch match-winner. Averages 2.4 late penalty-box penetrations against deep midfields.'
        },
        {
          id: 'rma-valverde',
          name: 'Federico Valverde',
          position: 'Central Midfielder / Right',
          number: 15,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Uruguay',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 8.4,
          keyMetrics: {
            'Long Shot Precision': '72%',
            'Tackles Won / 90': 2.8,
            'Sprint Velocity (km/h)': 36.3,
            'Defensive Transitions Stopped': 29
          },
          radarStats: {
            attack: 85,
            defense: 88,
            clutch: 87,
            consistency: 94,
            stamina: 99,
            tactical: 90
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Barcelona', score: '3-2', statSummary: '12km covered, 1 volley off post, 5 recoveries', rating: 8.3, date: '2026-04-21' }
          ],
          historicalNotes: 'The stamina engine. Key for tracking opposition overlapping fullbacks.'
        }
      ]
    },
    awayTeam: {
      id: 'mci',
      name: 'Manchester City',
      shortName: 'MCI',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#6CABDD',
      secondaryColor: '#1C2C5B',
      league: 'Premier League (1st)',
      ranking: '#2 UEFA Club Ranking',
      recentForm: ['W', 'W', 'W', 'W', 'D'],
      recordSummary: '25W - 6D - 3L (Away: 11W - 4D - 2L)',
      tacticalStyle: 'Dominant positional possession (67% avg), half-space overload, high counter-press',
      coach: 'Pep Guardiola',
      keyPlayers: [
        {
          id: 'mci-haaland',
          name: 'Erling Haaland',
          position: 'Striker',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          nationality: 'Norway',
          form: ['W', 'W', 'W', 'W', 'D'],
          rating: 9.0,
          keyMetrics: {
            'Goals (All)': 34,
            'Expected Goals (xG)': 31.8,
            'Shot Conversion Rate': '28.4%',
            'Aerial Duels Won %': '69.1%',
            'Big Chances Missed': 9,
            'UCL Goals/Game': 1.08
          },
          radarStats: {
            attack: 98,
            defense: 35,
            clutch: 89,
            consistency: 94,
            stamina: 87,
            tactical: 82
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Arsenal', score: '3-1', statSummary: '2 Goals, 5 Shots on Target, 3 Aerial Wins', rating: 9.2, date: '2026-04-19' },
            { opponent: 'PSG', score: '2-0', statSummary: '1 Goal, drew 2 yellow cards on defenders', rating: 8.5, date: '2026-04-12' },
            { opponent: 'Chelsea', score: '1-0', statSummary: '1 Goal (Penalty), 2 Box Touches', rating: 7.8, date: '2026-04-05' }
          ],
          historicalNotes: 'Unstoppable physical box presence. However, Real Madrid restricted him to 14 touches over 90 mins at Bernabéu in 2024.'
        },
        {
          id: 'mci-rodrigo',
          name: 'Rodri',
          position: 'Defensive Midfielder',
          number: 16,
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
          nationality: 'Spain',
          form: ['W', 'W', 'W', 'W', 'D'],
          rating: 9.1,
          keyMetrics: {
            'Passes Completed / 90': 104.2,
            'Pass Completion %': '93.7%',
            'Tackles + Interceptions': 5.2,
            'Undefeated Match Streak': '74 games',
            'Progressive Passes': 11.2
          },
          radarStats: {
            attack: 82,
            defense: 96,
            clutch: 96,
            consistency: 98,
            stamina: 95,
            tactical: 98
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Arsenal', score: '3-1', statSummary: '112 Passes (95%), 4 Tackles, 1 Long-Range Goal', rating: 9.4, date: '2026-04-19' }
          ],
          historicalNotes: 'The heart of City. City win 78% of games when Rodri starts vs only 42% when rested or injured.'
        },
        {
          id: 'mci-foden',
          name: 'Phil Foden',
          position: 'Attacking Midfielder / Right',
          number: 47,
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'W', 'W', 'D'],
          rating: 8.8,
          keyMetrics: {
            'Goals Outside Box': 6,
            'Shot Creating Actions / 90': 5.7,
            'Tight Space Turns': '81%',
            'Assists': 13
          },
          radarStats: {
            attack: 94,
            defense: 58,
            clutch: 91,
            consistency: 90,
            stamina: 90,
            tactical: 91
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Arsenal', score: '3-1', statSummary: '1 Goal, 1 Assist, 4 Key Passes', rating: 8.9, date: '2026-04-19' }
          ],
          historicalNotes: 'Scored an iconic thunderbolt at the Bernabéu in 2024. Averages 3.2 shots per game in away UCL fixtures.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 12,
      homeWins: 4,
      awayWins: 4,
      draws: 4,
      lastMeetings: [
        { date: '2024-04-17', homeScore: 1, awayScore: 1, winner: 'draw', competition: 'UEFA Champions League QF (RMA won pens)', topPerformer: 'Lunin (RMA)' },
        { date: '2024-04-09', homeScore: 3, awayScore: 3, winner: 'draw', competition: 'UEFA Champions League QF 1st Leg', topPerformer: 'Foden (MCI)' },
        { date: '2023-05-17', homeScore: 4, awayScore: 0, winner: 'away', competition: 'UEFA Champions League SF', topPerformer: 'Silva (MCI)' },
        { date: '2023-05-09', homeScore: 1, awayScore: 1, winner: 'draw', competition: 'UEFA Champions League SF 1st Leg', topPerformer: 'Vinícius (RMA)' }
      ]
    },
    prediction: {
      winner: 'home',
      winnerName: 'Real Madrid',
      confidence: 58,
      probabilities: {
        home: 44,
        away: 33,
        draw: 23
      },
      projectedScore: {
        home: 2,
        away: 1
      },
      summary: 'Bernabéu atmosphere combined with Vinícius Jr attacking City\'s right flank transitions tips the first leg narrowly to Los Blancos.',
      rationale: 'Historical player duel analytics indicate Vinícius Jr averages 4.8 successful dribbles against City\'s inverted full-back scheme. While Man City dominates central possession via Rodri (93.7% accuracy), Real Madrid\'s lethal counter-attack efficiency (1.92 goals per 3 fast-breaks) specifically exploits the half-spaces vacated when City pin opponents back.',
      keyPlayerDuel: {
        playerHome: 'Vinícius Júnior',
        playerAway: 'Kyle Walker / Manuel Akanji',
        duelSummary: 'Vinícius has beaten right-sided recovery defenders in 62% of 1v1 sprints this season. If City commits numbers forward, his early through-ball connection with Bellingham generates high-percentage xG.',
        advantage: 'home',
        advantageReason: 'Vinícius is in peak scoring form (7 UCL goals) and excels against high defensive blocks.'
      },
      historicalPerformanceBreakdown: [
        {
          title: 'Bernabéu European Aura vs Possession Football',
          statProof: 'Real Madrid are undefeated in their last 14 UCL home matches against English opposition (11W, 3D).',
          impact: 'critical'
        },
        {
          title: 'Haaland Box Neutralization Metric',
          statProof: 'Rüdiger & Militão have historically limited Haaland to an average of just 0.88 shots on target and 19 touches over their last 3 head-to-head meetings.',
          impact: 'critical'
        },
        {
          title: 'Rodri Pivot Control',
          statProof: 'When Rodri sustains 90+ passes, City generates 2.4 expected goals. Modrić & Valverde will be tasked with shadow-marking his passing lanes.',
          impact: 'moderate'
        }
      ],
      tacticalKeys: [
        'Early pressure on City centre-backs to force hurried long clearances instead of structured build-up',
        'Bellingham late arrivals into the box when City defenders track Haaland-like runs from Madrid forwards',
        'Defending set-pieces: City has scored 11 corner goals; Madrid\'s zonal marking must hold'
      ],
      xFactorPlayer: {
        name: 'Jude Bellingham',
        team: 'Real Madrid',
        reason: 'Scored 5 stoppage-time winners this season. His box-to-box endurance allows Madrid to shift instantly from a 4-4-2 low block to a 4-3-3 transition.',
        statHighlight: '97 Clutch Index | 5 Late Game-Winners'
      },
      monteCarloSim: {
        simulationsRun: 1000,
        homeWinPct: 44.2,
        awayWinPct: 32.8,
        drawPct: 23.0,
        mostLikelyScores: [
          { score: '2 - 1', pct: 18.4 },
          { score: '1 - 1', pct: 15.6 },
          { score: '2 - 2', pct: 12.1 },
          { score: '1 - 2', pct: 11.8 },
          { score: '1 - 0', pct: 9.5 }
        ],
        totalOverUnder: { line: 2.5, overPct: 62.4, underPct: 37.6 }
      },
      timestamp: '2026-04-29T18:00:00Z',
      modelUsed: 'Gemini 3.8 Flash (Sports Performance Grounding)'
    }
  },
  {
    id: 'm-nba-02',
    sport: 'basketball',
    tournament: 'NBA Eastern Conference Finals',
    roundOrStage: 'Game 1',
    date: '2026-05-19',
    time: '20:30 EDT',
    venue: 'TD Garden',
    city: 'Boston',
    country: 'United States',
    importanceScore: 97,
    headline: 'Eastern Showdown: Perimeter Firepower vs Relentless Paint Dominance',
    homeTeam: {
      id: 'bos',
      name: 'Boston Celtics',
      shortName: 'BOS',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#007A33',
      secondaryColor: '#BA9653',
      league: 'NBA Eastern Conference (1st Seed)',
      ranking: '#1 Overall Net Rating (+10.8)',
      recentForm: ['W', 'W', 'W', 'L', 'W'],
      recordSummary: '62W - 20L (Home: 36W - 5L)',
      tacticalStyle: '5-out spacing, league-high 3PA rate (43.2/game), elite switchable perimeter defense',
      coach: 'Joe Mazzulla',
      keyPlayers: [
        {
          id: 'bos-tatum',
          name: 'Jayson Tatum',
          position: 'Forward',
          number: 0,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'W', 'L', 'W'],
          rating: 9.3,
          keyMetrics: {
            'PPG': 27.8,
            'RPG': 8.6,
            'APG': 5.4,
            'True Shooting %': '60.8%',
            'Plus/Minus': '+8.9',
            'Clutch FG%': '48.2%'
          },
          radarStats: {
            attack: 95,
            defense: 89,
            clutch: 91,
            consistency: 90,
            stamina: 93,
            tactical: 91
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'NY Knicks', score: '118-102', statSummary: '34 pts, 11 reb, 6 ast, 5/9 3PT', rating: 9.5, date: '2026-05-12' },
            { opponent: 'NY Knicks', score: '112-106', statSummary: '28 pts, 9 reb, 4 ast', rating: 8.8, date: '2026-05-09' }
          ],
          historicalNotes: 'Averages 29.4 PPG in conference finals games at TD Garden. Deadly pull-up jumper off pick-and-roll switches.'
        },
        {
          id: 'bos-brown',
          name: 'Jaylen Brown',
          position: 'Guard / Forward',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'W', 'L', 'W'],
          rating: 9.0,
          keyMetrics: {
            'PPG': 24.5,
            'Paint Points / Game': 12.8,
            'FG %': '51.2%',
            'On-Ball Steals': 1.6
          },
          radarStats: {
            attack: 92,
            defense: 91,
            clutch: 92,
            consistency: 87,
            stamina: 92,
            tactical: 86
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'NY Knicks', score: '118-102', statSummary: '26 pts, 5 reb, primary perimeter lock', rating: 9.0, date: '2026-05-12' }
          ],
          historicalNotes: 'Eastern Conference Finals MVP pedigree. Aggressive downhill driving puts opponent rim protectors in foul trouble early.'
        },
        {
          id: 'bos-white',
          name: 'Derrick White',
          position: 'Guard',
          number: 9,
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'W', 'L', 'W'],
          rating: 8.6,
          keyMetrics: {
            'Blocks per Game': 1.2,
            '3P %': '40.4%',
            'Assist-to-TO Ratio': '3.8',
            'Defensive Rating': 106.2
          },
          radarStats: {
            attack: 82,
            defense: 94,
            clutch: 89,
            consistency: 93,
            stamina: 91,
            tactical: 96
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'NY Knicks', score: '118-102', statSummary: '17 pts, 6 ast, 3 blocks, +21', rating: 8.9, date: '2026-05-12' }
          ],
          historicalNotes: 'Elite shot-blocking guard. Connective tissue of the offense with minimal mistake rate.'
        }
      ]
    },
    awayTeam: {
      id: 'mil',
      name: 'Milwaukee Bucks',
      shortName: 'MIL',
      logo: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#00471B',
      secondaryColor: '#EEE1C6',
      league: 'NBA Eastern Conference (2nd Seed)',
      ranking: '#4 Overall Net Rating (+6.4)',
      recentForm: ['W', 'W', 'L', 'W', 'W'],
      recordSummary: '55W - 27L (Away: 24W - 17L)',
      tacticalStyle: 'Giannis downhill rim onslaught, drop coverage paint wall, Lillard clutch isolation creation',
      coach: 'Doc Rivers',
      keyPlayers: [
        {
          id: 'mil-giannis',
          name: 'Giannis Antetokounmpo',
          position: 'Power Forward',
          number: 34,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'Greece',
          form: ['W', 'W', 'L', 'W', 'W'],
          rating: 9.6,
          keyMetrics: {
            'PPG': 31.4,
            'RPG': 11.8,
            'APG': 6.5,
            'Paint FG %': '71.2%',
            'FTA / Game': 11.4,
            'Blocks': 1.4
          },
          radarStats: {
            attack: 97,
            defense: 95,
            clutch: 92,
            consistency: 96,
            stamina: 96,
            tactical: 88
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Miami Heat', score: '120-111', statSummary: '38 pts, 14 reb, 7 ast, 2 blk', rating: 9.8, date: '2026-05-10' },
            { opponent: 'Miami Heat', score: '105-101', statSummary: '30 pts, 12 reb, 5 ast', rating: 9.1, date: '2026-05-08' }
          ],
          historicalNotes: 'Averages 33.2 PPG against Boston in playoff matchups. Forces opposing big men into deep foul trouble by quarter 2.'
        },
        {
          id: 'mil-lillard',
          name: 'Damian Lillard',
          position: 'Point Guard',
          number: 0,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'USA',
          form: ['W', 'W', 'L', 'W', 'W'],
          rating: 8.9,
          keyMetrics: {
            'PPG': 25.2,
            'APG': 7.1,
            '3PT Made / Game': 3.4,
            'Clutch Time PPG': 4.9,
            'Free Throw %': '92.4%'
          },
          radarStats: {
            attack: 94,
            defense: 62,
            clutch: 98,
            consistency: 86,
            stamina: 89,
            tactical: 90
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Miami Heat', score: '120-111', statSummary: '28 pts, 8 ast, 4 deep 3s in Q4', rating: 9.2, date: '2026-05-10' }
          ],
          historicalNotes: 'Legendary "Dame Time" closer. If game is within 5 points entering last 3 minutes, win probability shifts +18%.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 16,
      homeWins: 10,
      awayWins: 6,
      lastMeetings: [
        { date: '2026-03-20', homeScore: 122, awayScore: 114, winner: 'home', competition: 'Regular Season', topPerformer: 'Tatum (BOS) - 36 pts' },
        { date: '2026-01-11', homeScore: 108, awayScore: 115, winner: 'away', competition: 'Regular Season', topPerformer: 'Giannis (MIL) - 35 pts' },
        { date: '2025-11-22', homeScore: 119, awayScore: 116, winner: 'home', competition: 'Regular Season', topPerformer: 'Brown (BOS) - 30 pts' }
      ]
    },
    prediction: {
      winner: 'home',
      winnerName: 'Boston Celtics',
      confidence: 64,
      probabilities: {
        home: 63,
        away: 37
      },
      projectedScore: {
        home: 116,
        away: 109
      },
      summary: 'Boston\'s 5-out spacing drags Milwaukee\'s drop-coverage defenders away from the rim, while Jrue Holiday & Derrick White harass Lillard.',
      rationale: 'Player matchup tracking highlights that Giannis generates huge individual volume (projected 30+ pts), but Boston outscores Milwaukee by 18 points in 3-point differential. Lillard faces extreme length on switches, dropping his shooting efficiency to 41.2% in historical visits to TD Garden.',
      keyPlayerDuel: {
        playerHome: 'Jayson Tatum & Al Horford / Porziņģis',
        playerAway: 'Giannis Antetokounmpo',
        duelSummary: 'Boston builds a multi-tier wall at the free throw stripe. While Giannis will get to the line, Boston refuses to double off corner shooters.',
        advantage: 'home',
        advantageReason: 'Tatum\'s all-around playmaking (5.4 APG) punishes help rotations.'
      },
      historicalPerformanceBreakdown: [
        {
          title: 'Perimeter Differential Advantage',
          statProof: 'Boston converts 4.2 more three-pointers per game than Milwaukee in head-to-head clashes.',
          impact: 'critical'
        },
        {
          title: 'Home Court Dominance at TD Garden',
          statProof: 'Celtics hold a 36-5 home record, maintaining a +12.4 offensive rating in playoff openers.',
          impact: 'critical'
        },
        {
          title: 'Damian Lillard Pick-and-Roll Trap',
          statProof: 'Against top-5 defensive rating teams, Lillard\'s turnover rate rises from 9.8% to 14.2%.',
          impact: 'moderate'
        }
      ],
      tacticalKeys: [
        'Do not commit early take fouls on Giannis in transition; force half-court offensive execution',
        'Target Brook Lopez in high pick-and-pops with Porziņģis / Horford',
        'Protect defensive glass to deny Giannis second-chance putbacks'
      ],
      xFactorPlayer: {
        name: 'Derrick White',
        team: 'Boston Celtics',
        reason: 'His ability to navigate screens and contest Lillard\'s pull-ups without fouling is the linchpin of Boston\'s defensive scheme.',
        statHighlight: '1.2 BPG (Leads all NBA guards) | +8.9 Net on floor'
      },
      monteCarloSim: {
        simulationsRun: 1000,
        homeWinPct: 63.4,
        awayWinPct: 36.6,
        mostLikelyScores: [
          { score: '116 - 109', pct: 14.2 },
          { score: '114 - 110', pct: 12.8 },
          { score: '121 - 112', pct: 11.5 },
          { score: '108 - 112', pct: 9.4 }
        ],
        totalOverUnder: { line: 224.5, overPct: 53.1, underPct: 46.9 }
      },
      timestamp: '2026-04-29T18:00:00Z',
      modelUsed: 'Gemini 3.8 Flash (Sports Performance Grounding)'
    }
  },
  {
    id: 'm-ten-03',
    sport: 'tennis',
    tournament: 'Roland Garros (French Open)',
    roundOrStage: 'Men\'s Final',
    date: '2026-06-07',
    time: '15:00 CEST',
    venue: 'Court Philippe-Chatrier',
    city: 'Paris',
    country: 'France',
    importanceScore: 98,
    headline: 'The Next Generation Clay War: Alcaraz vs Sinner for French Open Glory',
    homeTeam: {
      id: 'alc',
      name: 'Carlos Alcaraz',
      shortName: 'ALC',
      logo: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#D92D20',
      secondaryColor: '#FEDF89',
      league: 'ATP Tour (World No. 2)',
      ranking: 'World No. 2',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: 'Clay Season: 18W - 1L (94.7% win rate)',
      tacticalStyle: 'Heavy topspin forehand (3200+ RPM), disguise drop shots, lightning footwork and court coverage',
      coach: 'Juan Carlos Ferrero',
      keyPlayers: [
        {
          id: 'alc-carlos',
          name: 'Carlos Alcaraz',
          position: 'Singles Player',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'Spain',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.7,
          keyMetrics: {
            'Clay Win %': '86.4%',
            'Break Points Converted': '46.8%',
            'Forehand RPM': 3240,
            'Drop Shot Win %': '74.2%',
            'Deciding 5th Set Record': '11-1',
            'Return Points Won': '43.1%'
          },
          radarStats: {
            attack: 98,
            defense: 94,
            clutch: 96,
            consistency: 89,
            stamina: 98,
            tactical: 92
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Novak Djokovic', score: '6-3, 6-7, 6-4, 6-2', statSummary: '48 Winners, 12 Drop shot points, 84% 1st serve wins', rating: 9.8, date: '2026-06-05' },
            { opponent: 'Stefanos Tsitsipas', score: '6-4, 6-2, 6-3', statSummary: 'Straight sets masterclass, 6 breaks of serve', rating: 9.4, date: '2026-06-02' }
          ],
          historicalNotes: 'Reigning Roland Garros champion. His heavy spin kick serve out wide to the ad court neutralizes backhand returns on Chatrier red clay.'
        }
      ]
    },
    awayTeam: {
      id: 'sin',
      name: 'Jannik Sinner',
      shortName: 'SIN',
      logo: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#027A48',
      secondaryColor: '#D1FADF',
      league: 'ATP Tour (World No. 1)',
      ranking: 'World No. 1',
      recentForm: ['W', 'W', 'W', 'W', 'W'],
      recordSummary: 'Clay Season: 16W - 2L (88.9% win rate)',
      tacticalStyle: 'Relentless baseline linear velocity, flat lasers on both wings, improved first-serve disguise',
      coach: 'Darren Cahill & Simone Vagnozzi',
      keyPlayers: [
        {
          id: 'sin-jannik',
          name: 'Jannik Sinner',
          position: 'Singles Player',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Italy',
          form: ['W', 'W', 'W', 'W', 'W'],
          rating: 9.6,
          keyMetrics: {
            'Backhand Velocity (km/h)': 131.4,
            '1st Serve Points Won': '79.2%',
            'Tiebreak Win %': '78.6%',
            'Unforced Errors / Set': 7.2,
            'Hard Court vs Clay': 'Clay index 89%'
          },
          radarStats: {
            attack: 96,
            defense: 91,
            clutch: 95,
            consistency: 97,
            stamina: 93,
            tactical: 93
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Alexander Zverev', score: '7-6, 6-4, 4-6, 6-3', statSummary: '52 Winners, 16 Aces, Saved 7/9 break points', rating: 9.6, date: '2026-06-05' }
          ],
          historicalNotes: 'World No. 1 with superior baseline consistency. However, on Philippe-Chatrier\'s heavy clay, Alcaraz\'s spin curve causes more timing issues.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 11,
      homeWins: 6,
      awayWins: 5,
      lastMeetings: [
        { date: '2024-06-07', homeScore: 3, awayScore: 2, winner: 'home', competition: 'Roland Garros SF (2-6, 6-3, 3-6, 6-4, 6-3)', topPerformer: 'Alcaraz (11-1 5th sets)' },
        { date: '2024-03-16', homeScore: 2, awayScore: 1, winner: 'home', competition: 'Indian Wells SF (1-6, 6-3, 6-2)', topPerformer: 'Alcaraz' },
        { date: '2023-10-03', homeScore: 0, awayScore: 2, winner: 'away', competition: 'Beijing SF (6-7, 1-6)', topPerformer: 'Sinner' }
      ]
    },
    prediction: {
      winner: 'home',
      winnerName: 'Carlos Alcaraz',
      confidence: 57,
      probabilities: {
        home: 57,
        away: 43
      },
      projectedScore: {
        home: 3,
        away: 2
      },
      summary: 'Alcaraz\'s clay-court movement, variety of height and spin, and unmatched 5th-set grit give him the slight edge in a 5-set marathon.',
      rationale: 'While Sinner possesses the highest baseline speed on tour, red clay dampens linear ball velocity by 18% compared to hard courts. This benefits Alcaraz, whose 3,240 RPM topspin kicks above Sinner\'s comfort strike zone. Furthermore, Alcaraz converts 74% of drop shot attempts when pulling Sinner 3 meters behind the baseline.',
      keyPlayerDuel: {
        playerHome: 'Carlos Alcaraz (Forehand & Dropshot)',
        playerAway: 'Jannik Sinner (Crosscourt Backhand)',
        duelSummary: 'The battle between Sinner\'s explosive flat backhand into Alcaraz\'s forehand corner vs Alcaraz changing the rhythm with slice and acute angle forehands.',
        advantage: 'home',
        advantageReason: 'Chatrier clay enhances heavy topspin kick over flat baseline missiles.'
      },
      historicalPerformanceBreakdown: [
        {
          title: 'Deciding Set Endurance Metric',
          statProof: 'Alcaraz is 11-1 in 5-set Grand Slam matches; his stamina rating remains above 94 in hours 4 and 5.',
          impact: 'critical'
        },
        {
          title: 'Drop Shot & Net Transition Conversion',
          statProof: 'Alcaraz has won 31 of 42 net points against Sinner in their clay meetings.',
          impact: 'critical'
        },
        {
          title: 'Sinner First-Serve Reliability',
          statProof: 'When Sinner serves above 68% first serves in, his hold rate is 92%. Alcaraz will target second serves aggressively.',
          impact: 'moderate'
        }
      ],
      tacticalKeys: [
        'Mix up trajectory with high loopy balls to Sinner\'s backhand before launching flat down-the-line winner',
        'Aggressive return positioning on Sinner\'s 2nd serve to avoid getting pinned back',
        'Short angles pulling Sinner laterally rather than engaging in straight-line slugfests'
      ],
      xFactorPlayer: {
        name: 'Carlos Alcaraz',
        team: 'Spain',
        reason: 'Mastery of clay sliding and recovery allows him to turn defensive desperation into forehand passing winners.',
        statHighlight: '74.2% Drop Shot Point Win Rate | 11-1 in 5th Sets'
      },
      monteCarloSim: {
        simulationsRun: 1000,
        homeWinPct: 56.8,
        awayWinPct: 43.2,
        mostLikelyScores: [
          { score: '3 - 2 Sets (Alcaraz)', pct: 28.5 },
          { score: '3 - 1 Sets (Alcaraz)', pct: 21.0 },
          { score: '3 - 1 Sets (Sinner)', pct: 19.8 },
          { score: '3 - 2 Sets (Sinner)', pct: 16.2 },
          { score: '3 - 0 Sets (Alcaraz)', pct: 8.5 }
        ],
        totalOverUnder: { line: 40.5, overPct: 68.2, underPct: 31.8 }
      },
      timestamp: '2026-04-29T18:00:00Z',
      modelUsed: 'Gemini 3.8 Flash (Sports Performance Grounding)'
    }
  },
  {
    id: 'm-pl-04',
    sport: 'football',
    tournament: 'English Premier League',
    roundOrStage: 'Matchweek 37 (Title Decider)',
    date: '2026-05-10',
    time: '16:30 BST',
    venue: 'Emirates Stadium',
    city: 'London',
    country: 'England',
    importanceScore: 96,
    headline: 'Title Race Climax: Arsenal vs Liverpool at The Emirates',
    homeTeam: {
      id: 'ars',
      name: 'Arsenal',
      shortName: 'ARS',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#EF0107',
      secondaryColor: '#023474',
      league: 'Premier League (2nd)',
      ranking: '#1 EPL Defensive Record (24 GA)',
      recentForm: ['W', 'W', 'W', 'D', 'W'],
      recordSummary: '26W - 6D - 4L (Home: 15W - 2D - 1L)',
      tacticalStyle: 'Stifling defensive rest defense, set-piece masterclass (league-best 22 goals), Saka-Odegaard right flank interplay',
      coach: 'Mikel Arteta',
      keyPlayers: [
        {
          id: 'ars-saka',
          name: 'Bukayo Saka',
          position: 'Right Winger',
          number: 7,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          nationality: 'England',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 8.9,
          keyMetrics: {
            'Goals': 17,
            'Assists': 14,
            'Penalty Box Touches': 192,
            'Shot Creating Actions': 6.1,
            'Fouls Drawn / 90': 2.8
          },
          radarStats: {
            attack: 94,
            defense: 65,
            clutch: 92,
            consistency: 93,
            stamina: 89,
            tactical: 91
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Chelsea', score: '2-0', statSummary: '1 Goal, 1 Assist, 6 fouls drawn', rating: 9.1, date: '2026-04-26' }
          ],
          historicalNotes: 'Has scored in 3 of his last 4 matches against Liverpool at Emirates Stadium.'
        },
        {
          id: 'ars-saliba',
          name: 'William Saliba',
          position: 'Center Back',
          number: 2,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          nationality: 'France',
          form: ['W', 'W', 'W', 'D', 'W'],
          rating: 9.1,
          keyMetrics: {
            'Tackle Success %': '84.6%',
            'Dribbled Past / 90': 0.18,
            'Aerial Duels Won %': '71.5%',
            'Pass Completion %': '92.8%'
          },
          radarStats: {
            attack: 62,
            defense: 98,
            clutch: 91,
            consistency: 97,
            stamina: 93,
            tactical: 96
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Chelsea', score: '2-0', statSummary: 'Clean sheet, 0 fouls, 7 clearances', rating: 8.9, date: '2026-04-26' }
          ],
          historicalNotes: 'The premier center back in England. Virtually unpassable in 1-on-1 transition situations.'
        }
      ]
    },
    awayTeam: {
      id: 'liv',
      name: 'Liverpool',
      shortName: 'LIV',
      logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=128&auto=format&fit=crop&q=80',
      primaryColor: '#C8102E',
      secondaryColor: '#00B2A9',
      league: 'Premier League (3rd)',
      ranking: '#1 EPL Expected Goals (82.4 xG)',
      recentForm: ['W', 'D', 'W', 'W', 'L'],
      recordSummary: '25W - 7D - 4L (Away: 11W - 5D - 2L)',
      tacticalStyle: 'Heavy metal pressing, rapid vertical balls in behind, Salah talismanic cutting inside',
      coach: 'Arne Slot',
      keyPlayers: [
        {
          id: 'liv-salah',
          name: 'Mohamed Salah',
          position: 'Right Winger / Forward',
          number: 11,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          nationality: 'Egypt',
          form: ['W', 'D', 'W', 'W', 'L'],
          rating: 9.0,
          keyMetrics: {
            'Goals': 22,
            'Assists': 12,
            'xG + xA': 28.4,
            'Big Chances Created': 19,
            'Key Passes / 90': 2.7
          },
          radarStats: {
            attack: 96,
            defense: 42,
            clutch: 94,
            consistency: 92,
            stamina: 91,
            tactical: 88
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Tottenham', score: '3-1', statSummary: '1 Goal, 2 Assists, 5 Shots', rating: 9.3, date: '2026-04-25' }
          ],
          historicalNotes: 'Has 11 career goals against Arsenal. Always elevates output against high-pressing backlines.'
        },
        {
          id: 'liv-vvd',
          name: 'Virgil van Dijk',
          position: 'Center Back',
          number: 4,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          nationality: 'Netherlands',
          form: ['W', 'D', 'W', 'W', 'L'],
          rating: 9.0,
          keyMetrics: {
            'Aerial Win %': '81.4%',
            'Long Ball Accuracy': '76.2%',
            'Interceptions': 44,
            'Corner Goals': 4
          },
          radarStats: {
            attack: 70,
            defense: 96,
            clutch: 93,
            consistency: 95,
            stamina: 92,
            tactical: 95
          },
          injuryStatus: 'healthy',
          recentPerformances: [
            { opponent: 'Tottenham', score: '3-1', statSummary: '1 Corner Goal, 8 Aerial duels won', rating: 8.8, date: '2026-04-25' }
          ],
          historicalNotes: 'Commanding aerial powerhouse. Critical for blunting Arsenal\'s deadly near-post corner routines.'
        }
      ]
    },
    headToHead: {
      totalPlayed: 14,
      homeWins: 5,
      awayWins: 5,
      draws: 4,
      lastMeetings: [
        { date: '2024-10-27', homeScore: 2, awayScore: 2, winner: 'draw', competition: 'Premier League', topPerformer: 'Saka & Salah' },
        { date: '2024-02-04', homeScore: 3, awayScore: 1, winner: 'home', competition: 'Premier League', topPerformer: 'Saka & Martinelli' },
        { date: '2023-12-23', homeScore: 1, awayScore: 1, winner: 'draw', competition: 'Premier League', topPerformer: 'Salah' }
      ]
    },
    prediction: {
      winner: 'home',
      winnerName: 'Arsenal',
      confidence: 54,
      probabilities: {
        home: 46,
        away: 29,
        draw: 25
      },
      projectedScore: {
        home: 2,
        away: 1
      },
      summary: 'Arsenal\'s defensive solidity at the Emirates and supreme set-piece efficiency gives them the decisive edge in a high-octane encounter.',
      rationale: 'Saliba & Gabriel have allowed the lowest non-penalty xG in the league (0.64 per home match). While Salah is always capable of individual genius, Arsenal\'s double-team trap on the right wing limits Liverpool\'s cut-backs. Arsenal\'s corner kicks (Nicolas Jover design) will test Liverpool\'s zonal spacing.',
      keyPlayerDuel: {
        playerHome: 'William Saliba',
        playerAway: 'Mohamed Salah',
        duelSummary: 'Saliba\'s recovery pace against Salah\'s inside-cut bursts. In their last 2 Emirates clashes, Saliba prevented Salah from completing any open-play box take-ons.',
        advantage: 'home',
        advantageReason: 'Saliba holds an 84.6% tackle success rate in 1v1 situations.'
      },
      historicalPerformanceBreakdown: [
        {
          title: 'Emirates Fortress Factor',
          statProof: 'Arsenal have lost just 1 of their last 28 Premier League home matches.',
          impact: 'critical'
        },
        {
          title: 'Dead-Ball Set Piece Goal Differential',
          statProof: 'Arsenal have scored 22 set-piece goals this season; Liverpool have conceded 9 from corners away from Anfield.',
          impact: 'critical'
        },
        {
          title: 'Van Dijk vs Arsenal Cross Targets',
          statProof: 'Van Dijk boasts an 81.4% aerial duel win rate, making open-play crosses low percentage for Arsenal.',
          impact: 'moderate'
        }
      ],
      tacticalKeys: [
        'Overload Liverpool\'s left back with Saka and overlapping Odegaard runs',
        'Rice and Partey disrupting Mac Allister\'s pivot play to prevent quick through-balls',
        'Execute near-post flick-on corner patterns to draw Van Dijk out of the 6-yard box'
      ],
      xFactorPlayer: {
        name: 'Bukayo Saka',
        team: 'Arsenal',
        reason: 'Consistently steps up in biggest games; has 17 goals and 14 assists while drawing 2.8 fouls per match.',
        statHighlight: '31 Goal Involvements | 92 Clutch Index'
      },
      monteCarloSim: {
        simulationsRun: 1000,
        homeWinPct: 45.8,
        awayWinPct: 29.4,
        drawPct: 24.8,
        mostLikelyScores: [
          { score: '2 - 1', pct: 17.5 },
          { score: '1 - 1', pct: 16.2 },
          { score: '2 - 0', pct: 12.0 },
          { score: '1 - 2', pct: 10.4 }
        ],
        totalOverUnder: { line: 2.5, overPct: 58.0, underPct: 42.0 }
      },
      timestamp: '2026-04-29T18:00:00Z',
      modelUsed: 'Gemini 3.8 Flash (Sports Performance Grounding)'
    }
  }
];

export const INITIAL_TRACK_RECORD: PredictionTrackRecord[] = [
  {
    id: 'tr-01',
    matchTitle: 'Manchester City vs Bayern Munich',
    sport: 'football',
    tournament: 'UEFA Champions League QF',
    date: '2026-04-15',
    predictedWinner: 'Manchester City',
    actualWinner: 'Manchester City',
    projectedScore: '3 - 1',
    actualScore: '3 - 1',
    confidence: 68,
    wasCorrect: true,
    modelConfidenceCategory: 'High',
    keyInsight: 'Haaland physical mismatch against Bayern backup center-backs pinpointed by model.'
  },
  {
    id: 'tr-02',
    matchTitle: 'Denver Nuggets vs Minnesota Timberwolves',
    sport: 'basketball',
    tournament: 'NBA Playoffs Rd 2',
    date: '2026-04-22',
    predictedWinner: 'Denver Nuggets',
    actualWinner: 'Denver Nuggets',
    projectedScore: '112 - 106',
    actualScore: '115 - 107',
    confidence: 62,
    wasCorrect: true,
    modelConfidenceCategory: 'High',
    keyInsight: 'Jokic historical 68% assist conversion rate out of high double-teams predicted victory.'
  },
  {
    id: 'tr-03',
    matchTitle: 'Carlos Alcaraz vs Alexander Zverev',
    sport: 'tennis',
    tournament: 'Madrid Open Final',
    date: '2026-05-03',
    predictedWinner: 'Carlos Alcaraz',
    actualWinner: 'Carlos Alcaraz',
    projectedScore: '2 - 1 Sets',
    actualScore: '6-4, 3-6, 6-3',
    confidence: 65,
    wasCorrect: true,
    modelConfidenceCategory: 'High',
    keyInsight: 'Alcaraz dropshot efficiency in Madrid altitude identified as primary breaking weapon.'
  },
  {
    id: 'tr-04',
    matchTitle: 'Inter Milan vs AC Milan',
    sport: 'football',
    tournament: 'Serie A Derby della Madonnina',
    date: '2026-04-27',
    predictedWinner: 'Inter Milan',
    actualWinner: 'Inter Milan',
    projectedScore: '2 - 0',
    actualScore: '2 - 1',
    confidence: 59,
    wasCorrect: true,
    modelConfidenceCategory: 'Medium',
    keyInsight: 'Inter midfield press resistance through Barella & Çalhanoğlu smothered Milan transitions.'
  },
  {
    id: 'tr-05',
    matchTitle: 'Golden State Warriors vs LA Lakers',
    sport: 'basketball',
    tournament: 'NBA Play-In Elimination',
    date: '2026-04-18',
    predictedWinner: 'LA Lakers',
    actualWinner: 'Golden State Warriors',
    projectedScore: '114 - 110',
    actualScore: '118 - 120',
    confidence: 52,
    wasCorrect: false,
    modelConfidenceCategory: 'Value Play',
    keyInsight: 'Curry 39-point outlier explosion overrode Lakers paint scoring advantage.'
  }
];
