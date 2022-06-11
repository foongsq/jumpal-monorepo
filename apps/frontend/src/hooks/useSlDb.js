import { useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from '../Firebase';

import { get, push, remove, child,
  off, onValue, update } from 'firebase/database';

export default function useSlDb() {
  const firebase = useContext(FirebaseContext);
  const [user, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sl, setSl] = useState([]);
  const slRef = firebase.skillList;

  const unsubscribe = onAuthStateChanged(
      firebase.auth,
      (authUser) => {
        if (authUser) {
          setAuthUser(authUser);
        } else {
          setAuthUser(null);
        };
      },
  );

  const onSlUpdate = (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const newSkillList = [];
      newSkillList.push(snapshot.val());
      setSl(newSkillList);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onSlUpdate) {
      onValue(slRef, onSlUpdate);
    }
    return () => {
      off(slRef);
      unsubscribe();
    };
  }, []);


  const getSl = async () => {
    try {
      setLoading(true);
      if (user) {
        const snapshot = await get(slRef);
        onSlUpdate(snapshot);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const getSkill = async (id) => {
    try {
      if (user) {
        const skillRef = child(slRef, id);
        const snapshot = await get(skillRef);
        return snapshot.val();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addSkill = async (name, progress, url, isLearnt) => {
    try {
      if (user) {
        push(slRef, {
          skillName: name,
          progress: progress,
          url: url,
          learnt: isLearnt,
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const delSkill = async (id) => {
    try {
      if (user) {
        const skillRef = child(slRef, id);
        remove(skillRef);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const updateSkill = async (id, change) => {
    try {
      if (user) {
        const skillRef = child(slRef, id);
        await update(skillRef, change);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return { sl, loading, getSl, getSkill,
    addSkill, delSkill, updateSkill };
}
