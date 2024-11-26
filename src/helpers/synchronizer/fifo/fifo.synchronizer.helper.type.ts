export type TSynchronizerQueueEntry = {
  resolve: (release: () => void) => void;
};

export type TSynchronizerQueue = TSynchronizerQueueEntry[];
