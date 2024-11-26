import { atom } from 'jotai';
import { isNullish } from 'src/helpers';
import type { TService, TServiceOptions } from 'src/services/request-base';
import type { TRequestState } from './request.create-atom.type';

const createInitialState = <T, E>(): TRequestState<T, E> => ({
  status: 'idle',
  headers: new Headers(),
  data: null,
  error: null,
  seqNo: 0,
});

/**
 * Current flow making it possible for such sequence to happen if action was aborted and called again quickly:
 * idle -> loading -> idle -> result/error
 * This is possible on remount or actions call spamming.
 * If this becomes a problem wrap in synchronizer.
 */
export function createRequestAtom<TReq, TRes, TErr>({
  service,
}: {
  service: TService<TReq, TRes, TErr>;
}) {
  const initialState = createInitialState<TRes, TErr>();
  const stateAtom = atom<TRequestState<TRes, TErr>>(initialState);

  const actionAtom = atom(null, (get, set, requestOptions: TServiceOptions<TReq>) => {
    const startingState = get(stateAtom);
    const seqNo = startingState.seqNo + 1;

    set(stateAtom, { ...initialState, status: 'loading', seqNo });

    service(requestOptions).then(async (result) => {
      // If operation was aborted state should be reset to starting shape
      if (requestOptions.signal?.aborted) {
        if (get(stateAtom).seqNo === startingState.seqNo) {
          console.debug('atom action was aborted, resetting state');
          set(stateAtom, { ...startingState, seqNo });
          return;
        }

        console.debug(
          'atom action was aborted, but state was modified by concurrent action, ignoring reset',
        );
        return;
      }

      // data may be null, thus checking for success using error field
      if (isNullish(result.error)) {
        set(stateAtom, {
          ...initialState,
          status: 'success',
          data: result.data,
        });
        return;
      }

      set(stateAtom, {
        ...initialState,
        status: 'error',
        data: null,
        error: {
          reqResValidationError: result.error?.reqResValidationError ?? null,
          errorResponse: result.error?.errorResponse ?? null,
          systemError: result.error?.systemError ?? null,
        },
      });
    });
  });

  return [stateAtom, actionAtom] as const;
}
