import fetch from 'cross-fetch';
import { isNotNullish, sleep } from 'src/helpers';
import { AuthHandler } from '../auth-handler';
import { AbortError, ExternalAbortError, TimeoutError, isAbortLikeError } from '../errors';
import { DEFAULT_FETCH_HEADERS, DEFAULT_FETCH_OPTIONS } from './request-base.services.const';
import type { IRequestOptions } from './request-base.services.type';

/**
 * Challenge:
 *
 * 1) Need to listen to external abort signal
 * 2) Need to be able to abort req on timeout with local abort controller
 * * * * * * * * * * * * * * * * *
 * Solution:
 *
 * 1) Passing signal entity "externalAbortSignal" from outside (if exists and needed), otherwise dummy signal created in place
 * 2) On each iteration of loop, if "externalAbortSignal" is aborted exit immediately and throw according error
 * 3) If "externalAbortSignal" is not aborted, create "localAbortController", create timeout which aborts it,
 * and subscribe to "externalAbortSignal" to abort "localAbortController" if signal triggers.
 * Passing signal to subscribe call allows to unsubscibe from it on abortion, which is a convenient way of cleaning up.
 * 4) Perform request, cleanup "externalAbortSignal" listener by aborting "cleanupAbortController"
 */

export async function request({
  url,
  method,
  headers,
  query,
  body,
  // for manually interrupting from outside
  signal: externalAbortSignal = new AbortController().signal,
  fetchOptions,
  timeoutMS = 30_000,
  attemptDelayMS = 500,
  attemptDelayGrowthMS = 500,
  maxAttempts = 1,
}: IRequestOptions) {
  const finalUrl = query ? `${url}?${query.toString()}` : url;

  let currentAttempt = 0;
  let lastError: Error | undefined;

  while (currentAttempt < maxAttempts) {
    if (externalAbortSignal.aborted) {
      throw new ExternalAbortError();
    }

    const localAbortController = new AbortController();
    const cleanupAbortController = new AbortController();

    const timeoutId = setTimeout(() => localAbortController.abort(), timeoutMS);

    externalAbortSignal.addEventListener('abort', () => localAbortController.abort(), {
      signal: cleanupAbortController.signal,
    });

    try {
      return await fetch(finalUrl, {
        ...DEFAULT_FETCH_OPTIONS,
        ...fetchOptions,
        headers: { ...DEFAULT_FETCH_HEADERS, ...headers },
        signal: localAbortController.signal,
        method,
        body,
      });
    } catch (error) {
      // only system errors like no network, cors, etc + abort
      lastError = error as Error;

      if (isAbortLikeError(error)) {
        // if external abort triggered override error with ExternalAbortError and exit immediately
        if (externalAbortSignal.aborted) {
          throw new ExternalAbortError();
        }

        // if local abort triggered override error with TimeoutError and continue
        if (localAbortController.signal.aborted) {
          lastError = new TimeoutError();
        }
      }
    } finally {
      clearTimeout(timeoutId);
      cleanupAbortController.abort();
    }

    await sleep(attemptDelayMS + currentAttempt * attemptDelayGrowthMS);

    currentAttempt += 1;
  }

  throw lastError;
}

/**
 * Wrapper for making private api requests with jwt.
 */
export async function privateRequest<TReq, TRes, TErr>(options: IRequestOptions) {
  const defaultOptions: IRequestOptions = {
    ...options,
    headers: options.headers ?? {},
  };

  const jwt: string | undefined = await AuthHandler.getJwt();
  if (isNotNullish(jwt) && isNotNullish(defaultOptions.headers)) {
    defaultOptions.headers['Authorization'] = `Bearer ${jwt}`;
  }

  const response = await request(defaultOptions);

  if (response.status === 401) {
    const newJwt = await AuthHandler.getJwt({ forceRefresh: true, forceReasonJwt: jwt });
    if (isNotNullish(newJwt) && isNotNullish(defaultOptions.headers)) {
      defaultOptions.headers['Authorization'] = `Bearer ${newJwt}`;
    }

    return request(defaultOptions);
  }

  return response;
}

export const parseResponse = async (res: Response) => {
  try {
    if (res.headers.get('Content-Length') === '0') return null;
    if (res.headers.get('Content-Type')?.includes('application/json')) {
      return await res.clone().json();
    } else {
      return await res.clone().text();
    }
  } catch (error) {
    /**
     * If abort was called it will prevent body stream from being read by json/text calls and throw AbortError.
     * This re-throw is not necessary if isAbortLikeError guard is used in upper code, but left here for explicitness.
     */
    if (isAbortLikeError(error)) throw new AbortError(error.message);

    throw error;
  }
};
