"use client";

import { useQuery } from "@tanstack/react-query";
import { LEETCODE_USERNAME } from "@/config/leetcode";
import { fetchLeetCodeDashboardClient } from "@/services/leetcodeApi";

export function useLeetcode(username: string = LEETCODE_USERNAME) {
  return useQuery({
    queryKey: ["leetcode-dashboard", username],
    queryFn: () => fetchLeetCodeDashboardClient(username),
    staleTime: 30 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });
}
