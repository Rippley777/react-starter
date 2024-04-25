import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { signIn } from '../../../../auth/authService';
import { setUserData } from '../../../../store/reducers/users';
import Page from '../../../components/layout/page';
import Input from '../../../components/form/input';
import Button from '../../../components/buttons';

const LoginForm = () => {
  // const store = useContext(StoreContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signIn(values.email, values.password);
      //   dispatch(setUserData({ email: values.email }));
      dispatch(setUserData({ email: values.email, ...userCredential }));

      window.location.href = '/profile';
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <Page>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-gray-400 text-sm">Login with Email</h1>

        {error && (
          <p>
            {error} <a href="/signup">click here to sign up</a>
          </p>
        )}
        <section className="w-48">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Password" />
              )}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <Button type="submit">Login</Button>
          </form>
        </section>
      </div>
    </Page>
  );
};

export default LoginForm;
