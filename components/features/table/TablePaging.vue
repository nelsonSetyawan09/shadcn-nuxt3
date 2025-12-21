<!-- components/features/table/TablePagination.vue -->
<script setup lang="ts">
defineProps<{
  hasPrev: boolean;
  hasNext: boolean;
  loading?: boolean;
}>();

defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
}>();
</script>

<template>
  <div class="flex justify-end gap-2 mt-4">
    <button
      class="px-3 py-1 border rounded disabled:opacity-50"
      :disabled="!hasPrev || loading"
      @click="$emit('prev')"
    >
      Prev
    </button>

    <button
      class="px-3 py-1 border rounded disabled:opacity-50"
      :disabled="!hasNext || loading"
      @click="$emit('next')"
    >
      Next
    </button>
  </div>
</template>
