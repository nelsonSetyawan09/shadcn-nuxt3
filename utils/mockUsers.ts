// utils/mockUsers.ts
export interface User {
  id: number;
  userName: string;
  email: string;
}

const IMAGES = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8",
];

export const USERS: User[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  userName: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  img: IMAGES[i % IMAGES.length],
}));
