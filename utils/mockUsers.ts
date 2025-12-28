// utils/mockUsers.ts
import type { User } from "@/types/user";
import { getRandom, randomPhone13 } from "./tanstack-table";
import { IMAGES, MEMBER_STATUSES, COUNTRIES, COMPANIES } from "./dummyUsers";

export const USERS: User[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  userName: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  img: IMAGES[i % IMAGES.length],
  address: `Address user ${i + 1}`,
  phone: randomPhone13(),
  status: getRandom(MEMBER_STATUSES),
  country: getRandom(COUNTRIES),
  company: getRandom(COMPANIES),
}));
