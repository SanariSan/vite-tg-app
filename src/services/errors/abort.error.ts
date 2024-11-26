export class AbortError extends Error {
  constructor(message?: string) {
    super('Request aborted: ' + message ? message : '');
    this.name = 'AbortError';
  }
}

export class ExternalAbortError extends AbortError {
  constructor() {
    super('Request externally aborted');
    this.name = 'ExternalAbortError';
  }
}
