"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type HeatmapProps = {
  data: LeetCodeDashboardData;
  delay?: number;
};

const WEEKS = 53;
const DAYS = 7;

function getIntensityLevel(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export function Heatmap({ data, delay = 0 }: HeatmapProps) {
  const shouldReduceMotion = useReducedMotion();
  const calendar = data.submissionCalendar;

  const hasCalendar = Object.keys(calendar).length > 0;

  const { weeks, totalSubmissions } = useMemo(() => {
    if (!hasCalendar) {
      return { weeks: [] as number[][], totalSubmissions: 0 };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today);
    start.setDate(start.getDate() - (WEEKS * DAYS - 1));

    const countsByDay = new Map<string, number>();

    Object.entries(calendar).forEach(([timestamp, count]) => {
      const date = new Date(Number(timestamp) * 1000);
      date.setHours(0, 0, 0, 0);
      const key = date.toISOString().slice(0, 10);
      countsByDay.set(key, (countsByDay.get(key) ?? 0) + count);
    });

    const grid: number[][] = [];
    let submissions = 0;

    for (let week = 0; week < WEEKS; week += 1) {
      const row: number[] = [];
      for (let day = 0; day < DAYS; day += 1) {
        const current = new Date(start);
        current.setDate(start.getDate() + week * DAYS + day);

        if (current > today) {
          row.push(-1);
          continue;
        }

        const key = current.toISOString().slice(0, 10);
        const count = countsByDay.get(key) ?? 0;
        submissions += count;
        row.push(getIntensityLevel(count));
      }
      grid.push(row);
    }

    return { weeks: grid, totalSubmissions: submissions };
  }, [calendar, hasCalendar]);

  if (!hasCalendar) {
    return null;
  }

  const monthLabels = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today);
    start.setDate(start.getDate() - (WEEKS * DAYS - 1));

    const labels: { label: string; week: number }[] = [];
    let previousMonth = -1;

    for (let week = 0; week < WEEKS; week++) {
      const current = new Date(start);
      current.setDate(start.getDate() + week * DAYS);

      const month = current.getMonth();

      if (month !== previousMonth) {
        labels.push({
          label: current.toLocaleString("default", {
            month: "short",
          }),
          week,
        });

        previousMonth = month;
      }
    }

    return labels;
  }, []);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { scale: 1.005, boxShadow: "0 0 32px -8px var(--color-glow)" }
      }
      className="leetcode-glass-card rounded-2xl p-6 min-w-0"
    >
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Submission Activity
          </h3>
          <p className="mt-1 text-sm text-muted">
            {totalSubmissions.toLocaleString()} submissions in the last year ·{" "}
            {data.activeDays} active days · Max streak {data.maxStreak}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-3 w-3 shrink-0 rounded-sm heatmap-${level}`} />
          ))}
          <span>More</span>
        </div>
      </div>


      <div className="mt-6 w-full overflow-x-auto heatmap-scroll">
        <div className="inline-block min-w-max">

          {/* Month labels */}
          <div className="relative h-5 mb-2">
            {monthLabels.map((month) => (
              <span
                key={month.week}
                className="absolute text-xs text-slate-400 whitespace-nowrap"
                style={{
                  left: `${month.week * 16}px`,
                }}
              >
                {month.label}
              </span>
            ))}
          </div>

          {/* Heatmap */}
          <div className="inline-flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col gap-1 shrink-0"
              >
                {week.map((level, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={
                      level < 0
                        ? "h-3 w-3 rounded-sm bg-transparent"
                        : `h-3 w-3 rounded-sm heatmap-${level}`
                    }
                  />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export function HeatmapSkeleton() {
  return (
    <div className="leetcode-glass-card rounded-2xl p-6">
      <div className="h-6 w-48 rounded stencil" />
      <div className="mt-2 h-4 w-72 rounded stencil" />
      <div className="mt-6 h-28 rounded-xl stencil" />
    </div>
  );
}