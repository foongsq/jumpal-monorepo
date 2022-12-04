import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../firebase/Firebase";
import { get, push, remove, child, off, onValue } from "firebase/database";
import { processMediaRefData } from "../dataProcessors/mediaRefDataProcessor";
import useRequest from "./useRequest";

export default function useMediaRefDb() {
  const firebase = useContext(FirebaseContext);
  const { postRequest } = useRequest();
  const [loading, setLoading] = useState(true);
  const [ig, setIg] = useState([]);
  const mediaRefsRef = firebase.mediaReferences;
  const mediaRefCacheKey = "media-references";

  const onIgUpdate = (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const rawMediaRefData = snapshot.val();
      const feMediaRefData = processMediaRefData(rawMediaRefData);
      localStorage.setItem(mediaRefCacheKey, JSON.stringify(feMediaRefData));
      setIg(feMediaRefData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onIgUpdate && mediaRefsRef) {
      onValue(mediaRefsRef, onIgUpdate);
    }
    return () => {
      off(mediaRefsRef);
    };
  }, []);

  const getIg = async () => {
    setLoading(true);
    const cacheResults = localStorage.getItem(mediaRefCacheKey);
    if (cacheResults) {
      setIg(JSON.parse(cacheResults));
    } else {
      return postRequest(async () => {
        const snapshot = await get(mediaRefsRef);
        onIgUpdate(snapshot);
      });
    }
  };

  const addIg = async (note, url) => {
    localStorage.removeItem(mediaRefCacheKey);
    return postRequest(() => {
      push(mediaRefsRef, { note, url, timestamp: Date.now() });
    });
  };

  const delIg = async (id) => {
    localStorage.removeItem(mediaRefCacheKey);
    return postRequest(async () => {
      const mediaRefRef = child(mediaRefsRef, id);
      await remove(mediaRefRef);
    });
  };

  return [ig, loading, getIg, addIg, delIg];
}
