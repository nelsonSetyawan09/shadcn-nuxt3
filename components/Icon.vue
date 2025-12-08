<script setup lang="ts">
import { Icon as IIcon } from "@iconify/vue";

interface Props {
  icon: string;
  size?: number | string;
}

const { icon, size = 20 } = defineProps<Props>();
</script>

<template>
  <IIcon :icon="icon" :width="size" :height="size" class="inline-block" />
</template>
