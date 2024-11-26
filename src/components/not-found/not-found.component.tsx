import type { FC } from 'react';
import { memo } from 'react';

type TNotFoundComponent = {
  [key: string]: unknown;
};

const NotFoundComponent: FC<TNotFoundComponent> = () => {
  return (
    <section>
      <h1>404: Not Found</h1>
      <p>It's gone :(</p>
    </section>
  );
};

const NotFoundComponentMemo = memo(NotFoundComponent);

export { NotFoundComponentMemo };
