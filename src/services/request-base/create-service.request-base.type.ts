import type { z } from 'zod';

export type TProcessedResponse<T, E> = {
  data: T | null;
  headers: Headers;
  error: {
    reqResValidationError: z.ZodError | null;
    errorResponse: {
      data: E | null;
      validationError: z.ZodError | null;
      raw: unknown | null;
    };
    systemError: Error | null;
  } | null;
};

// Service creation supports most request options
export type TServiceConfig<TReq, TRes, TErr> = {
  isPrivate?: boolean;
  requestSchema?: z.ZodType<TReq>;
  responseSchema?: z.ZodType<TRes>;
  errorSchema?: z.ZodType<TErr>;
};

// Created service only supports dynamic data input
export type TServiceOptions<TReq> = TReq extends void
  ? {
      data?: TReq;
      query?: URLSearchParams;
      headers?: HeadersInit;
      signal?: AbortSignal;
    }
  : {
      data: TReq;
      query?: URLSearchParams;
      headers?: HeadersInit;
      signal?: AbortSignal;
    };

export type TService<TReq, TRes, TErr> = (
  options?: TServiceOptions<TReq>,
) => Promise<TProcessedResponse<TRes, TErr>>;
