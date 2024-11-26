import { LANGUAGES, type TLanguage } from 'src/i18n';
import type { StripFalsy } from './type-helpers.helper.type';

/**
 * Sanitizes a string by removing all non-numeric characters, then parseFloats result.
 * Return either parsed number or 0 in worst case.
 *
 * ```typescript
 * toNumber("q12.3as45d") // -> 12.345
 * toNumber("q12.ads") // -> 12
 * toNumber("qads.e") // -> 0
 * ```
 */
export const toNumber = (value: string) => {
  const number = Number.parseFloat(value.replace(/[^\d.-]/g, ''));
  return Number.isNaN(number) || !Number.isFinite(number) ? 0 : number;
};

/**
 * Returns the integer part of the argument which could be either number or string.
 * The return type directly based on the type of passed argument.
 *
 * ```typescript
 * getInteger(12.345) // -> 12
 * getInteger("12.345") // -> "12"
 * ```
 */
export const getInteger = <
  T extends string | number,
  TReturn extends T extends number ? number : string,
>(
  arg: T,
): TReturn => {
  if (typeof arg === 'number') return Math.floor(arg) as TReturn;
  return (arg.split('.')[0] ?? '') as TReturn;
};

/**
 * Returns the integer part of a number in string format.
 *
 * ```typescript
 * getInteger(12.345) // -> "12"
 * ```
 */
export const getIntegerString = (number: number) => String(Math.floor(number));

/**
 * Returns the fractional part of the argument which could be either number or string.
 * The return type directly based on the type of passed argument.
 *
 * ```typescript
 * getDecimal(12.345) // -> 345
 * getDecimal(12) // -> 0
 * getDecimal("12.345") // -> "345"
 * getDecimal("12") // -> "0"
 * ```
 */
export const getDecimal = <
  T extends string | number,
  TReturn extends T extends number ? number : string,
>(
  arg: T,
): TReturn => {
  if (typeof arg === 'number') return toNumber(String(arg).split('.')[1] ?? '') as TReturn;
  return (String(arg).split('.')[1] ?? '') as TReturn;
};

/**
 * Returns the fractional part of a number in string format.
 * OR empty string if number was of integer type.
 *
 * ```typescript
 * getDecimal(12.345) // -> "345"
 * getDecimal(12) // -> ""
 * ```
 */
export const getDecimalString = (number: number) => String(number).split('.')[1] ?? '';

/**
 * Cuts trailing zeros from a string, returns a string.
 * Intended for fractional number as cutting is done by performing parseFloat.
 *
 * ```typescript
 * cutTrailingZeros("0.30000000") // -> "0.3"
 * cutTrailingZeros("qwe123000") // -> "NaN"
 * ```
 */
export const cutTrailingZerosString = (value: string) => String(Number.parseFloat(value));

/**
 * Performs default toFixed on number, no specific behavior.
 */
export const toFixed = (value: number, decimals: number) => value.toFixed(decimals);

/**
 * Safely converts toNumber, then performs toFixed on number
 */
export const stringToFixed = (value: string, decimals: number) =>
  toFixed(toNumber(value), decimals);

/**
 * TypeGuard.
 * Ensures that passed value is either null or undefined.
 *
 * ```typescript
 * if (isNullish(value)) {
 *   // typesafe nullish value
 * }
 * ```
 */
export const isNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/**
 * TypeGuard.
 * Ensures that passed value is neither null nor undefined.
 *
 * ```typescript
 * if (isNotNullish(value)) {
 *   // typesafe non-nullish value
 * }
 * ```
 */
export const isNotNullish = <T extends unknown>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

/**
 * TypeGuard assertion.
 * Asserts that passed value is neither null nor undefined.
 *
 * ```typescript
 * assertNotNullish(value);
 * // Throws if value is nullish, otherwise proceeds with typesafe non-nullish value
 * ```
 */
export function assertNotNullish<T>(value: T): asserts value is NonNullable<T> {
  if (isNullish(value)) throw new Error(`Assertion failed: value is null or undefined`);
}

/**
 * TypeGuard.
 * Ensures that passed value is a truthy js value (not null, undefined, false, 0, '', NaN).
 *
 * ```typescript
 * if (isTruthy(value)) {
 *   // typesafe truthy value
 * }
 * ```
 */
export const isTruthy = <T, TReturn extends StripFalsy<T>>(value: T): value is TReturn => !!value;

/**
 * TypeGuard.
 * Ensures that passed value is a string.
 *
 * ```typescript
 * if (isString(value)) {
 *   // typesafe string value
 * }
 * ```
 */
export const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * TypeGuard.
 * Ensures that passed value is a number.
 *
 * ```typescript
 * if (isNumber(value)) {
 *   // typesafe number value
 * }
 * ```
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value);

/**
 * TypeGuard.
 * Ensures exhaustivenes of cases.
 *
 * Use in "if/else if" , "switch/case"
 *
 * ```tsx
 * const value: "a" | "b" = getValue();
 * switch (value) {
 *   // case: "a": return;
 *   case: "b": return;
 * // will warn that some case is not handled
 * default: return ensureExhaustiveness(value);
 * }
 * ```
 */
export const ensureExhaustiveness = (value: never, options?: { shouldThrow?: boolean }): never => {
  if (options?.shouldThrow) throw new Error(`Unexpected value: ${value}`);
  return undefined as never;
};

/**
 * TypeGuard.
 * Ensures that passed value is a valid language.
 *
 * ```typescript
 * if (isValidLanguage(value)) {
 *   // typesafe language value
 * }
 * ```
 */
export const isValidLanguage = (lang: any): lang is TLanguage => LANGUAGES.includes(lang);
