import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';

function Header() {
  return (
    <div className="header">
      <div className="header__logo me-4">Neto Social</div>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route component={UserProfile} />
      </Switch>
    </div>
  )
}

export default Header;
