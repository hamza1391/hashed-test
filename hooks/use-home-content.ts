"use client";

import { useQuery } from "@tanstack/react-query";
import { buildHomeContent, getHomeContent } from "@/lib/api/home";
import { queryKeys } from "@/lib/query/keys";

const homePlaceholder = buildHomeContent();

export function useHomeContent() {
  return useQuery({
    queryKey: queryKeys.home.all,
    queryFn: getHomeContent,
    staleTime: Infinity,
    placeholderData: homePlaceholder,
  });
}
