<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  page: number;
  totalPages: number;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

const pages = computed(() => {
  const result: (number | "...")[] = [];

  const total = props.totalPages;
  const page = props.page;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i);
    return result;
  }

  // CASE 1: halaman awal
  if (page <= 3) {
    result.push(1, 2, 3, 4, 5, "...", total);
    return result;
  }

  // CASE 2: halaman akhir
  if (page >= total - 2) {
    result.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
    return result;
  }

  // CASE 3: halaman tengah
  result.push(
    1,
    "...",
    page - 2,
    page - 1,
    page,
    page + 1,
    page + 2,
    "...",
    total
  );

  return result;
});
</script>

<template>
  <div class="flex items-center gap-1 mt-4 justify-end">
    <!-- PREV -->
    <SV-Button
      class="min-w-[35px] px-2 py-1 border rounded disabled:opacity-40"
      :disabled="page === 1 || loading"
      @click="emit('change', page - 1)"
    >
      ‹
    </SV-Button>

    <!-- PAGE NUMBERS -->
    <template v-for="(p, i) in pages" :key="i">
      <span v-if="p === '...'" class="px-1">…</span>

      <SV-Button
        v-else
        class="min-w-[35px] px-2 py-1 border rounded"
        :class="p === page && 'bg-black text-white'"
        @click="emit('change', p)"
      >
        {{ p }}
      </SV-Button>
    </template>

    <!-- NEXT -->
    <SV-Button
      class="min-w-[35px] px-2 py-1 border rounded disabled:opacity-40"
      :disabled="page === totalPages || loading"
      @click="emit('change', page + 1)"
    >
      ›
    </SV-Button>
  </div>
</template>
