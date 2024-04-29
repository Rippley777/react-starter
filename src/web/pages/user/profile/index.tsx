import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Page from '../../../components/layout/page';
import Button from '../../../components/buttons';
import { setUserProfileData } from '../../../../store/reducers/users';

const UserProfile = () => {
  const state = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const { email = '', name = '' } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email,
      name,
    },
  });

  useEffect(() => {
    if (!loaded && state.email) {
      reset(state);
      setLoaded(true);
    }
  }, [state, reset, setLoaded, loaded]);

  const onSubmit = async (values: { email: string; name: string }) => {
    try {
      dispatch(setUserProfileData({ ...values }));
      window.location.href = '/profile';
    } catch (error: any) {
      //   setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <Page>
      <h1>User Profile</h1>
      {state.email ? (
        <form className="flex flex-col w-72" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <input
                className="p-3 m-2 border-1 border-gray-700 border-solid rounded-md outline-none"
                placeholder="Email"
                {...field}
              />
            )}
          />
          {errors.email && <span>{errors.email.message?.toString()}</span>}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                className="p-3 m-2 border-1 border-gray-700 border-solid rounded-md outline-none"
                placeholder="Name"
                {...field}
              />
            )}
          />
          {errors.name && <span>{errors.name.message?.toString()}</span>}
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
