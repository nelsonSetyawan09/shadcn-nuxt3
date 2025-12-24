<!-- components/Users/EditUserModal -->
<script setup lang="ts">
import EditUserForm from "./UsersEditUserForm.vue";
import type { User } from "@/types/user";

const props = defineProps<{
  isEditOpen: boolean;
  userData: User | null;
}>();

const emit = defineEmits<{
  (e: "update:open", v: boolean): void;
  (e: "handleEditUser", data: User): void;
}>();

const handleEditUser = (data: User) => {
  emit("handleEditUser", data);
};

const closeDialog = () => emit("update:open", false);
</script>

<template>
  <SV-Dialog :open="isEditOpen">
    <SV-DialogContent :showCloseButton="false">
      <SV-DialogHeader>
        <SV-DialogTitle>Edit User</SV-DialogTitle>
        <SV-DialogDescription />
      </SV-DialogHeader>
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
      <EditUserForm
        :user-data="userData"
        @hanlde-edit-user="handleEditUser"
        @close-dialog="closeDialog"
      />
    </SV-DialogContent>
  </SV-Dialog>
</template>
