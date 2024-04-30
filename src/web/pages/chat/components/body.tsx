import { useSelector } from 'react-redux';

import { RootState } from '../../../../store/store';

function ChatBody() {
  const messages = useSelector((state: RootState) => state.chat.messages ?? []);
  return (
    <div className="bg-white p-5 flex-1">
      {messages.map(
        (
          { type, serverTimestamp, userChatId, messageId, username, message },
          index,
        ) => {
          console.log(message);
          return (
            <div key={messageId}>
              {username}: {message}
            </div>
          );
        },
      )}
    </div>
  );
}

export default ChatBody;
