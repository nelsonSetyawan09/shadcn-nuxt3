import type { Table } from "@tanstack/vue-table";

const MIN_COL_WIDTH = 120;

export function computeGridColumns(table: Table<any>, containerWidth: number) {
  const columns = table.getAllLeafColumns();

  // step 1: minimum width per column
  const minWidths = columns.map((c) => c.columnDef.size ?? MIN_COL_WIDTH);

  const minTotal = minWidths.reduce((a, b) => a + b, 0);

  // step 2: tidak cukup ruang → scroll
  if (minTotal >= containerWidth) {
    return minWidths;
  }

  // step 3: ada ruang sisa → distribute
  const remaining = containerWidth - minTotal;
  const growPerColumn = Math.floor(remaining / columns.length);

  return minWidths.map((w) => w + growPerColumn);
}
