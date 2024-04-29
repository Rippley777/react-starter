import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SiAzuredevops, SiExpress, SiMongodb } from 'react-icons/si';

import Page from '../../components/layout/page';
import Button from '../../components/buttons';
import useWebSocket from '../../../hooks/useWebSocket';
import UserList from './components/userList';
import DevToolsCustomWs from '../../components/dev/customWs';

function Chat() {
  const state = useSelector((state: any) => state.user.userData);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('anonymous');
  const [showDevTools, setShowDevTools] = useState(false);
  const { messages, sendMessage, status } = useWebSocket(
    'wss://be-test-mongo-express.azurewebsites.net',
  );

  // console.log({ state });

  useEffect(() => {
    if (username === 'anonymous' && state.email) {
      setUsername(state.name || state.email.split('@')[0]);
    }
  }, [state, username, sendMessage]);

  useEffect(() => {
    // console.log({ username });

    sendMessage({ type: 'set-username', username });
  }, [username, sendMessage]);

  const handleSend = () => {
    if (input) {
      sendMessage({ type: 'chat-message-send', username, content: input });
      setInput('');
    }
  };
  // console.log({ messages });

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
          <div className="flex gap-x-3 h-full">
            <div className="bg-white p-5 flex-1">
              <h1>Status: {status}</h1>
              <h2>User: {username}</h2>
              {messages
                .filter((m: any) => JSON.parse(m).type === 'chat-message')
                .map((message: any, index: any) => (
                  <div key={index}>{JSON.parse(message).message}</div>
                ))}
            </div>
            <div className="flex-[.3]">
              <UserList messages={messages} />
            </div>
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
        <Button onClick={() => setShowDevTools((prev) => !prev)}>
          Show Dev Tools
        </Button>
      </div>
      {showDevTools && (
        <div>
          <DevToolsCustomWs />
        </div>
      )}
    </Page>
  );
}

export default Chat;
