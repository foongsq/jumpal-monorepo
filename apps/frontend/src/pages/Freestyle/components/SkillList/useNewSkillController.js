import { useState, useContext } from 'react';
import { useJumpalToast } from '../../../../components';
import { SkillsApi } from './context';

export default function useNewSkillController() {
  const api = useContext(SkillsApi);
  const Toast = useJumpalToast();
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState('-');
  const [progress, setProgress] = useState([['-', new Date().toString()]]);
  const [url, setUrl] = useState('-');

  const toggleNewSkill = () => {
    setOpen(!open);
    setSkillName('-');
    setProgress([['-', new Date().toString()]]);
    setUrl('-');
  };

  const handleSkillNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleProgressChange = (event) => {
    setProgress([[event.target.value, new Date().toString()]]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const isValidSkillName = (name) => {
    return name !== '-' && name.length > 0;
  };

  const submitEntry = async (event) => {
    event.preventDefault();
    if (!isValidSkillName(skillName)) {
      Toast.warn('Invalid skill name, please try again.');
      return;
    }
    const res = await api.addSkill(skillName, progress, url, false);
    if (res) {
      Toast.success('New skill saved successfully!');
      toggleNewSkill();
    } else {
      Toast.error('An error occured :(');
    }
  };


  return [open, toggleNewSkill, handleSkillNameChange, handleProgressChange,
    handleUrlChange, submitEntry];
}
