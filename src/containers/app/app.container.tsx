import { Provider } from 'jotai';
import type { FC } from 'react';
import { memo } from 'react';
import { Router } from 'src/router';
import { store } from 'src/store';

type TAppContainer = {
  [key: string]: unknown;
};

const AppContainer: FC<TAppContainer> = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

const AppContainerMemo = memo(AppContainer);

export { AppContainerMemo };
