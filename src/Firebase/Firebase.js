import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import config from "./config";

export default class Firebase {
    constructor(props) {
      firebase.initializeApp(config);
   
      this.auth = firebase.auth();
      this.db = firebase.database();
   
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
    }
   
    // *** Auth API ***
    doSignInWithGoogle = () =>
      this.auth.signInWithPopup(this.googleProvider);
   
    doSignOut = () => this.auth.signOut();

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}