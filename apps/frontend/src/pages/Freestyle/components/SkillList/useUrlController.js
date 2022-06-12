import { useState, useContext } from "react";
import { useJumpalToast } from "../../../../components";
import { messages, ENTER_KEY, ESCAPE_KEY } from "../../../../constants";
import { SkillsApi } from "./context";

export default function useUrlController(id, url) {
  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(false);
  const Toast = useJumpalToast();
  const api = useContext(SkillsApi);

  const handleUrlChange = (e) => {
    setEditText(e.target.value);
  };

  const handleUrlSubmit = async () => {
    const val = editText;
    if (val) {
      const res = await api.updateSkill(id, {
        url: val,
      });
      Toast.apiFeedback({ res, successMsg: messages.SKILL_UPDATE_SUCCESS });
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      setEditText(url);
      setEditing(false);
    } else if (e.which === ENTER_KEY) {
      handleUrlSubmit();
    }
  };

  const handleCollapsibleHeaderClick = () => {
    if (editing) {
      handleUrlSubmit();
    } else {
      setEditing(true);
    }
  };

  return [
    editText,
    editing,
    handleUrlChange,
    handleKeyDown,
    handleCollapsibleHeaderClick,
  ];
}
