// utils/mockUsers.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export const USERS: User[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
}));
