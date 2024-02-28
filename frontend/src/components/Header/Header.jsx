import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';

function Header() {
  return (
    <div className="header">
      <div className="header__logo me-4">Neto Social</div>
      <Routes>
        <Route path="/" exact component={LoginForm} />
        <Route component={UserProfile} />
      </Routes>
    </div>
  )
}

export default Header;
