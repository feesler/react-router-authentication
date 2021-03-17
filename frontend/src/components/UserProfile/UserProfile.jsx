import React from 'react';
import useAuth from '../../hooks/useAuth.js';

function UserProfile() {
  const { profile, logOut } = useAuth();

  if (!profile) {
    return null;
  }

  return (
    <div className="profile">
      <div>Hello, {profile.name}</div>
      <div className="profile__avatar"><img src={profile.avatar} alt={profile.name}/></div>
      <button className="btn btn-outline-danger" type="button" onClick={logOut}>Logout</button>
    </div>
  )
}

export default UserProfile;
