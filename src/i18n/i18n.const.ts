export const LANGUAGES = ['en', 'ru'] as const;
export type TLanguage = (typeof LANGUAGES)[number];
