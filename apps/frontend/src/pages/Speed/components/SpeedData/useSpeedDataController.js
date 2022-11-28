import { useState, useEffect } from "react";
import { useJumpalToast, useJumpalConfirm } from "../../../../components";
import { messages } from "../../../../constants";
import { useSdDb } from "../../../../data";

export default function useSpeedDataController() {
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const [sd, today, loading, getSd, addSd, delSd] = useSdDb();
  const [showToday, setShowToday] = useState(false);

  useEffect(() => {
    getSd();
  }, []);

  const handleDelete = async (event, score, time) => {
    confirm({
      title: "Confirm deletion",
      msg: "Are you sure you want to delete this speed record?",
      onConfirm: async () => {
        const res = await delSd(event, score, time);
        Toast.apiFeedback({ res, successMsg: messages.SD_DEL_SUCCESS });
      },
    });
  };

  const toggleToday = (shouldShowToday) => {
    setShowToday(shouldShowToday);
  };

  return [sd, today, loading, addSd, showToday, handleDelete, toggleToday];
}
