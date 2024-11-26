import { AbortError } from './abort.error';

export const isAbortLikeError = (error: unknown): error is AbortError =>
  error instanceof AbortError || (error instanceof DOMException && error.name === 'AbortError');
