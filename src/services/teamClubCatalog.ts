import type { PlayerStat, TeamStrength } from '../types.ts';

export interface ClubProfile {
  aliases: string[];
  canonicalName: string;
  shortName: string;
  league: string;
  country: string;
  city: string;
  stadium: string;
  coach: string;
  primaryColor: string;
  secondaryColor: string;
  tacticalStyle: string;
  tierStrength: {
    overall: number;
    attack: number;
    defense: number;
    midfieldOrPace: number;
  };
  ranking: string;
  stars: Array<{
    name: string;
    position: string;
    number: number;
    nationality: string;
    rating: number;
    radarStats: PlayerStat['radarStats'];
    notes: string;
  }>;
}

export const CLUB_CATALOG: ClubProfile[] = [
  {
    aliases: ['real madrid', 'rma', 'madrid'],
    canonicalName: 'Real Madrid',
    shortName: 'RMA',
    league: 'Spanish La Liga',
    country: 'Spain',
    city: 'Madrid',
    stadium: 'Santiago Bernabéu',
    coach: 'Carlo Ancelotti',
    primaryColor: '#FEBE10',
    secondaryColor: '#00529F',
    tacticalStyle: 'Explosive transition pace, lethal wide overloads, relentless late-game Champions League mentality',
    tierStrength: { overall: 94, attack: 96, defense: 87, midfieldOrPace: 93 },
    ranking: '#1 UEFA Coefficient',
    stars: [
      {
        name: 'Kylian Mbappé',
        position: 'Forward',
        number: 9,
        nationality: 'France',
        rating: 9.2,
        radarStats: { attack: 97, defense: 38, clutch: 95, consistency: 91, stamina: 92, tactical: 89 },
        notes: 'Devastating pace in behind high lines and lethal Champions League knockout finisher.',
      },
      {
        name: 'Vinícius Júnior',
        position: 'Left Wing',
        number: 7,
        nationality: 'Brazil',
        rating: 9.1,
        radarStats: { attack: 95, defense: 42, clutch: 94, consistency: 90, stamina: 93, tactical: 88 },
        notes: 'Unstoppable 1v1 ball carrier who creates high-leverage penalties and back-post chances.',
      },
    ],
  },
  {
    aliases: ['psv', 'psv eindhoven', 'eindhoven'],
    canonicalName: 'PSV Eindhoven',
    shortName: 'PSV',
    league: 'Dutch Eredivisie',
    country: 'Netherlands',
    city: 'Eindhoven',
    stadium: 'Philips Stadion',
    coach: 'Peter Bosz',
    primaryColor: '#EF2F24',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Proactive high-line possession press leaving space behind full-backs against elite pace',
    tierStrength: { overall: 80, attack: 82, defense: 75, midfieldOrPace: 80 },
    ranking: '#24 UEFA Coefficient',
    stars: [
      {
        name: 'Malik Tillman',
        position: 'Attacking Midfielder',
        number: 7,
        nationality: 'USA',
        rating: 8.1,
        radarStats: { attack: 82, defense: 58, clutch: 80, consistency: 79, stamina: 84, tactical: 81 },
        notes: 'Creative half-space threat arriving late into the penalty box.',
      },
      {
        name: 'Luuk de Jong',
        position: 'Striker',
        number: 9,
        nationality: 'Netherlands',
        rating: 8.0,
        radarStats: { attack: 83, defense: 45, clutch: 82, consistency: 81, stamina: 79, tactical: 83 },
        notes: 'Aerial target man and set-piece focal point in European ties.',
      },
    ],
  },
  {
    aliases: ['arsenal', 'gunners', 'ars'],
    canonicalName: 'Arsenal',
    shortName: 'ARS',
    league: 'English Premier League',
    country: 'England',
    city: 'London',
    stadium: 'Emirates Stadium',
    coach: 'Mikel Arteta',
    primaryColor: '#EF0107',
    secondaryColor: '#063672',
    tacticalStyle: 'Stifling rest-defense rigidity, elite set-piece precision, structured right-side overloads',
    tierStrength: { overall: 92, attack: 90, defense: 93, midfieldOrPace: 91 },
    ranking: '#4 UEFA Coefficient',
    stars: [
      {
        name: 'Bukayo Saka',
        position: 'Right Wing',
        number: 7,
        nationality: 'England',
        rating: 9.0,
        radarStats: { attack: 92, defense: 66, clutch: 90, consistency: 93, stamina: 92, tactical: 91 },
        notes: 'Relentless inverted winger generating high-xG cutbacks and corner deliveries.',
      },
      {
        name: 'Martin Ødegaard',
        position: 'Attacking Midfielder',
        number: 8,
        nationality: 'Norway',
        rating: 8.9,
        radarStats: { attack: 88, defense: 68, clutch: 88, consistency: 91, stamina: 93, tactical: 95 },
        notes: 'Press-resistant orchestrator dictating tempo between defensive lines.',
      },
    ],
  },
  {
    aliases: ['borussia dortmund', 'dortmund', 'bvb'],
    canonicalName: 'Borussia Dortmund',
    shortName: 'BVB',
    league: 'German Bundesliga',
    country: 'Germany',
    city: 'Dortmund',
    stadium: 'Signal Iduna Park',
    coach: 'Niko Kovač',
    primaryColor: '#FDE100',
    secondaryColor: '#000000',
    tacticalStyle: 'Direct vertical transitions with wide wingers and aggressive counter-pressing bursts',
    tierStrength: { overall: 86, attack: 87, defense: 82, midfieldOrPace: 85 },
    ranking: '#9 UEFA Coefficient',
    stars: [
      {
        name: 'Serhou Guirassy',
        position: 'Striker',
        number: 9,
        nationality: 'Guinea',
        rating: 8.6,
        radarStats: { attack: 89, defense: 42, clutch: 87, consistency: 86, stamina: 84, tactical: 84 },
        notes: 'Clinical penalty-box finisher excelling in high-tempo European nights.',
      },
      {
        name: 'Julian Brandt',
        position: 'Attacking Midfielder',
        number: 10,
        nationality: 'Germany',
        rating: 8.4,
        radarStats: { attack: 84, defense: 56, clutch: 82, consistency: 83, stamina: 85, tactical: 88 },
        notes: 'Line-breaking creator driving vertical transition passes.',
      },
    ],
  },
  {
    aliases: ['barcelona', 'fc barcelona', 'barca', 'barça'],
    canonicalName: 'Barcelona',
    shortName: 'BAR',
    league: 'Spanish La Liga',
    country: 'Spain',
    city: 'Barcelona',
    stadium: 'Spotify Camp Nou',
    coach: 'Hansi Flick',
    primaryColor: '#A50044',
    secondaryColor: '#004D98',
    tacticalStyle: 'Aggressive high-line offside trap, lethal front-three interplay, relentless ball-winning press',
    tierStrength: { overall: 92, attack: 95, defense: 84, midfieldOrPace: 92 },
    ranking: '#6 UEFA Coefficient',
    stars: [
      {
        name: 'Lamine Yamal',
        position: 'Right Wing',
        number: 19,
        nationality: 'Spain',
        rating: 9.1,
        radarStats: { attack: 93, defense: 54, clutch: 91, consistency: 90, stamina: 88, tactical: 92 },
        notes: 'Generational creator unlocking low blocks with curved crosses and 1v1 dribbles.',
      },
      {
        name: 'Raphinha',
        position: 'Left Wing',
        number: 11,
        nationality: 'Brazil',
        rating: 8.9,
        radarStats: { attack: 92, defense: 62, clutch: 90, consistency: 89, stamina: 94, tactical: 87 },
        notes: 'High-volume transition finisher and relentless pressing forward.',
      },
    ],
  },
  {
    aliases: ['manchester city', 'man city', 'mci'],
    canonicalName: 'Manchester City',
    shortName: 'MCI',
    league: 'English Premier League',
    country: 'England',
    city: 'Manchester',
    stadium: 'Etihad Stadium',
    coach: 'Pep Guardiola',
    primaryColor: '#6CABDD',
    secondaryColor: '#1C2C5B',
    tacticalStyle: 'Positional possession overload, patient box-pinning circulation, clinical central finishing',
    tierStrength: { overall: 92, attack: 94, defense: 87, midfieldOrPace: 94 },
    ranking: '#2 UEFA Coefficient',
    stars: [
      {
        name: 'Erling Haaland',
        position: 'Striker',
        number: 9,
        nationality: 'Norway',
        rating: 9.2,
        radarStats: { attack: 98, defense: 36, clutch: 92, consistency: 91, stamina: 90, tactical: 85 },
        notes: 'Elite expected-goals magnet converting half-chances in crowded boxes.',
      },
      {
        name: 'Rodri',
        position: 'Defensive Midfielder',
        number: 16,
        nationality: 'Spain',
        rating: 9.1,
        radarStats: { attack: 82, defense: 91, clutch: 92, consistency: 95, stamina: 93, tactical: 97 },
        notes: 'Midfield anchor controlling territory and second-ball recoveries.',
      },
    ],
  },
  {
    aliases: ['liverpool', 'liv'],
    canonicalName: 'Liverpool',
    shortName: 'LIV',
    league: 'English Premier League',
    country: 'England',
    city: 'Liverpool',
    stadium: 'Anfield',
    coach: 'Arne Slot',
    primaryColor: '#C8102E',
    secondaryColor: '#00B2A9',
    tacticalStyle: 'Controlled counter-press, rapid vertical switches, stifling defensive structure',
    tierStrength: { overall: 92, attack: 93, defense: 90, midfieldOrPace: 91 },
    ranking: '#5 UEFA Coefficient',
    stars: [
      {
        name: 'Mohamed Salah',
        position: 'Right Wing',
        number: 11,
        nationality: 'Egypt',
        rating: 9.1,
        radarStats: { attack: 95, defense: 52, clutch: 93, consistency: 94, stamina: 91, tactical: 90 },
        notes: 'Premier big-game match-winner with elite goal+assist output.',
      },
      {
        name: 'Virgil van Dijk',
        position: 'Center Back',
        number: 4,
        nationality: 'Netherlands',
        rating: 8.9,
        radarStats: { attack: 64, defense: 95, clutch: 90, consistency: 93, stamina: 88, tactical: 94 },
        notes: 'Commanding aerial defender anchoring defensive rest-shape.',
      },
    ],
  },
  {
    aliases: ['bayern munich', 'bayern', 'fc bayern', 'bay'],
    canonicalName: 'Bayern Munich',
    shortName: 'BAY',
    league: 'German Bundesliga',
    country: 'Germany',
    city: 'Munich',
    stadium: 'Allianz Arena',
    coach: 'Vincent Kompany',
    primaryColor: '#DC052D',
    secondaryColor: '#0066B2',
    tacticalStyle: 'Relentless high-press territorial dominance, explosive wide combinations',
    tierStrength: { overall: 91, attack: 94, defense: 86, midfieldOrPace: 90 },
    ranking: '#3 UEFA Coefficient',
    stars: [
      {
        name: 'Harry Kane',
        position: 'Striker',
        number: 9,
        nationality: 'England',
        rating: 9.1,
        radarStats: { attack: 96, defense: 48, clutch: 91, consistency: 93, stamina: 86, tactical: 93 },
        notes: 'Complete forward dropping deep to spray passes and finishing clinically.',
      },
      {
        name: 'Jamal Musiala',
        position: 'Attacking Midfielder',
        number: 42,
        nationality: 'Germany',
        rating: 9.0,
        radarStats: { attack: 92, defense: 55, clutch: 91, consistency: 89, stamina: 89, tactical: 91 },
        notes: 'Tight-space dribbler breaking packed European defenses.',
      },
    ],
  },
  {
    aliases: ['paris saint-germain', 'psg', 'paris sg'],
    canonicalName: 'Paris Saint-Germain',
    shortName: 'PSG',
    league: 'French Ligue 1',
    country: 'France',
    city: 'Paris',
    stadium: 'Parc des Princes',
    coach: 'Luis Enrique',
    primaryColor: '#004170',
    secondaryColor: '#DA291C',
    tacticalStyle: 'Fluid possession rotation, high-speed wide isolation, aggressive counter-pressing',
    tierStrength: { overall: 90, attack: 92, defense: 86, midfieldOrPace: 90 },
    ranking: '#7 UEFA Coefficient',
    stars: [
      {
        name: 'Ousmane Dembélé',
        position: 'Right Wing',
        number: 10,
        nationality: 'France',
        rating: 8.9,
        radarStats: { attack: 92, defense: 48, clutch: 88, consistency: 85, stamina: 88, tactical: 86 },
        notes: 'Two-footed flank terror creating constant 1v1 mismatches.',
      },
      {
        name: 'Vitinha',
        position: 'Central Midfielder',
        number: 17,
        nationality: 'Portugal',
        rating: 8.8,
        radarStats: { attack: 83, defense: 78, clutch: 87, consistency: 90, stamina: 92, tactical: 93 },
        notes: 'Tempo-setting metronome linking defense to attack seamlessly.',
      },
    ],
  },
  {
    aliases: ['inter milan', 'inter', 'fc internazionale'],
    canonicalName: 'Inter Milan',
    shortName: 'INT',
    league: 'Italian Serie A',
    country: 'Italy',
    city: 'Milan',
    stadium: 'San Siro',
    coach: 'Simone Inzaghi',
    primaryColor: '#010E80',
    secondaryColor: '#000000',
    tacticalStyle: 'Fluid 3-5-2 wing-back rotations, stifling compact block, lethal strike partnership',
    tierStrength: { overall: 90, attack: 90, defense: 91, midfieldOrPace: 90 },
    ranking: '#8 UEFA Coefficient',
    stars: [
      {
        name: 'Lautaro Martínez',
        position: 'Striker',
        number: 10,
        nationality: 'Argentina',
        rating: 8.9,
        radarStats: { attack: 92, defense: 55, clutch: 90, consistency: 89, stamina: 90, tactical: 88 },
        notes: 'Clinical pressing forward leading Inter in high-stakes ties.',
      },
      {
        name: 'Nicolò Barella',
        position: 'Central Midfielder',
        number: 23,
        nationality: 'Italy',
        rating: 8.8,
        radarStats: { attack: 82, defense: 80, clutch: 88, consistency: 90, stamina: 95, tactical: 91 },
        notes: 'Tireless box-to-box engine driving transitional breaks.',
      },
    ],
  },
  {
    aliases: ['chelsea', 'che'],
    canonicalName: 'Chelsea',
    shortName: 'CHE',
    league: 'English Premier League',
    country: 'England',
    city: 'London',
    stadium: 'Stamford Bridge',
    coach: 'Enzo Maresca',
    primaryColor: '#034694',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Possession-heavy inverted full-back buildup with explosive half-space attackers',
    tierStrength: { overall: 87, attack: 89, defense: 84, midfieldOrPace: 87 },
    ranking: '#12 UEFA Coefficient',
    stars: [
      {
        name: 'Cole Palmer',
        position: 'Attacking Midfielder',
        number: 20,
        nationality: 'England',
        rating: 8.9,
        radarStats: { attack: 92, defense: 50, clutch: 93, consistency: 89, stamina: 86, tactical: 90 },
        notes: 'Ice-cold playmaker leading goals and assists in decisive moments.',
      },
    ],
  },
  {
    aliases: ['manchester united', 'man united', 'mun'],
    canonicalName: 'Manchester United',
    shortName: 'MUN',
    league: 'English Premier League',
    country: 'England',
    city: 'Manchester',
    stadium: 'Old Trafford',
    coach: 'Ruben Amorim',
    primaryColor: '#DA291C',
    secondaryColor: '#FBE122',
    tacticalStyle: 'Vertical 3-4-2-1 wing-back transition structure and high-tempo counter-attacks',
    tierStrength: { overall: 85, attack: 85, defense: 83, midfieldOrPace: 84 },
    ranking: '#14 UEFA Coefficient',
    stars: [
      {
        name: 'Bruno Fernandes',
        position: 'Attacking Midfielder',
        number: 8,
        nationality: 'Portugal',
        rating: 8.6,
        radarStats: { attack: 87, defense: 64, clutch: 87, consistency: 84, stamina: 92, tactical: 88 },
        notes: 'Primary progressive passer generating key chances.',
      },
    ],
  },
  {
    aliases: ['tottenham', 'tottenham hotspur', 'spurs', 'tot'],
    canonicalName: 'Tottenham Hotspur',
    shortName: 'TOT',
    league: 'English Premier League',
    country: 'England',
    city: 'London',
    stadium: 'Tottenham Hotspur Stadium',
    coach: 'Ange Postecoglou',
    primaryColor: '#132257',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'High defensive line, relentless forward pressing, aggressive overlapping full-backs',
    tierStrength: { overall: 85, attack: 88, defense: 80, midfieldOrPace: 85 },
    ranking: '#18 UEFA Coefficient',
    stars: [
      {
        name: 'Son Heung-min',
        position: 'Left Forward',
        number: 7,
        nationality: 'South Korea',
        rating: 8.7,
        radarStats: { attack: 90, defense: 50, clutch: 89, consistency: 87, stamina: 88, tactical: 86 },
        notes: 'Two-footed counter-attacking finisher in open spaces.',
      },
    ],
  },
  {
    aliases: ['aston villa', 'villa', 'avl'],
    canonicalName: 'Aston Villa',
    shortName: 'AVL',
    league: 'English Premier League',
    country: 'England',
    city: 'Birmingham',
    stadium: 'Villa Park',
    coach: 'Unai Emery',
    primaryColor: '#670E36',
    secondaryColor: '#95BFE5',
    tacticalStyle: 'Disciplined mid-block offside trap paired with surgical vertical counter-attacks',
    tierStrength: { overall: 85, attack: 86, defense: 83, midfieldOrPace: 84 },
    ranking: '#20 UEFA Coefficient',
    stars: [
      {
        name: 'Ollie Watkins',
        position: 'Striker',
        number: 11,
        nationality: 'England',
        rating: 8.5,
        radarStats: { attack: 87, defense: 48, clutch: 85, consistency: 86, stamina: 90, tactical: 84 },
        notes: 'Relentless channel runner stretching compact backlines.',
      },
    ],
  },
  {
    aliases: ['atlético madrid', 'atletico madrid', 'atletico', 'atm'],
    canonicalName: 'Atlético Madrid',
    shortName: 'ATM',
    league: 'Spanish La Liga',
    country: 'Spain',
    city: 'Madrid',
    stadium: 'Cívitas Metropolitano',
    coach: 'Diego Simeone',
    primaryColor: '#CB3524',
    secondaryColor: '#272E61',
    tacticalStyle: 'Stifling low-block organization, physical duels, lethal counter-attacks',
    tierStrength: { overall: 88, attack: 87, defense: 90, midfieldOrPace: 87 },
    ranking: '#11 UEFA Coefficient',
    stars: [
      {
        name: 'Julián Alvarez',
        position: 'Striker',
        number: 19,
        nationality: 'Argentina',
        rating: 8.8,
        radarStats: { attack: 89, defense: 62, clutch: 90, consistency: 89, stamina: 93, tactical: 89 },
        notes: 'High-pressing clinical forward thriving in European knockout nights.',
      },
    ],
  },
  {
    aliases: ['juventus', 'juve', 'juv'],
    canonicalName: 'Juventus',
    shortName: 'JUV',
    league: 'Italian Serie A',
    country: 'Italy',
    city: 'Turin',
    stadium: 'Allianz Stadium',
    coach: 'Thiago Motta',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Compact defensive structure, patient central buildup, clinical wide breaks',
    tierStrength: { overall: 86, attack: 84, defense: 89, midfieldOrPace: 85 },
    ranking: '#16 UEFA Coefficient',
    stars: [
      {
        name: 'Kenan Yıldız',
        position: 'Forward',
        number: 10,
        nationality: 'Turkey',
        rating: 8.4,
        radarStats: { attack: 86, defense: 50, clutch: 84, consistency: 83, stamina: 87, tactical: 85 },
        notes: 'Creative young forward unlocking tight Serie A & UCL blocks.',
      },
    ],
  },
  {
    aliases: ['ac milan', 'milan', 'mil'],
    canonicalName: 'AC Milan',
    shortName: 'MIL',
    league: 'Italian Serie A',
    country: 'Italy',
    city: 'Milan',
    stadium: 'San Siro',
    coach: 'Sérgio Conceição',
    primaryColor: '#FB090B',
    secondaryColor: '#000000',
    tacticalStyle: 'Explosive left-flank transitions and direct vertical speed',
    tierStrength: { overall: 86, attack: 87, defense: 83, midfieldOrPace: 85 },
    ranking: '#17 UEFA Coefficient',
    stars: [
      {
        name: 'Rafael Leão',
        position: 'Left Wing',
        number: 10,
        nationality: 'Portugal',
        rating: 8.7,
        radarStats: { attack: 90, defense: 42, clutch: 86, consistency: 82, stamina: 88, tactical: 84 },
        notes: 'Game-breaking flank sprinter capable of solo goals.',
      },
    ],
  },
  {
    aliases: ['napoli', 'nap'],
    canonicalName: 'Napoli',
    shortName: 'NAP',
    league: 'Italian Serie A',
    country: 'Italy',
    city: 'Naples',
    stadium: 'Stadio Diego Armando Maradona',
    coach: 'Antonio Conte',
    primaryColor: '#12A0D7',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Disciplined Conte compact defensive shape with vertical striker link-up',
    tierStrength: { overall: 87, attack: 87, defense: 88, midfieldOrPace: 86 },
    ranking: '#15 UEFA Coefficient',
    stars: [
      {
        name: 'Scott McTominay',
        position: 'Midfielder',
        number: 8,
        nationality: 'Scotland',
        rating: 8.4,
        radarStats: { attack: 83, defense: 80, clutch: 87, consistency: 86, stamina: 92, tactical: 85 },
        notes: 'Late box-crashing goal threat in big fixtures.',
      },
    ],
  },
  {
    aliases: ['bayer leverkusen', 'leverkusen', 'lev'],
    canonicalName: 'Bayer Leverkusen',
    shortName: 'LEV',
    league: 'German Bundesliga',
    country: 'Germany',
    city: 'Leverkusen',
    stadium: 'BayArena',
    coach: 'Xabi Alonso',
    primaryColor: '#E32221',
    secondaryColor: '#000000',
    tacticalStyle: 'High-tempo wing-back width, central numerical superiority, late-game resilience',
    tierStrength: { overall: 88, attack: 90, defense: 85, midfieldOrPace: 89 },
    ranking: '#10 UEFA Coefficient',
    stars: [
      {
        name: 'Florian Wirtz',
        position: 'Attacking Midfielder',
        number: 10,
        nationality: 'Germany',
        rating: 9.0,
        radarStats: { attack: 92, defense: 58, clutch: 91, consistency: 90, stamina: 90, tactical: 94 },
        notes: 'Playmaking centerpiece tearing open defenses between lines.',
      },
    ],
  },
  {
    aliases: ['fc porto', 'porto', 'por'],
    canonicalName: 'FC Porto',
    shortName: 'POR',
    league: 'Portuguese Primeira Liga',
    country: 'Portugal',
    city: 'Porto',
    stadium: 'Estádio do Dragão',
    coach: 'Martín Anselmi',
    primaryColor: '#00428C',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Disciplined European compactness and aggressive counter-pressing transitions',
    tierStrength: { overall: 82, attack: 82, defense: 82, midfieldOrPace: 81 },
    ranking: '#19 UEFA Coefficient',
    stars: [
      {
        name: 'Samu Aghehowa',
        position: 'Striker',
        number: 9,
        nationality: 'Spain',
        rating: 8.2,
        radarStats: { attack: 85, defense: 42, clutch: 81, consistency: 81, stamina: 88, tactical: 80 },
        notes: 'Powerful physical center-forward leading the line.',
      },
    ],
  },
  {
    aliases: ['feyenoord', 'feyenoord rotterdam'],
    canonicalName: 'Feyenoord Rotterdam',
    shortName: 'FEY',
    league: 'Dutch Eredivisie',
    country: 'Netherlands',
    city: 'Rotterdam',
    stadium: 'De Kuip',
    coach: 'Robin van Persie',
    primaryColor: '#EE1C25',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Energetic home press driven by relentless wing play at De Kuip',
    tierStrength: { overall: 80, attack: 81, defense: 78, midfieldOrPace: 80 },
    ranking: '#25 UEFA Coefficient',
    stars: [
      {
        name: 'Igor Paixão',
        position: 'Left Wing',
        number: 14,
        nationality: 'Brazil',
        rating: 8.1,
        radarStats: { attack: 84, defense: 48, clutch: 82, consistency: 80, stamina: 86, tactical: 80 },
        notes: 'Explosive wide dribbler creating cut-ins and set pieces.',
      },
    ],
  },
  {
    aliases: ['galatasaray', 'gal'],
    canonicalName: 'Galatasaray',
    shortName: 'GAL',
    league: 'Turkish Süper Lig',
    country: 'Turkey',
    city: 'Istanbul',
    stadium: 'RAMS Park',
    coach: 'Okan Buruk',
    primaryColor: '#A90432',
    secondaryColor: '#FDB912',
    tacticalStyle: 'High-intensity home crowd press and direct striker target service',
    tierStrength: { overall: 81, attack: 84, defense: 76, midfieldOrPace: 80 },
    ranking: '#28 UEFA Coefficient',
    stars: [
      {
        name: 'Victor Osimhen',
        position: 'Striker',
        number: 45,
        nationality: 'Nigeria',
        rating: 8.7,
        radarStats: { attack: 91, defense: 46, clutch: 88, consistency: 86, stamina: 90, tactical: 83 },
        notes: 'Relentless box predator dominating aerial and channel battles.',
      },
    ],
  },
  {
    aliases: ['benfica', 'sl benfica'],
    canonicalName: 'Benfica',
    shortName: 'SLB',
    league: 'Portuguese Primeira Liga',
    country: 'Portugal',
    city: 'Lisbon',
    stadium: 'Estádio da Luz',
    coach: 'Bruno Lage',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Technical wide progression and clinical counter-attacking precision',
    tierStrength: { overall: 84, attack: 85, defense: 82, midfieldOrPace: 84 },
    ranking: '#13 UEFA Coefficient',
    stars: [
      {
        name: 'Vangelis Pavlidis',
        position: 'Striker',
        number: 14,
        nationality: 'Greece',
        rating: 8.3,
        radarStats: { attack: 86, defense: 46, clutch: 84, consistency: 83, stamina: 87, tactical: 84 },
        notes: 'Clinical penalty-box poacher.',
      },
    ],
  },
  {
    aliases: ['sporting', 'sporting cp', 'sporting lisbon'],
    canonicalName: 'Sporting CP',
    shortName: 'SCP',
    league: 'Portuguese Primeira Liga',
    country: 'Portugal',
    city: 'Lisbon',
    stadium: 'Estádio José Alvalade',
    coach: 'Rui Borges',
    primaryColor: '#008057',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Dynamic 3-4-3 rotations and vertical wing-back surges',
    tierStrength: { overall: 84, attack: 86, defense: 81, midfieldOrPace: 84 },
    ranking: '#21 UEFA Coefficient',
    stars: [
      {
        name: 'Viktor Gyökeres',
        position: 'Striker',
        number: 9,
        nationality: 'Sweden',
        rating: 8.9,
        radarStats: { attack: 93, defense: 48, clutch: 89, consistency: 90, stamina: 94, tactical: 85 },
        notes: 'Powerhouse striker bullying center-backs in transitions.',
      },
    ],
  },
  {
    aliases: ['ajax', 'ajax amsterdam'],
    canonicalName: 'Ajax Amsterdam',
    shortName: 'AJX',
    league: 'Dutch Eredivisie',
    country: 'Netherlands',
    city: 'Amsterdam',
    stadium: 'Johan Cruyff Arena',
    coach: 'Francesco Farioli',
    primaryColor: '#D2122E',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Structured possession control and disciplined compact pressing',
    tierStrength: { overall: 81, attack: 81, defense: 79, midfieldOrPace: 81 },
    ranking: '#23 UEFA Coefficient',
    stars: [
      {
        name: 'Brian Brobbey',
        position: 'Striker',
        number: 9,
        nationality: 'Netherlands',
        rating: 7.9,
        radarStats: { attack: 82, defense: 44, clutch: 79, consistency: 78, stamina: 86, tactical: 79 },
        notes: 'Physical hold-up forward pinning defenders.',
      },
    ],
  },
  {
    aliases: ['bodo/glimt', 'bodø/glimt', 'bodo glimt'],
    canonicalName: 'Bodø/Glimt',
    shortName: 'BOD',
    league: 'Norwegian Eliteserien',
    country: 'Norway',
    city: 'Bodø',
    stadium: 'Aspmyra Stadion',
    coach: 'Kjetil Knutsen',
    primaryColor: '#FFCC00',
    secondaryColor: '#000000',
    tacticalStyle: 'High-tempo synthetic-turf pressing trap at Aspmyra Stadion',
    tierStrength: { overall: 77, attack: 79, defense: 74, midfieldOrPace: 78 },
    ranking: '#38 UEFA Coefficient',
    stars: [
      {
        name: 'Jens Petter Hauge',
        position: 'Left Wing',
        number: 23,
        nationality: 'Norway',
        rating: 7.8,
        radarStats: { attack: 80, defense: 46, clutch: 79, consistency: 77, stamina: 84, tactical: 80 },
        notes: 'Quick wing threat thriving on Aspmyra counter-attacks.',
      },
    ],
  },
  {
    aliases: ['como', 'como 1907'],
    canonicalName: 'Como',
    shortName: 'COM',
    league: 'Italian Serie A',
    country: 'Italy',
    city: 'Como',
    stadium: 'Giuseppe Sinigaglia',
    coach: 'Cesc Fàbregas',
    primaryColor: '#004E9A',
    secondaryColor: '#FFFFFF',
    tacticalStyle: 'Technical short-passing possession buildup directed by Fàbregas',
    tierStrength: { overall: 78, attack: 79, defense: 76, midfieldOrPace: 79 },
    ranking: '#45 UEFA Coefficient',
    stars: [
      {
        name: 'Nico Paz',
        position: 'Attacking Midfielder',
        number: 79,
        nationality: 'Argentina',
        rating: 8.2,
        radarStats: { attack: 84, defense: 52, clutch: 82, consistency: 81, stamina: 84, tactical: 85 },
        notes: 'Creative left-footed playmaker dictating final-third passes.',
      },
    ],
  },
  {
    aliases: ['as roma', 'roma'],
    canonicalName: 'AS Roma',
    shortName: 'ROM',
    league: 'Italian Serie A',
    country: 'Italy',
    city: 'Rome',
    stadium: 'Stadio Olimpico',
    coach: 'Claudio Ranieri',
    primaryColor: '#8E1F2F',
    secondaryColor: '#F0BC42',
    tacticalStyle: 'Pragmatic mid-block organization and set-piece threat',
    tierStrength: { overall: 82, attack: 83, defense: 82, midfieldOrPace: 81 },
    ranking: '#15 UEFA Coefficient',
    stars: [
      {
        name: 'Paulo Dybala',
        position: 'Attacking Midfielder',
        number: 21,
        nationality: 'Argentina',
        rating: 8.5,
        radarStats: { attack: 88, defense: 42, clutch: 88, consistency: 82, stamina: 78, tactical: 90 },
        notes: 'Decisive left-footed creator from free-kicks and half-spaces.',
      },
    ],
  },
  {
    aliases: ['fenerbahce', 'fenerbahçe'],
    canonicalName: 'Fenerbahçe',
    shortName: 'FEN',
    league: 'Turkish Süper Lig',
    country: 'Turkey',
    city: 'Istanbul',
    stadium: 'Ülker Stadyumu',
    coach: 'José Mourinho',
    primaryColor: '#002D72',
    secondaryColor: '#FFED00',
    tacticalStyle: 'Structured European knockout pragmatism and physical transition breaks',
    tierStrength: { overall: 81, attack: 82, defense: 80, midfieldOrPace: 80 },
    ranking: '#30 UEFA Coefficient',
    stars: [
      {
        name: 'Youssef En-Nesyri',
        position: 'Striker',
        number: 19,
        nationality: 'Morocco',
        rating: 8.1,
        radarStats: { attack: 85, defense: 45, clutch: 82, consistency: 80, stamina: 85, tactical: 81 },
        notes: 'Dominant aerial striker dangerous on crosses and corners.',
      },
    ],
  },
];

