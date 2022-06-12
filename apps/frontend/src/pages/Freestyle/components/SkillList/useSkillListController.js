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
      const dataValues = Object.values(sl[0]).reverse();
      const keys = Object.keys(sl[0]).reverse();
      for (let i = 0; i < dataValues.length; i++) {
        if (dataValues[i].learnt) {
          learntData.push([keys[i], dataValues[i]]);
        } else {
          notLearntData.push([keys[i], dataValues[i]]);
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
