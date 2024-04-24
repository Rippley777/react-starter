import { useState, useEffect, useCallback } from 'react';

// Define a type for the message handling function
type SendMessageFunction = (message: string) => void;

// Define the shape of the hook's return value
interface WebSocketHook {
  socket: WebSocket | null;
  messages: string[];
  status: string;
  sendMessage: SendMessageFunction;
}

function useWebSocket(url: string): WebSocketHook {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('disconnected');

  useEffect(() => {
    // Create WebSocket connection.
    const ws = new WebSocket(url);

    // Connection opened
    ws.onopen = () => {
      setStatus('connected');
    };

    // Listen for messages
    ws.onmessage = (e: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, e.data]);
    };

    // Listen for errors
    ws.onerror = (e: Event) => {
      setStatus('error');
    };

    // Connection closed
    ws.onclose = (e: CloseEvent) => {
      setStatus('disconnected');
    };

    // Set WebSocket in state
    setSocket(ws);

    // Cleanup function
    return () => {
      ws.close();
    };
  }, [url]);

  // Function to send messages
  const sendMessage: SendMessageFunction = useCallback(
    (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    },
    [socket],
  );

  return { socket, messages, status, sendMessage };
}

export default useWebSocket;
