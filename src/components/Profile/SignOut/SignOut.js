import { useContext } from 'react';
import { FirebaseContext } from '../../../Firebase/index';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';
import { JumpalButton } from '../../CustomComponents/core';

function SignOutButton() {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  return (
    <JumpalButton onClick={() => firebase.doSignOut().then(() => navigate('/Home'))}>
      <i id='signOutIcon' className="fa fa-sign-out" aria-hidden="true"></i>
      Sign Out
    </JumpalButton>
  );
}
 
export default SignOutButton;