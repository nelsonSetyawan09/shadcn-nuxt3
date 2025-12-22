<!-- components/table/UserNameWithTooltip.vue -->

<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

defineProps<{
  id: number;
  userName: string;
  email: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <span>{{ userName }}</span>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <AlertCircle
            class="w-4 h-4 cursor-pointer text-neutral-500 hover:text-neutral-700"
          />
        </TooltipTrigger>
        <TooltipContent
          class="tooltip-username bg-neutral-300 text-black shadow"
        >
          <div>ID: {{ id }}</div>
          <div>Email: {{ email }}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<style>
.tooltip-username span > svg {
  background-color: #d4d4d4 !important;
  fill: #d4d4d4 !important;
}
</style>
