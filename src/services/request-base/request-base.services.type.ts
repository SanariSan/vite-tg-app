type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  url: RequestInfo | string;
  method?: TRequestMethod;
  headers?: HeadersInit;
  query?: URLSearchParams;
  body?: BodyInit | null | undefined;
  fetchOptions?: RequestInit;
  timeoutMS?: number;
  attemptDelayMS?: number;
  attemptDelayGrowthMS?: number;
  maxAttempts?: number;
  signal?: AbortSignal;
}

export type { IRequestOptions, TRequestMethod };
