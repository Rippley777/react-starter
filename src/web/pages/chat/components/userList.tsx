import { useSelector } from 'react-redux';
import { FaDoorClosed } from 'react-icons/fa6';

import { RootState } from '../../../../shared/store/store';

const UserList: React.FC = () => {
  const userList = useSelector(
    (state: RootState) => state.chat.connectedUsers ?? [],
  );
  const disconnectedUserList = useSelector(
    (state: RootState) => state.chat.disconnectedUsers ?? [],
  );

  return (
    <div className="flex-1">
      {userList.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
      {disconnectedUserList.length > 0 && (
        <div className="text-gray-500">
          <h2 className="pt-4">Recently Offline:</h2>

          {disconnectedUserList.map((user) => (
            <div key={user.id}>
              <FaDoorClosed className="inline-block" /> {user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
