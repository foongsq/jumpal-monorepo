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

  const splitSdByEvents = () => {
    const colors = ["red", "blue", "green", "purple", "pink"];
    const grouped = sd.reduce((memo, x) => {
      if (!memo[x.event]) {
        memo[x.event] = [];
      }
      memo[x.event].push(x);
      return memo;
    }, {});
    const res = [];
    let i = 0;
    // eslint-disable-next-line guard-for-in
    for (const event in grouped) {
      res.push({
        name: event,
        color: colors[i],
        items: grouped[event].map((d) => ({ ...d, time: new Date(d.time) })),
      });
      i = (i + 1) % 5;
    }
    // console.log("res", res);
    return res;
  };

  return [
    sd,
    today,
    loading,
    addSd,
    showToday,
    handleDelete,
    toggleToday,
    splitSdByEvents,
  ];
}
