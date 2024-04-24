import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './auth/firebase-config';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/home';
import About from './pages/About';
import Todos from './pages/todos';
import Chat from './pages/chat';
import Login from './pages/user/login';
import SignUp from './pages/user/signup';
import Profile from './pages/user/profile';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("Logged in:", user);
      } else {
        console.log("No user logged in");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;