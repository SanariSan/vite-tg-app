/**
 * This helper creates unbound promises, which allows to resolve/reject them from anywhere in the app.
 */
export const makeUnboundPromise = <T>() => {
  let resolve: (value: T) => void = () => {};
  let reject: (value: any) => void = () => {};
  const promise: Promise<T> = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
};
