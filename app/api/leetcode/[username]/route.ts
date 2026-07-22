import { NextResponse } from "next/server";
import { getLeetCodeDashboard, LeetCodeApiError } from "@/services/leetcodeApi";

type RouteContext = {
  params: Promise<{ username: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { username } = await context.params;

  if (!username?.trim()) {
    return NextResponse.json({ error: "Username is required." }, { status: 400 });
  }

  try {
    const data = await getLeetCodeDashboard(username.trim());
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof LeetCodeApiError
        ? error.message
        : "Failed to fetch LeetCode data.";

    const status = error instanceof LeetCodeApiError ? error.status ?? 502 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
