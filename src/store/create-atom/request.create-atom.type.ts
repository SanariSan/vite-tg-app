import type { TProcessedResponse } from 'src/services/request-base';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type TRequestState<T, E> = TProcessedResponse<T, E> & {
  status: RequestStatus;
  seqNo: number;
};
