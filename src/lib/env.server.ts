import "server-only";

export const SERVER_ENV_NAMES = [
  "DATABASE_URL",
  "CLERK_SECRET_KEY",
  "CLERK_WEBHOOK_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_SEASON_PASS",
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "GEMINI_API_KEY",
] as const;

export type ServerEnvName = (typeof SERVER_ENV_NAMES)[number];

/**
 * Validate only the integration keys required by the current server entry point.
 * Call this from a server route or service before using that integration, so
 * deferred integrations do not block build, development, or unrelated routes.
 */
export function validateServerEnv<const Names extends readonly ServerEnvName[]>(
  names: Names,
): { [Name in Names[number]]: string } {
  const missing = names.filter((name) => !process.env[name]?.trim());

  if (missing.length > 0) {
    throw new Error(
      `Missing required server environment variable(s): ${missing.join(", ")}`,
    );
  }

  return Object.fromEntries(
    names.map((name) => [name, process.env[name]!.trim()]),
  ) as { [Name in Names[number]]: string };
}
