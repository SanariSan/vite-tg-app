type Falsy = false | null | undefined | 0 | '';

export type StripFalsy<T> = T extends Falsy ? never : T;

/**
 * Allows to build union of numbers from 0 to N-1 by providing N.
 * Currently used for creating a union of indexes of a known length array.
 */
export type BuildRange<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : BuildRange<N, [...Acc, Acc['length']]>;
