import { Route } from 'react-router-dom';
import { MainLayoutContainerMemo } from 'src/containers/layout/main';
import { LocaleRouteManager } from '../locale-route-manager';
import { LANG_AGNOSTIC_ROUTES, ROUTES } from '../router.const';
import { StableRootRouter } from './root.stable.router';

export const StableRouter = (
  <Route path={ROUTES.WELCOME} element={<MainLayoutContainerMemo />}>
    <Route path="" element={<LocaleRouteManager />} />
    <Route path={LANG_AGNOSTIC_ROUTES.WELCOME} element={<LocaleRouteManager />}>
      {StableRootRouter}
    </Route>
  </Route>
);
