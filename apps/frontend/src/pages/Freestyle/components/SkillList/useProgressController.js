import { useState, useContext } from "react";
import { SkillsApi } from "./context";
import { useJumpalToast } from "../../../../components";
import { ENTER_KEY, ESCAPE_KEY } from "../../../../constants";

export default function useProgressController(id, progress) {
  const api = useContext(SkillsApi);
  const Toast = useJumpalToast();
  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(false);

  const handleEditButtonClick = () => {
    if (editing) {
      handleSubmit();
    } else {
      setEditing(true);
    }
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSubmit = async () => {
    const val = editText;
    if (val) {
      const skill = await api.getSkill(id);
      const currProgress = skill.progress;
      const newProgress = [...currProgress, [val, new Date().toString()]];
      const res = await api.updateSkill(id, {
        progress: newProgress,
      });
      if (res) {
        setEditText("");
        setEditing(false);
        Toast.success("Progress updated successfully!");
      } else {
        Toast.error("An error occured :(");
      }
    } else {
      setEditText("");
      setEditing(false);
      Toast.error("An error occured :(");
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      setEditText("");
      setEditing(false);
    } else if (e.which === ENTER_KEY) {
      handleSubmit(e);
    }
  };

  // Needed because javascript .reverse() can't reverse 2d arrays
  const reverseArray = () => {
    const displayProgress = [];
    for (let i = progress.length - 1; i >= 0; i--) {
      displayProgress.push(progress[i]);
    }
    return displayProgress;
  };
  return [
    editText,
    editing,
    handleEditButtonClick,
    handleChange,
    handleSubmit,
    handleKeyDown,
    reverseArray,
  ];
}
