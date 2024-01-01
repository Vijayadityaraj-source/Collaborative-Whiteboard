import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Main from './Main';
import { useAuth } from '../utils/firebase';
import Signout from './Signout';
import Profile from './Profile';
import { getRoomIdFromUrl } from '../utils/roomids';

function App() {
  console.log('App');
  const user = useAuth();
  const roomid=getRoomIdFromUrl();
  const [roomParam, setRoomParam] = useState('');

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const roomId = params.get('room');
      setRoomParam(roomId || '');
  }, []);

  return (
    roomid ? 

    <Router>
      <Routes>
        <Route
          path="/*"
          element={<Navigate to={user ? '/' : '/signin'} replace={true}/>}
        />
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/signout"
          element={<Signout />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </Router>

    :

    <Router>
      <Routes>
      <Route
          path="/*"
          element={<Navigate to={user ? '/' : '/signin'}/>}
        />
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
