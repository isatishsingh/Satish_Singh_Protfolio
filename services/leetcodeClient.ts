import type { LeetCodeDashboardData } from "@/types/leetcode";
import { LeetCodeApiError } from "./leetcodeApiError";

export async function fetchLeetCodeDashboardClient(
  username: string,
): Promise<LeetCodeDashboardData> {
  const response = await fetch(
    `/api/leetcode/${encodeURIComponent(username)}`,
  );

  if (!response.ok) {

    throw new LeetCodeApiError(
      "Unable to load LeetCode dashboard data.",
      response.status,
    );
  }

  const data =
    (await response.json()) as LeetCodeDashboardData;

  return data;
}