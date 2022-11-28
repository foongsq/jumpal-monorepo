import { useState } from "react";
import { useJumpalToast } from "../../../../components";

export default function useNewMediaController(addIg) {
  const Toast = useJumpalToast();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [url, setUrl] = useState("");

  const toggleNewIg = () => {
    setOpen(!open);
    setNote("");
    setUrl("");
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const submitEntry = async (event) => {
    event.preventDefault();
    const res = await addIg(note, url);
    if (res) {
      Toast.success("Media post saved successfully!");
      toggleNewIg();
    } else {
      Toast.error("An error occured :(");
    }
  };

  return [open, toggleNewIg, handleNoteChange, handleUrlChange, submitEntry];
}
