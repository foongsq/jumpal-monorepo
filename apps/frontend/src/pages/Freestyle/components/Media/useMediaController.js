import { useEffect } from "react";
import { useMediaRefDb } from "../../../../data";

export default function useMediaController() {
  const [ig, loading, getIg, addIg, delIg] = useMediaRefDb();

  useEffect(() => {
    getIg();
  }, []);

  return [ig, loading, addIg, delIg];
}
