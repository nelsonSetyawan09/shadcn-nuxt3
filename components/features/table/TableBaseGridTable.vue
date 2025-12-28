<!-- components/features/table/TableBaseGridTable -->
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Table } from "@tanstack/vue-table";
import { FlexRender } from "@tanstack/vue-table";
import { computeGridColumns } from "@/utils/computeGridColumns";
import type { CSSProperties } from "vue";

const props = defineProps<{
  table: Table<any>;
  loading?: boolean;
  emptyText?: string;
}>();

/* ================= WIDTH OBSERVER (ResizeObserver) ================= */
const wrapperRef = ref<HTMLDivElement | null>(null);
const containerWidth = ref(0);
const theadRef = ref<HTMLDivElement | null>(null);
const wrapperHeight = ref(0);
const theadHeight = ref(0);
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (!wrapperRef.value) return;

  resizeObserver = new ResizeObserver(() => {
    if (!wrapperRef.value) return;

    containerWidth.value = Math.floor(wrapperRef.value.clientWidth);
    wrapperHeight.value = Math.floor(wrapperRef.value.clientHeight);

    if (theadRef.value) {
      theadHeight.value = Math.floor(theadRef.value.offsetHeight);
    }
  });

  resizeObserver.observe(wrapperRef.value);
});

const isReady = computed(() => containerWidth.value > 0);
const emptyMessage = computed(() => props.emptyText ?? "No data available");
const hasRows = computed(() => props.table.getRowModel().rows.length > 0);
const loadingHeight = computed(() => {
  const h = wrapperHeight.value - theadHeight.value;
  return h > 0 ? `${h}px` : "0px";
});

/* ================= GRID TEMPLATE ================= */
const gridTemplateColumns = computed(() => {
  if (!containerWidth.value) return "";
  const sizes = computeGridColumns(props.table, containerWidth.value);
  return sizes.map((w) => `${w}px`).join(" ");
});

const totalTableWidth = computed(() => {
  return `${props.table.getTotalSize()}px`;
});

function getStickyBackground(type: "header" | "body") {
  return type === "header" ? "#e5e7eb" : "white";
}

function getStickyStyle(
  table: Table<any>,
  columnId: string,
  type: "header" | "body"
): CSSProperties {
  const column = table.getColumn(columnId);
  const sticky = column?.columnDef.meta?.sticky;

  if (!sticky) return {};
  const backgroundColor = getStickyBackground(type);

  if (sticky === "left") {
    let left = 0;

    for (const col of table.getVisibleLeafColumns()) {
      if (col.id === columnId) break;
      left += col.getSize();
    }

    return {
      position: "sticky",
      left: `${left}px`,
      zIndex: 3,
      backgroundColor,
      boxShadow: "2px 0 4px rgba(0,0,0,.08)",
    };
  }

  if (sticky === "right") {
    return {
      position: "sticky",
      right: "0px",
      zIndex: 3,
      backgroundColor,
      boxShadow: "-2px 0 4px rgba(0,0,0,.08)",
    };
  }

  return {};
}
</script>

<template>
  <div class="relative border rounded bg-white">
    <!-- HEADER SLOT -->
    <div v-if="$slots.header" class="px-4 py-3 border-b">
      <slot name="header" />
    </div>

    <!-- LOADING (CENTER OF CARD, NOT AFFECTED BY SCROLL) -->
    <div
      v-if="loading && hasRows"
      class="absolute inset-0 z-30 flex items-center justify-center bg-white/40 backdrop-blur-[1px]"
    >
      <div class="flex items-center gap-2 text-md text-gray-600 font-semibold">
        <span
          class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
        />
        Loading...
      </div>
    </div>

    <!-- GRID TABLE -->
    <div ref="wrapperRef" class="relative overflow-x-auto">
      <template v-if="isReady">
        <!-- THEAD -->
        <div
          ref=""
          theadRef
          class="grid sticky top-0 z-10"
          :style="{
            gridTemplateColumns,
            minWidth: totalTableWidth,
          }"
        >
          <div
            v-for="header in table.getFlatHeaders()"
            :key="header.id"
            class="px-4 py-3 font-semibold bg-gray-200 border-b border-gray-300 border-r last:border-r-0"
            :style="getStickyStyle(table, header.column.id, 'header')"
            :class="{
              'cursor-pointer select-none': header.column.getCanSort(),
            }"
            @click="header.column.getCanSort() && header.column.toggleSorting()"
          >
            <FlexRender
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />

            <span v-if="header.column.getCanSort()" class="text-xs ml-1">
              <template v-if="header.column.getIsSorted() === 'asc'"
                >▲</template
              >
              <template v-else-if="header.column.getIsSorted() === 'desc'"
                >▼</template
              >
              <template v-else>⇅</template>
            </span>
          </div>
        </div>
        <!-- LOADING (NO PREVIOUS DATA) -->
        <div
          v-if="loading && !hasRows"
          class="flex items-center justify-center py-10 text-sm text-gray-500"
        >
          loading...
        </div>

        <!-- EMPTY STATE -->
        <div
          v-else-if="!loading && table.getRowModel().rows.length === 0"
          class="flex items-center justify-center py-10 text-sm text-gray-500"
        >
          {{ emptyMessage }}
        </div>

        <!-- TBODY -->
        <div
          v-else
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="grid"
          :style="{
            gridTemplateColumns,
            minWidth: totalTableWidth,
          }"
        >
          <div
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="px-4 py-3 break-words whitespace-normal border-b border-gray-200 border-r last:border-r-0"
            :style="getStickyStyle(table, cell.column.id, 'body')"
            :class="{
              'flex justify-center items-center whitespace-nowrap':
                cell.column.id === 'actions',
            }"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- FOOTER SLOT -->
    <div v-if="$slots.footer" class="px-4 py-3 border-t text-sm">
      <slot name="footer" />
    </div>
  </div>
</template>
