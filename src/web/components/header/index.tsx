import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBarsStaggered } from 'react-icons/fa6';
import { getAuth } from 'firebase/auth';

import { clearUser } from '../../../store/reducers/users';
import logo from './images/logo.png';
import LoginForm from '../login';

const Menu = () => {
  return (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/todos">Todos</a>
      </li>
      <li>
        <a href="/chat">Chat</a>
      </li>
    </>
  );
};
const Header = () => {
  const state = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    getAuth()
      .signOut()
      .then(() => {
        dispatch(clearUser());
      });
  };

  return (
    <header className="w-full bg-white flex justify-between h-24 items-center p-5">
      <div
        className="text-xl font-medium text-black flex items-center gap-x-3 cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          height={70}
          width={70}
        />
        The Testing Ground
      </div>
      <nav className="hidden sm:block">
        <ul className="flex gap-x-3">
          <Menu />

          {state?.email ? (
            <>
              <li>
                <a className="cursor-pointer" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <div
                className="cursor-pointer"
                onClick={() => setShowLogin((prev) => !prev)}
              >
                Login
              </div>
            </li>
          )}
        </ul>
      </nav>
      <div
        className="sm:hidden w-16 h-16 flex justify-center items-center cursor-pointer"
        onClick={() => setShowMenu(true)}
      >
        <FaBarsStaggered />
      </div>
      {showMenu && (
        <div
          className="absolute w-full h-full bg-black bg-opacity-50 top-0 left-0"
          onClick={() => setShowMenu(false)}
        >
          <div className="absolute w-3/5 z-20 bg-white top-0 bottom-0 right-0 p-10">
            <ul className="flex flex-col gap-y-7">
              <Menu />
              <li>
                {state?.email ? (
                  <a href="/profile">Profile</a>
                ) : (
                  <a href="/login">Login</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      {showLogin && (
        <div className="absolute shadow-md z-20 bg-white top-20 right-0">
          <LoginForm
            onLoginSuccess={() => setShowLogin(false)}
            setError={() => console.log('error handling needed!')}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
