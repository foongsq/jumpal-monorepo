/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmContext = React.createContext(null);

export default function useJumpalConfirm() {
  const confirmHelpers = React.useContext(ConfirmContext);
  return confirmHelpers;
}

export const ConfirmProvider = ({ children }) => {
  const [confirmData, setConfirm] = useState({});

  const removeConfirm = useCallback(() => {
    setConfirm({
      ...confirmData,
      open: false,
    });
  }, [setConfirm]);

  const confirm = useCallback(({ title, msg, onConfirm }) => {
    setConfirm({
      open: true,
      title,
      msg,
      onConfirm: () => {
        onConfirm();
        removeConfirm();
      },
      onCancel: removeConfirm,
    });
  }, []);

  const value = { confirm };

  return (
    <ConfirmContext.Provider value={value}>
      <Confirm confirmData={confirmData} />
      {children}
    </ConfirmContext.Provider>
  );
};

// eslint-disable-next-line react/prop-types
const Confirm = ({ confirmData }) => {
  const { open, title, msg, onConfirm, onCancel } = confirmData;
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
