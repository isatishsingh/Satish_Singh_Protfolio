"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, RefreshCw } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { useLeetcode } from "@/hooks/useLeetcode";

export function DsaPreviewClient() {
  const { data, isLoading, isError, refetch, isFetching } = useLeetcode();

  return (
    <AnimatedSection
      id="dsa"
      className="mx-auto max-w-4xl px-6 py-10 md:py-12"
    >
      <SectionHeading
        title="Problem Solving"
        subtitle="Live LeetCode progress, contest rating, and submission activity."
      />

      <div className="glass-card overflow-hidden rounded-3xl">
        {isLoading ? (
          <div className="p-8">
            <div className="h-4 w-32 rounded stencil" />
            <div className="mt-6 h-12 w-48 rounded stencil" />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-20 rounded-xl stencil" />
              ))}
            </div>
          </div>
        ) : isError || !data ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted">Could not load LeetCode preview.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="btn-outline mt-4 inline-flex items-center gap-2"
            >
              <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
              Retry
            </button>
          </div>
        ) : (
          <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
            <div className="border-b border-border/40 p-8 lg:border-b-0 lg:border-r lg:border-border/40">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                LeetCode Progress
              </p>
              <p className="mt-4 text-5xl font-bold text-foreground">
                {data.totalSolved}
                <span className="ml-2 text-2xl font-normal text-muted">
                  / {data.totalQuestions}
                </span>
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <PreviewStat
                  label="Easy"
                  value={`${data.easy.solved}/${data.easy.total}`}
                  className="difficulty-easy"
                />
                <PreviewStat
                  label="Medium"
                  value={`${data.medium.solved}/${data.medium.total}`}
                  className="difficulty-medium"
                />
                <PreviewStat
                  label="Hard"
                  value={`${data.hard.solved}/${data.hard.total}`}
                  className="difficulty-hard"
                />
              </div>

              <p className="mt-6 text-sm text-muted">
                Contest rating:{" "}
                <span className="font-semibold text-accent-secondary">
                  {data.contest ? Math.round(data.contest.rating) : "—"}
                </span>
                {" · "}
                Acceptance:{" "}
                <span className="font-semibold text-accent">
                  {data.acceptanceRate}%
                </span>
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 p-8">
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Explore the full dashboard with live stats, charts, submission
                heatmap, and interactive pattern paths.
              </p>
              <Link href="/dsa" className="btn-primary w-fit">
                Open DSA Dashboard
                <ArrowRight size={16} />
              </Link>
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-accent hover:underline"
              >
                View LeetCode Profile
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

function PreviewStat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 font-semibold ${className}`}>{value}</p>
    </div>
  );
}
