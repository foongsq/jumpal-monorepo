import React from 'react'; 
import { withFirebase } from '../../Firebase/index';
import { AuthUserContext } from '../Session';

// const Profile = () => (
//   <AuthUserContext.Consumer>
//     {authUser => {
//     return <ProfilePage user={authUser}/>}}
//   </AuthUserContext.Consumer>
// );

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
          <div>
            <h1>Profile page</h1>
            <img src={this.props.firebase.auth.currentUser.photoURL} />
            <p>Name: {this.props.firebase.auth.currentUser.displayName}</p>
            <p>Email: {this.props.firebase.auth.currentUser.email}</p>
          </div>
      );
    } else {
      return (<p>Waiting for profile data...</p>)
    }
  }
}

export default withFirebase(ProfilePage);
