import { useSelector } from 'react-redux';

import { RootState } from '../../../../store/store';

function ChatBody() {
  const messages = useSelector((state: RootState) => state.chat.messages ?? []);
  return (
    <div className="bg-white dark:bg-gray-600 rounded-sm p-5 flex-4 w-full">
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
