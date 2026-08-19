export const LEETCODE_USERNAME =
  process.env.NEXT_PUBLIC_LEETCODE_USERNAME ?? "isatishsingh";

export const LEETCODE_GRAPHQL_URL  =
  "https://leetcode.com/graphql";

export function getLeetCodeProfileUrl(username: string) {
  return `https://leetcode.com/u/${username}/`;
}
