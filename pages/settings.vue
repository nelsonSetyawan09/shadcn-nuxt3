<template>
  <div v-if="ready" class="max-w-sm p-4 border rounded space-y-4">
    <!-- FORM -->
    <form @submit.prevent="submit" class="space-y-4">
      <!-- USERNAME FIELD -->
      <div class="space-y-2">
        <Label for="username">Username</Label>

        <Input
          id="username"
          v-model="form.username"
          type="text"
          :class="errors.username ? 'border-red-500' : ''"
        />

        <p v-if="errors.username" class="text-sm text-red-500">
          {{ errors.username }}
        </p>
      </div>

      <!-- BUTTONS -->
      <div class="flex justify-end gap-2 pt-3">
        <!-- CLOSE BUTTON -->
        <Button type="button" variant="outline" @click="close"> Close </Button>

        <!-- SAVE BUTTON -->
        <Button type="submit" :disabled="!isFormValid || isSaving">
          <span v-if="isSaving">Saving...</span>
          <span v-else>Save</span>
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFormHandler } from "@/composables/useFormHandler";

const ready = ref(false);

const { form, errors, isSaving, isFormValid, saveForm } = useFormHandler<{
  username: string;
}>({
  username: {
    rules: [(v) => (v ? null : "Username wajib diisi")],
    default: "",
  },
});

onMounted(() => {
  ready.value = true;
});

const submit = () => {
  saveForm((data) => {
    console.log("Save:", data);
  });
};

const close = () => {
  console.log("Form closed");
};
</script>

<style lang="scss" scoped></style>
