// composables/useFormHandler.ts
import { reactive, ref, computed, watch } from "vue";

type Rule = (v: any) => string | null;

export interface FieldSchema {
  rules: Rule[];
  default: any; // nilai awal sesuai tipe field
}

/**
 * REUSABLE FORM HANDLER
 * T = struktur form (name, age, agree, dsb.)
 */
export function useFormHandler<T extends Record<string, any>>(
  schema: Record<keyof T, FieldSchema>
) {
  // Form dibuat dinamis → lebih aman memakai Record<string, any>
  const form = reactive<Record<string, any>>({});

  // Error per-field
  const errors = ref<Partial<Record<keyof T, string>>>({});

  // Flags
  const isSaving = ref(false);
  const isFormFresh = ref(true);
  const isResetting = ref(false);

  // --------------------------------------
  // 🟦 1. INISIALISASI FORM SESUAI SCHEMA
  // --------------------------------------
  for (const key in schema) {
    const k = key as string;
    const field = schema[key];

    // Set nilai default sesuai tipe field
    form[k] = field.default;
  }

  // --------------------------------------
  // 🟨 2. VALIDASI SINGLE FIELD
  // --------------------------------------
  const validateSingleField = (key: keyof T) => {
    const k = key as string;
    const value = form[k];
    const fieldRules = schema[key].rules;

    for (const rule of fieldRules) {
      const result = rule(value);
      if (result) {
        errors.value[key] = result;
        return;
      }
    }

    delete errors.value[key]; // Jika lolos semua rule
  };

  // --------------------------------------
  // 🟧 3. VALIDATE FULL FORM
  // --------------------------------------
  const validateForm = () => {
    errors.value = {};
    (Object.keys(schema) as Array<keyof T>).forEach((key) =>
      validateSingleField(key)
    );
  };

  // --------------------------------------
  // 🟩 4. WATCH PER FIELD (REALTIME VALIDATION)
  // --------------------------------------
  (Object.keys(schema) as Array<keyof T>).forEach((key) => {
    const k = key as string;

    watch(
      () => form[k],
      () => {
        if (isResetting.value) return; // jangan validasi saat reset

        if (isFormFresh.value) {
          isFormFresh.value = false;
          return;
        }

        validateSingleField(key);
      }
    );
  });

  // --------------------------------------
  // 🟪 5. STATUS VALID FORM
  // --------------------------------------
  const isFormValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  // --------------------------------------
  // 🟥 6. RESET FORM KE DEFAULT
  // --------------------------------------
  const resetForm = () => {
    isResetting.value = true;

    for (const key in schema) {
      const k = key as string;
      form[k] = schema[key].default; // reset kembali ke default
    }

    errors.value = {};
    isFormFresh.value = true;

    // izinkan watcher berjalan lagi setelah satu tick
    setTimeout(() => (isResetting.value = false));
  };

  // --------------------------------------
  // 🟫 7. SAVE HANDLER
  // --------------------------------------
  const saveForm = async (onSuccess?: (data: T) => void) => {
    validateForm();
    if (!isFormValid.value) return;

    isSaving.value = true;

    try {
      // simulasikan delay (API request)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // callback dengan data sudah type-safe
      onSuccess?.({ ...(form as T) });

      resetForm();
    } finally {
      isSaving.value = false;
    }
  };

  // --------------------------------------
  // RETURN API
  // --------------------------------------
  return {
    form,
    errors,
    isSaving,
    isFormValid,

    validateSingleField,
    validateForm,
    saveForm,
    resetForm,
  };
}
