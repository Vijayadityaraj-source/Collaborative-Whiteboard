import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Main from './Main';
import { useAuth } from '../services/firebase';
import Signout from './Signout';
import Profile from './Profile';

function App(){
  const user = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Navigate to="/signin" />} />
        {user && (<Route path="/signin" element={<Navigate to="/main" />} />)}
        {!user && (<Route path="/main" element={<Navigate to="/signin" />} />)}
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
