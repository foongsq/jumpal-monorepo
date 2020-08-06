import React from 'react'; 
import { withFirebase } from '../../Firebase/index';
import SignOut from '../SignOut/SignOut';
import SignIn from '../SignIn/SignIn';
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
          <div className="profile-container">
            <img className="profile-pic" src={this.props.firebase.auth.currentUser.photoURL} />
            <p className="name">{this.props.firebase.auth.currentUser.displayName}</p>
            <p>Email: {this.props.firebase.auth.currentUser.email}</p>
            <SignOut />
          </div>
      );
    } else {
      return <SignIn />
    }
  }
}

export default withFirebase(ProfilePage);
