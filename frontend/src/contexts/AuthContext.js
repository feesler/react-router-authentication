import { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useStorage from '../hooks/useStorage.js';

const authURL = process.env.REACT_APP_AUTH_URL;
const profileURL = process.env.REACT_APP_PROFILE_URL;

export const AuthContext = createContext(null);

export function AuthProvider(props) {
  let history = useHistory();
  const [token, setToken] = useStorage(localStorage, 'token');
  const [profile, setProfile] = useStorage(localStorage, 'profile');
  const [error, setError] = useState(null);

  /** Try to login user and obtain access token */
  const logIn = async (login, password) => {
    try {
      setError(null);

      const response = await fetch(authURL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const authResult = await response.json();
      if (!response.ok || !authResult || !authResult.token) {
        const errorMessage = (authResult && authResult.message)
          ? authResult.message
          : 'Authentication failed';

        throw new Error(errorMessage);
      }

      setToken(authResult.token);

      await readProfile();

      history.replace('/news');
    } catch (e) {
      setError(e.message);
    }
  }

  /** Remove all user access data */
  const logOut = () => {
    console.log('[Auth] logOut');
    history.replace('/');
    setToken(null);
    setProfile(null);
  }

  /* Send request with authorisation token */
  const sendRequest = async (url, opts = {}) => {
    try {
      if (!token) {
        throw new Error('Not authorised');
      }

      const defaultOpts = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await fetch(url, {
        ...defaultOpts,
        ...opts,
      });
      const data = await response.json();

      if (response.status === 401) {
        logOut();
        throw new Error('Not authorised');
      }

      if (!response.ok) {
        const errorMessage = (data && data.message)
          ? data.message
          : 'Request failed';

        throw new Error(errorMessage);
      }

      return { data };
    } catch (e) {
      return { error: e.message };
    }
  }

  /** Request user profile data */
  const readProfile = async () => {
    const result = await sendRequest(profileURL);
    if (!result.data) {
      setError((result.error) ? result.error : 'Unknown error');
      return;
    }

    setProfile(result.data);
  }

  useEffect(() => {
console.log('[Auth] useEffect');

    if (token) {
      if (!profile) {
        readProfile();
      }
    } else {
      logOut();
    }
  }, [token, profile]);

  const auth = {
    token,
    profile,
    error,
    logIn,
    logOut,
    sendRequest,
  };

console.log('[Auth] history: ', history);

  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  );
}
