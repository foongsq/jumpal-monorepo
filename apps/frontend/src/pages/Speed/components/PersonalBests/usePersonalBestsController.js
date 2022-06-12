import { useEffect } from "react";
import { usePbDb } from "../../../../data";
import { useJumpalToast, useJumpalConfirm } from "../../../../components";
import { messages } from "../../../../constants";

function usePersonalBestsController() {
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const [pb, loading, getPb, addPb, delPb] = usePbDb();

  useEffect(() => {
    getPb();
  }, []);

  const handleDelete = async (event) => {
    confirm({
      title: "Confirm deletion",
      msg: "Are you sure you want to delete this personal best record?",
      onConfirm: async () => {
        const res = await delPb(event);
        Toast.apiFeedback({ res, successMsg: messages.PB_DEL_SUCCESS });
      },
    });
  };

  return [pb, loading, addPb, handleDelete];
}

export default usePersonalBestsController;
