// server/api/users.get.ts
import { USERS } from "@/utils/mockUsers";

const PAGE_SIZE = 10;

export default defineEventHandler((event) => {
  const { cursor = 0 } = getQuery(event);

  const start = Number(cursor);
  const end = start + PAGE_SIZE;

  return {
    data: USERS.slice(start, end),
    nextCursor: end < USERS.length ? end : null,
    prevCursor: start > 0 ? Math.max(0, start - PAGE_SIZE) : null,
  };
});
