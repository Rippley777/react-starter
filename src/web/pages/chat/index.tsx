import { useState } from 'react';
import { useSelector } from 'react-redux';

import Page from '../../components/layout/page';
import Button from '../../components/buttons';
import useWebSocket from '../../../hooks/useWebSocket';

import { SiAzuredevops, SiExpress, SiMongodb } from 'react-icons/si';

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
      <div className="flex flex-col items-center justify-center h-full">
        <div className="pb-10 text-center">
          <div>Welcome to Chat!</div>
          <div>
            This page is powered by websockets over a Mongo{' '}
            <SiMongodb className="inline text-green-400" /> Express{' '}
            <SiExpress className="inline text-blue-700" /> backend hosted on
            Azure <SiAzuredevops className="inline text-blue-400" />
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="bg-white p-5 flex-1">
            <h1>Status: {status}</h1>
            <h2>User: {username}</h2>
            {messages
              .filter((m, i) => m !== messages[i - 1])
              .map((message: any, index: any) => (
                <div key={index}>{message}</div>
              ))}
          </div>
          <div className="flex justify-between items-center p-5">
            <input
              className="p-3 rounded-md flex-1 h-12"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter message"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Chat;
