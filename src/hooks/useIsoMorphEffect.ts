import React, { DependencyList, EffectCallback } from "react";

const isWindow = typeof window !== "undefined";

export default function useIsoMorphEffect(
  effect: EffectCallback,
  deps?: DependencyList | undefined
) {
  return isWindow
    ? React.useLayoutEffect(effect, deps)
    : React.useEffect(effect, deps);
}
