"use client";

import { create } from "zustand";
import { LEETCODE_USERNAME } from "@/config/leetcode";
import { fetchLeetCodeDashboardClient } from "@/services/leetcodeApi";
import type { LeetCodeDashboardData } from "@/types/leetcode";

type LeetcodeStore = {
  data: LeetCodeDashboardData | null;
  username: string;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  fetchDashboard: (username?: string) => Promise<void>;
};

let activeRequest: Promise<void> | null = null;
let activeUsername: string | null = null;

export const useLeetcodeStore = create<LeetcodeStore>((set, get) => ({
  data: null,
  username: LEETCODE_USERNAME,
  isLoading: true,
  isFetching: false,
  error: null,
  fetchDashboard: async (requestedUsername = LEETCODE_USERNAME) => {
    const username = requestedUsername.trim();

    if (!username) {
      set({ error: "LeetCode username is required.", isLoading: false });
      return;
    }

    if (activeRequest && activeUsername === username) {
      return activeRequest;
    }

    const hasDataForUsername =
      get().data !== null && get().username === username;

    set({
      username,
      error: null,
      isLoading: !hasDataForUsername,
      isFetching: true,
    });

    const request = fetchLeetCodeDashboardClient(username)
      .then((data) => {
        set({ data, username, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Unable to load LeetCode dashboard data.",
          isLoading: false,
        });
      })
      .finally(() => {
        if (activeRequest === request) {
          activeRequest = null;
          activeUsername = null;
          set({ isFetching: false });
        }
      });

    activeRequest = request;
    activeUsername = username;

    return request;
  },
}));
