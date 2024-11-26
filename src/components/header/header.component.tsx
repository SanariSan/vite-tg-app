import type { FC } from 'react';
import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LangSwitchContainerMemo } from 'src/containers/lang';
import { ThemeSwitchContainerMemo } from 'src/containers/theme-switch';
import { useLocalizedRoutes } from 'src/hooks';
import s from './header.module.scss';

type THeaderComponent = {
  [key: string]: unknown;
};

const HeaderComponent: FC<THeaderComponent> = () => {
  const location = useLocation();
  const { WELCOME, NOT_FOUND, SCREENS_ROUTE, UNAUTHORIZED } = useLocalizedRoutes();

  return (
    <header className={s.header}>
      <ThemeSwitchContainerMemo />
      <LangSwitchContainerMemo />
      <nav>
        <NavLink to={WELCOME} className={location.pathname === WELCOME ? s.active : ''}>
          Welcome screen
        </NavLink>
        <NavLink to={SCREENS_ROUTE} className={location.pathname === SCREENS_ROUTE ? s.active : ''}>
          Screens
        </NavLink>
        <NavLink to={UNAUTHORIZED} className={location.pathname === UNAUTHORIZED ? s.active : ''}>
          Unauthorized
        </NavLink>
        <NavLink to={NOT_FOUND} className={location.pathname === NOT_FOUND ? s.active : ''}>
          404
        </NavLink>
      </nav>
    </header>
  );
};

const HeaderComponentMemo = memo(HeaderComponent);

export { HeaderComponentMemo };
