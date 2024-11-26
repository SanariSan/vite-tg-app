import type { FC } from 'react';
import { memo } from 'react';

type TThemeSwitchComponent = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeSwitchComponent: FC<TThemeSwitchComponent> = ({ theme, toggleTheme }) => {
  return (
    <button className="theme-switch" onClick={toggleTheme}>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
};

const ThemeSwitchComponentMemo = memo(ThemeSwitchComponent);

export { ThemeSwitchComponentMemo };
