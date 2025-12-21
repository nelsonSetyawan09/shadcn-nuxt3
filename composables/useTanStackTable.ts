// composables/useTanStackTable.vue

import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
} from "@tanstack/vue-table";
import type { Ref } from "vue";

export interface UseTanstackTableOptions<T> {
  data: Ref<T[]>;
  columns: ColumnDef<T, any>[];
  sorting: Ref<SortingState>;
  onSortingChange: OnChangeFn<SortingState>;
}

export function useTanstackTable<T>({
  data,
  columns,
  sorting,
  onSortingChange,
}: UseTanstackTableOptions<T>) {
  return useVueTable({
    get data() {
      return data.value;
    },
    columns,
    state: {
      get sorting() {
        return sorting.value;
      },
    },
    manualSorting: true,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}
