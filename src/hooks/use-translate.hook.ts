import { useTranslation } from 'react-i18next';

export const useTranslate = (defaultPath?: string) => {
  const { t, i18n, ready } = useTranslation('translation', {
    keyPrefix: defaultPath,
  });

  return { t, i18n, ready } as const;
};
