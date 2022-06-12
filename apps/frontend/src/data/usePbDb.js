import { useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "./Firebase";
import { getPbTime } from "../utils";
import { get, set, remove, child, off, onValue } from "firebase/database";

export default function usePbDb() {
  const firebase = useContext(FirebaseContext);
  const [user, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pb, setPb] = useState([]);
  const pbRef = firebase.personalBests;

  const unsubscribe = onAuthStateChanged(firebase.auth, (authUser) => {
    if (authUser) {
      setAuthUser(authUser);
    } else {
      setAuthUser(null);
    }
  });

  const onPbUpdate = (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const newPersonalBests = [];
      newPersonalBests.push(snapshot.val());
      setPb(newPersonalBests);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onPbUpdate) {
      onValue(pbRef, onPbUpdate);
    }
    return () => {
      off(pbRef);
      unsubscribe();
    };
  }, []);

  const getPb = async () => {
    try {
      setLoading(true);
      if (user) {
        const snapshot = await get(pbRef);
        onPbUpdate(snapshot);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const addPb = async (event, score, time) => {
    try {
      if (user) {
        const currEventPbRef = child(pbRef, event);
        await set(currEventPbRef, {
          score: score,
          time: getPbTime(time),
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const delPb = async (event) => {
    try {
      if (user) {
        await remove(child(pbRef, event));
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return [pb, loading, getPb, addPb, delPb];
}
