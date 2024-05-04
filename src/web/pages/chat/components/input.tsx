import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import Button from '../../../components/buttons';

function ChatInput({ sendMessage }: any) {
  const state = useSelector((state: RootState) => state.user.userData);
  const [input, setInput] = useState('');

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  const handleSend = () => {
    if (input) {
      sendMessage({
        type: 'chat-message-send',
        username: state?.username ?? state?.email ?? 'anonymous',
        content: input,
      });
      setInput('');
    }
  };

  return (
    <div className="flex justify-between items-center gap-x-3">
      <input
        className="p-3 rounded-sm flex-4 w-full h-12 dark:bg-gray-600"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Enter message"
      />
      <Button className="flex-1" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
}

export default ChatInput;
