import { useState, useEffect, useCallback } from 'react';

export interface UseIdleOptions {
  timeout?: number;
  events?: string[];
}

export function useIdle({ 
  timeout = 1000 * 60 * 15, // 15 minutes by default
  events = ['mousemove', 'mousedown', 'keypress', 'DOMMouseScroll', 'mousewheel', 'touchmove', 'MSPointerMove', 'scroll']
}: UseIdleOptions = {}): boolean {
  const [isIdle, setIsIdle] = useState(false);

  const resetTimer = useCallback(() => {
    if (isIdle) setIsIdle(false);
  }, [isIdle]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), timeout);
    };

    const handleActivity = () => {
      resetTimer();
      startTimer();
    };

    // Initialize timer
    startTimer();

    // Setup event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      // Cleanup
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [timeout, events, resetTimer]);

  return isIdle;
}
