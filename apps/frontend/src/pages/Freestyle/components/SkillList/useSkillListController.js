import { useEffect } from "react";
import { isDataPopulated } from "../../../../utils";
import { useSlDb } from "../../../../data";

export default function useSkillListController() {
  const { sl, loading, getSl, getSkill, addSkill, delSkill, updateSkill } =
    useSlDb();

  const api = { getSl, getSkill, addSkill, delSkill, updateSkill };

  useEffect(() => {
    getSl();
  }, []);

  const processData = () => {
    const notLearntData = [];
    const learntData = [];
    if (isDataPopulated(sl)) {
      for (let i = sl.length - 1; i >= 0; i--) {
        if (sl[i].learnt) {
          learntData.push(sl[i]);
        } else {
          notLearntData.push(sl[i]);
        }
      }
    }
    return {
      learnt: learntData,
      notLearnt: notLearntData,
    };
  };

  return [sl, loading, api, processData];
}
