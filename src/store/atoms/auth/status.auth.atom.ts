import { atom } from 'jotai';
import { delayedPromise, sleep } from 'src/helpers';
import { authStatusService } from 'src/services/api/auth';
import { createRequestAtom } from 'src/store/create-atom';

// throttled request that will take at least 500ms to show loader properly :)
// todo: add delayedUnmount hook on protector loader to remove this
export const [authStateAtom, checkAuthStateAtom] = createRequestAtom({
  service: (...args: Parameters<typeof authStatusService>) =>
    delayedPromise(authStatusService(...args), 500),
  // service: authStatusService,
});

export const authStatusAtom = atom((get) => {
  const authState = get(authStateAtom);

  return {
    isAuthenticated: authState.status === 'success',
    isAuthenticating: authState.status === 'loading',
  };
});
