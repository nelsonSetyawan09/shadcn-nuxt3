<!-- components/Users/TableUsersCursor.vue -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#imports";
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import { useTanstackTable } from "@/composables/useTanStackTable";
import { useTableQuery } from "@/composables/useTableQuery";
import UserNameWithTooltip from "./UsersWithUserNameTooltip.vue";
import TableImage from "../features/table/TableImage.vue";
import { Pencil } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import { sortingToQuery } from "@/utils/tanstack-table";

/* =====================
 * ROUTER
 * ===================== */
const route = useRoute();
const router = useRouter();

/* =====================
 * STATE
 * ===================== */
const rows = ref<User[]>([]);
const totalItems = ref<number>(0);
const loading = ref(false);
const rowSelection = ref({});

const userDataEdit = ref<User | null>(null);
const isEditOpen = ref(false);

const nextCursor = ref<number | null>(null);
const prevCursor = ref<number | null>(null);
const pageSizeOptions = [5, 10, 25, 50, 100] as const;

const { pageSize, cursor, sorting } = useTableQuery(10);

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
    meta: { sticky: "left" },
  },
  { accessorKey: "id", header: "ID", size: 80, meta: { sticky: "left" } },
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
    header: "Actions",
    enableSorting: false,
    size: 110,
    cell: ({ row }) =>
      h(
        Button,
        {
          size: "sm",
          onClick: () => handleShowEditUserDialog(row.original),
        },
        {
          default: () => [h(Pencil, { size: 14 }), "Edit"],
        }
      ),
    meta: { sticky: "right" },
  },
];

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
  const next = typeof updater === "function" ? updater(sorting.value) : updater;

  sorting.value = next;
}

function handleShowEditUserDialog(user: User) {
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

function next() {
  if (nextCursor.value !== null) cursor.value = nextCursor.value;
}

function prev() {
  if (prevCursor.value !== null) cursor.value = prevCursor.value;
}

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
  () => [cursor.value, pageSize.value, sorting.value],
  () => {
    rowSelection.value = {};
    fetchData();
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <TableBaseGridTable :table="table">
      <!-- <template #header>
        <div>
          <div>
            <h2 class="text-lg font-semibold">Users</h2>
            <p class="text-sm text-gray-500">Manage users and permissions</p>
          </div>
        </div>
      </template>
      <template #footer> In total there are {{ totalItems }} users. </template> -->
    </TableBaseGridTable>

    <!-- FOOTER ACTIONS -->
    <div class="flex items-center justify-between mt-3">
      <!-- LEFT: ROWS OPTION -->
      <div class="flex items-center gap-2 text-sm">
        <span>Rows:</span>
        <SV-Select v-model="pageSize">
          <SV-SelectTrigger class="border-neutral-300">
            <SV-SelectValue placeholder="SV-Select a fruit" />
          </SV-SelectTrigger>
          <SV-SelectContent>
            <SV-SelectItem
              v-for="(pageSize, idx) in pageSizeOptions"
              :key="idx"
              :value="pageSize"
            >
              {{ pageSize }}
            </SV-SelectItem>
          </SV-SelectContent>
        </SV-Select>
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
