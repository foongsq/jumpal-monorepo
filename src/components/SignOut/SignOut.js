import React from 'react';
import { withFirebase } from '../../Firebase/index';
import { useHistory } from 'react-router-dom';
import './SignOut.css';

function SignOutButton({ firebase }){
  const history = useHistory();
  return (
  <button className="signout-button" type="button" onClick={() => firebase.doSignOut().then(() => history.push('/Home'))}>
    Sign Out
  </button>
);
  }
 
export default withFirebase(SignOutButton);