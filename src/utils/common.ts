export const safeFunction = (fn: Function): boolean =>
  fn && typeof fn === 'function';
