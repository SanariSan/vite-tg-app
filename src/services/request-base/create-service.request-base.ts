import type {
  TProcessedResponse,
  TServiceConfig,
  TServiceOptions,
} from './create-service.request-base.type';
import { parseResponse, privateRequest, request } from './request-base.services';
import type { IRequestOptions } from './request-base.services.type';

export function createService<TReq = void, TRes = void, TErr = void>(
  requestBaseOptions: Omit<IRequestOptions, 'body' | 'query' | 'signal'>,
  config?: TServiceConfig<TReq, TRes, TErr>,
) {
  const defaultError = {
    reqResValidationError: null,
    errorResponse: { data: null, validationError: null, raw: null },
    systemError: null,
  };

  return async (
    requestOptions?: TServiceOptions<TReq>,
  ): Promise<TProcessedResponse<TRes, TErr>> => {
    if (config?.requestSchema && requestOptions?.data) {
      const validated = config.requestSchema.safeParse(requestOptions.data);
      if (!validated.success) {
        return {
          data: null,
          headers: new Headers(),
          error: { ...defaultError, reqResValidationError: validated.error },
        };
      }
    }

    try {
      const defaultRequestOptions: IRequestOptions = {
        ...requestBaseOptions,
        ...requestOptions,
        headers: { ...requestBaseOptions.headers, ...requestOptions?.headers },
        body: requestOptions?.data ? JSON.stringify(requestOptions.data) : undefined,
        signal: requestOptions?.signal,
      };

      const response = await (config?.isPrivate ? privateRequest : request)(defaultRequestOptions);
      const responseData = await parseResponse(response);

      if (response.ok) {
        if (!config?.responseSchema || !responseData) {
          return { data: responseData as TRes, headers: response.headers, error: null };
        }

        const validated = config.responseSchema.safeParse(responseData);
        if (validated.success) {
          return { data: validated.data, headers: response.headers, error: null };
        }

        return {
          data: null,
          headers: response.headers,
          error: { ...defaultError, reqResValidationError: validated.error },
        };
      }

      const parsedError = responseData && config?.errorSchema?.safeParse(responseData);
      return {
        data: null,
        headers: response.headers,
        error: {
          ...defaultError,
          errorResponse: {
            data: parsedError?.success ? parsedError.data : null,
            validationError: parsedError?.success ? null : parsedError?.error ?? null,
            raw: responseData,
          },
        },
      };
    } catch (error) {
      return {
        data: null,
        headers: new Headers(),
        error: { ...defaultError, systemError: error as Error },
      };
    }
  };
}
