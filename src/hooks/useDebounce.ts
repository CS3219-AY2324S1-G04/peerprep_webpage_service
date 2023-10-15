import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

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
