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
    <div className="flex justify-between items-center p-5">
      <input
        className="p-3 rounded-md flex-1 h-12"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Enter message"
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}

export default ChatInput;
