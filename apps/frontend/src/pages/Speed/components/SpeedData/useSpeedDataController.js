import { useState, useEffect } from "react";
import { useJumpalToast, useJumpalConfirm } from "../../../../components";
import { messages } from "../../../../constants";
import { isDataPopulated } from "../../../../utils";
import { useSdDb } from "../../../../data";

export default function useSpeedDataController() {
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const [sd, loading, getSd, addSd, delSd] = useSdDb();
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

  const parseTime = (records) => {
    if (isDataPopulated(records)) {
      const consolidated = [];
      const years = Object.keys(records[0]);
      years.forEach((year) => {
        const months = Object.keys(records[0][year]);
        months.forEach((month) => {
          const days = Object.keys(records[0][year][month]);
          days.forEach((day) => {
            Object.values(records[0][year][month][day]).forEach((record) => {
              consolidated.push(record);
            });
          });
        });
      });
      // Sort records in ascending order according to time
      return consolidated.sort((a, b) =>
        new Date(a.time) > new Date(b.time) ? 1 : -1
      );
    }
  };

  return [sd, loading, addSd, showToday, handleDelete, toggleToday, parseTime];
}
