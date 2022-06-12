import { useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "./Firebase";
import { get, push, remove, child, off, onValue } from "firebase/database";

export default function useIgDb() {
  const firebase = useContext(FirebaseContext);
  const [user, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ig, setIg] = useState([]);
  const igsRef = firebase.igs;

  const unsubscribe = onAuthStateChanged(firebase.auth, (authUser) => {
    if (authUser) {
      setAuthUser(authUser);
    } else {
      setAuthUser(null);
    }
  });

  const onIgUpdate = (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const newIg = [];
      newIg.push(snapshot.val());
      setIg(newIg);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onIgUpdate) {
      onValue(igsRef, onIgUpdate);
    }
    return () => {
      off(igsRef);
      unsubscribe();
    };
  }, []);

  const getIg = async () => {
    try {
      setLoading(true);
      if (user) {
        const snapshot = await get(igsRef);
        onIgUpdate(snapshot);
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const addIg = async (note, url) => {
    try {
      if (user) {
        push(igsRef, { note, url });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const delIg = async (id) => {
    try {
      if (user) {
        const igRef = child(igsRef, id);
        await remove(igRef);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return [ig, loading, getIg, addIg, delIg];
}
