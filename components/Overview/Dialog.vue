<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  <Dialog :open="isOpen">
    <DialogTrigger as-child>
      <Button
        class="bg-blue-700 hover:bg-blue-900 cursor-pointer"
        @click="isOpen = true"
      >
        Add Member
      </Button>
    </DialogTrigger>

    <DialogContent :showCloseButton="false">
      <form @submit.prevent="handleAddMember">
        <DialogClose as-child class="">
          <Button
            size="icon"
            aria-label="Submit"
            class="absolute top-3 right-3 p-1 bg-transparent hover:bg-transparent cursor-pointer"
            @click="closeDialog"
          >
            <Icon
              icon="mdi:close"
              class="w-5 h-5 text-neutral-700 hover:scale-[120%]"
            />
          </Button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia dolor
            doloribus commodi aliquid ullam sit corporis id sapiente ipsa
            facere. Veniam ratione voluptates iure aliquam omnis dolorum
            sapiente excepturi officia.
          </DialogDescription>
        </DialogHeader>

        <div class="mt-4">
          <Input
            type="text"
            placeholder="Username"
            v-model="userName"
            class="border rounded pl-3 min-h-10"
          />
        </div>
        <DialogFooter class="mt-7">
          <Button variant="outline" @click="closeDialog" class="cursor-pointer">
            Close
          </Button>
          <Button
            type="submit"
            :disabled="userName?.trim()?.length < 1"
            class="bg-blue-700 hover:bg-blue-900 cursor-pointer disabled:cursor-not-allowed"
          >
            Add Member
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
