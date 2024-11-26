import { Route } from 'react-router-dom';
import { MainLayoutContainerMemo } from 'src/containers/layout/main';
import { MaintenanceContainerMemo } from 'src/containers/maintenance';
import { LocaleRouteManager } from '../locale-route-manager';
import { LANG_AGNOSTIC_ROUTES, ROUTES } from '../router.const';

export const MaintenanceRouter = (
  <Route path={ROUTES.WELCOME} element={<MainLayoutContainerMemo />}>
    <Route path="" element={<LocaleRouteManager />} />
    <Route path={LANG_AGNOSTIC_ROUTES.WELCOME} element={<LocaleRouteManager />}>
      <Route index element={<MaintenanceContainerMemo />} />
      <Route path="*" element={<MaintenanceContainerMemo />} />
    </Route>
  </Route>
);
