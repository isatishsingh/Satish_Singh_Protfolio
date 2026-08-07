"use client";

import { memo, useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type ChartsProps = {
  data: LeetCodeDashboardData;
};

const PIE_COLORS = ["#00b8a3", "#ffc01e", "#ff375f"];

function ChartsComponent({ data }: ChartsProps) {
  const pieData = useMemo(
    () => [
      { name: "Easy", value: data.easy.solved },
      { name: "Medium", value: data.medium.solved },
      { name: "Hard", value: data.hard.solved },
    ],
    [data.easy.solved, data.medium.solved, data.hard.solved],
  );

  const barData = useMemo(
    () => [
      {
        name: "Easy",
        solved: data.easy.solved,
        unsolved: data.easy.remaining,
      },
      {
        name: "Medium",
        solved: data.medium.solved,
        unsolved: data.medium.remaining,
      },
      {
        name: "Hard",
        solved: data.hard.solved,
        unsolved: data.hard.remaining,
      },
    ],
    [data],
  );

  const radialData = useMemo(
    () => [{ name: "Completion", value: data.overallProgress, fill: "#2dd4bf" }],
    [data.overallProgress],
  );

  const acceptanceData = useMemo(
    () => [{ name: "Acceptance", value: data.acceptanceRate, fill: "#fb923c" }],
    [data.acceptanceRate],
  );

  return (
    <div className="flex flex-col gap-6 xl:grid xl:grid-cols-2">
        <ChartPanel title="Difficulty Distribution" subtitle="Easy vs Medium vs Hard">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={88}
                paddingAngle={3}
                stroke="transparent"
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value ?? 0}`, String(name)]}
                contentStyle={tooltipStyle}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>

      <div className="min-w-0">
        <ChartPanel title="Solved vs Unsolved" subtitle="Breakdown by difficulty">
          <ResponsiveContainer width="100%" height={240} >
            <BarChart data={barData} barGap={4}>
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="solved" stackId="a" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
              <Bar dataKey="unsolved" stackId="a" fill="#334155" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="min-w-0">
        <ChartPanel
          title="Overall Completion"
          subtitle={`${data.overallProgress}% of all questions`}
        >
          <ResponsiveContainer width="100%" height={240} >
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="100%"
              barSize={14}
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                background={{ fill: "color-mix(in srgb, var(--color-border) 70%, transparent)" }}
                dataKey="value"
                cornerRadius={12}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-2xl font-bold"
              >
                {data.overallProgress}%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="min-w-0">
        <ChartPanel
          title="Acceptance Rate"
          subtitle={`${data.totalSubmissions.toLocaleString()} total submissions`}
        >
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="100%"
              barSize={14}
              data={acceptanceData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                background={{ fill: "color-mix(in srgb, var(--color-border) 70%, transparent)" }}
                dataKey="value"
                cornerRadius={12}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-2xl font-bold"
              >
                {data.acceptanceRate}%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </div>
  );
}

function ChartPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="leetcode-glass-card min-w-0 w-full overflow-hidden rounded-2xl p-5">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.75rem",
  color: "var(--color-foreground)",
};

export const Charts = memo(ChartsComponent);
export default Charts;

export function ChartsSkeleton() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="leetcode-glass-card rounded-2xl p-5"
        >
          <div className="h-5 w-32 rounded stencil" />
          <div className="mt-2 h-3 w-40 rounded stencil" />
          <div className="mt-6 h-56 rounded-xl stencil" />
        </div>
      ))}
    </div>
  );
}
