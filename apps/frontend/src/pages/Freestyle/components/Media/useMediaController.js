import { useEffect } from "react";
import { useIgDb } from "../../../../data";
import { isDataPopulated } from "../../../../utils";

export default function useMediaController() {
  const [ig, loading, getIg, addIg, delIg] = useIgDb();

  useEffect(() => {
    getIg();
  }, []);

  const processData = () => {
    const data = [];
    if (isDataPopulated(ig)) {
      const dataValues = Object.values(ig[0]).reverse();
      const keys = Object.keys(ig[0]).reverse();
      for (let i = 0; i < dataValues.length; i++) {
        data[i] = [keys[i], dataValues[i]];
      }
    }
    return data;
  };

  return [ig, loading, addIg, delIg, processData];
}
