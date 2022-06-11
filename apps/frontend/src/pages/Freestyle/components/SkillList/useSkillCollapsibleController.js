import { useState, useContext } from 'react';
import { SkillsApi } from './context';
import { useJumpalConfirm, useJumpalToast } from '../../../../components';
import { messages } from '../../../../constants';

export default function useSkillCollapsibleController() {
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const api = useContext(SkillsApi);
  const [open, setOpen] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleProgressClick = () => {
    setOpenProgress(!openProgress);
  };

  const handleDelete = async () => {
    confirm({
      title: 'Confirm deletion',
      msg: 'Are you sure you want to delete this skill?',
      onConfirm: async () => {
        const res = await api.delSkill(id);
        Toast.apiFeedback({ res, successMsg: messages.SKILL_DEL_SUCCESS });
      },
    });
  };

  const handleLearnt = async () => {
    const res = await api.updateSkill(id, {
      learnt: true,
    });
    Toast.apiFeedback({ res, successMsg: messages.LEARN_SUCCESS });
  };

  const handleUnlearn = async () => {
    const res = await api.updateSkill(id, {
      learnt: false,
    });
    Toast.apiFeedback({ res, successMsg: messages.UNLEARN_SUCCESS });
  };

  return [open, openProgress, handleClick, handleProgressClick,
    handleDelete, handleLearnt, handleUnlearn];
}
