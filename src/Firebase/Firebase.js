import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import config from "./config";

export default class Firebase {
    constructor(props) {
      const firebase = initializeApp(config);
      this.auth = getAuth();
      this.db = getDatabase(firebase);
      this.googleProvider = new GoogleAuthProvider();
    }
   
    // *** Auth API ***
    doSignInWithGoogle = () =>
      this.auth.signInWithPopup(this.googleProvider);
   
    doSignOut = () => this.auth.signOut();

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}