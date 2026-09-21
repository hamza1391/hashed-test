"use client";

import { useQuery } from "@tanstack/react-query";
import { buildCatalog, getCatalog } from "@/lib/api/catalog";
import { queryKeys } from "@/lib/query/keys";

const catalogPlaceholder = buildCatalog();

export function useCatalog() {
  return useQuery({
    queryKey: queryKeys.catalog.all,
    queryFn: getCatalog,
    staleTime: Infinity,
    placeholderData: catalogPlaceholder,
  });
}
