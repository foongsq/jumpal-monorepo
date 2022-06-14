import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../firebase/Firebase";
import { getSdDbTime, getSdTime } from "../../utils";
import { get, push, remove, child, off, onValue } from "firebase/database";
import useRequest from "./useRequest";

export default function useSdDb() {
  const firebase = useContext(FirebaseContext);
  const { postRequest } = useRequest();
  const [loading, setLoading] = useState(true);
  const [sd, setSd] = useState([]);
  const sdRef = firebase.speedRecords;

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
    };
  }, []);

  const getSd = async () => {
    setLoading(true);
    return postRequest(async () => {
      const snapshot = await get(sdRef);
      onSdUpdate(snapshot);
    });
  };

  const addSd = async (event, score, time) => {
    return postRequest(() => {
      push(child(sdRef, `${getSdDbTime(time)}`), {
        event: event,
        score: score,
        time: getSdTime(time),
      });
    });
  };

  const delSd = async (event, score, time) => {
    return postRequest(async () => {
      const snapshot = await get(child(sdRef, getSdDbTime(time)));
      snapshot.forEach((child) => {
        if (
          child.val().event === event &&
          child.val().score === score &&
          child.val().time === time
        ) {
          remove(child.ref);
        }
      });
    });
  };

  return [sd, loading, getSd, addSd, delSd];
}
