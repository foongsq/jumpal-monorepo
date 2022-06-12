import { useState } from 'react';
import { useJumpalToast } from '../../../../components';

export default function useNewPersonalBestController(addPb) {
  const Toast = useJumpalToast();
  const [open, setOpen] = useState(false);
  const [eventJ, setEventJ] = useState(null);
  const [score, setScore] = useState(null);
  const [time, setTime] = useState(null);

  const toggleNewPersonalBest = () => {
    setOpen(!open);
    setEventJ(null);
    setScore(null);
    setTime(new Date());
  };

  const handleEventChange = (event) => {
    setEventJ(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const saveNewPersonalBest = async (event) => {
    event.preventDefault();
    const res = await addPb(eventJ, score, time);
    if (res) {
      Toast.success('New Personal Best saved successfully!');
      toggleNewPersonalBest();
    } else {
      Toast.error('An error occured :(');
    }
  };

  return [toggleNewPersonalBest, handleEventChange, handleScoreChange,
    handleTimeChange, saveNewPersonalBest, open, eventJ, time];
}
