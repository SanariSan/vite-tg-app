export const isMaintenance = () => process.env.MAINTENANCE_MODE === 'true';
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const getRandomId = () => Math.random().toString(36).slice(2);

/**
 * Returns promise that resolves in AT LEAST passed ms period
 *
 *@example
 *<caption>Basic example</caption>
 * const request = fetch("https://example.com"); // assume it takes 250ms
 * await delayedPromise(request, 100); // resolves in 250ms
 * await delayedPromise(request, 500); // resolves in 500ms
 * const response = await request;
 */
export const delayedPromise = <T>(pendingPromise: Promise<T>, ms: number): Promise<T> =>
  Promise.allSettled([pendingPromise, sleep(ms)]).then(([result]) => {
    return result.status === 'fulfilled' ? (result.value as T) : Promise.reject(result.reason);
  });
