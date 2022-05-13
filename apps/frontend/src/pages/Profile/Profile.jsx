import React from 'react';
import Paper from '@mui/material/Paper';
import SignOut from './components/SignOut/SignOut';
import SignIn from './components/SignIn/SignIn';
import './Profile.css';
import { JumpalSpinnerWrapper } from '../../components';
import { useAuth } from '../../hooks';

function ProfilePage() {
  const [user, loading] = useAuth();

  return (
    <JumpalSpinnerWrapper loading={loading}>
      {user ?
        <div className='componentContentDiv' id='profileOuterContainer'>
          <Paper elevation={10} id='profileInnerContainer'>
            <img
              className='profilePic'
              src={user.photoURL}
              alt='Profile'
            />
            <p className='nameDisplay'>{user.displayName}</p>
            <div className='emailDisplay'>
              <p className='emailLabel'>Email:</p>
              <p className='emailValue'>{user.email}</p>
            </div>
            <SignOut />
          </Paper>
        </div> :
      <SignIn />}
    </JumpalSpinnerWrapper>
  );
}

export default ProfilePage;
