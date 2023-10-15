import { useState, useEffect, useRef } from "react"

export function useDebouncedValue(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Update state to the passed in value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      // If our value changes (or the component unmounts), React will
      // run this cleanup function to cancel the state update.
      clearTimeout(handler)
    }
    // These are the dependencies, if the value or the delay amount
    // changes, then cancel any existing timeout and start waiting again
  }, [value, delay])

  return debouncedValue
}

export function useDebouncedEffect(effectFn: any, value: any, delay = 350) {
  const effectRef = useRef(effectFn)
  const updatedValue = useDebouncedValue(value, delay)
  useEffect(() => {
    effectRef.current = effectFn
  }, [effectFn])
  useEffect(() => {
    if (effectRef.current) {
      return effectRef.current(updatedValue)
    }
    return undefined
  }, [updatedValue])
}
