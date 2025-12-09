<script lang="ts" setup>
const RevenueData = [
  { month: "Senin", desktop: 186, mobile: 80 },
  { month: "Selasa", desktop: 305, mobile: 200 },
  { month: "Rabu", desktop: 237, mobile: 120 },
  { month: "Kamis", desktop: 73, mobile: 190 },
  { month: "Jumat", desktop: 209, mobile: 130 },
  { month: "Sabtu", desktop: 214, mobile: 140 },
  { month: "Minggu", desktop: 214, mobile: 110 },
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
    :x-num-ticks="6"
    :radius="4"
    :y-grid-line="true"
    :x-formatter="xFormatter"
    :y-formatter="yFormatter"
    :legend-position="LegendPosition.TopRight"
    :hide-legend="false"
  />
</template>
