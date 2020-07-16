import React from 'react'; 
import { withFirebase } from '../../Firebase/index';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './SignIn.css';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInGoogle />
  </div>
);

class SignInGoogleBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
 
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        console.log('socialAuthUser', socialAuthUser);
        if (!this.props.firebase.database.ref('users').child(socialAuthUser.user.uid)) {
          // Create a user in your Firebase Realtime Database too
          return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          });
        }
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push('/Home');
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
 
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" className="signin-button"><i className="fa fa-google"></i>Sign In with Google</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInPage;
export { SignInGoogle };