import type { FC } from 'react';
import { memo } from 'react';
import { MainLayoutComponentMemo } from 'src/components/layout/main';
import { QueryParserMemo } from 'src/router/query-parser';

type TMainLayoutContainer = {
  [key: string]: unknown;
};

const MainLayoutContainer: FC<TMainLayoutContainer> = () => {
  return (
    <>
      <QueryParserMemo />
      <MainLayoutComponentMemo />
    </>
  );
};

const MainLayoutContainerMemo = memo(MainLayoutContainer);

export { MainLayoutContainerMemo };
