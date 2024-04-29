import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBarsStaggered } from 'react-icons/fa6';
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
const TestComponent = () => {
  const state = useSelector((state: any) => state.user.userData);

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <header className="w-full bg-white flex justify-between h-24 items-center p-5">
      <div className="text-xl font-medium text-black">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          height={70}
          width={70}
        />
      </div>
      <nav className="hidden sm:block">
        <ul className="flex gap-x-3">
          <Menu />
          <li>
            {state.email ? (
              <a className="cursor-pointer" href="/profile">
                Profile
              </a>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => setShowLogin((prev) => !prev)}
              >
                Login
              </div>
            )}
          </li>
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
                {state.email ? (
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
        <div className="absolute z-20 bg-white top-20 right-0">
          <LoginForm setError={() => console.log('error handling needed!')} />
        </div>
      )}
    </header>
  );
};

export default TestComponent;
