import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';
import { JumpalButton } from '../../CustomComponents/core';

function SignOutButton({ firebase }){
  const navigate = useNavigate();
  return (
  <JumpalButton onClick={() => firebase.doSignOut().then(() => navigate('/Home'))}>
    <i id='signOutIcon' className="fa fa-sign-out" aria-hidden="true"></i>
    Sign Out
  </JumpalButton>
);
  }
 
export default withFirebase(SignOutButton);