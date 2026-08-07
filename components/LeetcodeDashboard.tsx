"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ExternalLink,
  Flame,
  RefreshCw,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { useLeetcode } from "@/hooks/useLeetcode";
import { ContestCard, ContestCardSkeleton } from "@/components/ContestCard";
import { Heatmap, HeatmapSkeleton } from "@/components/Heatmap";
import { ProgressCard, ProgressCardSkeleton } from "@/components/ProgressCard";
import { StatCard, StatCardSkeleton } from "@/components/StatCard";
import { ChartsSkeleton } from "@/components/Charts";

const Charts = dynamic(
  () => import("@/components/Charts").then((module) => ({ default: module.Charts })),
  {
    loading: () => <ChartsSkeleton />,
    ssr: false,
  },
);

function formatRelativeTime(timestamp: number) {
  const diffMs = Date.now() - timestamp * 1000;
  const diffHours = Math.floor(diffMs / 3_600_000);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;

  return new Date(timestamp * 1000).toLocaleDateString();
}

export function LeetcodeDashboard() {
  const { data, isLoading, isError, refetch, isFetching } = useLeetcode();
  const shouldReduceMotion = useReducedMotion();

  const github = contact.links.find((link) => link.type === "github");
  const linkedin = contact.links.find((link) => link.type === "linkedin");

  const initials = useMemo(
    () =>
      (data?.displayName ?? profile.name)
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2),
    [data?.displayName],
  );

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="leetcode-glass-card rounded-2xl p-10 text-center">
        <p className="text-lg font-semibold text-foreground">
          Unable to load LeetCode stats
        </p>
        <p className="mt-2 text-sm text-muted">
          The dashboard could not reach the LeetCode API. Please try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="btn-primary mt-6 inline-flex items-center gap-2"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <motion.aside
          initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="
        w-full
        min-w-0
        overflow-hidden
        leetcode-glass-card
        h-fit
        rounded-2xl
        p-6
        lg:sticky
        lg:top-24
    "
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent-secondary/20 to-accent/20">
            {data.avatar ? (
              <Image
                src={data.avatar}
                alt={data.displayName ?? data.username}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-accent">{initials}</span>
            )}
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {data.displayName ?? profile.name}
            </h2>
            <p className="mt-1 text-sm text-muted">@{data.username}</p>
            <p className="mt-2 text-sm text-muted">
              Rank #{data.ranking.toLocaleString()}
            </p>
          </div>

          <a
            href={data.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full justify-center text-center"
          >
            View LeetCode Profile
            <ExternalLink size={14} />
          </a>

          <div className="mt-6 grid gap-3 text-sm text-muted">
            <ProfileMetric label="Reputation" value={data.reputation} />
            <ProfileMetric
              label="Contribution Points"
              value={data.contributionPoints}
            />
            <ProfileMetric
              label="Acceptance Rate"
              value={`${data.acceptanceRate}%`}
            />
          </div>

          <ul className="mt-6 space-y-2 text-sm text-muted overflow-hidden">
            {github ? (
              <li className="truncate">
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent truncate block"
                >
                  {github.href.replace("https://", "")}
                </a>
              </li>
            ) : null}
            {linkedin ? (
              <li className="truncate">
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent truncate block"
                >
                  {linkedin.href.replace("https://", "")}
                </a>
              </li>
            ) : null}
          </ul>
        </motion.aside>

        <div className="min-w-0 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total Solved"
              value={data.totalSolved}
              subtitle={`${data.overallProgress}% complete`}
              icon={Flame}
              gradient="from-orange-500/10 to-red-500/5"
              delay={0.05}
            />
            <StatCard
              title="Ranking"
              value={`#${data.ranking.toLocaleString()}`}
              subtitle="Global LeetCode rank"
              icon={Trophy}
              gradient="from-amber-500/10 to-yellow-500/5"
              delay={0.1}
            />
            <StatCard
              title="Acceptance Rate"
              value={`${data.acceptanceRate}%`}
              subtitle={`${data.totalSubmissions.toLocaleString()} submissions`}
              icon={TrendingUp}
              gradient="from-emerald-500/10 to-teal-500/5"
              delay={0.15}
            />
            <StatCard
              title="Contest Rating"
              value={
                data.contest ? Math.round(data.contest.rating) : "—"
              }
              subtitle={
                data.contest
                  ? `#${data.contest.globalRanking.toLocaleString()} globally`
                  : "Contest data unavailable"
              }
              icon={Target}
              gradient="from-sky-500/10 to-blue-500/5"
              delay={0.2}
            />
            <StatCard
              title="Active Days"
              value={data.activeDays}
              subtitle={`Current streak: ${data.currentStreak} days`}
              icon={Zap}
              gradient="from-violet-500/10 to-purple-500/5"
              delay={0.25}
            />
            <StatCard
              title="Reputation"
              value={data.reputation}
              subtitle={`${data.contributionPoints} contribution pts`}
              icon={Star}
              gradient="from-pink-500/10 to-rose-500/5"
              delay={0.3}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <ProgressCard data={data} delay={0.15} />
            <ContestCard data={data} delay={0.2} />
          </div>

          <Suspense fallback={<ChartsSkeleton />}>
            <Charts data={data} />
          </Suspense>

          <div className="mt-6 min-w-0">
            <Heatmap data={data} delay={0.25} />
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
            className="leetcode-glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2">
              <Activity className="text-accent" size={18} />
              <h3 className="text-lg font-semibold text-foreground">
                Submission Insights
              </h3>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <InsightTile
                label="Current Streak"
                value={`${data.currentStreak} days`}
              />
              <InsightTile
                label="Max Streak"
                value={`${data.maxStreak} days`}
              />
              <InsightTile
                label="Submissions (1Y)"
                value={data.submissionsPastYear.toLocaleString()}
              />
            </div>

            {data.lastSubmission ? (
              <div className="mt-5 rounded-xl border border-border/60 bg-surface-elevated/70 p-4">
                <p className="text-xs uppercase tracking-wide text-muted">
                  Last Submission
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {data.lastSubmission.title}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {data.lastSubmission.status} · {data.lastSubmission.lang} ·{" "}
                  {formatRelativeTime(data.lastSubmission.timestamp)}
                </p>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-surface-elevated/60 px-3 py-2">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function InsightTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface-elevated/70 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="leetcode-glass-card rounded-2xl p-6">
          <div className="mx-auto h-24 w-24 rounded-2xl stencil" />
          <div className="mt-5 space-y-2">
            <div className="mx-auto h-5 w-32 rounded stencil" />
            <div className="mx-auto h-4 w-24 rounded stencil" />
          </div>
          <div className="mt-6 h-10 rounded-xl stencil" />
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <StatCardSkeleton key={index} />
            ))}
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <ProgressCardSkeleton />
            <ContestCardSkeleton />
          </div>
          <ChartsSkeleton />
          <HeatmapSkeleton />
        </div>
      </div>
    </div>
  );
}
