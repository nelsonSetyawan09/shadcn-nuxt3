import type { MenuItem } from "@/types/menu";
export const MENU_ITEMS: MenuItem[] = [
  {
    title: "Card Member",
    path: "/card-member",
    icon: "material-symbols-light:dashboard-rounded",
  },
  {
    title: "Virtual Scroll",
    path: "/virtual-scroll",
    icon: "grommet-icons:transaction",
  },

  {
    title: "Form User",
    path: "/form-user",
    icon: "mingcute:contacts-2-fill",
  },

  {
    title: "Users Table",
    path: "/users-table",
    icon: "majesticons:users",
  },
] as const;
