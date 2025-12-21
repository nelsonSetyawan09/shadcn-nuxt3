<script setup lang="ts">
import { useError } from "#app";

const error = useError();

const goHome = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center text-center bg-linear-to-r from-cyan-200 to-blue-200"
  >
    <div>
      <h1 class="text-6xl font-bold">
        {{ error?.statusCode || 500 }}
      </h1>

      <p class="mt-4 text-gray-500">
        {{ error?.statusMessage || "Something went wrong" }}
      </p>

      <SV-Button class="mt-6 px-4 py-2 text-white rounded" @click="goHome">
        Back to Home
      </SV-Button>
    </div>
  </div>
</template>
