// composables/useFormHandler.ts
import { reactive, ref, computed, watch } from "vue";

type Rule<T = any> = (v: T) => string | null;

export interface FieldSchema<T = any> {
  rules: Rule<T>[];
  default: T;
}

/**
 * REUSABLE FORM HANDLER
 * T = struktur form (name, age, agree, dsb.)
 */
export function useFormHandler<T extends Record<string, any>>(
  schema: Record<keyof T, FieldSchema>
) {
  // --------------------------------------
  // STATE
  // --------------------------------------
  const form = reactive<Record<string, any>>({});
  const errors = ref<Partial<Record<keyof T, string>>>({});

  const isSaving = ref(false);
  const isResetting = ref(false);

  // UX flags
  const isFormFresh = ref(true); // sebelum ada interaksi
  const hasSubmitted = ref(false); // setelah klik save

  // --------------------------------------
  // INIT FORM FROM SCHEMA
  // --------------------------------------
  for (const key in schema) {
    form[key] = schema[key].default;
  }

  // --------------------------------------
  // VALIDATE SINGLE FIELD
  // --------------------------------------
  const validateSingleField = (key: keyof T) => {
    const value = form[key as string];
    const rules = schema[key].rules;

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors.value[key] = error;
        return;
      }
    }

    delete errors.value[key];
  };

  // --------------------------------------
  // VALIDATE FULL FORM
  // --------------------------------------
  const validateForm = () => {
    errors.value = {};
    (Object.keys(schema) as Array<keyof T>).forEach(validateSingleField);
  };

  // --------------------------------------
  // WATCH PER FIELD (REALTIME VALIDATION)
  // --------------------------------------
  (Object.keys(schema) as Array<keyof T>).forEach((key) => {
    watch(
      () => form[key as string],
      () => {
        if (isResetting.value) return;

        // ⛔ Skip hanya saat initial render & belum submit
        if (isFormFresh.value && !hasSubmitted.value) return;

        validateSingleField(key);
      }
    );
  });

  // --------------------------------------
  // FORM VALID STATUS
  // --------------------------------------
  const isFormValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  // --------------------------------------
  // RESET FORM
  // --------------------------------------
  const resetForm = () => {
    isResetting.value = true;

    for (const key in schema) {
      form[key] = schema[key].default;
    }

    errors.value = {};
    isFormFresh.value = true;
    hasSubmitted.value = false;

    // allow watcher again
    setTimeout(() => {
      isResetting.value = false;
    });
  };

  // --------------------------------------
  // SAVE / SUBMIT HANDLER
  // --------------------------------------
  const saveForm = async (
    onSuccess?: (data: T) => void,
    options?: { mock?: boolean }
  ) => {
    hasSubmitted.value = true;
    isFormFresh.value = false;

    validateForm();
    if (!isFormValid.value) return;

    isSaving.value = true;

    try {
      // simulasi API request
      if (options?.mock !== true) {
        await new Promise((r) => setTimeout(r, 800)); // hanya untuk create / demo
      }

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
