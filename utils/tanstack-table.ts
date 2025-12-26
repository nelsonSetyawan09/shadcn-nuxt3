// utils/tanstack-table.ts
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

export function getRandom(items: string[]) {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function randomPhone13(): string {
  const prefix = "08"; // 2 digit
  const remainingLength = 13 - prefix.length; // 11 digit

  let rest = "";
  for (let i = 0; i < remainingLength; i++) {
    rest += Math.floor(Math.random() * 10);
  }

  return prefix + rest;
}
