<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#imports";
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import { useTanstackTable } from "@/composables/useTanStackTable";
import { BaseTable, TablePaging } from "@/components/features/table";
import UserNameWithTooltip from "./UserNameWithTooltip.vue";

interface User {
  id: number;
  userName: string;
  email: string;
}

/* =====================
 * ROUTER
 * ===================== */
const route = useRoute();
const router = useRouter();

/* =====================
 * STATE
 * ===================== */
const rows = ref<User[]>([]);
const sorting = ref<SortingState>([]);
const loading = ref(false);

const nextCursor = ref<number | null>(null);
const prevCursor = ref<number | null>(null);

/* =====================
 * CURSOR FROM URL
 * ===================== */
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

/* =====================
 * COLUMNS
 * ===================== */
const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "userName",
    header: "Name",
    cell: ({ row }) =>
      h(UserNameWithTooltip, {
        id: row.original.id,
        userName: row.original.userName, // ⬅️ pakai nama prop baru
        email: row.original.email,
      }),
  },
  { accessorKey: "email", header: "Email" },
];

/* =====================
 * SORTING
 * ===================== */
function onSortingChange(
  updater: SortingState | ((old: SortingState) => SortingState)
) {
  sorting.value =
    typeof updater === "function" ? updater(sorting.value) : updater;

  cursor.value = 0;
}

/* =====================
 * TABLE INSTANCE
 * ===================== */
const table = useTanstackTable<User>({
  data: rows,
  columns,
  sorting,
  onSortingChange,
});

/* =====================
 * FETCH
 * ===================== */
async function fetchData() {
  loading.value = true;

  const res = await $fetch<{
    data: User[];
    nextCursor: number | null;
    prevCursor: number | null;
  }>("/api/users/cursor", {
    query: {
      cursor: cursor.value,
      sort: JSON.stringify(sorting.value),
    },
  });

  rows.value = res.data;
  nextCursor.value = res.nextCursor;
  prevCursor.value = res.prevCursor;

  loading.value = false;
}

watch(() => [cursor.value, sorting.value], fetchData, {
  immediate: true,
});

/* =====================
 * ACTIONS
 * ===================== */
function next() {
  if (nextCursor.value !== null) cursor.value = nextCursor.value;
}

function prev() {
  if (prevCursor.value !== null) cursor.value = prevCursor.value;
}
</script>

<template>
  <BaseTable :table="table" />

  <TablePaging
    :has-prev="prevCursor !== null"
    :has-next="nextCursor !== null"
    :loading="loading"
    @prev="prev"
    @next="next"
  />
</template>
