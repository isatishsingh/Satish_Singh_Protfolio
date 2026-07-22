"use client";

import { useMemo } from "react";
import { leetcodeStats } from "@/data/leetcode";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function SubmissionHeatmap() {
  const { submissionsPastYear, activeDays, maxStreak } = leetcodeStats;

  const weeks = useMemo(() => {
    const grid: number[][] = [];
    let dayIndex = 0;

    for (let week = 0; week < 53; week += 1) {
      const row: number[] = [];
      for (let day = 0; day < 7; day += 1) {
        const intensity = seededRandom(dayIndex + activeDays);
        const active = intensity < activeDays / 365;
        row.push(active ? Math.ceil(intensity * 4) : 0);
        dayIndex += 1;
      }
      grid.push(row);
    }

    return grid;
  }, [activeDays]);

  return (
    <div className="dsa-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {submissionsPastYear} submissions in the past one year
          </h3>
          <p className="mt-1 text-sm text-muted">
            Total active days: {activeDays} · Max streak: {maxStreak}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((level, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`h-3 w-3 rounded-sm heatmap-${level}`}
                  title={`Activity level ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
