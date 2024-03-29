import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { selectUser } from './features/userSlice';
import { login, logout } from './features/userSlice';
import { auth } from './firebase';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Login from './Login';
import Widgets from './Widgets';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL,
        }))
      } else {
        // user is logged out
        dispatch(logout());
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      {!user ? (<Login />
      ) : (
        <div className='app__body'>
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
