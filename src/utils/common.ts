export const safeArray = <T = any>(array: T[]): T[] =>
  array && Array.isArray(array) ? array : [];

export const isZeroArray = <T = any>(array: T[]): boolean =>
  Array.isArray(array) && array.length === 0;

export const safeVal = (val: any): boolean => val !== undefined && val !== null;

export function compact<T extends Record<any, any>>(object: T) {
  let clone = Object.assign({}, object);
  for (let key in clone) {
    if (clone[key] === undefined) delete clone[key];
  }
  return clone;
}

export function omit<T extends Record<any, any>>(
  object: T,
  keysToOmit: string[] = []
) {
  let clone = Object.assign({}, object) as T;
  for (let key of keysToOmit) {
    if (key in clone) delete clone[key];
  }
  return clone;
}

export const safeVoid = <T = void>(func: (...args: any[]) => T): boolean => {
  return !!(func && typeof func === "function");
};
