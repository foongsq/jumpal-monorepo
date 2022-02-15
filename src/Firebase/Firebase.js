import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, child } from "firebase/database";
import config from "./config";

const firebase = initializeApp(config);

export default class Firebase {
  constructor(props) {
    this.auth = getAuth();
    this.db = getDatabase(firebase);
    this.googleProvider = new GoogleAuthProvider();
  }

  // Auth API
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  // User(s) ref
  get user() {
    return ref(this.db, `users/${this.auth.currentUser.uid}`);
  }

  get users() {
    return ref(this.db, 'users');
  }

  // Personal best ref
  get personalBests() {
    return child(this.user, 'personal-bests');
  } 
}