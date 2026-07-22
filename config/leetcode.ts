export const LEETCODE_USERNAME =
  process.env.NEXT_PUBLIC_LEETCODE_USERNAME ?? "isatishsingh";

export const LEETCODE_API_BASE =
  "https://leetcode-api-faisalshohag.vercel.app";

export function getLeetCodeProfileUrl(username: string) {
  return `https://leetcode.com/u/${username}/`;
}
