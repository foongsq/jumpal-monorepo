import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../firebase/Firebase";
import { getPbTime } from "../../utils";
import { get, set, remove, child, off, onValue } from "firebase/database";
import { processPbData } from "../dataProcessors/pbDataProcessor";
import useRequest from "./useRequest";

export default function usePbDb() {
  const firebase = useContext(FirebaseContext);
  const { postRequest } = useRequest();
  const [loading, setLoading] = useState(true);
  const [pb, setPb] = useState([]);
  const pbRef = firebase.personalBests;
  const pbCacheKey = "personal-best";

  const onPbUpdate = async (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const rawPbData = snapshot.val();
      const fePbData = processPbData(rawPbData);
      localStorage.setItem(pbCacheKey, JSON.stringify(fePbData));
      setPb(fePbData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onPbUpdate) {
      onValue(pbRef, onPbUpdate);
    }
    return () => {
      off(pbRef);
    };
  }, []);

  const getPb = async () => {
    setLoading(true);
    const cacheResults = localStorage.getItem(pbCacheKey);
    if (cacheResults) {
      setPb(JSON.parse(cacheResults));
    } else {
      return postRequest(async () => {
        const snapshot = await get(pbRef);
        onPbUpdate(snapshot);
      });
    }
  };

  const addPb = async (event, score, time) => {
    localStorage.removeItem(pbCacheKey);
    return postRequest(async () => {
      const currEventPbRef = child(pbRef, event);
      await set(currEventPbRef, {
        score: score,
        time: getPbTime(time),
      });
    });
  };

  const delPb = async (event) => {
    localStorage.removeItem(pbCacheKey);
    return postRequest(async () => {
      await remove(child(pbRef, event));
    });
  };

  return [pb, loading, getPb, addPb, delPb];
}
