<template>
  <div>
    <Tabs default-value="today">
      <TabsList>
        <TabsTrigger v-for="tab in tabs" :value="tab.value" :key="tab.value">
          {{ tab.title }}
        </TabsTrigger>
      </TabsList>
      <TabsContent v-for="content in tabs" :value="content.value">
        <component :is="content.component" />
      </TabsContent>
    </Tabs>
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
