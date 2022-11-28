import { useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "../firebase/Firebase";

export default function useRequest() {
  const firebase = useContext(FirebaseContext);
  const [user, setAuthUser] = useState(null);

  const unsubscribe = onAuthStateChanged(firebase.auth, (authUser) => {
    if (authUser) {
      setAuthUser(authUser);
    } else {
      setAuthUser(null);
    }
  });

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  // This get request wrapper is used when we want to return data from the
  // database.
  const getRequest = async (executable) => {
    try {
      if (user) {
        return executable();
      }
      console.error("No user detected!");
    } catch (e) {
      console.error(e);
    }
  };

  // This post request wrapper is used when we want to return true or false
  // depending on the result of the database interaction
  const postRequest = async (executable) => {
    try {
      if (user) {
        await executable();
        return true;
      }
      console.error("No user detected!");
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return { getRequest, postRequest };
}
