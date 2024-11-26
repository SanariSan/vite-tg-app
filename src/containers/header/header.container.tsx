import type { FC } from 'react';
import { memo } from 'react';
import { HeaderComponentMemo } from 'src/components/header';

type THeaderContainer = {
  [key: string]: unknown;
};

const HeaderContainer: FC<THeaderContainer> = () => {
  return <HeaderComponentMemo />;
};

const HeaderContainerMemo = memo(HeaderContainer);

export { HeaderContainerMemo };
