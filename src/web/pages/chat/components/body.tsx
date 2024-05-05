import { useSelector } from 'react-redux';

import { RootState } from '../../../../shared/store/store';

function ChatBody() {
  const messages = useSelector((state: RootState) => state.chat.messages ?? []);
  return (
    <div className="col-span-3 bg-white dark:bg-gray-600 rounded-sm p-5 w-full">
      {messages.map(
        (
          { type, serverTimestamp, userChatId, messageId, username, message },
          index,
        ) => {
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
