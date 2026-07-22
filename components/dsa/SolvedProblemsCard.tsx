"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { leetcodeStats } from "@/data/leetcode";

const COLORS = {
  easy: "#00b8a3",
  medium: "#ffc01e",
  hard: "#ff375f",
  unsolved: "#2d3440",
};

export function SolvedProblemsCard() {
  const { totalSolved, totalProblems, easy, medium, hard } = leetcodeStats;

  const chartData = [
    { name: "Easy", value: easy.solved, fill: COLORS.easy },
    { name: "Medium", value: medium.solved, fill: COLORS.medium },
    { name: "Hard", value: hard.solved, fill: COLORS.hard },
    {
      name: "Unsolved",
      value: totalProblems - totalSolved,
      fill: COLORS.unsolved,
    },
  ];

  return (
    <div className="dsa-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Solved Problems</h3>

      <div className="mt-6 grid items-center gap-6 md:grid-cols-[220px_1fr]">
        <div className="relative mx-auto h-52 w-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={1}
                stroke="transparent"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value ?? 0}`, String(name)]}
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.75rem",
                  color: "var(--color-foreground)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-foreground">
              {totalSolved}/{totalProblems}
            </p>
            <p className="text-xs text-muted">Solved</p>
          </div>
        </div>

        <div className="space-y-3">
          <DifficultyRow
            label="Easy"
            solved={easy.solved}
            total={easy.total}
            className="difficulty-easy"
            barColor={COLORS.easy}
          />
          <DifficultyRow
            label="Med."
            solved={medium.solved}
            total={medium.total}
            className="difficulty-medium"
            barColor={COLORS.medium}
          />
          <DifficultyRow
            label="Hard"
            solved={hard.solved}
            total={hard.total}
            className="difficulty-hard"
            barColor={COLORS.hard}
          />
        </div>
      </div>
    </div>
  );
}

function DifficultyRow({
  label,
  solved,
  total,
  className,
  barColor,
}: {
  label: string;
  solved: number;
  total: number;
  className: string;
  barColor: string;
}) {
  const pct = Math.round((solved / total) * 100);

  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-4">
      <div className="flex items-center justify-between text-sm">
        <span className={`font-medium ${className}`}>{label}</span>
        <span className="text-muted">
          {solved}/{total}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}
