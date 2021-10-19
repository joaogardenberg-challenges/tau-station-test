import { useRef, useEffect, EffectCallback, DependencyList } from 'react'

export default function useDidUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList | undefined
) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      return effect()
    } else {
      didMountRef.current = true
    }
  }, deps)
}
