/**
 * Even though timeout is triggered by abort controller, it is not an abort error.
 * It should be treated as a normal error.
 */
export class TimeoutError extends Error {
  constructor() {
    super('Request timeout');
    this.name = 'TimeoutError';
  }
}
