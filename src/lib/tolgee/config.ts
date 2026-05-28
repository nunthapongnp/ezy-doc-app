/** Tolgee Cloud / self-hosted API (loaded from env). */
export const TOLGEE_API_KEY = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
export const TOLGEE_API_URL =
  process.env.NEXT_PUBLIC_TOLGEE_API_URL ?? "https://app.tolgee.io";

/** When true, translations are fetched from Tolgee at runtime (no bundled JSON). */
export const USE_TOLGEE_CLOUD = Boolean(TOLGEE_API_KEY);
