import { useState, useContext } from 'react'; 
import { FirebaseContext } from '../../../Firebase/index';
import { useHistory } from "react-router-dom";
import './SignIn.css';
import { JumpalButton } from '../../CustomComponents/core';

const SignInPage = () => (
  <div>
    <h1 className='signInText'>Sign In</h1>
    <div className='signInButtons'>
      <SignInGoogle />
    </div>
  </div>
);

function SignInGoogle() {
  const firebase = useContext(FirebaseContext);
  let history = useHistory();
  const [error, setError] = useState(null);
 
  const onSubmit = event => {
    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        if (!firebase.database.ref('users').child(socialAuthUser.user.uid)) {
          // Create a user in your Firebase Realtime Database too
          return firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {},
          });
        }
      })
      .then(() => {
        setError(null);
        history.push('/Home');
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };
 
  return (
    <form onSubmit={onSubmit}>
      <JumpalButton type='submit' className='signInButton'>
        <i id='googleIcon' className="fa fa-google"></i>Sign In with Google
      </JumpalButton>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default SignInPage;
export { SignInGoogle };