export class JwtObtainError extends Error {
  constructor(message?: string) {
    super(`Unable to obtain jwt${message ? `:${message}` : ''}`);
    this.name = 'JwtObtainError';
  }
}
