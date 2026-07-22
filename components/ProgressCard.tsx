"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type ProgressCardProps = {
  data: LeetCodeDashboardData;
  delay?: number;
};

const DIFFICULTY_COLORS = {
  easy: "#00b8a3",
  medium: "#ffc01e",
  hard: "#ff375f",
} as const;

export function ProgressCard({ data, delay = 0 }: ProgressCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const difficulties = [
    { key: "Easy", stats: data.easy, color: DIFFICULTY_COLORS.easy },
    { key: "Medium", stats: data.medium, color: DIFFICULTY_COLORS.medium },
    { key: "Hard", stats: data.hard, color: DIFFICULTY_COLORS.hard },
  ] as const;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { scale: 1.01, boxShadow: "0 0 32px -8px var(--color-glow)" }
      }
      className="leetcode-glass-card rounded-2xl p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Problem Statistics
          </h3>
          <p className="mt-1 text-sm text-muted">
            Track solved progress across all difficulties
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">
            {data.totalSolved}
            <span className="ml-1 text-base font-normal text-muted">
              / {data.totalQuestions}
            </span>
          </p>
          <p className="text-xs text-muted">{data.remaining} remaining</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {difficulties.map(({ key, stats, color }) => (
          <div
            key={key}
            className="rounded-xl border border-border/60 bg-surface-elevated/70 p-4"
          >
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{key}</span>
              <span className="text-muted">
                {stats.solved}/{stats.total} · {stats.remaining} left
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-border/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.percentage}%` }}
                transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              {stats.percentage.toFixed(1)}% solved
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border/60 bg-surface-elevated/70 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Overall Completion</span>
          <span className="text-muted">{data.overallProgress}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-border/60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.overallProgress}%` }}
            transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ProgressCardSkeleton() {
  return (
    <div className="leetcode-glass-card animate-pulse rounded-2xl p-6">
      <div className="h-6 w-40 rounded bg-border/70" />
      <div className="mt-2 h-4 w-56 rounded bg-border/50" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border/60 bg-surface-elevated/70 p-4"
          >
            <div className="mb-3 h-4 w-full rounded bg-border/60" />
            <div className="h-2 rounded-full bg-border/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
