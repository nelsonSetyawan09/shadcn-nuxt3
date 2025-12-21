<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#imports";
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import { useTanstackTable } from "@/composables/useTanStackTable";
import { BaseTable, TablePaginationNumber } from "@/components/features/table";

interface User {
  id: number;
  name: string;
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

const total = ref(0);
const pageSize = ref(10);

/* =====================
 * PAGE FROM URL
 * ===================== */
const page = computed<number>({
  get() {
    return Number(route.query.page ?? 1);
  },
  set(value) {
    router.push({
      query: {
        ...route.query,
        page: value === 1 ? undefined : value,
      },
    });
  },
});

const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

/* =====================
 * COLUMNS
 * ===================== */
const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
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

  page.value = 1;
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
    total: number;
    pageSize: number;
  }>("/api/users/page", {
    query: {
      page: page.value,
      sort: JSON.stringify(sorting.value),
    },
  });

  rows.value = res.data;
  total.value = res.total;
  pageSize.value = res.pageSize;

  loading.value = false;
}

watch(() => [page.value, sorting.value], fetchData, {
  immediate: true,
});
</script>

<template>
  <BaseTable :table="table" />

  <TablePaginationNumber
    :page="page"
    :total-pages="totalPages"
    :loading="loading"
    @change="page = $event"
  />
</template>
