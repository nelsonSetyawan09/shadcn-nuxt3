// composables/usePhone.ts

const ID_PHONE_REGEX = /^\+62[1-9][0-9]{9,16}$/;

export function usePhone() {
  const normalize = (input: string): string => {
    return input
      .trim()
      .replace(/\s|-/g, "") // hapus spasi & dash
      .replace(/^0/, "+62")
      .replace(/^62/, "+62");
  };

  const validate = (value: string): string | null => {
    if (!value) return "Nomor HP wajib diisi";

    const normalized = normalize(value);

    if (!ID_PHONE_REGEX.test(normalized)) {
      return "Format nomor HP tidak valid";
    }

    return null;
  };

  return {
    normalize,
    validate,
  };
}
