import React, { useEffect, useState } from 'react';
import Page from '../../components/layout/page';
import Button from '../../components/buttons';

function Chat() {
    const [ws, setWs] = useState<any>(null);
    const [messages, setMessages] = useState<any>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Create WebSocket connection.
        const websocket = new WebSocket('wss://be-test-mongo-express.azurewebsites.net');

        // Connection opened
        websocket.onopen = (event) => {
            console.log('Connected to WebSocket');
        };

        // Listen for messages
        websocket.onmessage = (event) => {
            const message = event.data;
            setMessages((prevMessages: any) => [...prevMessages, message]);
        };

        // Handle any errors that occur.
        websocket.onerror = (error) => {
            console.error('WebSocket Error: ', error);
        };

        // Clean up on component unmount
        setWs(websocket);
        return () => {
            websocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws) {
            ws.send(input);
            setInput('');
        }
    };

    return (
        <Page>
            <h1>WebSocket Chat</h1>
            <ul>
                {messages.map((message: any, index: any) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input
                className='p-3 rounded-md'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter message"
            />
            <Button onClick={sendMessage}>Send</Button>
        </Page>
    );
}

export default Chat;
