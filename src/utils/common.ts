export const safeFunction = (fn: Function): boolean =>
  fn && typeof fn === 'function';

export const safeArray = <T = any>(array: T[]): T[] =>
  array && Array.isArray(array) ? array : [];

export const isZeroArray = <T = any>(array: T[]): boolean =>
  Array.isArray(array) && array.length === 0;
