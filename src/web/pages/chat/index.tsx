import { useState } from 'react';
import { useSelector } from 'react-redux';

import Page from '../../components/layout/page';
import Button from '../../components/buttons';
import useWebSocket from '../../../hooks/useWebSocket';

function Chat() {
  const state = useSelector((state: any) => state.user.userData);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useWebSocket(
    'wss://be-test-mongo-express.azurewebsites.net',
  );
  const username = state.email ?? 'anonymous';

  const handleSend = () => {
    if (input) {
      sendMessage(`${username}: ${input}`);
      setInput('');
    }
  };

  return (
    <Page>
      <h1>Status: {status}</h1>
      <h2>User: {username}</h2>
      <ul>
        {messages.map((message: any, index: any) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        className="p-3 rounded-md"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter message"
      />
      <Button onClick={handleSend}>Send</Button>
    </Page>
  );
}

export default Chat;
