import React, { useContext } from 'react';
import { FirebaseContext } from '../../../../Firebase/index';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { JumpalButton } from '../../../../components';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOutButton() {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  return (
    <JumpalButton onClick={() =>
      signOut(firebase.auth).then(() => navigate('/'))
    }>
      <LogoutIcon className='icon' />
      Sign Out
    </JumpalButton>
  );
}
