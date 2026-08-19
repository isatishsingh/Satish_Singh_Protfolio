import "server-only";

import { LEETCODE_GRAPHQL_URL, getLeetCodeProfileUrl } from "@/config/leetcode";
import type {
  DifficultyStats,
  GraphQLProfileResponse,
  LeetCodeDashboardData,
} from "@/types/leetcode";
import { LeetCodeApiError } from "./leetcodeApiError";
import { PROFILE_QUERY } from "@/app/graphql/leetcode/profile";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new LeetCodeApiError(
      `LeetCode API request failed (${response.status})`,
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new LeetCodeApiError(
      "LeetCode returned invalid JSON.",
      response.status,
    );
  }
}

export async function fetchLeetCodeGraphQL(
  username: string,
): Promise<GraphQLProfileResponse> {
  const response = await fetchJson<GraphQLProfileResponse>(
    LEETCODE_GRAPHQL_URL,
    {
      method: "POST",
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: {
          username,
        },
      }),
    },
  );

  if (response.errors?.length) {
    throw new LeetCodeApiError(
      response.errors[0]?.message ?? "LeetCode GraphQL error",
    );
  }

  return response;
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

function toDateKey(timestampSeconds: number) {
  return new Date(timestampSeconds * 1000).toISOString().slice(0, 10);
}

function computeStreaks(calendar: Record<string, number>) {
  const dateKeys = [
    ...new Set(
      Object.keys(calendar).map((timestamp) => toDateKey(Number(timestamp))),
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

function parseSubmissionCalendar(
  calendar?: string | null,
): Record<string, number> {
  if (!calendar) {
    return {};
  }

  try {
    return JSON.parse(calendar) as Record<string, number>;
  } catch {
    return {};
  }
}

export function transformLeetCodeData(
  username: string,
  response: GraphQLProfileResponse,
): LeetCodeDashboardData {
  const data = response.data;

  if (!data?.matchedUser) {
    throw new LeetCodeApiError(`LeetCode user "${username}" not found.`, 404);
  }

  const user = data.matchedUser;

  const questions = data.allQuestionsCount ?? [];

  const getQuestionCount = (difficulty: "All" | "Easy" | "Medium" | "Hard") => {
    return questions.find((item) => item.difficulty === difficulty)?.count ?? 0;
  };

  const stats = user.submitStats;

  const getSolvedCount = (difficulty: "All" | "Easy" | "Medium" | "Hard") => {
    return (
      stats?.acSubmissionNum.find((item) => item.difficulty === difficulty)
        ?.count ?? 0
    );
  };
  
  const getSolvedCountSubmission = (
    difficulty: "All" | "Easy" | "Medium" | "Hard",
  ) => {
    return (
      stats?.acSubmissionNum.find((item) => item.difficulty === difficulty)
        ?.submissions ?? 0
    );
  };

  const getSubmissionCount = (
    difficulty: "All" | "Easy" | "Medium" | "Hard",
  ) => {
    return (
      stats?.totalSubmissionNum.find((item) => item.difficulty === difficulty)
        ?.submissions ?? 0
    );
  };

  const totalQuestions = getQuestionCount("All");
  const totalSolved = getSolvedCount("All");

  const easySolved = getSolvedCount("Easy");
  const mediumSolved = getSolvedCount("Medium");
  const hardSolved = getSolvedCount("Hard");

  const submissionCalendar = parseSubmissionCalendar(user.submissionCalendar);

  const streaks = computeStreaks(submissionCalendar);

  const recent = data.recentSubmissionList?.[0];

  const totalAcceptedSubmissions = getSolvedCountSubmission("All");

  const totalSubmissions = getSubmissionCount("All");

  const acceptanceRate =
    totalSubmissions > 0
      ? Math.round((totalAcceptedSubmissions / totalSubmissions) * 1000) / 10
      : 0;

  return {
    username,

    profileUrl: getLeetCodeProfileUrl(username),

    avatar: user.profile?.userAvatar ?? null,

    displayName: user.profile?.realName ?? null,

    ranking: user.profile?.ranking ?? 0,

    reputation: user.profile?.reputation ?? 0,

    contributionPoints: user.contributions?.points ?? 0,

    totalSolved,

    totalQuestions,

    remaining: Math.max(totalQuestions - totalSolved, 0),

    overallProgress:
      totalQuestions > 0
        ? Math.round((totalSolved / totalQuestions) * 1000) / 10
        : 0,

    acceptanceRate,

    easy: buildDifficultyStats(easySolved, getQuestionCount("Easy")),

    medium: buildDifficultyStats(mediumSolved, getQuestionCount("Medium")),

    hard: buildDifficultyStats(hardSolved, getQuestionCount("Hard")),

    totalSubmissions,

    activeDays: streaks.activeDays,

    currentStreak: streaks.currentStreak,

    maxStreak: streaks.maxStreak,

    submissionsPastYear: sumSubmissionCalendar(submissionCalendar),

    lastSubmission: recent
      ? {
          title: recent.title,
          slug: recent.titleSlug,
          timestamp: Number(recent.timestamp),
          status: recent.statusDisplay,
          lang: recent.lang,
        }
      : null,

    submissionCalendar,

    contest: user ? (data.userContestRanking ?? null) : null,
  };
}

export async function getLeetCodeDashboard(
  username: string,
): Promise<LeetCodeDashboardData> {
  const response = await fetchLeetCodeGraphQL(username);

  return transformLeetCodeData(username, response);
}
