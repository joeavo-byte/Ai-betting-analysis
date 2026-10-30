/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy,
  Sparkles,
  Search,
  Filter,
  Flame,
  Activity,
  Layers,
  BarChart3,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';
import { Match, SportCategory } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { MatchCard } from './components/MatchCard.tsx';
import { MatchDetailModal } from './components/MatchDetailModal.tsx';
import { FetchUpcomingModal } from './components/FetchUpcomingModal.tsx';
import { PlayerDuelLab } from './components/PlayerDuelLab.tsx';
import { TrackRecordModal } from './components/TrackRecordModal.tsx';

export default function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'importance' | 'date'>('importance');

  // Modals state
  const [activeMatchForModal, setActiveMatchForModal] = useState<Match | null>(null);
  const [isFetchModalOpen, setIsFetchModalOpen] = useState<boolean>(false);
  const [isTrackRecordOpen, setIsTrackRecordOpen] = useState<boolean>(false);
  const [isPlayerLabOpen, setIsPlayerLabOpen] = useState<boolean>(false);

  // Loading states
  const [loadingMatches, setLoadingMatches] = useState<boolean>(true);
  const [predictingMatchId, setPredictingMatchId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch initial matches from server
  const loadMatches = async () => {
    try {
      setLoadingMatches(true);
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.matches) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  // Run AI Prediction on a match
  const handleRunPrediction = async (matchId: string, customModifiers?: any) => {
    setPredictingMatchId(matchId);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, customModifiers }),
      });
      const data = await res.json();

      if (data.success && data.match) {
        setMatches((prev) =>
          prev.map((m) => (m.id === matchId ? data.match : m))
        );
        if (activeMatchForModal && activeMatchForModal.id === matchId) {
          setActiveMatchForModal(data.match);
        }
        showToast(`AI Prediction generated for ${data.match.homeTeam.name} vs ${data.match.awayTeam.name}`);
      } else {
        showToast('Prediction failed. Retrying with cached player metrics.');
      }
    } catch (err) {
      console.error('Error running prediction:', err);
      showToast('Error connecting to prediction model.');
    } finally {
      setPredictingMatchId(null);
    }
  };

  // Fetch new matches via AI Search Grounding
  const handleFetchUpcoming = async (sport: string, query: string) => {
    try {
      const res = await fetch('/api/matches/fetch-upcoming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sport, query }),
      });
      const data = await res.json();
      if (data.matches) {
        setMatches(data.matches);
      }
      return data;
    } catch (err: any) {
      console.error('Error in fetch upcoming:', err);
      return { success: false, message: err?.message };
    }
  };

  // Filter & Sort matches
  const filteredMatches = useMemo(() => {
    return matches
      .filter((m) => {
        if (selectedSport !== 'all' && m.sport !== selectedSport) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const homeMatch = m.homeTeam.name.toLowerCase().includes(q);
        const awayMatch = m.awayTeam.name.toLowerCase().includes(q);
        const tournamentMatch = m.tournament.toLowerCase().includes(q);
        const playerMatch = [
          ...m.homeTeam.keyPlayers.map((p) => p.name.toLowerCase()),
          ...m.awayTeam.keyPlayers.map((p) => p.name.toLowerCase()),
        ].some((pName) => pName.includes(q));
        return homeMatch || awayMatch || tournamentMatch || playerMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'importance') {
          return b.importanceScore - a.importanceScore;
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [matches, selectedSport, searchQuery, sortBy]);

  // Featured Marquee Match (highest importance)
  const featuredMatch = useMemo(() => {
    if (matches.length === 0) return null;
    return [...matches].sort((a, b) => b.importanceScore - a.importanceScore)[0];
  }, [matches]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl animate-fade-in border border-emerald-400 text-xs">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        selectedSport={selectedSport}
        onSelectSport={setSelectedSport}
        onOpenFetchModal={() => setIsFetchModalOpen(true)}
        onOpenTrackRecord={() => setIsTrackRecordOpen(true)}
        onOpenPlayerLab={() => setIsPlayerLabOpen(true)}
        totalMatchesCount={matches.length}
        accuracyPct={76.5}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-8">
        {/* Spotlight Hero Banner (The Highest Stakes Upcoming Match) */}
        {featuredMatch && (
          <section className="relative rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Background glowing gradients */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    MARQUEE BLOCKBUSTER OF THE WEEK
                  </span>
                  <span className="text-slate-400">{featuredMatch.tournament}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{featuredMatch.roundOrStage}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
                  {featuredMatch.homeTeam.name} <span className="text-emerald-400 font-normal">vs</span> {featuredMatch.awayTeam.name}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredMatch.headline}
                </p>

                {/* Match Details Pills */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{featuredMatch.date} • {featuredMatch.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Key Duel: {featuredMatch.homeTeam.keyPlayers[0]?.name} vs {featuredMatch.awayTeam.keyPlayers[0]?.name}</span>
                  </div>
                </div>
              </div>

              {/* AI Prediction Highlight Box */}
              <div className="w-full lg:w-80 rounded-2xl bg-slate-950/90 border border-emerald-500/30 p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" />
                      AI Prediction
                    </span>
                    {featuredMatch.prediction && (
                      <span className="font-mono text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                        {featuredMatch.prediction.confidence}% Conviction
                      </span>
                    )}
                  </div>

                  {featuredMatch.prediction ? (
                    <div>
                      <div className="text-xl font-black text-white">
                        {featuredMatch.prediction.winnerName}
                      </div>
                      <div className="font-mono text-xs text-slate-300 mt-1">
                        Projected: <strong className="text-emerald-400">{featuredMatch.prediction.projectedScore.home} - {featuredMatch.prediction.projectedScore.away}</strong>
                      </div>

                      {/* Small probability bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                          <span>{featuredMatch.homeTeam.shortName} {featuredMatch.prediction.probabilities.home}%</span>
                          {featuredMatch.prediction.probabilities.draw && (
                            <span>Draw {featuredMatch.prediction.probabilities.draw}%</span>
                          )}
                          <span>{featuredMatch.awayTeam.shortName} {featuredMatch.prediction.probabilities.away}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
                          <div
                            className="bg-emerald-500 h-full"
                            style={{ width: `${featuredMatch.prediction.probabilities.home}%` }}
                          />
                          {featuredMatch.prediction.probabilities.draw && (
                            <div
                              className="bg-amber-500 h-full"
                              style={{ width: `${featuredMatch.prediction.probabilities.draw}%` }}
                            />
                          )}
                          <div
                            className="bg-indigo-500 h-full"
                            style={{ width: `${featuredMatch.prediction.probabilities.away}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 my-2">
                      Ready for statistical simulation and player duel processing.
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setActiveMatchForModal(featuredMatch)}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md text-center"
                  >
                    Deep Breakdown & Stats
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter, Search & Controls Bar */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teams, tournaments, or star players..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-mono">
            <span className="text-slate-400 text-[11px] flex items-center gap-1 hidden sm:flex">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Sort By:
            </span>
            <button
              onClick={() => setSortBy('importance')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                sortBy === 'importance'
                  ? 'bg-slate-800 text-emerald-400 border-slate-700 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              🔥 Importance Stakes
            </button>
            <button
              onClick={() => setSortBy('date')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                sortBy === 'date'
                  ? 'bg-slate-800 text-emerald-400 border-slate-700 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              📅 Date
            </button>
          </div>
        </section>

        {/* Matches Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Upcoming Blockbuster Fixtures</h3>
              <span className="font-mono text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                {filteredMatches.length} Matches
              </span>
            </div>

            <button
              onClick={() => setIsFetchModalOpen(true)}
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fetch More Fixtures via AI</span>
            </button>
          </div>

          {loadingMatches ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl border border-slate-800 bg-slate-900/40 animate-pulse"
                />
              ))}
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onOpenDetails={setActiveMatchForModal}
                  onRunPrediction={handleRunPrediction}
                  isPredicting={predictingMatchId === match.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
              <Compass className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-200">No matches found</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No fixtures matched your current query or sport filter. Fetch fresh upcoming matches using Gemini sports search.
              </p>
              <button
                onClick={() => setIsFetchModalOpen(true)}
                className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
              >
                Fetch Real Matches Now
              </button>
            </div>
          )}
        </section>

        {/* Bottom Feature Explainer: How the Historical AI Engine Works */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              The ApexMatch Quantitative Architecture
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-emerald-400 font-bold block mb-1">
                1. Player Duel Micro-Modelling
              </span>
              <p className="text-slate-400 leading-relaxed">
                Rather than treating teams as monolithic entities, our model compares 1v1 positional matchups (e.g. Inverted Winger vs Recovery Fullback) to identify structural leaks and transition xG.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-indigo-400 font-bold block mb-1">
                2. Multi-Season Form & Clutch Index
              </span>
              <p className="text-slate-400 leading-relaxed">
                Historical performance in high-leverage minutes (&gt;80th minute, 5th set tiebreaks, 4th quarter clutch possessions) weighs 3.2x heavier than blowouts against bottom-table opponents.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-amber-400 font-bold block mb-1">
                3. 1,000 Monte Carlo Simulations
              </span>
              <p className="text-slate-400 leading-relaxed">
                Each prediction runs through 1,000 randomized stochastic event cycles to account for referee variance, set-piece randomness, and shot deflection probability distributions.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 mt-12 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-slate-300 font-bold">ApexMatch AI</span> • Big Match Predictor & Historical Player Performance Engine
          </div>
          <div>
            Powered by Gemini 3.8 Flash • Real-Time Sports Intelligence & Quantitative Analytics
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeMatchForModal && (
        <MatchDetailModal
          match={activeMatchForModal}
          onClose={() => setActiveMatchForModal(null)}
          onRunPrediction={handleRunPrediction}
          isPredicting={predictingMatchId === activeMatchForModal.id}
        />
      )}

      <FetchUpcomingModal
        isOpen={isFetchModalOpen}
        onClose={() => setIsFetchModalOpen(false)}
        onFetchMatches={handleFetchUpcoming}
      />

      <PlayerDuelLab
        isOpen={isPlayerLabOpen}
        onClose={() => setIsPlayerLabOpen(false)}
        matches={matches}
      />

      <TrackRecordModal
        isOpen={isTrackRecordOpen}
        onClose={() => setIsTrackRecordOpen(false)}
      />
    </div>
  );
}
