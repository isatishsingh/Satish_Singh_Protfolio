import { NextResponse } from "next/server";
import { getLeetCodeDashboard, LeetCodeApiError } from "@/services/leetcodeApi";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  props: { params: Promise<{ username: string }> }
) {
  const params = await props.params;
  const username = params.username;

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
