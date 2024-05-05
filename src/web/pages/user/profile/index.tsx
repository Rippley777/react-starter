import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { RootState } from '../../../../shared/store/store';
import Page from '../../../components/layout/page';
import Button from '../../../components/buttons';
import { setUserProfileData } from '../../../../shared/store/reducers/users';
import { updateDisplayName } from '../../../../shared/auth/utils/firebase';
import { useUpdateUsername } from '../../../../shared/api/user';
const UserProfile = () => {
  const { userData = {} } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { mutate } = useUpdateUsername();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: userData?.email ?? '',
      username: userData?.username ?? '',
    },
  });

  useEffect(() => {
    if (!loaded && userData?.email) {
      reset(userData);
      setLoaded(true);
    }
  }, [userData, reset, setLoaded, loaded]);

  const onSubmit = async (values: { email: string; username: string }) => {
    try {
      dispatch(setUserProfileData({ ...values }));
      updateDisplayName(values.username);
      if (userData?.username !== values.username) {
        mutate({
          email: values.email,
          username: values.username,
        });
      }

      //   window.location.href = '/profile';
    } catch (error: any) {
      //   setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <Page>
      <h1>User Profile</h1>
      {userData?.email ? (
        <form className="flex flex-col w-72" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <input
                className="p-3 m-2 border-1 border-gray-700 border-solid rounded-md outline-none dark:text-black"
                placeholder="Email"
                {...field}
              />
            )}
          />
          {errors.email && <span>{errors.email.message?.toString()}</span>}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                className="p-3 m-2 border-1 border-gray-700 border-solid rounded-md outline-none"
                placeholder="Username"
                {...field}
              />
            )}
          />
          {errors.username && (
            <span>{errors.username.message?.toString()}</span>
          )}
          <Button type="submit">Update</Button>
        </form>
      ) : (
        <p>
          Error! It appears you are not correctly logged in, ya dang hacker! Get
          back to the <a href="/login">Login Page!</a>
        </p>
      )}
    </Page>
  );
};

export default UserProfile;
