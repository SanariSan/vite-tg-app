import type { TSynchronizerQueue } from './fifo.synchronizer.helper.type';

export class FIFOSynchronizer {
  /**
   * When multiple operations attempt to acquire the lock,
   * this queue remembers the order of operations.
   */
  private static readonly queues = new Map<string, TSynchronizerQueue>();
  private static readonly counters = new Map<string, number>();
  private static readonly maxCounts = new Map<string, number>();

  /**
   * Configures the synchronization behavior for a specific queue.
   */
  public static setup({ tag = 'default', maxCount = 1 }: { tag?: string; maxCount?: number }) {
    this.maxCounts.set(tag, maxCount);
    this.counters.set(tag, maxCount);

    if (!this.queues.has(tag)) {
      this.queues.set(tag, []);
    }
  }

  /**
   * Executes the given callback function exclusively, respecting the FIFO order of the queue.
   */
  public static async runExclusive<T>({
    tag = 'default',
    callback,
  }: {
    tag?: string;
    callback: () => T | Promise<T>;
  }): Promise<T> {
    this.ensureQueue({ tag });

    const release = await this.acquire({ tag });
    try {
      console.debug(`${tag} acquired lock | permits left: ${this.counters.get(tag) ?? 0}`);
      return await callback();
    } finally {
      release();
    }
  }

  /**
   * Attempts to acquire a lock on the specified queue.
   * If the queue's maxCount allows, the lock is granted immediately.
   * Otherwise, the request is queued and processed in FIFO order.
   */
  private static async acquire({ tag }: { tag: string }): Promise<() => void> {
    return new Promise((resolve) => {
      this.queues.get(tag)!.push({ resolve });
      this.dispatch({ tag });
    });
  }

  /**
   * Processes the next operation in the queue, granting access if there are available permits.
   */
  private static dispatch({ tag }: { tag: string }): void {
    const availableCount = this.counters.get(tag) ?? 0;

    // If no permits are available, exit the function.
    if (availableCount <= 0) return;

    const nextEntry = this.queues.get(tag)?.shift();
    if (!nextEntry) return;

    // Decrement the available permits and grant access to the next queued operation.
    this.counters.set(tag, availableCount - 1);
    nextEntry.resolve(this.buildRelease({ tag }));
  }

  /**
   * Creates a release function for the given queue.
   * This function, when called, will release the lock and allow the next operation in the queue to proceed.
   */
  private static buildRelease({ tag }: { tag: string }): () => void {
    return () => {
      // Increment the permit count, making the resource available for the next operation.
      this.counters.set(tag, (this.counters.get(tag) ?? 0) + 1);
      console.debug(`${tag} released lock | permits left: ${this.counters.get(tag) ?? 0}`);
      this.dispatch({ tag });
    };
  }

  /**
   * Ensures that the queue and its associated counters are initialized.
   * If the queue or counters don't exist for the given tag, they are created and initialized.
   */
  private static ensureQueue({ tag }: { tag: string }) {
    if (!this.queues.has(tag)) {
      this.queues.set(tag, []);
    }
    if (!this.counters.has(tag)) {
      if (!this.maxCounts.has(tag)) {
        this.maxCounts.set(tag, 1);
      }

      const maxCount = this.maxCounts.get(tag) ?? 1;
      this.counters.set(tag, maxCount);
    }
  }

  /**
   * Periodically cleans up empty queues to free up memory.
   * Queues and their associated counters and maxCounts are removed if they are no longer in use.
   */
  public static cleanup() {
    this.queues.forEach((queue, tag) => {
      if (queue.length === 0) {
        this.queues.delete(tag);
        this.counters.delete(tag);
        this.maxCounts.delete(tag);
      }
    });
  }
}

setInterval(() => {
  FIFOSynchronizer.cleanup();
}, 60_000);
