<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div>
      <Sidebar />
    </div>
    <!-- MAIN -->
    <main class="flex-1 min-w-0 px-6">
      <!-- CENTERED CONTAINER -->
      <div class="mx-auto w-full max-w-[1600px] pt-6">
        <div
          class="flex items-center mb-5 justify-between bg-neutral-100 p-6 rounded-sm"
        >
          <h1 class="text-3xl font-semibold capitalize">
            {{ firstPath === "" ? "Home" : firstPath }}
          </h1>
          <div class="flex justify-end font-semibold">
            <span>Welcome, Nelson!!!</span>
          </div>
        </div>

        <div class="pt-2">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { title } = useMenuTitle();

useHead({
  title,
  titleTemplate: (t) => (t ? `${t} · Nuxt Finance` : "Nuxt Finance"),
});
const route = useRoute();

const firstPath = computed(() => route.path.split("/")[1]);
</script>
