import React, { useEffect, useContext, useState } from 'react';
import Paper from '@mui/material/Paper';

import SignOut from './components/SignOut/SignOut';
import SignIn from './components/SignIn/SignIn';
import './Profile.css';
import JumpalSpinner from '../../components/JumpalSpinner';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from '../../Firebase';

function ProfilePage() {
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [firebase]);

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user != null) {
      return (
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
        </div>
      );
    } else {
      return <SignIn />;
    }
  }
}

export default ProfilePage;
