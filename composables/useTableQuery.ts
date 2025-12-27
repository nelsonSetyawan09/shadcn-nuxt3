import type { SortingState } from "@tanstack/vue-table";
import { sortingToQuery, queryToSorting } from "@/utils/tanstack-table";

export function useTableQuery(defaultLimit = 10) {
  const route = useRoute();
  const router = useRouter();

  const pageSize = computed<number>({
    get() {
      return Number(route.query.limit ?? defaultLimit);
    },
    set(value) {
      router.push({
        query: {
          ...route.query,
          limit: value,
          cursor: undefined,
        },
      });
    },
  });

  const cursor = computed<number>({
    get() {
      return Number(route.query.cursor ?? 0);
    },
    set(value) {
      router.push({
        query: {
          ...route.query,
          cursor: value || undefined,
        },
      });
    },
  });

  const sorting = computed<SortingState>({
    get() {
      return queryToSorting(route.query.sort as string | undefined);
    },
    set(value) {
      router.push({
        query: {
          ...route.query,
          sort: sortingToQuery(value),
          cursor: undefined,
        },
      });
    },
  });

  return {
    pageSize,
    cursor,
    sorting,
  };
}
