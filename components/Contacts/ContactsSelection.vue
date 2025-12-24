<template>
  <div class="mb-3">
    <SV-Select v-model="selectedValue">
      <SV-SelectTrigger class="w-[180px] border-neutral-300">
        <SV-SelectValue placeholder="SV-Select a fruit" />
      </SV-SelectTrigger>
      <SV-SelectContent>
        <SV-SelectGroup>
          <SV-SelectItem
            v-for="fruit in fruits"
            :key="fruit.val"
            :value="fruit.val"
          >
            {{ fruit.title }}
          </SV-SelectItem>
        </SV-SelectGroup>
      </SV-SelectContent>
    </SV-Select>
    <div class="mt-2">
      <pre>{{ selectFruit }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Fruit {
  title: string;
  val: string;
}
const fruits = ref<Fruit[]>([
  {
    title: "Apple",
    val: "apple",
  },
  {
    title: "Banana",
    val: "banana",
  },
  {
    title: "Blueberry",
    val: "blueberry",
  },
  {
    title: "Grapes",
    val: "grapes",
  },
  {
    title: "Pineapple",
    val: "pineapple",
  },
]);

const selectedValue = ref<string | null>(null);

const selectFruit = computed<Fruit | null>(() => {
  if (typeof selectedValue.value !== "string") return null;

  return fruits.value.find((f) => f.val === selectedValue.value) ?? null;
});
</script>

<style lang="scss" scoped></style>
