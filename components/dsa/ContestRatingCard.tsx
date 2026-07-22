"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { leetcodeStats } from "@/data/leetcode";

const ratingHistory = [
  { month: "Jan", rating: 1180 },
  { month: "Feb", rating: 1210 },
  { month: "Mar", rating: 1285 },
  { month: "Apr", rating: 1340 },
  { month: "May", rating: 1410 },
  { month: "Jun", rating: 1465 },
  { month: "Jul", rating: 1515 },
];

export function ContestRatingCard() {
  const { contestRating, globalRanking, contestsAttended, percentile } =
    leetcodeStats;

  return (
    <div className="dsa-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Contest Rating</p>
          <p className="mt-1 text-4xl font-bold text-accent-secondary">
            {contestRating}
          </p>
          <p className="mt-2 text-sm text-muted">
            Global ranking #{globalRanking.toLocaleString()}
          </p>
          <p className="text-sm text-muted">
            {contestsAttended} contests attended
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-elevated px-5 py-4 text-center">
          <p className="text-3xl font-bold text-foreground">{percentile}%</p>
          <p className="mt-1 text-xs text-muted">Top percentile</p>
        </div>
      </div>

      <div className="mt-6 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ratingHistory}>
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--color-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide domain={["dataMin - 50", "dataMax + 50"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                color: "var(--color-foreground)",
              }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#fb923c"
              strokeWidth={2.5}
              dot={{ fill: "#fb923c", r: 3 }}
              activeDot={{ r: 5, fill: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
