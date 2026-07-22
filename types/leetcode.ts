export type LeetCodeApiResponse = {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: LeetCodeRecentSubmission[];
  matchedUserStats: {
    acSubmissionNum: LeetCodeSubmissionStat[];
    totalSubmissionNum: LeetCodeSubmissionStat[];
  };
  totalSubmissions: LeetCodeSubmissionStat[];
};

export type LeetCodeSubmissionStat = {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
  submissions: number;
};

export type LeetCodeRecentSubmission = {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
};

export type LeetCodeContestBadge = {
  name: string;
};

export type LeetCodeContestData = {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  topPercentage: number;
  badge: LeetCodeContestBadge | null;
};

export type LeetCodeProfileData = {
  userAvatar: string;
  realName: string;
  ranking: number;
  reputation: number;
};

export type DifficultyStats = {
  solved: number;
  total: number;
  remaining: number;
  percentage: number;
};

export type LeetCodeLastSubmission = {
  title: string;
  slug: string;
  timestamp: number;
  status: string;
  lang: string;
};

export type LeetCodeDashboardData = {
  username: string;
  profileUrl: string;
  avatar: string | null;
  displayName: string | null;
  ranking: number;
  reputation: number;
  contributionPoints: number;
  totalSolved: number;
  totalQuestions: number;
  remaining: number;
  overallProgress: number;
  acceptanceRate: number;
  easy: DifficultyStats;
  medium: DifficultyStats;
  hard: DifficultyStats;
  totalSubmissions: number;
  activeDays: number;
  currentStreak: number;
  maxStreak: number;
  submissionsPastYear: number;
  lastSubmission: LeetCodeLastSubmission | null;
  submissionCalendar: Record<string, number>;
  contest: LeetCodeContestData | null;
};
