import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Match, TeamStrength } from '../types.ts';

interface WinProbabilityPoint {
  index: number;
  label: string;
  subLabel: string;
  homeProb: number;
  awayProb: number;
  drawProb?: number;
  homeResult: 'W' | 'D' | 'L';
  awayResult: 'W' | 'D' | 'L';
}

interface WinProbabilityChartProps {
  match: Match;
  homeStrength: TeamStrength;
  awayStrength: TeamStrength;
}

function getChronologicalLastFive(form: ('W' | 'D' | 'L')[] = []): ('W' | 'D' | 'L')[] {
  const recentFirst = form.slice(0, 5);
  while (recentFirst.length < 5) {
    recentFirst.push('D');
  }
  // recentForm[0] is latest match, recentForm[4] is 5 matches ago -> reverse for left-to-right timeline
  return [...recentFirst].reverse();
}

function resultImpact(res: 'W' | 'D' | 'L'): number {
  if (res === 'W') return 3.6;
  if (res === 'L') return -3.8;
  return -0.4;
}

function buildEvolutionSeries(
  match: Match,
  homeStrength: TeamStrength,
  awayStrength: TeamStrength
): WinProbabilityPoint[] {
  const homeSeq = getChronologicalLastFive(match.homeTeam.recentForm);
  const awaySeq = getChronologicalLastFive(match.awayTeam.recentForm);
  const isThreeWay = match.sport === 'football';

  const fallbackHomeShare = Math.round(
    (homeStrength.overall / Math.max(1, homeStrength.overall + awayStrength.overall)) * (isThreeWay ? 76 : 100)
  );
  const endHome = match.prediction?.probabilities?.home ?? fallbackHomeShare;
  const endAway = match.prediction?.probabilities?.away ?? (isThreeWay ? 76 - fallbackHomeShare : 100 - fallbackHomeShare);
  const endDraw = isThreeWay ? (match.prediction?.probabilities?.draw ?? Math.max(10, 100 - endHome - endAway)) : undefined;

  const labels = ['5 Ago', '4 Ago', '3 Ago', '2 Ago', 'Latest'];
  const subLabels = ['Match -5', 'Match -4', 'Match -3', 'Match -2', 'Current Form'];

  const points: WinProbabilityPoint[] = new Array(5);

  // Anchor index 4 (Latest) on the live AI match probability
  points[4] = {
    index: 4,
    label: labels[4],
    subLabel: subLabels[4],
    homeProb: endHome,
    awayProb: endAway,
    drawProb: endDraw,
    homeResult: homeSeq[4],
    awayResult: awaySeq[4],
  };

  // Walk backwards from index 4 -> 0 using each match's momentum impulse
  for (let i = 3; i >= 0; i--) {
    const next = points[i + 1];
    const hImp = resultImpact(homeSeq[i + 1]);
    const aImp = resultImpact(awaySeq[i + 1]);

    if (isThreeWay) {
      const stepHomeShift = hImp * 0.72 - aImp * 0.28;
      const stepAwayShift = aImp * 0.72 - hImp * 0.28;

      let hProb = Math.round(Math.max(10, Math.min(82, next.homeProb - stepHomeShift)));
      let aProb = Math.round(Math.max(10, Math.min(82, next.awayProb - stepAwayShift)));

      // Keep total non-draw share realistic so Draw stays in [12%, 34%]
      const maxDecisive = 88;
      if (hProb + aProb > maxDecisive) {
        const overflow = hProb + aProb - maxDecisive;
        hProb -= Math.ceil(overflow / 2);
        aProb -= Math.floor(overflow / 2);
      }
      const dProb = Math.max(12, 100 - hProb - aProb);

      points[i] = {
        index: i,
        label: labels[i],
        subLabel: subLabels[i],
        homeProb: hProb,
        awayProb: aProb,
        drawProb: dProb,
        homeResult: homeSeq[i],
        awayResult: awaySeq[i],
      };
    } else {
      // Zero-sum two-way sport (Basketball, Tennis, NFL)
      const netShift = (hImp - aImp) * 0.65;
      const hProb = Math.round(Math.max(12, Math.min(88, next.homeProb - netShift)));
      const aProb = 100 - hProb;

      points[i] = {
        index: i,
        label: labels[i],
        subLabel: subLabels[i],
        homeProb: hProb,
        awayProb: aProb,
        homeResult: homeSeq[i],
        awayResult: awaySeq[i],
      };
    }
  }

  return points;
}

