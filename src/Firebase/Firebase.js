import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
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
  doSignInWithGoogle = () => signInWithPopup(this.auth.app, this.googleProvider);

  doSignOut = () => signOut(this.auth);

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

  // Speed records ref
  get speedRecords() {
    return child(this.user, 'speed-records');
  } 
}