export function findClubProfile(teamName: string): ClubProfile | undefined {
  const norm = teamName.toLowerCase().trim();
  if (!norm) return undefined;

  // Exact alias match first
  for (const club of CLUB_CATALOG) {
    if (club.aliases.some((a) => a === norm) || club.canonicalName.toLowerCase() === norm) {
      return club;
    }
  }

  // Partial alias match (longest alias wins to avoid "madrid" overriding "atletico madrid")
  let bestMatch: { club: ClubProfile; len: number } | null = null;
  for (const club of CLUB_CATALOG) {
    for (const alias of club.aliases) {
      if (alias.length >= 3 && (norm.includes(alias) || alias.includes(norm))) {
        if (!bestMatch || alias.length > bestMatch.len) {
          bestMatch = { club, len: alias.length };
        }
      }
    }
  }
  return bestMatch?.club;
}

export function buildPlayersFromClub(
  club: ClubProfile | undefined,
  fallbackTeamName: string,
  sport: string
): PlayerStat[] {
  if (!club) {
    return [
      {
        id: `p-${fallbackTeamName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 6)}-1`,
        name: `${fallbackTeamName} Primary Threat`,
        position: sport === 'basketball' ? 'Guard' : 'Forward',
        number: 10,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        nationality: 'International',
        form: ['W', 'D', 'W', 'L', 'W'],
        rating: 7.9,
        keyMetrics: { 'Impact Index': 8.0, 'Match Rating': '7.9/10' },
        radarStats: { attack: 80, defense: 62, clutch: 79, consistency: 79, stamina: 82, tactical: 80 },
        injuryStatus: 'healthy',
        recentPerformances: [{ opponent: 'League Rival', score: '2-1', statSummary: 'Key attacking contribution', rating: 8.0, date: new Date().toISOString().split('T')[0] }],
        historicalNotes: `Key attacking focal point for ${fallbackTeamName}.`,
      },
    ];
  }

  return club.stars.map((s, idx) => ({
    id: `p-${club.shortName.toLowerCase()}-${idx + 1}`,
    name: s.name,
    position: s.position,
    number: s.number,
    avatar:
      idx % 2 === 0
        ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    nationality: s.nationality,
    form: ['W', 'W', 'W', 'D', 'W'],
    rating: s.rating,
    keyMetrics: { 'Match Rating': `${s.rating}/10`, 'Attack Index': s.radarStats.attack },
    radarStats: s.radarStats,
    injuryStatus: 'healthy',
    recentPerformances: [
      {
        opponent: 'Recent Opponent',
        score: '2 - 0',
        statSummary: 'Goal contribution & high xG threat',
        rating: s.rating,
        date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
      },
    ],
    historicalNotes: s.notes,
  }));
}

