import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalizedRoutes } from 'src/hooks';
import { authStateAtom, authStatusAtom, checkAuthStateAtom } from 'src/store/atoms/auth';

type TAuthRoute = {
  children: ReactNode;
};

const AuthenticatedAccess: FC<TAuthRoute> = ({ children }) => {
  const authState = useAtomValue(authStateAtom);
  const checkAuthState = useSetAtom(checkAuthStateAtom);
  const { isAuthenticated } = useAtomValue(authStatusAtom);
  const { UNAUTHORIZED } = useLocalizedRoutes();

  const remountAbortController = useRef(new AbortController());

  useEffect(() => {
    remountAbortController.current = new AbortController();
    return () => remountAbortController.current.abort();
  }, []);

  useEffect(() => {
    if (authState.status === 'idle') {
      checkAuthState({ signal: remountAbortController.current.signal });
    }
  }, [authState.status, checkAuthState]);

  // uncomment for dev, bypasses authentication
  // return children;

  if (authState.status === 'idle' || authState.status === 'loading') {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 1,
        }}
      >
        <span>Spinner...</span>
      </div>
    );
  }

  return (authState.status === 'success' || authState.status === 'error') && !isAuthenticated ? (
    <Navigate to={UNAUTHORIZED} />
  ) : (
    children
  );
};

export { AuthenticatedAccess };
