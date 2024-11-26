export type TGetJwt =
  | {
      forceRefresh: true;
      forceReasonJwt: string;
    }
  | {
      forceRefresh?: boolean;
      forceReasonJwt?: never;
    };
