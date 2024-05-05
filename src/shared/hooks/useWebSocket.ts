import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Message } from '../types';
import { updateChat } from '../store/reducers/chat';
// Define a type for the message handling function
type SendMessageFunction = (message: Message) => void;

// Define the shape of the hook's return value
interface WebSocketHook {
  socket: WebSocket | null;
  messages: Message[];
  status: string;
  sendMessage: SendMessageFunction;
}

function useWebSocket(url: string): WebSocketHook {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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
      setMessages((prevMessages) => [...prevMessages, JSON.parse(e.data)]);
      dispatch(updateChat({ ...JSON.parse(e.data) }));
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
  }, [url, dispatch]);

  // Function to send messages
  const sendMessage: SendMessageFunction = useCallback(
    (message: Message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket],
  );

  return { socket, messages, status, sendMessage };
}

export default useWebSocket;
