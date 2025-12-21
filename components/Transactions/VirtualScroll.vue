<script setup lang="ts">
const items = ref<any[]>([]);

// simulasi data ribuan yang sudah dimuat semuanya di awal
onMounted(() => {
  items.value = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Transaction ${i + 1}`,
  }));
});
</script>
<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-xl font-bold mb-4">Virtual Scroll – 10.000 Data</h1>

    <ClientOnly>
      <RecycleScroller
        :items="items"
        :item-size="60"
        key-field="id"
        class="border rounded h-[500px]"
      >
        <template #default="{ item }">
          <div class="p-4 border-b bg-white">
            <p class="font-medium">{{ item.name }}</p>
          </div>
        </template>
      </RecycleScroller>

      <template #fallback> Loading... </template>
    </ClientOnly>
  </div>
</template>
