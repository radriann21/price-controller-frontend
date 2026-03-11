/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";

interface UseSSEOptions<T> {
  url: string;
  enabled?: boolean;
  onMessage?: (data: T) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
}

export function useSSE<T = unknown>({
  url,
  enabled = true,
  onMessage,
  onError,
  onOpen,
}: UseSSEOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource(url, { withCredentials: true });
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
      onOpen?.();
    }

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data) as T;
        setData(parsedData);
        onMessage?.(parsedData);
      } catch (err) {
        console.error('Error parsing SSE message:', err);
      }
    }

    eventSource.onerror = (err) => {
      setIsConnected(false);
      setError(new Error('SSE Connection error'));
      onError?.(err);
      eventSource.close();
    }

    return () => {
      eventSource.close();
      setIsConnected(false);
    }
  }, [enabled, url])

  const close = () => {
    eventSourceRef.current?.close();
    setIsConnected(false);
  }

  return { data, error, isConnected, close };
}

