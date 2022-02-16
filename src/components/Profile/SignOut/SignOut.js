import React, { useContext } from 'react';
import { FirebaseContext } from '../../../Firebase/index';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { JumpalButton } from '../../CustomComponents/core';
import './SignOut.css';

function SignOutButton() {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  return (
    <JumpalButton onClick={() =>
      signOut(firebase.auth).then(() => navigate('/'))
    }>
      <i id='signOutIcon' className="fa fa-sign-out" aria-hidden="true"></i>
      Sign Out
    </JumpalButton>
  );
}

export default SignOutButton;
