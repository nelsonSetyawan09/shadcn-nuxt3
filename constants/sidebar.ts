import type { MenuItem } from "@/types/menu";
export const MENU_ITEMS: MenuItem[] = [
  {
    title: "Overview",
    path: "/overview",
    icon: "material-symbols-light:dashboard-rounded",
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: "grommet-icons:transaction",
  },
  {
    title: "Account",
    path: "/account",
    icon: "mdi:account-box",
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: "mingcute:contacts-2-fill",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "material-symbols:settings-rounded",
  },
  {
    title: "Users",
    path: "/users",
    icon: "majesticons:users",
  },
] as const;
