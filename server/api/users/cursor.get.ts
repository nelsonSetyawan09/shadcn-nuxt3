// server/uapi/users/TextCursor.get.ts
import { USERS } from "@/utils/mockUsers";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const query = getQuery(event);

  /* =====================
   * QUERY PARAMS
   * ===================== */
  const cursor = Number(query.cursor ?? 0);
  const limit = Number(query.limit ?? 10);

  const sortParam = query.sort as string | undefined;
  /* =====================
   * SORTING (SERVER SIDE)
   * ===================== */
  let dataSource = [...USERS];

  if (sortParam) {
    const [field, dir] = sortParam.split(":");

    dataSource.sort((a: any, b: any) => {
      if (a[field] < b[field]) return dir === "desc" ? 1 : -1;
      if (a[field] > b[field]) return dir === "desc" ? -1 : 1;
      return 0;
    });
  }

  /* =====================
   * CURSOR PAGINATION
   * ===================== */
  const start = cursor;
  const end = start + limit;

  // ambil +1 untuk cek next page
  const slice = dataSource.slice(start, end + 1);

  const hasNext = slice.length > limit;

  const data = hasNext ? slice.slice(0, limit) : slice;

  const nextCursor = hasNext ? end : null;
  const prevCursor = start > 0 ? Math.max(0, start - limit) : null;

  /* =====================
   * RESPONSE
   * ===================== */
  return {
    data,
    nextCursor,
    prevCursor,
    totalItems: dataSource.length,
  };
});
