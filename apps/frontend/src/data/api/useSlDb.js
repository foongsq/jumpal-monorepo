import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../firebase/Firebase";
import {
  get,
  push,
  remove,
  child,
  off,
  onValue,
  update,
} from "firebase/database";
import { processSlData } from "../dataProcessors/slDataProcessor";
import useRequest from "./useRequest";

export default function useSlDb() {
  const firebase = useContext(FirebaseContext);
  const { getRequest, postRequest } = useRequest();
  const [loading, setLoading] = useState(true);
  const [sl, setSl] = useState([]);
  const slRef = firebase.skillList;
  const slCacheKey = "skill-list";

  const onSlUpdate = (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const rawSkillList = snapshot.val();
      const feSkillList = processSlData(rawSkillList);
      localStorage.setItem(slCacheKey, JSON.stringify(feSkillList));
      setSl(feSkillList);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onSlUpdate && slRef) {
      onValue(slRef, onSlUpdate);
    }
    return () => {
      off(slRef);
    };
  }, []);

  const getSl = async () => {
    setLoading(true);
    const cacheResults = localStorage.getItem(slCacheKey);
    if (cacheResults) {
      setSl(JSON.parse(cacheResults));
    } else {
      return postRequest(async () => {
        const snapshot = await get(slRef);
        onSlUpdate(snapshot);
      });
    }
  };

  const getSkill = async (id) => {
    localStorage.removeItem(slCacheKey);
    return getRequest(async () => {
      const skillRef = child(slRef, id);
      const snapshot = await get(skillRef);
      return snapshot.val();
    });
  };

  const addSkill = async (name, progress, url, isLearnt) => {
    localStorage.removeItem(slCacheKey);
    return postRequest(() => {
      push(slRef, {
        skillName: name,
        progress: progress,
        url: url,
        learnt: isLearnt,
      });
    });
  };

  const delSkill = async (id) => {
    localStorage.removeItem(slCacheKey);
    return postRequest(() => {
      const skillRef = child(slRef, id);
      remove(skillRef);
    });
  };

  const updateSkill = async (id, change) => {
    localStorage.removeItem(slCacheKey);
    return postRequest(async () => {
      const skillRef = child(slRef, id);
      await update(skillRef, change);
    });
  };

  return { sl, loading, getSl, getSkill, addSkill, delSkill, updateSkill };
}
