// composables/useTanStackTable.vue
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type OnChangeFn,
} from "@tanstack/vue-table";
import type { Ref } from "vue";

export interface UseTanstackTableOptions<T> {
  data: Ref<T[]>;
  columns: ColumnDef<T, any>[];

  /* sorting */
  sorting: Ref<SortingState>;
  onSortingChange: OnChangeFn<SortingState>;

  /* row selection */
  rowSelection: Ref<RowSelectionState>;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
}

export function useTanstackTable<T>({
  data,
  columns,
  sorting,
  onSortingChange,
  rowSelection,
  onRowSelectionChange,
}: UseTanstackTableOptions<T>) {
  return useVueTable({
    /* ================= DATA ================= */
    get data() {
      return data.value;
    },
    columns,

    /* ================= STATE ================= */
    state: {
      get sorting() {
        return sorting.value;
      },
      get rowSelection() {
        return rowSelection.value;
      },
    },

    /* ================= FEATURES ================= */
    manualSorting: true,
    enableRowSelection: true,

    /* ================= EVENTS ================= */
    onSortingChange,
    onRowSelectionChange,

    /* ================= MODELS ================= */
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}
