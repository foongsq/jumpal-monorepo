import React from 'react'; 
import CircularProgress from '@mui/core';
import Paper from '@mui/core';

import { withFirebase } from '../../Firebase/index';
import SignOut from './SignOut/SignOut';
import SignIn from './SignIn/SignIn';
import './Profile.css';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      user: null,
      name: null,
      email: null 
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    // Get current user from firebase and save to state as user
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loading: false,
        })
      } else {
        alert("Please sign in to continue");
        this.setState({
          loading: false,
        })
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        // Render spinner while loading
        <div className='componentContentDiv'>
          <div className='loadingBox'>
            <CircularProgress color="success" />
          </div>
        </div>
      );
    } else {
      if (this.state.user != null) {
        return (
          <div className='componentContentDiv' id='profileContainer'>
            <Paper elevation={10} id='profileContainer'>
            <img 
              className='profilePic' 
              src={this.state.user.photoURL} 
              alt='Profile' 
            />
            <p className='nameDisplay'>{this.state.user.displayName}</p>
            <div className='emailDisplay'>
              <p className='emailLabel'>Email:</p>
              <p className='emailValue'>{this.state.user.email}</p>
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
}

export default withFirebase(ProfilePage);
