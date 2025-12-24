<!-- Components/Users/EditUserForm.vue -->
<script setup lang="ts">
import { useFormHandler } from "@/composables/useFormHandler";
import type { User } from "@/types/user";

const props = defineProps<{
  userData: User | null;
}>();

const ready = ref(false);

const emit = defineEmits<{
  (e: "hanldeEditUser", data: User): void;
  (e: "closeDialog"): void;
}>();

const { form, errors, isSaving, isFormValid, saveForm, resetForm } =
  useFormHandler<{
    userName: string;
    email: string;
    agree: boolean;
  }>({
    userName: { rules: [(v) => (v ? null : "Nama wajib diisi")], default: "" },
    email: {
      rules: [
        (v) => (v ? null : "Nama wajib diisi"),
        (v) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
            ? null
            : "Format email tidak valid",
      ],
      default: "",
    },
    agree: { rules: [(v) => (v ? null : "Wajib setuju")], default: true },
  });

onMounted(() => {
  ready.value = true;
});

/* =====================
 * PREFILL FORM (EDIT MODE)
 * ===================== */
watch(
  () => props.userData,
  (val) => {
    if (!val) return;
    form.userName = val.userName;
    form.email = val.email;
  },
  { immediate: true }
);

const submit = () => {
  saveForm(
    (data) =>
      emit("hanldeEditUser", {
        id: props.userData!.id,
        userName: data.userName,
        email: data.email,
      }),
    { mock: true } // 🔥 tanpa delay
  );
};
const close = () => {
  emit("closeDialog");
  resetForm();
};
</script>

<template>
  <div v-if="ready" class="max-w-md p space-y-5">
    <!-- FORM -->
    <form @submit.prevent="submit" class="space-y-5">
      <!-- NAME -->
      <div class="space-y-2">
        <SV-Label for="username">UserName</SV-Label>
        <SV-Input
          id="username"
          v-model="form.userName"
          type="text"
          :class="errors.userName ? 'border-red-500' : ''"
        />
        <p v-if="errors.userName" class="text-sm text-red-500">
          {{ errors.userName }}
        </p>
      </div>

      <!-- EMAIL -->
      <div class="space-y-2">
        <SV-Label for="email">Email</SV-Label>
        <SV-Input
          id="email"
          v-model="form.email"
          type="email"
          :class="errors.email ? 'border-red-500' : ''"
        />
        <p v-if="errors.email" class="text-sm text-red-500">
          {{ errors.email }}
        </p>
      </div>

      <!-- AGREE -->
      <div class="space-y-2">
        <SV-Label class="flex items-center gap-2 cursor-pointer">
          <SV-Checkbox
            v-model="form.agree"
            class="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white"
          />
          Saya bersedia
        </SV-Label>
        <p v-if="errors.agree" class="text-sm text-red-500">
          {{ errors.agree }}
        </p>
      </div>

      <!-- BUTTONS -->
      <div class="flex justify-end gap-2 pt-4">
        <!-- CLOSE BUTTON -->
        <SV-Button variant="outline" type="button" @click="close">
          Close
        </SV-Button>

        <!-- SAVE BUTTON -->
        <SV-Button type="submit" :disabled="!isFormValid || isSaving">
          <span v-if="isSaving">Saving...</span>
          <span v-else>Save</span>
        </SV-Button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
