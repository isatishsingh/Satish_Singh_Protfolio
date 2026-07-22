"use client";

import { useEffect, type ReactNode } from "react";
import { LEETCODE_USERNAME } from "@/config/leetcode";
import { useLeetcodeStore } from "@/stores/useLeetcodeStore";

type LeetcodeStoreProviderProps = {
  children: ReactNode;
};

export function LeetcodeStoreProvider({
  children,
}: LeetcodeStoreProviderProps) {
  useEffect(() => {
    void useLeetcodeStore.getState().fetchDashboard(LEETCODE_USERNAME);
  }, []);

  return children;
}
