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
    component: resolveComponent("TabsToday"),
  },
  {
    title: "This Week",
    value: "week",

    component: resolveComponent("TabsWeek"),
  },
  {
    title: "This Month",
    value: "month",

    component: resolveComponent("TabsMonth"),
  },
  {
    title: "Year",
    value: "year",

    component: resolveComponent("TabsYear"),
  },
]);
</script>

<style lang="scss" scoped></style>
