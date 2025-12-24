<!-- components/Users/TableUsersCursor.vue -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#imports";
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import { useTanstackTable } from "@/composables/useTanStackTable";
import { BaseTable, TablePaging } from "@/components/features/table";
import UserNameWithTooltip from "./UserNameWithTooltip.vue";
import EditUserDialog from "./EditUserDialog.vue";
import TableImage from "../features/table/TableImage.vue";
import { Pencil } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

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
const rowSelection = ref({});

const userDataEdit = ref<User | null>(null);
const isEditOpen = ref(false);

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
  {
    id: "select",
    header: ({ table }) =>
      h("input", {
        type: "checkbox",
        class: "cursor-pointer",
        checked: table.getIsAllPageRowsSelected(),
        indeterminate: table.getIsSomePageRowsSelected(),
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
    size: 32,
  },
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "img",
    header: "Image",
    enableSorting: false,
    size: 72,
    cell: ({ row }) =>
      h(TableImage, {
        src: row.original.img,
        alt: row.original.userName,
      }),
  },
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
  {
    id: "actions",
    header: "Edit",
    enableSorting: false,
    size: 64,
    cell: ({ row }) =>
      h(
        Button,
        {
          size: "sm",
          class: "rounded-sm",
          onClick: () => editUser(row.original),
        },
        {
          default: () => [h(Pencil, { size: 14 }), "Edit"],
        }
      ),
  },
];

const selectedRows = computed(() => {
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

  cursor.value = 0;
}

function editUser(user: User) {
  userDataEdit.value = { ...user };
  isEditOpen.value = true;
}

function handleEditUser(data: User) {
  rows.value = rows.value.map((row) => (row.id === data.id ? data : row));
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

// 1. Fetch data
watch(() => [cursor.value, sorting.value], fetchData, { immediate: true });

// 2. Reset selection
watch([cursor, sorting], () => {
  rowSelection.value = {};
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
  <div>
    <BaseTable :table="table">
      <template #header>
        <div>
          <div>
            <h2 class="text-lg font-semibold">Users</h2>
            <p class="text-sm text-gray-500">Manage users and permissions</p>
          </div>
        </div>
      </template>
      <template #footer> In total there are {{ rows.length }} users. </template>
    </BaseTable>

    <TablePaging
      :has-prev="prevCursor !== null"
      :has-next="nextCursor !== null"
      :loading="loading"
      @prev="prev"
      @next="next"
    />

    <EditUserDialog
      :user-data="userDataEdit"
      :is-edit-open="isEditOpen"
      @update:open="isEditOpen = $event"
      @handle-edit-user="handleEditUser"
    />
  </div>
</template>
