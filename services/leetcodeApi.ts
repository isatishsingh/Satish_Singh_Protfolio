import {
  LEETCODE_API_BASE,
  getLeetCodeProfileUrl,
} from "@/config/leetcode";
import type {
  DifficultyStats,
  LeetCodeApiResponse,
  LeetCodeContestData,
  LeetCodeDashboardData,
  LeetCodeProfileData,
} from "@/types/leetcode";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const PROFILE_QUERY = `
  query leetcodeProfile($username: String!) {
    matchedUser(username: $username) {
      profile {
        userAvatar
        realName
        ranking
        reputation
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
      badge {
        name
      }
    }
  }
`;

export class LeetCodeApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "LeetCodeApiError";
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new LeetCodeApiError(
      `LeetCode API request failed (${response.status})`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchLeetCodeStats(
  username: string,
): Promise<LeetCodeApiResponse> {
  return fetchJson<LeetCodeApiResponse>(
    `${LEETCODE_API_BASE}/${encodeURIComponent(username)}`,
  );
}

type GraphQLProfileResponse = {
  data?: {
    matchedUser?: {
      profile?: LeetCodeProfileData | null;
    } | null;
    userContestRanking?: LeetCodeContestData | null;
  };
  errors?: Array<{ message: string }>;
};

export async function fetchLeetCodeProfileAndContest(username: string): Promise<{
  profile: LeetCodeProfileData | null;
  contest: LeetCodeContestData | null;
}> {
  try {
    const response = await fetchJson<GraphQLProfileResponse>(
      LEETCODE_GRAPHQL_URL,
      {
        method: "POST",
        body: JSON.stringify({
          query: PROFILE_QUERY,
          variables: { username },
        }),
      },
    );

    if (response.errors?.length) {
      throw new LeetCodeApiError(response.errors[0]?.message ?? "GraphQL error");
    }

    return {
      profile: response.data?.matchedUser?.profile ?? null,
      contest: response.data?.userContestRanking ?? null,
    };
  } catch {
    return { profile: null, contest: null };
  }
}

function buildDifficultyStats(solved: number, total: number): DifficultyStats {
  const remaining = Math.max(total - solved, 0);
  const percentage = total > 0 ? (solved / total) * 100 : 0;

  return {
    solved,
    total,
    remaining,
    percentage,
  };
}

function getSubmissionCount(
  stats: LeetCodeApiResponse["matchedUserStats"]["acSubmissionNum"],
  difficulty: "All" | "Easy" | "Medium" | "Hard",
) {
  return stats.find((item) => item.difficulty === difficulty)?.submissions ?? 0;
}

function computeAcceptanceRate(stats: LeetCodeApiResponse["matchedUserStats"]) {
  const accepted = getSubmissionCount(stats.acSubmissionNum, "All");
  const total = getSubmissionCount(stats.totalSubmissionNum, "All");

  if (total === 0) {
    return 0;
  }

  return Math.round((accepted / total) * 1000) / 10;
}

function toDateKey(timestampSeconds: number) {
  return new Date(timestampSeconds * 1000).toISOString().slice(0, 10);
}

function computeStreaks(calendar: Record<string, number>) {
  const dateKeys = [
    ...new Set(
      Object.keys(calendar).map((timestamp) =>
        toDateKey(Number(timestamp)),
      ),
    ),
  ].sort();

  if (dateKeys.length === 0) {
    return { activeDays: 0, currentStreak: 0, maxStreak: 0 };
  }

  let maxStreak = 1;
  let streak = 1;

  for (let index = 1; index < dateKeys.length; index += 1) {
    const previous = new Date(`${dateKeys[index - 1]}T00:00:00Z`).getTime();
    const current = new Date(`${dateKeys[index]}T00:00:00Z`).getTime();
    const dayDiff = Math.round((current - previous) / 86_400_000);

    if (dayDiff === 1) {
      streak += 1;
      maxStreak = Math.max(maxStreak, streak);
    } else if (dayDiff > 1) {
      streak = 1;
    }
  }

  const today = toDateKey(Math.floor(Date.now() / 1000));
  const yesterday = toDateKey(Math.floor(Date.now() / 1000) - 86_400);
  const latestDate = dateKeys[dateKeys.length - 1];

  let currentStreak = 0;

  if (latestDate === today || latestDate === yesterday) {
    currentStreak = 1;

    for (let index = dateKeys.length - 2; index >= 0; index -= 1) {
      const previous = new Date(`${dateKeys[index]}T00:00:00Z`).getTime();
      const current = new Date(`${dateKeys[index + 1]}T00:00:00Z`).getTime();
      const dayDiff = Math.round((current - previous) / 86_400_000);

      if (dayDiff === 1) {
        currentStreak += 1;
      } else {
        break;
      }
    }
  }

  return {
    activeDays: dateKeys.length,
    currentStreak,
    maxStreak,
  };
}

function sumSubmissionCalendar(calendar: Record<string, number>) {
  return Object.values(calendar).reduce((total, count) => total + count, 0);
}

export function transformLeetCodeData(
  username: string,
  stats: LeetCodeApiResponse,
  profile: LeetCodeProfileData | null,
  contest: LeetCodeContestData | null,
): LeetCodeDashboardData {
  const totalQuestions = stats.totalQuestions;
  const totalSolved = stats.totalSolved;
  const remaining = Math.max(totalQuestions - totalSolved, 0);
  const streaks = computeStreaks(stats.submissionCalendar ?? {});
  const recent = stats.recentSubmissions?.[0];

  return {
    username,
    profileUrl: getLeetCodeProfileUrl(username),
    avatar: profile?.userAvatar ?? null,
    displayName: profile?.realName ?? null,
    ranking: profile?.ranking ?? stats.ranking,
    reputation: profile?.reputation ?? stats.reputation,
    contributionPoints: stats.contributionPoint,
    totalSolved,
    totalQuestions,
    remaining,
    overallProgress:
      totalQuestions > 0
        ? Math.round((totalSolved / totalQuestions) * 1000) / 10
        : 0,
    acceptanceRate: computeAcceptanceRate(stats.matchedUserStats),
    easy: buildDifficultyStats(stats.easySolved, stats.totalEasy),
    medium: buildDifficultyStats(stats.mediumSolved, stats.totalMedium),
    hard: buildDifficultyStats(stats.hardSolved, stats.totalHard),
    totalSubmissions: getSubmissionCount(
      stats.matchedUserStats.totalSubmissionNum,
      "All",
    ),
    activeDays: streaks.activeDays,
    currentStreak: streaks.currentStreak,
    maxStreak: streaks.maxStreak,
    submissionsPastYear: sumSubmissionCalendar(stats.submissionCalendar ?? {}),
    lastSubmission: recent
      ? {
          title: recent.title,
          slug: recent.titleSlug,
          timestamp: Number(recent.timestamp),
          status: recent.statusDisplay,
          lang: recent.lang,
        }
      : null,
    submissionCalendar: stats.submissionCalendar ?? {},
    contest,
  };
}

export async function getLeetCodeDashboard(
  username: string,
): Promise<LeetCodeDashboardData> {
  const [stats, extras] = await Promise.all([
    fetchLeetCodeStats(username),
    fetchLeetCodeProfileAndContest(username),
  ]);

  return transformLeetCodeData(
    username,
    stats,
    extras.profile,
    extras.contest,
  );
}

export async function fetchLeetCodeDashboardClient(
  username: string,
): Promise<LeetCodeDashboardData> {
  const response = await fetch(`/api/leetcode/${encodeURIComponent(username)}`);

  if (!response.ok) {
    throw new LeetCodeApiError(
      "Unable to load LeetCode dashboard data.",
      response.status,
    );
  }

  return response.json() as Promise<LeetCodeDashboardData>;
}
