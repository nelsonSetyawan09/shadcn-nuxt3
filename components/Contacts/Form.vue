<script setup lang="ts">
import { reactive, ref, computed, watch } from "vue";

interface FormData {
  name: string;
  email: string;
  gender: string;
  country: string;
}

// FORM STATE
const form = reactive<FormData>({
  name: "",
  email: "",
  gender: "",
  country: "",
});

// ERROR STORAGE
const errors = ref<Partial<Record<keyof FormData, string>>>({});

// LOADING STATE
const isSaving = ref(false);

// FORM STATUS FLAGS
const isFormFresh = ref(true); // form baru dibuka / setelah reset
const isResetting = ref(false); // true ketika reset sedang berlangsung

/**
 * RULES VALIDASI UNTUK SETIAP FIELD
 */
const rules: Record<
  keyof FormData,
  Array<(value: unknown) => string | null>
> = {
  name: [(v) => (v ? null : "Nama wajib diisi")],
  email: [
    (v) => (v ? null : "Email wajib diisi"),
    (v) => (/.+@.+\..+/.test(String(v)) ? null : "Format email tidak valid"),
  ],
  gender: [(v) => (v ? null : "Gender wajib dipilih")],
  country: [(v) => (v ? null : "Country wajib dipilih")],
};

/**
 * VALIDASI SATU FIELD
 */
const validateSingleField = (key: keyof FormData) => {
  const fieldRules = rules[key];

  for (const rule of fieldRules) {
    const result = rule(form[key]);
    if (result) {
      errors.value[key] = result;
      return;
    }
  }

  delete errors.value[key]; // kalau lolos semua rule
};

/**
 * WATCHER UNTUK REALTIME VALIDATION
 */
(Object.keys(form) as Array<keyof FormData>).forEach((key) => {
  watch(
    () => form[key],
    () => {
      // ⛔ Jangan validasi saat reset form
      if (isResetting.value) return;

      // Saat form masih fresh (belum pernah diubah user), jangan validasi dulu
      if (isFormFresh.value) {
        isFormFresh.value = false;
        return;
      }

      validateSingleField(key);
    }
  );
});

/**
 * VALIDASI FULL UNTUK TOMBOL SAVE
 */
const validateForm = () => {
  errors.value = {};

  (Object.keys(rules) as Array<keyof FormData>).forEach((key) => {
    validateSingleField(key);
  });
};

/**
 * STATUS VALID FORM
 */
const isFormValid = computed(() => Object.keys(errors.value).length === 0);

/**
 * RESET FORM SETELAH BERHASIL SAVE
 */
const resetForm = () => {
  isResetting.value = true; // hentikan watcher validasi

  Object.assign(form, {
    name: "",
    email: "",
    gender: "",
    country: "",
  });

  errors.value = {};
  isFormFresh.value = true; // form dianggap baru & tanpa validasi

  // Reaktifitas Vue butuh 1 tick supaya watcher tidak jalan lagi saat reset
  setTimeout(() => {
    isResetting.value = false;
  });
};

/**
 * HANDLE SAVE
 */
const onSave = async () => {
  validateForm();
  if (!isFormValid.value) return;

  isSaving.value = true;

  await new Promise((r) => setTimeout(r, 1500)); // simulasi request API

  isSaving.value = false;
  alert("Form berhasil disimpan!");

  resetForm(); // 🔥 reset form sepenuhnya
};

/**
 * HANDLE CLOSE
 */
const onClose = () => {
  alert("Form ditutup");
};
</script>

<template>
  <div class="max-w-md p-6 border rounded space-y-4">
    <!-- NAME -->
    <div>
      <label class="block mb-1 font-medium">Name</label>
      <input
        v-model="form.name"
        type="text"
        :class="[
          'w-full p-2 border rounded',
          errors.name ? 'border-red-500' : 'border-gray-300',
        ]"
      />
      <p v-if="errors.name" class="text-sm text-red-500 mt-1">
        {{ errors.name }}
      </p>
    </div>

    <!-- EMAIL -->
    <div>
      <label class="block mb-1 font-medium">Email</label>
      <input
        v-model="form.email"
        type="email"
        :class="[
          'w-full p-2 border rounded',
          errors.email ? 'border-red-500' : 'border-gray-300',
        ]"
      />
      <p v-if="errors.email" class="text-sm text-red-500 mt-1">
        {{ errors.email }}
      </p>
    </div>

    <!-- RADIO -->
    <div>
      <label class="block mb-1 font-medium">Gender</label>
      <div class="flex items-center gap-4">
        <label
          ><input type="radio" value="male" v-model="form.gender" /> Male</label
        >
        <label
          ><input type="radio" value="female" v-model="form.gender" />
          Female</label
        >
      </div>
      <p v-if="errors.gender" class="text-sm text-red-500 mt-1">
        {{ errors.gender }}
      </p>
    </div>

    <!-- SELECT -->
    <div>
      <label class="block mb-1 font-medium">Country</label>
      <select
        v-model="form.country"
        :class="[
          'w-full p-2 border rounded',
          errors.country ? 'border-red-500' : 'border-gray-300',
        ]"
      >
        <option value="" disabled>Pilih negara...</option>
        <option value="indonesia">Indonesia</option>
        <option value="malaysia">Malaysia</option>
        <option value="singapore">Singapore</option>
      </select>
      <p v-if="errors.country" class="text-sm text-red-500 mt-1">
        {{ errors.country }}
      </p>
    </div>

    <!-- BUTTONS -->
    <div class="flex justify-end gap-2 pt-4">
      <button
        @click="onClose"
        class="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
      >
        Close
      </button>

      <button
        @click="onSave"
        :disabled="isSaving || !isFormValid"
        :class="[
          'px-4 py-2 rounded text-white flex items-center gap-2',
          isSaving || !isFormValid
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700',
        ]"
      >
        <!-- LOADING SPINNER -->
        <svg
          v-if="isSaving"
          class="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="white"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>

        <span>{{ isSaving ? "Saving..." : "Save" }}</span>
      </button>
    </div>
  </div>
</template>
