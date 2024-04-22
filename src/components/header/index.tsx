import { useState } from 'react';
import logo from './images/logo.svg';
import { FaBarsStaggered } from "react-icons/fa6";

const TestComponent = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <header className="w-full bg-white flex justify-between h-24 items-center p-5">
            <div className="text-xl font-medium text-black">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <nav className='hidden sm:block'>
                <ul className="flex gap-x-3">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/todos">Todos</a></li>
                    <li><a href="/chat">Chat</a></li>
                </ul>
            </nav>
            <div className='sm:hidden w-16 h-16 flex justify-center items-center cursor-pointer' onClick={() => setShowMenu(true)}>
                <FaBarsStaggered />
            </div>
        </header>
    );
};

export default TestComponent;