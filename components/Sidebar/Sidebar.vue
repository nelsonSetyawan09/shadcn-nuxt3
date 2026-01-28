<!-- Sidebar/Sidebar.vue -->
<template>
  <div>
    <div
      class="flex lg:hidden bg-blue-200 z-50 h-full w-full items-center justify-between p-4"
    >
      <NuxtLink to="/"><Logo /></NuxtLink>
      <Icon
        icon="iconamoon:menu-burger-horizontal-bold"
        class="z-50 cursor-pointer left-2 top-2"
        size="30"
        @click="open = true"
      />
      <div
        v-if="open"
        class="absolute z-90 bg-neutral-100 top-0 left-0 w-full h-screen"
      >
        <Icon
          icon="maki:cross"
          class="absolute z-90 cursor-pointer right-4 top-4"
          size="30"
          @click="open = false"
        />
        <SidebarMenu />
      </div>
    </div>
    <div class="hidden lg:flex w-[250px] h-screen border-r">
      <SidebarMenu />
    </div>
  </div>
</template>

<script setup>
const open = useState("iconMenu", () => false);
</script>

<style lang="scss" scoped></style>
