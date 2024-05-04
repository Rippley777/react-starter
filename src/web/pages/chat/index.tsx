import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import useWebSocket from '../../../hooks/useWebSocket';
import Page from '../../components/layout/page';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import Input from './components/input';
import UserList from './components/userList';

// import DevToolsCustomWs from './DevToolsCustomWs';

function ChatPage() {
  const userState = useSelector((state: RootState) => state.user.userData);
  const { sendMessage, status } = useWebSocket(
    process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8080',
  );

  useEffect(() => {
    if (status === 'connected') {
      sendMessage({
        type: 'set-username',
        username: userState?.username ?? userState?.email ?? 'anonymous',
      });
    }
  }, [sendMessage, status, userState]);

  return (
    <Page>
      <div className="flex flex-col h-full">
        <Header status={status} />
        <div className="w-full h-full grid grid-cols-4 gap-4">
          <Body />
          <UserList />
          <Input sendMessage={sendMessage} />
        </div>
        <Footer />
        {/* <DevToolsCustomWs /> */}
      </div>
    </Page>
  );
}

export default ChatPage;
