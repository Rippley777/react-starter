import React, { useEffect, useState } from 'react';

type UserListProps = {
  messages: any[];
};

const UserList: React.FC<UserListProps> = ({ messages }) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      try {
        const message = JSON.parse(messages[i]);
        if (message.type === 'user-list') {
          setUserList(message.users);
          break; // Exit the loop once the last user-list is found
        }
      } catch (e) {
        // Ignore errors that result from parsing non-JSON strings
      }
    }
  }, [messages]);
  console.log({ userList, messages });

  const getUserTag = (user: any) => {
    const username = user;

    if (username.substring(0, 4) === 'User') {
      return username.slice(0, 9).replace('User', 'Anon_');
    }

    return username;
  };
  return (
    <div>
      {userList.map((user) => (
        <div>{getUserTag(user?.[1])}</div>
      ))}
    </div>
  );
};

export default UserList;
