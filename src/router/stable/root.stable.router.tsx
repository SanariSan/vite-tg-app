import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { NotFoundContainerMemo } from 'src/containers/not-found';
import { WelcomeContainerMemo } from 'src/containers/pages/welcome';
import { ScreenSwitchContainerMemo } from 'src/containers/screen-switch';
import { AuthenticatedAccess } from '../access-protector';
import { LANG_AGNOSTIC_ROUTES } from '../router.const';

export const StableRootRouter = (
  <>
    <Route
      index
      element={
        <Suspense fallback={<>Loading...</>}>
          <WelcomeContainerMemo />
        </Suspense>
      }
    />
    <Route
      path={LANG_AGNOSTIC_ROUTES.SCREENS_ROUTE}
      element={
        <AuthenticatedAccess>
          <Suspense fallback={<>Loading...</>}>
            <ScreenSwitchContainerMemo />
          </Suspense>
        </AuthenticatedAccess>
      }
    >
      <Route path=":screenPath" element={null} />
    </Route>
    <Route
      path={LANG_AGNOSTIC_ROUTES.UNAUTHORIZED}
      element={
        <Suspense fallback={<>Loading...</>}>
          <div>
            todo: component that will say to reopen the app because of no tg data or other reason
          </div>
        </Suspense>
      }
    />
    <Route path="*" element={<NotFoundContainerMemo />} />
  </>
);