export function deriveTierStrengthFromOdds(
  homeMoneyline?: number,
  awayMoneyline?: number,
  drawMoneyline?: number
): { homeStrengthAdj: number; awayStrengthAdj: number; marketImplied?: { home: number; away: number; draw?: number } } {
  const americanToImplied = (ml: number): number => {
    if (!Number.isFinite(ml) || ml === 0) return 0;
    if (ml < 0) return Math.abs(ml) / (Math.abs(ml) + 100);
    return 100 / (ml + 100);
  };

  if (homeMoneyline && awayMoneyline) {
    const rawH = americanToImplied(homeMoneyline);
    const rawA = americanToImplied(awayMoneyline);
    const rawD = drawMoneyline ? americanToImplied(drawMoneyline) : 0;
    const sum = rawH + rawA + rawD;
    if (sum > 0) {
      const hPct = Math.round((rawH / sum) * 100);
      const dPct = rawD > 0 ? Math.round((rawD / sum) * 100) : undefined;
      const aPct = Math.max(2, 100 - hPct - (dPct ?? 0));
      const marketDiff = hPct - aPct;
      return {
        homeStrengthAdj: Math.round(marketDiff * 0.08),
        awayStrengthAdj: Math.round(-marketDiff * 0.08),
        marketImplied: {
          home: hPct,
          away: aPct,
          ...(dPct !== undefined ? { draw: dPct } : {}),
        },
      };
    }
  }
  return { homeStrengthAdj: 0, awayStrengthAdj: 0 };
}

