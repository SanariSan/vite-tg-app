import i18next from 'i18next';
import type { TLanguage } from 'src/i18n';
import { type TLocalizedRoute, type TRoute } from 'src/router';

export const constructLocalizedRoute = ({ route }: { route: TRoute }) => {
  return `/${i18next.resolvedLanguage as TLanguage}${route}` as TLocalizedRoute;
};
