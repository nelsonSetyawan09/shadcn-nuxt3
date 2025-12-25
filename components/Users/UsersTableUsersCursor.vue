<!-- components/Users/TableUsersCursor.vue -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#imports";
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import { useTanstackTable } from "@/composables/useTanStackTable";
import UserNameWithTooltip from "./UsersWithUserNameTooltip.vue";
import TableImage from "../features/table/TableImage.vue";
import { Pencil } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import { sortingToQuery, queryToSorting } from "@/utils/tanstack-table";

/* =====================
 * ROUTER
 * ===================== */
const route = useRoute();
const router = useRouter();

/* =====================
 * STATE
 * ===================== */
const rows = ref<User[]>([]);
const sorting = ref<SortingState>(
  queryToSorting(route.query.sort as string | undefined)
);
const totalItems = ref<number>(0);
const loading = ref(false);
const rowSelection = ref({});

const userDataEdit = ref<User | null>(null);
const isEditOpen = ref(false);

const nextCursor = ref<number | null>(null);
const prevCursor = ref<number | null>(null);

const pageSize = computed<number>({
  get() {
    return Number(route.query.limit ?? 10);
  },
  set(value) {
    router.push({
      query: {
        ...route.query,
        limit: value,
        cursor: undefined, // reset cursor saat limit berubah
      },
    });
  },
});

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
  {
    id: "select",
    header: ({ table }) =>
      h("input", {
        type: "checkbox",
        class: "cursor-pointer",
        checked: table.getIsAllPageRowsSelected(),
        onVnodeMounted(vnode) {
          (vnode.el as HTMLInputElement).indeterminate =
            table.getIsSomePageRowsSelected();
        },
        onVnodeUpdated(vnode) {
          (vnode.el as HTMLInputElement).indeterminate =
            table.getIsSomePageRowsSelected();
        },
        onChange: table.getToggleAllPageRowsSelectedHandler(),
      }),
    cell: ({ row }) =>
      h("input", {
        type: "checkbox",
        class: "cursor-pointer",
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        onChange: row.getToggleSelectedHandler(),
      }),
    enableSorting: false,
    size: 48,
  },
  { accessorKey: "id", header: "ID", size: 80 },
  {
    accessorKey: "img",
    header: "Image",
    enableSorting: false,
    size: 100,
    cell: ({ row }) =>
      h(TableImage, {
        src: row.original.img,
        alt: row.original.userName,
      }),
  },
  {
    accessorKey: "userName",
    size: 160,
    header: "Name",
    cell: ({ row }) =>
      h(UserNameWithTooltip, {
        id: row.original.id,
        userName: row.original.userName, // ⬅️ pakai nama prop baru
        email: row.original.email,
      }),
  },
  { accessorKey: "email", header: "Email", size: 200 },
  { accessorKey: "address", header: "address", size: 200 },
  { accessorKey: "phone", header: "phone", size: 200 },
  { accessorKey: "status", header: "status", size: 200 },
  { accessorKey: "country", header: "country", size: 200 },
  { accessorKey: "company", header: "company", size: 250 },
  {
    id: "actions",
    header: "Edit",
    enableSorting: false,
    size: 110,
    cell: ({ row }) =>
      h(
        Button,
        {
          size: "sm",
          onClick: () => editUser(row.original),
        },
        {
          default: () => [h(Pencil, { size: 14 }), "Edit"],
        }
      ),
  },
];

const selectedRows = computed(() => {
  if (!table) return [];
  return table.getSelectedRowModel().rows.map((row) => row.original);
});

/* =====================
 * SORTING
 * ===================== */
function onSortingChange(
  updater: SortingState | ((old: SortingState) => SortingState)
) {
  sorting.value =
    typeof updater === "function" ? updater(sorting.value) : updater;

  router.push({
    query: {
      ...route.query,
      sort: sortingToQuery(sorting.value),
      cursor: undefined, // reset cursor
    },
  });
}

function editUser(user: User) {
  userDataEdit.value = { ...user };
  isEditOpen.value = true;
}

function handleEditUser(data: User) {
  rows.value = rows.value.map((row) =>
    row.id === data.id ? { ...row, ...data } : row
  );
  isEditOpen.value = false;
  userDataEdit.value = null;
}

/* =====================
 * TABLE INSTANCE
 * ===================== */
const table = useTanstackTable<User>({
  data: rows,
  columns,

  sorting,
  onSortingChange,

  rowSelection,
  onRowSelectionChange: (updater) => {
    rowSelection.value =
      typeof updater === "function" ? updater(rowSelection.value) : updater;
  },
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
    totalItems: number | 0;
  }>("/api/users/cursor", {
    query: {
      cursor: cursor.value,
      sort: sortingToQuery(sorting.value),
      limit: pageSize.value,
    },
  });

  rows.value = res.data;
  totalItems.value = res.totalItems;
  nextCursor.value = res.nextCursor;
  prevCursor.value = res.prevCursor;

  loading.value = false;
}

// 1. Fetch data
watch(
  () => [cursor.value, pageSize.value, sortingToQuery(sorting.value)],
  () => {
    rowSelection.value = {};
    fetchData();
  },
  { immediate: true }
);

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
  <div>
    <TableBaseGridTable :table="table">
      <template #header>
        <div>
          <div>
            <h2 class="text-lg font-semibold">Users</h2>
            <p class="text-sm text-gray-500">Manage users and permissions</p>
          </div>
        </div>
      </template>
      <template #footer> In total there are {{ totalItems }} users. </template>
    </TableBaseGridTable>

    <!-- FOOTER ACTIONS -->
    <div class="flex items-center justify-between mt-3">
      <!-- LEFT: ROWS OPTION -->
      <div class="flex items-center gap-2 text-sm">
        <span>Rows:</span>
        <select
          v-model.number="pageSize"
          class="border rounded px-2 py-1 text-sm cursor-pointer"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <!-- RIGHT: PAGINATION -->
      <TablePaging
        :has-prev="prevCursor !== null"
        :has-next="nextCursor !== null"
        :loading="loading"
        @prev="prev"
        @next="next"
      />
    </div>

    <UsersEditUserDialog
      :user-data="userDataEdit"
      :is-edit-open="isEditOpen"
      @update:open="isEditOpen = $event"
      @handle-edit-user="handleEditUser"
    />
  </div>
</template>
