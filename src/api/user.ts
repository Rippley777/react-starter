import { useMutation, UseMutationResult } from 'react-query';
import { setUserId } from '../store/reducers/users';
const apiBaseUrl =
  process.env.REACT_APP_API_URL ??
  'https://be-test-mongo-express.azurewebsites.net';
export const userApiUrl = `${apiBaseUrl}/api/user`;

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
  return useMutation(async ({ email, username }: UserParams) => {
    if (!email) {
      throw new Error('No email provided');
    }

    fetch(userApiUrl, {
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
        console.log('Success:', data);
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
      .then((data) => {
        setUserId(data.id);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
};
