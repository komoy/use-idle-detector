import { renderHook } from '@testing-library/react-hooks';
import { useIdle } from './useIdle';
import { act } from 'react-test-renderer';

describe('useIdle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useIdle());
    expect(result.current).toBe(false);
  });

  it('should return true after timeout', async () => {
    const { result } = renderHook(() => useIdle({ timeout: 1000 }));

    // Initial render should be false
    expect(result.current).toBe(false);

    // Fast-forward time
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // After timeout, should be true
    expect(result.current).toBe(true);
  });

  it('should reset timer on user activity', async () => {
    const { result } = renderHook(() => useIdle({ timeout: 1000 }));

    // Initial render should be false
    expect(result.current).toBe(false);

    // Fast-forward halfway
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(false);

    // Simulate user activity
    await act(async () => {
      window.dispatchEvent(new Event('mousemove'));
      // Need to wait a tick for the event handler to complete
      jest.advanceTimersByTime(0);
    });

    // Should still be false
    expect(result.current).toBe(false);

    // Fast-forward past what would have been the original timeout
    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    // Should still be false because timer was reset
    expect(result.current).toBe(false);

    // Fast-forward to complete new timeout
    await act(async () => {
      jest.advanceTimersByTime(400);
    });

    // Now should be idle
    expect(result.current).toBe(true);
  });
});
