import { useState } from "react";
import { useJumpalToast } from "../../../../components";

function useNewSpeedRecordController(addSd) {
  const Toast = useJumpalToast();
  const [open, setOpen] = useState(false);
  const [eventJ, setEventJ] = useState(null);
  const [score, setScore] = useState(null);
  const [time, setTime] = useState(null);

  const toggleNewSpeedRecord = () => {
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

  const saveSpeedRecord = async (event) => {
    const res = await addSd(eventJ, score, time);
    if (res) {
      Toast.success("New speed record successfully saved!");
      toggleNewSpeedRecord();
    } else {
      Toast.error("An error occured :(");
    }
    event.preventDefault();
  };

  return [
    open,
    eventJ,
    score,
    time,
    toggleNewSpeedRecord,
    handleEventChange,
    handleScoreChange,
    handleTimeChange,
    saveSpeedRecord,
  ];
}

export default useNewSpeedRecordController;
