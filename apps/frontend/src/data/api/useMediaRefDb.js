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

  const onIgUpdate = (snapshot) => {
    setLoading(true);
    if (snapshot) {
      const rawMediaRefData = snapshot.val();
      const feMediaRefData = processMediaRefData(rawMediaRefData);
      setIg(feMediaRefData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (onIgUpdate) {
      onValue(mediaRefsRef, onIgUpdate);
    }
    return () => {
      off(mediaRefsRef);
    };
  }, []);

  const getIg = async () => {
    setLoading(true);
    return postRequest(async () => {
      const snapshot = await get(mediaRefsRef);
      onIgUpdate(snapshot);
    });
  };

  const addIg = async (note, url) => {
    return postRequest(() => {
      push(mediaRefsRef, { note, url, timestamp: Date.now() });
    });
  };

  const delIg = async (id) => {
    return postRequest(async () => {
      const mediaRefRef = child(mediaRefsRef, id);
      await remove(mediaRefRef);
    });
  };

  return [ig, loading, getIg, addIg, delIg];
}
