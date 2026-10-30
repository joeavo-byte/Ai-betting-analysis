import React from 'react';

interface RadarProps {
  stats: {
    attack: number;
    defense: number;
    clutch: number;
    consistency: number;
    stamina: number;
    tactical: number;
  };
  comparisonStats?: {
    attack: number;
    defense: number;
    clutch: number;
    consistency: number;
    stamina: number;
    tactical: number;
  };
  size?: number;
  playerName?: string;
  comparisonName?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const PlayerRadarChart: React.FC<RadarProps> = ({
  stats,
  comparisonStats,
  size = 220,
  playerName = 'Player',
  comparisonName = 'Comparison',
  primaryColor = '#10B981', // emerald-500
  secondaryColor = '#6366F1', // indigo-500
}) => {
  const center = size / 2;
  const radius = size * 0.38;

  const labels = [
    { key: 'attack', label: 'Attack' },
    { key: 'defense', label: 'Defense' },
    { key: 'clutch', label: 'Clutch' },
    { key: 'consistency', label: 'Form' },
    { key: 'stamina', label: 'Stamina' },
    { key: 'tactical', label: 'Tactics' },
  ] as const;

  const totalPoints = labels.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getPolygonPoints = (data: typeof stats) => {
    return labels
      .map((item, index) => {
        const val = data[item.key] || 50;
        const { x, y } = getCoordinates(index, val);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible select-none">
        {/* Background Web Polygons */}
        {gridLevels.map((lvl, lvlIdx) => {
          const points = labels
            .map((_, index) => {
              const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
              const r = radius * lvl;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(' ');

          return (
            <polygon
              key={lvlIdx}
              points={points}
              fill={lvlIdx === gridLevels.length - 1 ? 'rgba(30, 41, 59, 0.4)' : 'none'}
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="1"
              strokeDasharray={lvlIdx < gridLevels.length - 1 ? '2,2' : undefined}
            />
          );
        })}

        {/* Axis lines */}
        {labels.map((_, index) => {
          const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Comparison Polygon if exists */}
        {comparisonStats && (
          <polygon
            points={getPolygonPoints(comparisonStats)}
            fill={secondaryColor}
            fillOpacity="0.25"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeDasharray="4,2"
          />
        )}

        {/* Primary Player Polygon */}
        <polygon
          points={getPolygonPoints(stats)}
          fill={primaryColor}
          fillOpacity="0.35"
          stroke={primaryColor}
          strokeWidth="2.5"
        />

        {/* Primary Data Points */}
        {labels.map((item, index) => {
          const val = stats[item.key] || 50;
          const { x, y } = getCoordinates(index, val);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3.5"
              fill={primaryColor}
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Axis Labels */}
        {labels.map((item, index) => {
          const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
          const labelDist = radius + 18;
          const x = center + labelDist * Math.cos(angle);
          const y = center + labelDist * Math.sin(angle);
          const val = stats[item.key] || 0;

          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-mono fill-slate-400 font-semibold"
            >
              {item.label} <tspan className="fill-emerald-400 font-bold">{val}</tspan>
            </text>
          );
        })}
      </svg>

      {/* Legend if comparing */}
      {comparisonStats && (
        <div className="flex items-center gap-4 mt-2 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span className="text-slate-300 truncate max-w-[90px]">{playerName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
            <span className="text-slate-300 truncate max-w-[90px]">{comparisonName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
