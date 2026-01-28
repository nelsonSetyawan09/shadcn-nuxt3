// composables/useMenuTitle.ts
import { MENU_ITEMS } from "@/constants/sidebar";

export function useMenuTitle() {
  const route = useRoute();

  const title = computed(() => {
    const firstPath = "/" + route.path.split("/").filter(Boolean)[0];

    const menu = MENU_ITEMS.find((item) => item.path === firstPath);

    return menu?.title ?? "Nuxt Finance";
  });

  return { title };
}
