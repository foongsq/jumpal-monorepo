import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, child } from 'firebase/database';
import config from './config';

const firebase = initializeApp(config);

export default class Firebase {
  constructor() {
    this.auth = getAuth();
    this.db = getDatabase(firebase);
    this.googleProvider = new GoogleAuthProvider();
  }

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

  // Freestyle skill list ref
  get skillList() {
    return child(this.user, 'freestyle-skills-list');
  }

  // IG URL list ref
  get igs() {
    return child(this.user, 'freestyle-saved-insta-urls');
  }
}
