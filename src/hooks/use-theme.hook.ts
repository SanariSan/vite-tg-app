import { useEffect, useState } from 'react';
import { LocalStorageHelper } from 'src/helpers';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    (LocalStorageHelper.getPlainItem('theme') as Theme) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    LocalStorageHelper.setPlainItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!LocalStorageHelper.getPlainItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, toggleTheme };
};
