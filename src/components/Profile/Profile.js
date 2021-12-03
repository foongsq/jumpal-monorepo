import React from 'react'; 
import { Paper } from '@material-ui/core';
import { withFirebase } from '../../Firebase/index';
import SignOut from './SignOut/SignOut';
import SignIn from './SignIn/SignIn';
import './Profile.css';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      authUser: null,
      name: null,
      email: null 
    }
  }

  render() {
    console.log('user', this.props.firebase.auth.currentUser)
    if(this.props.firebase.auth.currentUser) {
      return (
          <div className='componentContentDiv' id='profileContainer'>
            <Paper elevation={10} id='profileContainer'>
            <img 
              className='profilePic' 
              src={this.props.firebase.auth.currentUser.photoURL} 
              alt='Profile' 
            />
            <p className='nameDisplay'>{this.props.firebase.auth.currentUser.displayName}</p>
            <div className='emailDisplay'>
              <p className='emailLabel'>Email:</p>
              <p className='emailValue'>{this.props.firebase.auth.currentUser.email}</p>
            </div>  
            <SignOut />
            </Paper>
          </div>
      );
    } else {
      return <SignIn />
    }
  }
}

export default withFirebase(ProfilePage);
