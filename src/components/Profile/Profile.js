import React from 'react'; 
import { withFirebase } from '../../Firebase/index';
import { AuthUserContext } from '../Session';

const Profile = () => (
  <AuthUserContext.Consumer>
    {authUser => {
    return <ProfilePage user={authUser}/>}}
  </AuthUserContext.Consumer>
);

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
    console.log('user', this.props.user)
      return (
          <div>
            <h1>Profile page</h1>
            <p>Name: {this.props.user.displayName}</p>
            <p>Email: {this.props.user.email}</p>
          </div>
      );
  }
}

export default withFirebase(Profile);
