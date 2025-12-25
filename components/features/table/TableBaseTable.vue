<!-- components/features/table/BaseTable.vue -->
<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { FlexRender } from "@tanstack/vue-table";

defineProps<{ table: Table<any> }>();
</script>

<template>
  <div class="border rounded overflow-hidden">
    <!-- 🔹 TABLE HEADER (CUSTOM) -->
    <div v-if="$slots.header" class="px-4 py-3 bg-white">
      <slot name="header" />
    </div>
    <div class="overflow-x-auto border rounded">
      <table
        class="border-collapse text-sm table-fixed"
        :style="{ minWidth: table.getTotalSize() + 'px' }"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in table.getFlatHeaders()"
              :key="header.id"
              class="px-4 py-3 text-left font-semibold select-none overflow-hidden whitespace-nowrap"
              :style="{ minWidth: header.getSize() + 'px' }"
            >
              <div
                v-if="!header.isPlaceholder"
                class="flex items-center gap-2 cursor-pointer"
                :class="{
                  'cursor-pointer': header.column.getCanSort(),
                  'cursor-default': !header.column.getCanSort(),
                }"
                @click="
                  header.column.getCanSort() && header.column.toggleSorting()
                "
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />

                <div v-if="header.column.getCanSort()" class="text-xs ml-2">
                  <template v-if="header.column.getIsSorted() === 'asc'"
                    >▲</template
                  >
                  <template v-else-if="header.column.getIsSorted() === 'desc'"
                    >▼</template
                  >
                  <template v-else>⇅</template>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-t"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-3 overflow-hidden whitespace-nowrap"
              :style="{ minWidth: cell.column.getSize() + 'px' }"
            >
              <div class="wrap-break-words whitespace-normal">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 🔹 TABLE FOOTER (CUSTOM) -->
    <div v-if="$slots.footer" class="px-4 py-3 bg-white text-sm">
      <slot name="footer" />
    </div>
  </div>
</template>
