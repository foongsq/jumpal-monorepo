import { useState, useContext } from 'react';
import { SkillsApi } from './context';
import { messages, ESCAPE_KEY, ENTER_KEY } from '../../../../constants';
import { useJumpalToast } from '../../../../components';

export default function useEditableTextController(id, content, type) {
  const api = useContext(SkillsApi);
  const Toast = useJumpalToast();
  const [editText, setEditText] = useState(content);
  const [isEditing, setEditing] = useState(false);

  const handleEditButtonClick = () => {
    if (isEditing) {
      handleSubmit();
    } else {
      setEditing(true);
    }
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSubmit = () => {
    const val = editText;
    console.log('type', type);
    if (type === 'skillName') {
      const res = api.updateSkill(id, {
        skillName: val,
      });
      Toast.apiFeedback({ res, successMsg: messages.SKILL_UPDATE_SUCCESS });
    } else if (type === 'description') {
      const res = api.updateSkill(id, {
        description: val,
      });
      Toast.apiFeedback({ res, successMsg: messages.SKILL_UPDATE_SUCCESS });
    } else if (type === 'url') {
      const res = api.updateSkill(id, {
        url: val,
      });
      Toast.apiFeedback({ res, successMsg: messages.SKILL_UPDATE_SUCCESS });
    } else {
      const res = api.updateSkill(id, {
        progress: val,
      });
      Toast.apiFeedback({ res, successMsg: messages.SKILL_UPDATE_SUCCESS });
    }
    if (val) {
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      setEditText(content);
      setEditing(false);
    } else if (e.which === ENTER_KEY) {
      handleSubmit(e);
    }
  };

  return [editText, isEditing, handleEditButtonClick,
    handleChange, handleSubmit, handleKeyDown];
}
