<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import type { Table } from "@tanstack/vue-table";
import { FlexRender } from "@tanstack/vue-table";
import { computeGridColumns } from "@/utils/computeGridColumns";

const props = defineProps<{ table: Table<any> }>();

/* ================= WIDTH OBSERVER ================= */
const wrapperRef = ref<HTMLDivElement | null>(null);
const containerWidth = ref(0);

function updateWidth() {
  if (wrapperRef.value) {
    containerWidth.value = wrapperRef.value.clientWidth;
  }
}

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
});

/* ================= GRID TEMPLATE ================= */
const gridTemplateColumns = computed(() => {
  if (!containerWidth.value) return "";
  const sizes = computeGridColumns(props.table, containerWidth.value);
  return sizes.map((w) => `${w}px`).join(" ");
});
</script>

<template>
  <div class="border rounded bg-white">
    <!-- HEADER SLOT -->
    <div v-if="$slots.header" class="px-4 py-3 border-b">
      <slot name="header" />
    </div>

    <!-- GRID TABLE -->
    <div ref="wrapperRef" class="relative overflow-x-auto">
      <!-- THEAD -->
      <div class="grid" :style="{ gridTemplateColumns }">
        <div
          v-for="header in table.getFlatHeaders()"
          :key="header.id"
          class="px-4 py-3 font-semibold bg-gray-100 border-b border-gray-300 border-r last:border-r-0"
          @click="header.column.getCanSort() && header.column.toggleSorting()"
        >
          <FlexRender
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />

          <span v-if="header.column.getCanSort()" class="text-xs ml-1">
            <template v-if="header.column.getIsSorted() === 'asc'">▲</template>
            <template v-else-if="header.column.getIsSorted() === 'desc'"
              >▼</template
            >
            <template v-else>⇅</template>
          </span>
        </div>
      </div>
      <!-- TBODY -->
      <div
        v-for="row in table.getRowModel().rows"
        :key="row.id"
        class="grid"
        :style="{ gridTemplateColumns }"
      >
        <div
          v-for="cell in row.getVisibleCells()"
          :key="cell.id"
          class="px-4 py-3 break-words whitespace-normal border-b border-gray-200 border-r last:border-r-0"
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
    </div>

    <!-- FOOTER SLOT -->
    <div v-if="$slots.footer" class="px-4 py-3 border-t text-sm">
      <slot name="footer" />
    </div>
  </div>
</template>
