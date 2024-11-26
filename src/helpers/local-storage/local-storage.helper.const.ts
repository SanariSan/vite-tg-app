export const HASH_KEYS = [
  'tgWebAppData',
  'tgWebAppPlatform',
  'tgWebAppThemeParams',
  'tgWebAppVersion',
] as const;

export const QUERY_KEYS = [] as const;

export const PLAIN_KEYS = ['i18nextLng', 'theme', 'jwt', 'isWelcomeAcknowledged'] as const;

export type THashKey = (typeof HASH_KEYS)[number];
export type TQueryKey = (typeof QUERY_KEYS)[number];
export type TPlainKey = (typeof PLAIN_KEYS)[number];
