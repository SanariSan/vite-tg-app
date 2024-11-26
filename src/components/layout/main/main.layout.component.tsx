import type { FC } from 'react';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderContainerMemo } from 'src/containers/header';
import s from './main.layout.module.scss';

type TMainLayoutComponent = {
  [key: string]: unknown;
};

const MainLayoutComponent: FC<TMainLayoutComponent> = () => {
  return (
    <>
      <HeaderContainerMemo />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  );
};

const MainLayoutComponentMemo = memo(MainLayoutComponent);

export { MainLayoutComponentMemo };
