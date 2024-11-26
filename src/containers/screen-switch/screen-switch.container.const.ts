import React from 'react';
import { delayedPromise, type BuildRange } from 'src/helpers';
import { ROUTES } from 'src/router';

// Have to use non-localized routes because const can't make use of dynamic localization hook
// delayed import is used to play reveal transition properly
export const SCREENS = [
  {
    route: ROUTES.SCREEN_HOME,
    lazyComponent: React.lazy(() =>
      delayedPromise(import('src/containers/pages/home/home.page.container'), 300),
    ),
  },
  {
    route: ROUTES.SCREEN_SHOP,
    lazyComponent: React.lazy(() =>
      delayedPromise(import('src/containers/pages/shop/shop.page.container'), 300),
    ),
  },
  {
    route: ROUTES.SCREEN_TASKS,
    lazyComponent: React.lazy(() =>
      delayedPromise(import('src/containers/pages/tasks/tasks.page.container'), 300),
    ),
  },
  {
    route: ROUTES.SCREEN_SOCIAL,
    lazyComponent: React.lazy(() =>
      delayedPromise(import('src/containers/pages/social/social.page.container'), 300),
    ),
  },
] as const;

type TScreens = typeof SCREENS;

export type TScreen = TScreens[number];
export type TScreenId = BuildRange<TScreens['length']>;

export const SCREEN_IDS = Object.keys(SCREENS).map(Number) as TScreenId[];
