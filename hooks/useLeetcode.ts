"use client";

import { useEffect } from "react";
import { LEETCODE_USERNAME } from "@/config/leetcode";
import { useLeetcodeStore } from "@/stores/useLeetcodeStore";

export function useLeetcode(username: string = LEETCODE_USERNAME) {
  const data = useLeetcodeStore((state) => state.data);
  const storeUsername = useLeetcodeStore((state) => state.username);
  const isLoading = useLeetcodeStore((state) => state.isLoading);
  const isFetching = useLeetcodeStore((state) => state.isFetching);
  const error = useLeetcodeStore((state) => state.error);
  const fetchDashboard = useLeetcodeStore((state) => state.fetchDashboard);

  useEffect(() => {
    if (storeUsername !== username) {
      void fetchDashboard(username);
    }
  }, [fetchDashboard, storeUsername, username]);

  return {
    data: storeUsername === username ? data : null,
    isLoading: storeUsername === username ? isLoading : true,
    isError: storeUsername === username && Boolean(error),
    error,
    isFetching,
    refetch: () => fetchDashboard(username),
  };
}
