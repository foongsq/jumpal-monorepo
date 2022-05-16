import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { styled } from '@mui/system';
import { Alert } from '@mui/material';

const ToastContext = React.createContext(null);

export default function useJumpalToast() {
  const toastHelpers = React.useContext(ToastContext);
  return toastHelpers;
}

// eslint-disable-next-line react/prop-types
export const ToastProvider = ({ children }) => {
  let id = 0;
  const [toasts, setToasts] = useState([]);

  const success = useCallback((msg) => {
    setToasts((toasts) => [
      ...toasts,
      { id, msg, severity: alertSeverity.SUCCESS },
    ]);
    id++;
  }, [setToasts]);

  const warn = useCallback((msg) => {
    setToasts((toasts) => [
      ...toasts,
      { id, msg, severity: alertSeverity.WARN },
    ]);
    id++;
  }, [setToasts]);

  const error = useCallback((msg) => {
    setToasts((toasts) => [
      ...toasts,
      { id, msg, severity: alertSeverity.ERROR },
    ]);
    id++;
  }, [setToasts]);

  const removeToast = useCallback((id) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, [setToasts]);

  const apiFeedback = ({ res, successMsg, errorMsg }) => {
    errorMsg = errorMsg || 'An error occured :(';
    if (res) {
      success(successMsg);
    } else {
      error(errorMsg);
    }
  };

  const value = { success, warn, error, removeToast, apiFeedback };

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts }) => {
  return createPortal(
      <div style={
        { position: 'absolute', right: '1rem', top: 0, zIndex: '10' }
      }>
        {toasts.map((item, index) => (
          <Toast key={index} severity={item.severity} id={item.id}>
            {item.msg}
          </Toast>
        ))}
      </div>,
      document.body,
  );
};


// eslint-disable-next-line react/prop-types
const Toast = ({ children, severity, id }) => {
  const { removeToast } = useJumpalToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000); // dismiss toast after 3s

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <StyledAlert severity={severity} onClose={() => removeToast(id)}>
      {children}
    </StyledAlert>
  );
};

const alertSeverity = {
  'SUCCESS': 'success',
  'WARN': 'warning',
  'ERROR': 'error',
};

const StyledAlert = styled(Alert)({
  marginTop: '1rem',
});

