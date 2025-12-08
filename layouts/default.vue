<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div>
      <Sidebar />
    </div>
    <main class="flex-1 flex justify-center">
      <div class="w-full max-w-7xl">
        <div class="flex items-center mb-5 justify-between bg-neutral-50 p-4">
          <h1 class="text-3xl font-semibold">
            {{ firstPath === "" ? "Home" : firstPath }}
          </h1>
          <div class="flex justify-end font-semibold">
            <span>Welcome, Citra!!</span>
          </div>
        </div>
        <div class="p-6 pt-2">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute();

const firstPath = computed(() => route.path.split("/")[1]);
</script>
