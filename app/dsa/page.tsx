import type { Metadata } from "next";

import { PatternExplorer } from "@/components/dsa/PatternExplorer";

import { LeetcodeDashboard } from "@/components/LeetcodeDashboard";



export const metadata: Metadata = {

  title: "Satish Singh",

  description:

    "Live LeetCode dashboard with difficulty breakdown, contest stats, submission heatmap, and pattern-wise solved problems.",

};



export default function DsaPage() {

  return (

    <div className="page-mesh min-h-screen">

      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">

        <div className="mb-8">

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-secondary">

            DSA Dashboard

          </p>

          <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">

            Problem Solving Progress

          </h1>

          <p className="mt-2 max-w-2xl text-muted">

            Real-time LeetCode stats, contest performance, submission activity,

            and interactive pattern paths to solved problems.

          </p>

        </div>



        <LeetcodeDashboard />



        <div className="mt-6">

          <PatternExplorer />

        </div>

      </div>

    </div>

  );

}

