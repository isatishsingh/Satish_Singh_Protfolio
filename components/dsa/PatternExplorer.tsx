"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { patterns } from "@/data/patterns";
import type { Pattern, SolvedProblem } from "@/types";

function bubbleSize(total: number, min: number, max: number) {
  const minSize = 64;
  const maxSize = 116;
  if (max === min) return (minSize + maxSize) / 2;
  const ratio = (total - min) / (max - min);
  return minSize + ratio * (maxSize - minSize);
}

function difficultyClass(difficulty: SolvedProblem["difficulty"]) {
  if (difficulty === "Easy") return "difficulty-easy";
  if (difficulty === "Medium") return "difficulty-medium";
  return "difficulty-hard";
}

function leetcodeUrl(slug: string) {
  return `https://leetcode.com/problems/${slug}/`;
}

export function PatternExplorer() {
  const [selected, setSelected] = useState<Pattern | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { minTotal, maxTotal } = useMemo(() => {
    const totals = patterns.map((p) => p.total);
    return { minTotal: Math.min(...totals), maxTotal: Math.max(...totals) };
  }, []);

  const hovered = patterns.find((p) => p.id === hoveredId);

  return (
    <div className="dsa-card p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Patterns Explorer</h3>
          <p className="mt-1 text-sm text-muted">
            Click a pattern bubble to reveal your solved problem path with LeetCode links.
          </p>
        </div>
        {hovered && !selected && (
          <div className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs sm:text-sm">
            <span className="font-medium text-foreground">{hovered.name}</span>
            <span className="ml-2 text-muted">
              {hovered.solved}/{hovered.total}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-2">
        {patterns.map((pattern) => {
          const size = bubbleSize(pattern.total, minTotal, maxTotal);
          const progress = pattern.solved / pattern.total;
          const isSelected = selected?.id === pattern.id;

          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() =>
                setSelected((current) =>
                  current?.id === pattern.id ? null : pattern,
                )
              }
              onMouseEnter={() => setHoveredId(pattern.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative flex shrink-0 flex-col items-center justify-end overflow-hidden rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isSelected
                  ? "scale-105 border-accent shadow-[0_0_24px_var(--glow)]"
                  : "border-border hover:border-accent/50 hover:scale-105"
              }`}
              style={{ width: size, height: size }}
              aria-pressed={isSelected}
              aria-label={`${pattern.name}: ${pattern.solved} of ${pattern.total} solved`}
            >
              <div
                className="absolute inset-x-0 bottom-0 bg-accent/25 transition-all duration-500"
                style={{ height: `${Math.max(progress * 100, 10)}%` }}
              />
              <span className="relative z-10 px-1.5 pb-2.5 text-center text-[10px] sm:text-[11px] font-medium leading-tight text-foreground">
                {pattern.name}
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-8 rounded-2xl border border-accent/30 bg-surface-elevated p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                {selected.name} Path
              </h4>
              <p className="mt-1 text-sm text-muted">
                {selected.solved}/{selected.total} solved ·{" "}
                {selected.problems.length} tracked problems
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="rounded-lg border border-border p-2 text-muted hover:text-foreground"
              aria-label="Close pattern path"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-8 overflow-x-auto pb-2">
            <ol className="flex min-w-max items-center gap-2">
              {selected.problems.map((problem, index) => (
                <li key={problem.slug} className="flex items-center gap-2">
                  <a
                    href={leetcodeUrl(problem.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-[180px] max-w-[220px] flex-col rounded-xl border border-border bg-surface px-4 py-3 transition-all hover:border-accent/50 hover:shadow-[0_8px_24px_-12px_var(--glow)]"
                  >
                    <span className="text-xs text-muted">#{index + 1}</span>
                    <span className="mt-1 text-sm font-medium text-foreground group-hover:text-accent">
                      {problem.title}
                    </span>
                    <span
                      className={`mt-2 text-xs font-medium ${difficultyClass(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted group-hover:text-accent">
                      Open on LeetCode
                      <ExternalLink size={12} />
                    </span>
                  </a>
                  {index < selected.problems.length - 1 && (
                    <ArrowRight
                      size={20}
                      className="shrink-0 text-accent-secondary"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
