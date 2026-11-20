export const PROJECTS_PER_PAGE = 6;
export const MAX_QUERY_LENGTH = 200;

export function normalizeQuery(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_QUERY_LENGTH) : "";
}

export function normalizePage(value: unknown): number {
  if (typeof value !== "string" && typeof value !== "number") return 1;
  if (typeof value === "string" && !/^\d+$/.test(value)) return 1;
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 && page <= Math.floor(Number.MAX_SAFE_INTEGER / PROJECTS_PER_PAGE)
    ? page
    : 1;
}
