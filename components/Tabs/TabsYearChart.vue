<script lang="ts" setup>
const RevenueData = [
  { month: "2021", desktop: 305, mobile: 200 },
  { month: "2022", desktop: 237, mobile: 120 },
  { month: "2023", desktop: 73, mobile: 190 },
  { month: "2024", desktop: 209, mobile: 130 },
  { month: "2025", desktop: 214, mobile: 140 },
];

const RevenueCategories = computed(() => ({
  desktop: {
    name: "Desktop",
    color: "#22c55e",
  },
}));

const xFormatter = (i: number): string => `${RevenueData[i]?.month}`;
const yFormatter = (tick: number) => tick.toString();
</script>

<template>
  <BarChart
    :data="RevenueData"
    :height="300"
    :categories="RevenueCategories"
    :y-axis="['desktop']"
    :x-num-ticks="5"
    :radius="4"
    :y-grid-line="true"
    :x-formatter="xFormatter"
    :y-formatter="yFormatter"
    :legend-position="LegendPosition.TopRight"
    :hide-legend="false"
  />
</template>
