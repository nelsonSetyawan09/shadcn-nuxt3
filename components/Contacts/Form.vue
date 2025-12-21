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

      <!-- PHONE -->
      <div class="space-y-2">
        <SV-Label for="phone"
          >Phone
          <span class="text-sm opacity-50">(ex: 085399726089)</span></SV-Label
        >
        <SV-Input
          id="phone"
          v-model="form.phone"
          type="text"
          inputmode="numeric"
          placeholder="08xxxxxxxxxx"
          @input="onPhoneInput"
          :class="errors.phone ? 'border-red-500' : ''"
        />
        <p v-if="errors.phone" class="text-sm text-red-500">
          {{ errors.phone }}
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
import { usePhone } from "@/composables/usePhone";

const { validate: phoneRule } = usePhone();

const ready = ref(false);

const { form, errors, isSaving, isFormValid, saveForm } = useFormHandler<{
  name: string;
  age: number;
  email: string;
  phone: string;
  agree: boolean;
}>({
  name: { rules: [(v) => (v ? null : "Nama wajib diisi")], default: "" },
  age: { rules: [(v) => (v >= 18 ? null : "Minimal 18 tahun")], default: 0 },
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
  phone: {
    rules: [phoneRule],
    default: "",
  },
  agree: { rules: [(v) => (v ? null : "Wajib setuju")], default: false },
});

const onPhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/\D/g, "");
  form.phone = target.value;
};

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
