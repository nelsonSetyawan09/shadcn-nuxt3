<!-- components/features/table/BaseTable.vue -->
<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { FlexRender } from "@tanstack/vue-table";

defineProps<{ table: Table<any> }>();
</script>

<template>
  <div class="overflow-x-auto border rounded">
    <table class="w-full border-collapse text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="header in table.getFlatHeaders()"
            :key="header.id"
            class="px-4 py-3 text-left font-semibold select-none"
            :class="{
              'w-[32px] px-2 text-center': header.column.id === 'select',
            }"
          >
            <div
              v-if="!header.isPlaceholder"
              class="flex items-center gap-1 cursor-pointer"
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

              <span v-if="header.column.getCanSort()" class="text-xs">
                <template v-if="header.column.getIsSorted() === 'asc'"
                  >▲</template
                >
                <template v-else-if="header.column.getIsSorted() === 'desc'"
                  >▼</template
                >
                <template v-else>⇅</template>
              </span>
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
            class="px-4 py-3"
            :class="{
              'w-[32px] px-2 text-center': cell.column.id === 'select',
            }"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
