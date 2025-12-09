<template>
  <div class="w-full">
    <header
      class="flex items-center gap-2 p-4 transition cursor-pointer"
      @click="handleNavigate('/')"
    >
      <Logo />
      <p class="font-bold">Nuxt-Finance</p>
    </header>
    <div class="px-4 grow">
      <div class="grid gap-1">
        <NuxtLink
          v-for="(item, idx) in items"
          :key="idx"
          @click="handleNavigate(item.path)"
          class="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 px-3 py-2 rounded transition-all"
        >
          <Icon :icon="item.icon" />

          <span>{{ item.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const open = useState("iconMenu");
const handleNavigate = (item) => {
  navigateTo(item ?? "/");
  open.value = false;
};
const items = ref([
  {
    title: "Overview",
    path: "/overview",
    icon: "material-symbols-light:dashboard-rounded",
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: "grommet-icons:transaction",
  },
  {
    title: "Account",
    path: "/account",
    icon: "mdi:account-box",
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: "mingcute:contacts-2-fill",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "material-symbols:settings-rounded",
  },
]);
</script>

<style lang="scss" scoped></style>
