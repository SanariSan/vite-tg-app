/**
 * Absolute routes definition
 */

import type { TLanguage } from 'src/i18n';

export const ROUTES = {
  WELCOME: '/',
  NOT_FOUND: '/404',
  SCREENS_ROUTE: '/screens',
  SCREEN_HOME: '/screens/home',
  SCREEN_SHOP: '/screens/shop',
  SCREEN_TASKS: '/screens/tasks',
  SCREEN_SOCIAL: '/screens/social',
  UNAUTHORIZED: '/unauthorized',
} as const;

type TRoutes = typeof ROUTES;
export type TRoute = TRoutes[keyof TRoutes];

/**
 * Relative lang agnostic routes generation
 * Meant to be used ONLY within <Route path={...}>
 * Transforms "/account" to "/:urlLang/account" to catch lang param in route
 */

export type TLangAgnosticRoutes = {
  [K in keyof TRoutes]: `/:urlLang${TRoutes[K]}`;
};
export type TLangAgnosticRoute = TLangAgnosticRoutes[keyof TLangAgnosticRoutes];

export const LANG_AGNOSTIC_ROUTES = Object.entries(ROUTES).reduce((acc, [key, value]) => {
  acc[key] = `/:urlLang${value}`;
  return acc;
}, {} as Record<string, string>) as TLangAgnosticRoutes;

/**
 * Lang prefixed absolute path typings
 * Transforms "/account" to "/en/account" on type level
 */

type TLangPrefixedRoute<T extends TRoute> = `/${TLanguage}${T}`;
export type TLocalizedRoutes = {
  [K in keyof TLangAgnosticRoutes]: TLangPrefixedRoute<TRoutes[K]>;
};
export type TLocalizedRoute = TLocalizedRoutes[keyof TLocalizedRoutes];
