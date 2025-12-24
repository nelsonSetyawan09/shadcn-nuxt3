<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  src?: string;
  alt?: string;
}>();

const hasError = ref(false);

watch(
  () => props.src,
  () => {
    hasError.value = false;
  }
);
</script>

<template>
  <div
    class="relative w-[54px] h-[54px] rounded-md overflow-hidden border bg-gray-100"
  >
    <!-- ✅ IMAGE VALID -->
    <NuxtImg
      v-if="src && !hasError"
      :src="src"
      :alt="alt || 'image'"
      width="54"
      height="54"
      fit="cover"
      format="webp"
      loading="lazy"
      class="w-full h-full object-cover"
      @error="hasError = true"
    />

    <div
      v-else
      class="absolute inset-0 bg-linear-to-br from-slate-600 to-slate-700"
    >
      <Icon
        icon="mdi:mountain-outline"
        class="absolute inset-0 w-full h-full text-neutral-800"
      />

      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] font-semibold text-white capitalize tracking-wide leading-none select-none text-center"
      >
        Image invalid
      </span>
    </div>
  </div>
</template>
