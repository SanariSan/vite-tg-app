import {
  HASH_KEYS,
  PLAIN_KEYS,
  QUERY_KEYS,
  type THashKey,
  type TPlainKey,
  type TQueryKey,
} from './local-storage.helper.const';

export class LocalStorageHelper {
  // Hash methods
  public static getHashItem(key: THashKey): string | null {
    return window.localStorage.getItem(`#${key}`);
  }

  public static setHashItem(key: THashKey, value: unknown): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(`#${key}`, stringValue);
  }

  public static removeHashItem(key: THashKey): void {
    window.localStorage.removeItem(`#${key}`);
  }

  // Query methods
  public static getQueryItem(key: TQueryKey): string | null {
    return window.localStorage.getItem(`?${key}`);
  }

  public static setQueryItem(key: TQueryKey, value: unknown): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(`?${key}`, stringValue);
  }

  public static removeQueryItem(key: TQueryKey): void {
    window.localStorage.removeItem(`?${key}`);
  }

  // Plain methods (no prefix)
  public static getPlainItem(key: TPlainKey): string | null {
    return window.localStorage.getItem(key);
  }

  public static setPlainItem(key: TPlainKey, value: unknown): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, stringValue);
  }

  public static removePlainItem(key: TPlainKey): void {
    window.localStorage.removeItem(key);
  }

  // Type checking helpers
  public static isHashKey(key: string): key is THashKey {
    return HASH_KEYS.includes(key as THashKey);
  }

  public static isQueryKey(key: string): key is TQueryKey {
    return QUERY_KEYS.includes(key as TQueryKey);
  }

  public static isPlainKey(key: string): key is TPlainKey {
    return PLAIN_KEYS.includes(key as TPlainKey);
  }
}
