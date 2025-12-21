import { USERS } from "@/utils/mockUsers";

const PAGE_SIZE = 10;

export default defineEventHandler((event) => {
  const { page = 1 } = getQuery(event);

  const currentPage = Math.max(1, Number(page));
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return {
    data: USERS.slice(start, end),

    page: currentPage,
    pageSize: PAGE_SIZE,
    total: USERS.length,
    totalPages: Math.ceil(USERS.length / PAGE_SIZE),
  };
});
