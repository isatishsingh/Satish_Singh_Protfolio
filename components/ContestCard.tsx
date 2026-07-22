"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Medal, Trophy } from "lucide-react";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type ContestCardProps = {
  data: LeetCodeDashboardData;
  delay?: number;
};

export function ContestCard({ data, delay = 0 }: ContestCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const contest = data.contest;

  if (!contest) {
    return null;
  }

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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Contest Performance</p>
          <p className="mt-1 text-4xl font-bold text-accent-secondary">
            {Math.round(contest.rating)}
          </p>
          <p className="mt-2 text-sm text-muted">
            Global rank #{contest.globalRanking.toLocaleString()}
          </p>
          <p className="text-sm text-muted">
            {contest.attendedContestsCount} contests attended
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <MetricBox
            icon={Trophy}
            label="Top Percentage"
            value={`${contest.topPercentage}%`}
          />
          <MetricBox
            icon={Medal}
            label="Contest Badge"
            value={contest.badge?.name ?? "Unranked"}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-border/60 bg-surface-elevated/70 px-4 py-3">
        <Award className="text-accent-secondary" size={18} />
        <p className="text-sm text-muted">
          Competing in LeetCode contests builds rating momentum and global
          visibility.
        </p>
      </div>
    </motion.div>
  );
}

function MetricBox({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface-elevated/70 px-4 py-3 text-center">
      <Icon className="mx-auto text-accent" size={18} />
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

export function ContestCardSkeleton() {
  return (
    <div className="leetcode-glass-card animate-pulse rounded-2xl p-6">
      <div className="h-4 w-32 rounded bg-border/70" />
      <div className="mt-3 h-10 w-24 rounded bg-border/70" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="h-24 rounded-xl bg-border/50" />
        <div className="h-24 rounded-xl bg-border/50" />
      </div>
    </div>
  );
}
