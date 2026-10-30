import React, { useState } from 'react';
import {
  X,
  BarChart3,
  Sparkles,
  Trophy,
  Activity,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Brain
} from 'lucide-react';
import { Match, PlayerStat } from '../types.ts';
import { PlayerRadarChart } from './PlayerRadarChart.tsx';

interface PlayerDuelLabProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
}

export const PlayerDuelLab: React.FC<PlayerDuelLabProps> = ({
  isOpen,
  onClose,
  matches,
}) => {
  // Collect all players across all matches
  const allPlayers: Array<PlayerStat & { teamName: string; sport: string }> = matches.flatMap((m) => [
    ...m.homeTeam.keyPlayers.map((p) => ({ ...p, teamName: m.homeTeam.name, sport: m.sport })),
    ...m.awayTeam.keyPlayers.map((p) => ({ ...p, teamName: m.awayTeam.name, sport: m.sport })),
  ]);

  // Default to first two players
  const [player1Id, setPlayer1Id] = useState<string>(allPlayers[0]?.id || '');
  const [player2Id, setPlayer2Id] = useState<string>(allPlayers[1]?.id || '');
  const [analyzingDuel, setAnalyzingDuel] = useState<boolean>(false);
  const [duelResult, setDuelResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const player1 = allPlayers.find((p) => p.id === player1Id) || allPlayers[0];
  const player2 = allPlayers.find((p) => p.id === player2Id) || allPlayers[1];

  const handleRunAIDuelAnalysis = async () => {
    if (!player1 || !player2) return;
    setAnalyzingDuel(true);
    try {
      const res = await fetch('/api/player-duel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player1: { name: player1.name, position: player1.position, team: player1.teamName },
          player2: { name: player2.name, position: player2.position, team: player2.teamName },
          sport: player1.sport,
        }),
      });
      const data = await res.json();
      if (data.duel) {
        setDuelResult(data.duel);
      }
    } catch (err) {
      console.error('Failed to run duel analysis:', err);
    } finally {
      setAnalyzingDuel(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl p-6 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Player Head-to-Head Radar Lab</h3>
              <p className="text-xs text-slate-400">
                Compare multi-dimensional historical performance metrics & tactical attributes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Player Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pb-4 border-b border-slate-800">
          {/* Player 1 Selector */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/30">
            <label className="text-[11px] font-mono uppercase text-emerald-400 font-bold block mb-1">
              Primary Player (Green)
            </label>
            <select
              value={player1?.id}
              onChange={(e) => {
                setPlayer1Id(e.target.value);
                setDuelResult(null);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {allPlayers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.teamName} - {p.position})
                </option>
              ))}
            </select>
          </div>

          {/* Player 2 Selector */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-indigo-500/30">
            <label className="text-[11px] font-mono uppercase text-indigo-400 font-bold block mb-1">
              Comparison Player (Indigo)
            </label>
            <select
              value={player2?.id}
              onChange={(e) => {
                setPlayer2Id(e.target.value);
                setDuelResult(null);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {allPlayers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.teamName} - {p.position})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Comparison Arena */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {player1 && player2 && (
            <>
              {/* Dual Radar Overlay */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 flex flex-col items-center p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Attribute Polygon Overlay
                  </span>
                  <PlayerRadarChart
                    stats={player1.radarStats}
                    comparisonStats={player2.radarStats}
                    playerName={player1.name}
                    comparisonName={player2.name}
                    size={250}
                  />
                </div>

                {/* Side-by-side Attribute Breakdown */}
                <div className="md:col-span-6 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono font-bold pb-1 border-b border-slate-800">
                    <span className="text-emerald-400">{player1.name}</span>
                    <span className="text-slate-500">Metric</span>
                    <span className="text-indigo-400">{player2.name}</span>
                  </div>

                  {[
                    { key: 'attack', label: 'Attacking Potency' },
                    { key: 'defense', label: 'Defensive Solidity' },
                    { key: 'clutch', label: 'Clutch / High Stakes' },
                    { key: 'consistency', label: 'Form Consistency' },
                    { key: 'stamina', label: 'Stamina / Engine' },
                    { key: 'tactical', label: 'Tactical Discipline' },
                  ].map((attr) => {
                    const v1 = (player1.radarStats as any)[attr.key] || 0;
                    const v2 = (player2.radarStats as any)[attr.key] || 0;
                    const p1Higher = v1 > v2;
                    const p2Higher = v2 > v1;

                    return (
                      <div key={attr.key} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className={`${p1Higher ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                            {v1}
                          </span>
                          <span className="text-slate-300 font-semibold">{attr.label}</span>
                          <span className={`${p2Higher ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>
                            {v2}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 h-1.5 rounded-full overflow-hidden bg-slate-800">
                          <div className="flex justify-end bg-slate-800">
                            <div
                              className="bg-emerald-500 h-full rounded-l-full"
                              style={{ width: `${v1}%` }}
                            />
                          </div>
                          <div className="flex justify-start bg-slate-800">
                            <div
                              className="bg-indigo-500 h-full rounded-r-full"
                              style={{ width: `${v2}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Duel Verdict Section */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">AI Qualitative Head-to-Head Breakdown</h4>
                  </div>

                  <button
                    onClick={handleRunAIDuelAnalysis}
                    disabled={analyzingDuel}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${analyzingDuel ? 'animate-spin' : ''}`} />
                    <span>{analyzingDuel ? 'Simulating...' : 'Analyze Matchup Edge'}</span>
                  </button>
                </div>

                {duelResult ? (
                  <div className="space-y-3 mt-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                      <span>Statistical Edge:</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                        {duelResult.verdict} ({duelResult.advantagePct}% Advantage)
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {duelResult.tacticalDuel}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
                      {Object.entries(duelResult.keyCategoryWinners || {}).map(([cat, winner]: [string, any]) => (
                        <div key={cat} className="p-2 rounded bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase block truncate">{cat}</span>
                          <span className="text-white font-bold truncate block">{winner}</span>
                        </div>
                      ))}
                    </div>

                    {duelResult.historicalFunFact && (
                      <div className="p-2.5 rounded bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-300">
                        ⭐ <strong>Historical Nuance:</strong> {duelResult.historicalFunFact}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Click &ldquo;Analyze Matchup Edge&rdquo; to simulate how these two stars impact game state and who holds the decisive statistical edge.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
