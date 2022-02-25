import React, { useContext } from 'react';
import { FirebaseContext } from '../../../Firebase/index';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import JumpalButton from '../../Custom/JumpalButton';
import LogoutIcon from '@mui/icons-material/Logout';

function SignOutButton() {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  return (
    <JumpalButton onClick={() =>
      signOut(firebase.auth).then(() => navigate('/'))
    }>
      <LogoutIcon color="action" />
      Sign Out
    </JumpalButton>
  );
}

export default SignOutButton;
