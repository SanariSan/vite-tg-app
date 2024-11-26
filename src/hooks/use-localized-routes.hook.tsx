import { useMemo } from 'react';
import { ROUTES, type TLocalizedRoutes } from 'src/router';
import { useTranslate } from './use-translate.hook';

export const useLocalizedRoutes = () => {
  const { i18n } = useTranslate();

  const localizedRoutes = useMemo(
    () =>
      Object.entries(ROUTES).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: `/${i18n.resolvedLanguage}${value}`,
        }),
        {} as TLocalizedRoutes,
      ),
    [i18n.resolvedLanguage],
  );

  return localizedRoutes;
};
