<template>
  <div v-if="ready" class="max-w-md p-6 border rounded space-y-5">
    <!-- FORM -->
    <form @submit.prevent="submit" class="space-y-5">
      <!-- NAME -->
      <div class="space-y-2">
        <SV-Label for="name">Nama</SV-Label>
        <SV-Input
          id="name"
          v-model="form.name"
          type="text"
          :class="errors.name ? 'border-red-500' : ''"
        />
        <p v-if="errors.name" class="text-sm text-red-500">
          {{ errors.name }}
        </p>
      </div>

      <!-- AGE -->
      <div class="space-y-2">
        <SV-Label for="age">Umur</SV-Label>
        <SV-Input
          id="age"
          v-model="form.age"
          type="number"
          :class="errors.age ? 'border-red-500' : ''"
        />
        <p v-if="errors.age" class="text-sm text-red-500">
          {{ errors.age }}
        </p>
      </div>

      <!-- AGREE -->
      <div class="space-y-2">
        <SV-Label class="flex items-center gap-2 cursor-pointer">
          <SV-Checkbox v-model="form.agree" />
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

<script setup lang="ts">
import { useFormHandler } from "@/composables/useFormHandler";

const ready = ref(false);

const { form, errors, isSaving, isFormValid, saveForm } = useFormHandler<{
  name: string;
  age: number;
  agree: boolean;
}>({
  name: { rules: [(v) => (v ? null : "Nama wajib diisi")], default: "" },
  age: { rules: [(v) => (v >= 18 ? null : "Minimal 18 tahun")], default: 0 },
  agree: { rules: [(v) => (v ? null : "Wajib setuju")], default: false },
});

onMounted(() => {
  ready.value = true;
});

const submit = () => {
  saveForm((data) => console.log("Form A:", data));
};
const close = () => {
  console.log("Form closed");
};
</script>

<style lang="scss" scoped></style>
