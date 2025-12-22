<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";

defineProps<{
  id: number;
  userName: string;
  email: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <span>{{ userName }}</span>

    <SV-Popover>
      <SV-PopoverTrigger as-child>
        <AlertCircle
          class="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground"
        />
      </SV-PopoverTrigger>

      <SV-PopoverContent class="w-56 text-xs space-y-2">
        <div><b>ID:</b> {{ id }}</div>
        <div><b>Email:</b> {{ email }}</div>

        <!-- future ready -->
        <!-- <Button size="sm">View Profile</Button> -->
      </SV-PopoverContent>
    </SV-Popover>
  </div>
</template>
