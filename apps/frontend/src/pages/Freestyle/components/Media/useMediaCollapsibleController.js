import { useState } from "react";
import { useJumpalConfirm, useJumpalToast } from "../../../../components";
import { messages } from "../../../../constants";

export default function useMediaCollapsibleController(id, delIg) {
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    confirm({
      title: "Confirm deletion",
      msg: "Are you sure you want to delete this inspiration post?",
      onConfirm: async () => {
        const res = await delIg(id);
        Toast.apiFeedback({ res, successMsg: messages.IG_DEL_SUCCESS });
      },
    });
  };

  return [open, handleClick, handleDelete];
}