export const WinProbabilityChart: React.FC<WinProbabilityChartProps> = ({
  match,
  homeStrength,
  awayStrength,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState<number>(620);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  const data = useMemo(
    () => buildEvolutionSeries(match, homeStrength, awayStrength),
    [match, homeStrength, awayStrength]
  );

  const homeDelta = data[4].homeProb - data[0].homeProb;
  const awayDelta = data[4].awayProb - data[0].awayProb;

  // Observe theme changes on <html>
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Responsive container width measurement
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateWidth = () => {
      const nextWidth = Math.max(280, Math.round(el.getBoundingClientRect().width));
      setWidth(nextWidth);
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  // Render D3 chart
  useEffect(() => {
    const svgNode = svgRef.current;
    if (!svgNode || data.length === 0) return;

    const height = 228;
    const margin = { top: 20, right: 24, bottom: 36, left: 42 };
    const innerWidth = Math.max(120, width - margin.left - margin.right);
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgNode);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', height);

    const homeColor = isDark ? '#34d399' : '#047857'; // emerald-400 dark / emerald-700 light
    const awayColor = isDark ? '#818cf8' : '#4338ca'; // indigo-400 dark / indigo-700 light
    const gridColor = isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(120, 113, 108, 0.18)';
    const axisTextColor = isDark ? '#94a3b8' : '#57534e';
    const guideColor = isDark ? 'rgba(226, 232, 240, 0.25)' : 'rgba(68, 64, 60, 0.25)';
    const pointStroke = isDark ? '#020617' : '#EFECE6';

    const defs = svg.append('defs');

    const homeGrad = defs
      .append('linearGradient')
      .attr('id', `home-prob-grad-${match.id}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    homeGrad.append('stop').attr('offset', '0%').attr('stop-color', homeColor).attr('stop-opacity', isDark ? 0.28 : 0.22);
    homeGrad.append('stop').attr('offset', '100%').attr('stop-color', homeColor).attr('stop-opacity', 0.01);

    const awayGrad = defs
      .append('linearGradient')
      .attr('id', `away-prob-grad-${match.id}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    awayGrad.append('stop').attr('offset', '0%').attr('stop-color', awayColor).attr('stop-opacity', isDark ? 0.24 : 0.18);
    awayGrad.append('stop').attr('offset', '100%').attr('stop-color', awayColor).attr('stop-opacity', 0.01);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const allValues = data.flatMap((d) => [d.homeProb, d.awayProb]);
    const minRaw = Math.min(...allValues);
    const maxRaw = Math.max(...allValues);
    const yMin = Math.max(0, Math.floor((minRaw - 8) / 10) * 10);
    const yMax = Math.min(100, Math.ceil((maxRaw + 8) / 10) * 10);

    const xScale = d3
      .scalePoint<number>()
      .domain(data.map((d) => d.index))
      .range([0, innerWidth])
      .padding(0.12);

    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]);

    // Horizontal gridlines
    const yTicks = yScale.ticks(5);
    g.append('g')
      .selectAll('line')
      .data(yTicks)
      .join('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', gridColor)
      .attr('stroke-dasharray', (d) => (d === 50 ? '4,3' : '2,3'))
      .attr('stroke-width', (d) => (d === 50 ? 1.2 : 1));

    // Y Axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(0)
      .tickPadding(8)
      .tickFormat((d) => `${d}%`);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.select('.domain').remove();
    yAxisG
      .selectAll('text')
      .style('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .style('font-size', '10px')
      .style('font-weight', '600')
      .style('fill', axisTextColor);

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickPadding(12)
      .tickFormat((idx) => data[Number(idx)]?.label || '');

    const xAxisG = g.append('g').attr('transform', `translate(0,${innerHeight})`).call(xAxis);
    xAxisG.select('.domain').attr('stroke', gridColor);
    xAxisG
      .selectAll('text')
      .style('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .style('font-size', '10px')
      .style('font-weight', '600')
      .style('fill', axisTextColor);

    // Area generators
    const homeArea = d3
      .area<WinProbabilityPoint>()
      .x((d) => xScale(d.index) ?? 0)
      .y0(innerHeight)
      .y1((d) => yScale(d.homeProb))
      .curve(d3.curveMonotoneX);

    const awayArea = d3
      .area<WinProbabilityPoint>()
      .x((d) => xScale(d.index) ?? 0)
      .y0(innerHeight)
      .y1((d) => yScale(d.awayProb))
      .curve(d3.curveMonotoneX);

    g.append('path').datum(data).attr('fill', `url(#home-prob-grad-${match.id})`).attr('d', homeArea);
    g.append('path').datum(data).attr('fill', `url(#away-prob-grad-${match.id})`).attr('d', awayArea);

    // Line generators
    const homeLine = d3
      .line<WinProbabilityPoint>()
      .x((d) => xScale(d.index) ?? 0)
      .y((d) => yScale(d.homeProb))
      .curve(d3.curveMonotoneX);

    const awayLine = d3
      .line<WinProbabilityPoint>()
      .x((d) => xScale(d.index) ?? 0)
      .y((d) => yScale(d.awayProb))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', awayColor)
      .attr('stroke-width', 2.5)
      .attr('stroke-linecap', 'round')
      .attr('d', awayLine);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', homeColor)
      .attr('stroke-width', 2.75)
      .attr('stroke-linecap', 'round')
      .attr('d', homeLine);

    // Vertical hover guide line (controlled by hoveredIdx)
    if (hoveredIdx !== null && data[hoveredIdx]) {
      const gx = xScale(hoveredIdx) ?? 0;
      g.append('line')
        .attr('x1', gx)
        .attr('x2', gx)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', guideColor)
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '3,3');
    }

    // Data point circles for Away
    g.selectAll('.away-dot')
      .data(data)
      .join('circle')
      .attr('class', 'away-dot')
      .attr('cx', (d) => xScale(d.index) ?? 0)
      .attr('cy', (d) => yScale(d.awayProb))
      .attr('r', (d) => (hoveredIdx === d.index ? 5.5 : 3.8))
      .attr('fill', awayColor)
      .attr('stroke', pointStroke)
      .attr('stroke-width', 1.8);

    // Data point circles for Home
    g.selectAll('.home-dot')
      .data(data)
      .join('circle')
      .attr('class', 'home-dot')
      .attr('cx', (d) => xScale(d.index) ?? 0)
      .attr('cy', (d) => yScale(d.homeProb))
      .attr('r', (d) => (hoveredIdx === d.index ? 6 : 4.2))
      .attr('fill', homeColor)
      .attr('stroke', pointStroke)
      .attr('stroke-width', 1.8);

    // End value callout labels on Latest node when not hovering elsewhere
    const latest = data[4];
    const lx = xScale(4) ?? innerWidth;
    const hY = yScale(latest.homeProb);
    const aY = yScale(latest.awayProb);
    const tooClose = Math.abs(hY - aY) < 16;

    g.append('text')
      .attr('x', lx - 6)
      .attr('y', tooClose && hY <= aY ? hY - 9 : tooClose ? hY + 14 : hY - 9)
      .attr('text-anchor', 'end')
      .style('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .style('font-size', '10px')
      .style('font-weight', '800')
      .style('fill', homeColor)
      .text(`${latest.homeProb}%`);

    g.append('text')
      .attr('x', lx - 6)
      .attr('y', tooClose && aY > hY ? aY + 14 : tooClose ? aY - 9 : aY - 9)
      .attr('text-anchor', 'end')
      .style('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .style('font-size', '10px')
      .style('font-weight', '800')
      .style('fill', awayColor)
      .text(`${latest.awayProb}%`);

    // Invisible interactive overlay for smooth pointer tracking across all 5 checkpoints
    const xPositions = data.map((d) => xScale(d.index) ?? 0);
    g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair')
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event);
        let closest = 0;
        let bestDist = Infinity;
        xPositions.forEach((px, idx) => {
          const dist = Math.abs(mx - px);
          if (dist < bestDist) {
            bestDist = dist;
            closest = idx;
          }
        });
        setHoveredIdx(closest);
      })
      .on('mouseleave', () => setHoveredIdx(null));
  }, [data, width, isDark, hoveredIdx, match.id]);

  const activePoint = hoveredIdx !== null ? data[hoveredIdx] : data[4];

  const renderDeltaBadge = (delta: number) => {
    if (delta >= 3) {
      return (
        <span className="inline-flex items-center gap-0.5 text-emerald-800 dark:text-emerald-400 font-bold">
          <TrendingUp className="w-3 h-3" />+{delta}%
        </span>
      );
    }
    if (delta <= -3) {
      return (
        <span className="inline-flex items-center gap-0.5 text-rose-700 dark:text-rose-400 font-bold">
          <TrendingDown className="w-3 h-3" />
          {delta}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 text-stone-600 dark:text-slate-400 font-bold">
        <Minus className="w-3 h-3" />
        {delta >= 0 ? `+${delta}%` : `${delta}%`}
      </span>
    );
  };

  return (
    <div className="pt-4 border-t border-stone-300/80 dark:border-slate-800 space-y-3">
      {/* Section Title & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 dark:text-slate-100">
            Win Probability Evolution (Last 5 Matches)
          </h4>
          <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-0.5">
            Chronological momentum trajectory leading into kickoff odds
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            <span className="font-semibold text-stone-800 dark:text-slate-200">{match.homeTeam.shortName}</span>
            {renderDeltaBadge(homeDelta)}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-700 dark:bg-indigo-400" />
            <span className="font-semibold text-stone-800 dark:text-slate-200">{match.awayTeam.shortName}</span>
            {renderDeltaBadge(awayDelta)}
          </div>
        </div>
      </div>

      {/* D3 Chart Canvas */}
      <div
        ref={containerRef}
        className="w-full rounded-xl bg-[#DFD9CE] dark:bg-slate-950/75 border border-stone-300/80 dark:border-slate-800 p-3"
      >
        <svg ref={svgRef} className="w-full block overflow-visible select-none" role="img" aria-label="Win probability evolution over the last 5 matches" />

        {/* Interactive Checkpoint Strip (click or hover synchronized) */}
        <div className="mt-2 pt-2.5 border-t border-stone-300/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-stone-700 dark:text-slate-300">
            <span className="font-bold text-stone-900 dark:text-white">{activePoint.subLabel}:</span>
            <span>
              <strong className="text-emerald-800 dark:text-emerald-400">
                {match.homeTeam.shortName} {activePoint.homeProb}%
              </strong>{' '}
              ({activePoint.homeResult})
            </span>
            <span className="text-stone-400 dark:text-slate-600">·</span>
            <span>
              <strong className="text-indigo-800 dark:text-indigo-400">
                {match.awayTeam.shortName} {activePoint.awayProb}%
              </strong>{' '}
              ({activePoint.awayResult})
            </span>
            {activePoint.drawProb !== undefined && (
              <>
                <span className="text-stone-400 dark:text-slate-600">·</span>
                <span className="text-amber-800 dark:text-amber-400 font-semibold">
                  Draw {activePoint.drawProb}%
                </span>
              </>
            )}
          </div>

          {/* Interactive 5-match step selector buttons for keyboard & touch parity */}
          <div className="flex items-center gap-1">
            {data.map((pt) => (
              <button
                key={pt.index}
                type="button"
                onMouseEnter={() => setHoveredIdx(pt.index)}
                onFocus={() => setHoveredIdx(pt.index)}
                onClick={() => setHoveredIdx(pt.index === hoveredIdx ? null : pt.index)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                  activePoint.index === pt.index
                    ? 'bg-stone-800 text-stone-50 dark:bg-slate-200 dark:text-slate-950'
                    : 'bg-[#EAE5DD] text-stone-700 hover:bg-stone-300 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
