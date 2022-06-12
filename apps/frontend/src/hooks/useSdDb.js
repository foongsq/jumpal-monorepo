import { useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from '../Firebase';
import { getSdDbTime, getSdTime } from '../utils';
import { get, push, remove, child, off, onValue } from 'firebase/database';

export default function useSdDb() {
  const firebase = useContext(FirebaseContext);
  const [user, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sd, setSd] = useState([]);
  const sdRef = firebase.speedRecords;

  const unsubscribe = onAuthStateChanged(
      firebase.auth,
      (authUser) => {
        if (authUser) {
          setAuthUser(authUser);
        } else {
          setAuthUser(null);
        }
      },
  );

  const onSdUpdate = (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const speedRecords = [];
      speedRecords.push(snapshot.val());
      setSd(speedRecords);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onSdUpdate) {
      onValue(sdRef, onSdUpdate);
    }
    return () => {
      off(sdRef);
      unsubscribe();
    };
  }, []);


  const getSd = async () => {
    try {
      setLoading(true);
      if (user) {
        const snapshot = await get(sdRef);
        onSdUpdate(snapshot);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const addSd = async (event, score, time) => {
    try {
      if (user) {
        push(child(sdRef, `${getSdDbTime(time)}`),
            {
              event: event,
              score: score,
              time: getSdTime(time),
            },
        );
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const delSd = async (event, score, time) => {
    try {
      if (user) {
        const snapshot = await get(child(sdRef, getSdDbTime(time)));
        snapshot.forEach((child) => {
          if (child.val().event === event &&
            child.val().score === score &&
            child.val().time === time) {
            remove(child.ref);
          }
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return [sd, loading, getSd, addSd, delSd];
}
