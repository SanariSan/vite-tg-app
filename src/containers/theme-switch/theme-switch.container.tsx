import type { FC } from 'react';
import { memo } from 'react';
import { ThemeSwitchComponentMemo } from 'src/components/theme-switch';
import { useTheme } from 'src/hooks';

type TThemeSwitchContainer = {
  [key: string]: unknown;
};

const ThemeSwitchContainer: FC<TThemeSwitchContainer> = () => {
  const { theme, toggleTheme } = useTheme();

  return <ThemeSwitchComponentMemo theme={theme} toggleTheme={toggleTheme} />;
};

const ThemeSwitchContainerMemo = memo(ThemeSwitchContainer);

export { ThemeSwitchContainerMemo };
