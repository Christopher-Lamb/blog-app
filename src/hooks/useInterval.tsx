import { useCallback, useEffect, useRef } from "react";

type CallbackFunction = () => void;

function useInterval(callback: CallbackFunction, duration: number | null) {
  const callbackRef = useRef<CallbackFunction>();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const reset = useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
    }
    if (duration !== null) {
      intervalIdRef.current = setInterval(() => callbackRef.current?.(), duration);
    }
  }, [duration]);

  // Set up the interval.
  useEffect(() => {
    reset();
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [reset]);

  return reset;
}

export default useInterval;
