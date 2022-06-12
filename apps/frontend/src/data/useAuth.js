import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
  const firebase = useContext(FirebaseContext);
  const [user, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const unsubscribe = onAuthStateChanged(firebase.auth, (authUser) => {
    if (authUser) {
      setAuthUser(authUser);
      setLoading(false);
    } else {
      setAuthUser(null);
      setLoading(false);
    }
  });

  useEffect(() => {
    return () => unsubscribe();
  }, []);

  return [user, loading, setLoading];
}
