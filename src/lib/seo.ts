export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

export function absoluteSiteUrl(path: string) {
  if (!SITE_URL) return undefined;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}