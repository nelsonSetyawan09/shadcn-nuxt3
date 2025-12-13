<template>
  <div>
    <SV-Tabs default-value="today">
      <SV-TabsList>
        <SV-TabsTrigger v-for="tab in tabs" :value="tab.value" :key="tab.value">
          {{ tab.title }}
        </SV-TabsTrigger>
      </SV-TabsList>
      <SV-TabsContent v-for="content in tabs" :value="content.value">
        <component :is="content.component" />
      </SV-TabsContent>
    </SV-Tabs>
  </div>
</template>

<script setup>
const tabs = shallowRef([
  {
    title: "Today",
    value: "today",
    component: resolveComponent("TabsTodayChart"),
  },
  {
    title: "This Week",
    value: "week",

    component: resolveComponent("TabsWeekChart"),
  },
  {
    title: "This Month",
    value: "month",

    component: resolveComponent("TabsMonthChart"),
  },
  {
    title: "Year",
    value: "year",

    component: resolveComponent("TabsYearChart"),
  },
]);
</script>

<style lang="scss" scoped></style>
