import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, child } from "firebase/database";
import React from "react";

export const FirebaseContext = React.createContext(null);

// API keys for Firebase services are ok to include in code or checked-in config files.
const config = {
  apiKey: "AIzaSyB_czfEJ_qq-H58aEHgKV1YyZXc_YzmbAs",
  authDomain: "jumpal-27f91.firebaseapp.com",
  databaseURL: "https://jumpal-27f91.firebaseio.com",
  projectId: "jumpal-27f91",
  storageBucket: "jumpal-27f91.appspot.com",
  messagingSenderId: "867715616373",
  appId: "1:867715616373:web:30087c19543aeacae7b23c",
  measurementId: "G-T3DR03KQQ3",
};

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
    return ref(this.db, "users");
  }

  // Personal best ref
  get personalBests() {
    return child(this.user, "personal-bests");
  }

  // Speed records ref
  get speedRecords() {
    return child(this.user, "speed-records");
  }

  // Freestyle skill list ref
  get skillList() {
    return child(this.user, "freestyle-skills-list");
  }

  // IG URL list ref
  get mediaReferences() {
    return child(this.user, "freestyle-saved-media-references");
  }
}
