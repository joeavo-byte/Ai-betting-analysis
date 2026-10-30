export type SportCategory = 'football' | 'basketball' | 'tennis' | 'american_football';

export interface PlayerStat {
  id: string;
  name: string;
  position: string;
  number?: number;
  avatar: string;
  nationality?: string;
  form: ('W' | 'D' | 'L')[];
  rating: number; // e.g. 8.6 out of 10
  keyMetrics: Record<string, string | number>;
  radarStats: {
    attack: number;     // 0 - 100
    defense: number;    // 0 - 100
    clutch: number;     // 0 - 100
    consistency: number;// 0 - 100
    stamina: number;    // 0 - 100
    tactical: number;   // 0 - 100
  };
  injuryStatus: 'healthy' | 'minor_knock' | 'doubtful' | 'suspended';
  recentPerformances: Array<{
    opponent: string;
    score: string;
    statSummary: string;
    rating: number;
    date: string;
  }>;
  historicalNotes: string;
}

export interface TeamData {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  league: string;
  ranking?: string;
  recentForm: ('W' | 'D' | 'L')[];
  recordSummary: string;
  keyPlayers: PlayerStat[];
  tacticalStyle: string;
  coach?: string;
}

export interface HeadToHeadHistory {
  totalPlayed: number;
  homeWins: number;
  awayWins: number;
  draws?: number;
  lastMeetings: Array<{
    date: string;
    homeScore: number;
    awayScore: number;
    winner: 'home' | 'away' | 'draw';
    competition: string;
    topPerformer?: string;
  }>;
}

export interface AIPrediction {
  winner: 'home' | 'away' | 'draw';
  winnerName: string;
  confidence: number; // 0 - 100
  probabilities: {
    home: number;
    away: number;
    draw?: number;
  };
  projectedScore: {
    home: number;
    away: number;
  };
  summary: string;
  rationale: string;
  keyPlayerDuel: {
    playerHome: string;
    playerAway: string;
    duelSummary: string;
    advantage: 'home' | 'away' | 'even';
    advantageReason: string;
  };
  historicalPerformanceBreakdown: Array<{
    title: string;
    statProof: string;
    impact: 'critical' | 'moderate' | 'supporting';
  }>;
  tacticalKeys: string[];
  xFactorPlayer: {
    name: string;
    team: string;
    reason: string;
    statHighlight: string;
  };
  monteCarloSim: {
    simulationsRun: number;
    homeWinPct: number;
    awayWinPct: number;
    drawPct?: number;
    mostLikelyScores: Array<{ score: string; pct: number }>;
    totalOverUnder: { line: number; overPct: number; underPct: number };
  };
  timestamp: string;
  modelUsed: string;
  customModifiersApplied?: {
    weather?: string;
    venueAdvantage?: string;
    playerAbsences?: string[];
  };
}

export interface Match {
  id: string;
  sport: SportCategory;
  tournament: string;
  roundOrStage: string;
  date: string; // ISO date or "Saturday, May 18"
  time: string;
  venue: string;
  city: string;
  country: string;
  importanceScore: number; // e.g. 96/100
  headline: string;
  homeTeam: TeamData;
  awayTeam: TeamData;
  headToHead: HeadToHeadHistory;
  prediction?: AIPrediction;
  isCustom?: boolean;
}

export interface PredictionTrackRecord {
  id: string;
  matchTitle: string;
  sport: SportCategory;
  tournament: string;
  date: string;
  predictedWinner: string;
  actualWinner: string;
  projectedScore: string;
  actualScore: string;
  confidence: number;
  wasCorrect: boolean;
  modelConfidenceCategory: 'High' | 'Medium' | 'Value Play';
  keyInsight: string;
}
