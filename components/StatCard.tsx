"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: ReactNode;
  subtitle?: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  delay = 0,
}: StatCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { scale: 1.02, boxShadow: "0 0 32px -8px var(--color-glow)" }
      }
      className={`leetcode-stat-card relative overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-5 backdrop-blur-xl ${gradient}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-70" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {subtitle ? (
            <p className="mt-1 text-xs text-muted">{subtitle}</p>
          ) : null}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/10 p-2.5 text-accent-secondary">
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="leetcode-stat-card rounded-2xl border border-border/60 bg-surface/80 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <div className="h-4 w-24 rounded stencil" />
          <div className="h-8 w-20 rounded stencil" />
          <div className="h-3 w-28 rounded stencil" />
        </div>
        <div className="h-10 w-10 rounded-xl stencil" />
      </div>
    </div>
  );
}
