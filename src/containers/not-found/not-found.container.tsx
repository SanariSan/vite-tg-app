import type { FC } from 'react';
import { memo } from 'react';
import { NotFoundComponentMemo } from 'src/components/not-found';

type TNotFoundContainer = {
  [key: string]: unknown;
};

const NotFoundContainer: FC<TNotFoundContainer> = () => {
  return <NotFoundComponentMemo />;
};

const NotFoundContainerMemo = memo(NotFoundContainer);

export { NotFoundContainerMemo };