export function buildTierStrengthForClub(
  club: ClubProfile | undefined,
  formArr: ('W' | 'D' | 'L')[],
  recordSummary: string
): TeamStrength | undefined {
  if (!club) return undefined;
  const wCount = formArr.filter((f) => f === 'W').length;
  const dCount = formArr.filter((f) => f === 'D').length;
  const lCount = formArr.filter((f) => f === 'L').length;
  const weights = [0.34, 0.26, 0.20, 0.12, 0.08];
  let weightedSum = 0;
  let totalWeight = 0;
  for (let i = 0; i < Math.min(formArr.length, weights.length); i++) {
    const v = formArr[i] === 'W' ? 100 : formArr[i] === 'D' ? 45 : 8;
    weightedSum += v * weights[i];
    totalWeight += weights[i];
  }
  const formIndex = totalWeight > 0 ? Math.round(Math.min(99, Math.max(10, weightedSum / totalWeight))) : 60;
  const momentum: TeamStrength['momentum'] =
    formIndex >= 76 ? 'Surging' : formIndex >= 54 ? 'Solid' : formIndex < 42 ? 'Slumping' : 'Erratic';

  let streakCount = 0;
  const firstRes = formArr[0];
  for (const f of formArr) {
    if (f === firstRes) streakCount++;
    else break;
  }
  const formStreakSummary =
    firstRes === 'W'
      ? streakCount > 1
        ? `${streakCount} Wins Streak 🔥`
        : 'Won Last Match'
      : firstRes === 'L'
      ? streakCount > 1
        ? `${streakCount} Losses Slump ❄️`
        : 'Lost Last Match'
      : 'Drew Last Match';

  // Incorporate unbeaten record signal slightly
  const recMatch = recordSummary.match(/(\d+)\s*W(?:\s*-\s*(\d+)\s*D)?\s*-\s*(\d+)\s*L/i);
  let formNudge = (formIndex - 65) * 0.08;
  if (recMatch) {
    const wins = parseInt(recMatch[1], 10) || 0;
    const draws = recMatch[2] ? parseInt(recMatch[2], 10) || 0 : 0;
    const losses = parseInt(recMatch[3], 10) || 0;
    const gp = wins + draws + losses;
    if (gp >= 3) {
      const winPct = wins / gp;
      formNudge += (winPct - 0.55) * 4.5;
    }
  }

  const overall = Math.round(Math.min(98, Math.max(66, club.tierStrength.overall + formNudge * 0.6)));
  const attack = Math.round(Math.min(98, Math.max(66, club.tierStrength.attack + formNudge * 0.6)));
  const defense = Math.round(Math.min(98, Math.max(66, club.tierStrength.defense + formNudge * 0.4)));

  return {
    overall,
    attack,
    defense,
    midfieldOrPace: club.tierStrength.midfieldOrPace,
    formIndex,
    momentum,
    formStreakSummary,
    goalsScoredRecent: Math.round(Math.max(3, wCount * 2.1 + dCount * 1.1 + (attack - 82) * 0.16)),
    goalsConcededRecent: Math.round(Math.max(1, lCount * 1.8 + dCount * 1.0 - (defense - 82) * 0.12)),
  };
}
