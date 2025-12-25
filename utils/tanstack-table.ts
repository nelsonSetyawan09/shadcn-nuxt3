import type { SortingState } from "@tanstack/vue-table";

export function sortingToQuery(sorting: SortingState): string | undefined {
  if (!sorting.length) return undefined;

  const { id, desc } = sorting[0];
  return `${id}:${desc ? "desc" : "asc"}`;
}

export function queryToSorting(sort?: string): SortingState {
  if (!sort) return [];

  const [id, dir] = sort.split(":");
  if (!id) return [];

  return [{ id, desc: dir === "desc" }];
}
