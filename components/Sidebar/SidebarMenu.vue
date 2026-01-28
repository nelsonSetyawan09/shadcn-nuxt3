<!-- Sidebar/SidebarMenu.vue -->
<template>
  <div class="w-full">
    <header
      class="flex items-center gap-2 p-4 transition cursor-pointer"
      @click="goHome"
    >
      <Logo />
      <p class="font-bold">Nuxt-Finance</p>
    </header>
    <div class="px-4 grow">
      <div class="grid gap-1">
        <NuxtLink
          v-for="item in MENU_ITEMS"
          :key="item.path"
          :to="item.path"
          @click="closeSidebar"
          class="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 px-3 py-2 rounded transition-all"
          :class="{
            'bg-blue-300': isActive(item.path),
          }"
        >
          <Icon :icon="item.icon" />

          <span>{{ item.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MENU_ITEMS } from "~/constants/sidebar";

const route = useRoute();
const open = useState<boolean>("iconMenu");

function isActive(path: string) {
  // ambil path pertama
  const firstRoute = "/" + route.path.split("/").filter(Boolean)[0];

  return firstRoute === path;
}

function closeSidebar() {
  open.value = false;
}

function goHome() {
  navigateTo("/");
  open.value = false;
}
</script>

<style lang="scss" scoped></style>
