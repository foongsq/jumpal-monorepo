import React, { useState, useContext } from 'react';
import { set, child } from 'firebase/database';
import { FirebaseContext } from '../../../Firebase/index';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { JumpalButton } from '../../CustomComponents/core';

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

  const onSubmit = (event) => {
    firebase.doSignInWithGoogle()
        .then((socialAuthUser) => {
          if (!child(firebase.users, socialAuthUser.user.uid)) {
          // Create a user in your Firebase Realtime Database too
            return set(
                child(firebase.users, socialAuthUser.user.uid),
                {
                  username: socialAuthUser.additionalUserInfo.profile.name,
                  email: socialAuthUser.additionalUserInfo.profile.email,
                  roles: {},
                },
            );
          }
        })
        .then(() => {
          setError(null);
          navigate('/Home');
        })
        .catch((error) => {
          setError(error);
        });
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <JumpalButton type='submit' className='signInButton'>
        <i id='googleIcon' className="fa fa-google"></i>Sign In with Google
      </JumpalButton>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default SignInPage;
export { SignInGoogle };
