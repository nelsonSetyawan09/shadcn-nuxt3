<script lang="ts" setup>
const RevenueData = [
  { month: "Pertama", desktop: 186, mobile: 80 },
  { month: "Kedua", desktop: 305, mobile: 200 },
  { month: "Ketiga", desktop: 237, mobile: 120 },
  { month: "Keempat", desktop: 73, mobile: 190 },
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
    :x-num-ticks="4"
    :radius="4"
    :y-grid-line="true"
    :x-formatter="xFormatter"
    :y-formatter="yFormatter"
    :legend-position="LegendPosition.TopRight"
    :hide-legend="false"
  />
</template>
