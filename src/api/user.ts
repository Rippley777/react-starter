import { useMutation, UseMutationResult } from 'react-query';
import { useDispatch } from 'react-redux';
import { setUserId } from '../store/reducers/users';

export const userApiUrl = `${process.env.REACT_APP_API_URL}/api/user`;

type UserParams = {
  email: string | null;
  username: string | null;
};

type UploadResponse = void;

type UploadError = Error;

export const useUserLogin = (): UseMutationResult<
  UploadResponse,
  UploadError,
  UserParams
> => {
  const dispatch = useDispatch();

  return useMutation(async ({ email, username }: UserParams) => {
    if (!email) {
      throw new Error('No email provided');
    }

    await fetch(userApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data?.user?._id) {
          dispatch(setUserId(data.user._id));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
};
export const useUpdateUsername = (): UseMutationResult<
  UploadResponse,
  UploadError,
  UserParams
> => {
  return useMutation(async ({ email, username }: UserParams) => {
    if (!email) {
      throw new Error('No email provided');
    }

    fetch(`${userApiUrl}/update-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        newUsername: username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
};
