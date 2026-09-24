import React from 'react';

export default function ProbabilityRing({
  probability = null,
  isHigherRisk = false,
  size = 180,
  strokeWidth = 14,
}) {
  if (probability === null || probability === undefined) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <span className="text-3xl font-bold text-slate-400">N/A</span>
        <span className="text-xs text-slate-500 mt-1">Probability not available</span>
      </div>
    );
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(probability * 100, 0), 100);
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  // Color logic
  const strokeColor = isHigherRisk ? '#DC2626' : '#16A34A';
  const bgColor = isHigherRisk ? '#FEE2E2' : '#DCFCE7';
  const textColor = isHigherRisk ? 'text-red-600' : 'text-emerald-600';

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-extrabold tracking-tight ${textColor}`}>
            {percentage.toFixed(1)}%
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Probability
          </span>
        </div>
      </div>
    </div>
  );
}
