import { FaPlug } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { RootState } from '../../../../shared/store/store';

function ChatHeader({ status }: { status: string }) {
  const username = useSelector(
    (state: RootState) => state.user.userData?.username,
  );
  return (
    <div className="pb-4 flex gap-x-8">
      <h1>
        Status:{' '}
        <FaPlug
          className={twMerge(
            'inline-block',
            status === 'connected' ? 'text-green-500' : 'text-red-500',
          )}
        ></FaPlug>
      </h1>
      <h2>Username: {username}</h2>
    </div>
  );
}

export default ChatHeader;
