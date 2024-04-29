import { useState } from 'react';
import { SiFirebase } from 'react-icons/si';
import Page from '../../../components/layout/page';
import LoginForm from '../../../components/login';

const LoginPage = () => {
  const [error, setError] = useState('');

  return (
    <Page>
      <div className="flex flex-col items-center justify-center">
        <span className="font-xl">
          Have you ever wanted to login with firebase{' '}
          <SiFirebase className="inline text-yellow-400 drop-shadow-[0_1.3px_1.3px_rgba(0,0,0,0.9)]" />{' '}
          authentication? Well now you can!
        </span>

        {error && (
          <p>
            {error}{' '}
            <a className="text-grey-700" href="/signup">
              Click here to sign up
            </a>
          </p>
        )}
        <section className="w-48 pt-20 flex flex-col items-center">
          <h1 className="text-gray-500 font-thin py-3">Login with Email</h1>
          <LoginForm setError={setError} redirectToProfile />
        </section>
      </div>
    </Page>
  );
};

export default LoginPage;
