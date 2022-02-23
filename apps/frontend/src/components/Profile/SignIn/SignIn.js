import React, { useState, useContext } from 'react';
import { set, child } from 'firebase/database';
import { FirebaseContext } from '../../../Firebase/index';
import { useNavigate } from 'react-router-dom';
import { JumpalButton } from '../../CustomComponents/core';
import { signInWithPopup } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';

import './SignIn.css';

const SignInPage = () => (
  <div>
    <h1 className='signInText'>Sign In</h1>
    <div className='signInButtons'>
      <SignInGoogle />
    </div>
  </div>
);

function SignInGoogle() {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await signInWithPopup(
        firebase.auth, firebase.googleProvider);
    if (!child(firebase.users, result.user.uid)) {
      // Create a user in your Firebase Realtime Database too
      set(
          child(firebase.users, result.user.uid),
          {
            username: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            roles: {},
          },
      );
    }
    setError(null);
    navigate('/home');
  };

  return (
    <form onSubmit={onSubmit}>
      <JumpalButton type='submit' className='signInButton'>
        <GoogleIcon color="action" />Sign In with Google
      </JumpalButton>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default SignInPage;
export { SignInGoogle };
