import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth/firebase-config';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import Home from './web/pages/home';
import About from './web/pages/About';
import Todos from './web/pages/todos';
import Chat from './web/pages/chat';
import Login from './web/pages/user/login';
import SignUp from './web/pages/user/signup';
import Profile from './web/pages/user/profile';
import ImageUploader from './web/components/uploader/image';
import CreateBlog from './web/pages/blog/create';

// move this to pages
import Images from './web/components/viewer/images';
import VideoChat from './web/components/viewer/live';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged in:', user);
      } else {
        console.log('No user logged in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/images" element={<Images />} />
              <Route path="/uploader/image" element={<ImageUploader />} />
              <Route path="/blog/new" element={<CreateBlog />} />
              <Route path="/videochat" element={<VideoChat />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
