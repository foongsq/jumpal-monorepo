import { useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from '../Firebase';
import { timeStamp } from '../utils';
import { get, set, remove, child, off, onValue } from 'firebase/database';
// import { get, remove, child, off, onValue } from 'firebase/database';


function usePbDb() {
  const firebase = useContext(FirebaseContext);
  const [user, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pb, setPb] = useState([]);
  const pbRef = firebase.personalBests;

  const unsubscribe = onAuthStateChanged(
      firebase.auth,
      (authUser) => {
        if (authUser) {
          setAuthUser(authUser);
        } else {
          setAuthUser(null);
          alert('Please sign in to continue');
        };
      },
  );

  const onPbUpdate = (snapshot) => {
    console.log('on pb update');
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
      }
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
          time: timeStamp(time),
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
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return [pb, loading, getPb, addPb, delPb];
}

export default usePbDb;