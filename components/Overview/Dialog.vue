<script setup lang="ts">
import { Icon } from "@iconify/vue";
const emit = defineEmits(["handleAddMember"]);
const isOpen = ref(false);
const userName = ref("");
const closeDialog = () => (isOpen.value = false);
const handleAddMember = () => {
  if (userName.value?.trim()?.length < 1) return;
  emit("handleAddMember", userName.value);
  closeDialog();
  userName.value = "";
};
</script>

<template>
  <SV-Dialog :open="isOpen">
    <SV-DialogTrigger as-child>
      <SV-Button
        class="bg-blue-700 hover:bg-blue-900 cursor-pointer"
        @click="isOpen = true"
      >
        Add Member
      </SV-Button>
    </SV-DialogTrigger>

    <SV-DialogContent :showCloseSV-Button="false">
      <form @submit.prevent="handleAddMember">
        <SV-DialogClose as-child class="">
          <SV-Button
            size="icon"
            aria-label="Submit"
            class="absolute top-3 right-3 p-1 bg-transparent hover:bg-transparent cursor-pointer"
            @click="closeDialog"
          >
            <Icon
              icon="mdi:close"
              class="w-5 h-5 text-neutral-700 hover:scale-[120%]"
            />
          </SV-Button>
        </SV-DialogClose>

        <SV-DialogHeader>
          <SV-DialogTitle>Are you absolutely sure?</SV-DialogTitle>
          <SV-DialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia dolor
            doloribus commodi aliquid ullam sit corporis id sapiente ipsa
            facere. Veniam ratione voluptates iure aliquam omnis dolorum
            sapiente excepturi officia.
          </SV-DialogDescription>
        </SV-DialogHeader>

        <div class="mt-4">
          <SV-Input
            type="text"
            placeholder="Username"
            v-model="userName"
            class="border rounded pl-3 min-h-10"
          />
        </div>
        <SV-DialogFooter class="mt-7">
          <SV-Button
            variant="outline"
            @click="closeDialog"
            class="cursor-pointer"
          >
            Close
          </SV-Button>
          <SV-Button
            type="submit"
            :disabled="userName?.trim()?.length < 1"
            class="bg-blue-700 hover:bg-blue-900 cursor-pointer disabled:cursor-not-allowed"
          >
            Add Member
          </SV-Button>
        </SV-DialogFooter>
      </form>
    </SV-DialogContent>
  </SV-Dialog>
</template>
