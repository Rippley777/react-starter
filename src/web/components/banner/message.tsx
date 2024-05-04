import React, { ReactNode } from 'react';

interface MessageProps {
  message: ReactNode;
  type: 'success' | 'info' | 'error';
}

const Message: React.FC<MessageProps> = ({ message, type }) => {
  let typeClass = '';
  switch (type) {
    case 'success':
      typeClass = 'text-green-900 border-green-600 bg-green-200';
      break;
    case 'info':
      typeClass = 'text-blue-900 border-blue-600 bg-blue-200';
      break;
    case 'error':
      typeClass = 'text-red-900 border-red-600 bg-red-200';
      break;
    default:
      typeClass = 'text-black border-black bg-gray-200';
      break;
  }
  return (
    <div
      className={`message-banner border border-solid opacity-60 p-6 my-3 rounded-md ${typeClass}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
