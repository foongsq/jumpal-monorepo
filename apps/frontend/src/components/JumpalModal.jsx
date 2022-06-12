import React from "react";
import PropTypes from "prop-types";
import { JumpalButton } from "./JumpalButton";
import { Box, Modal, Typography } from "@mui/material";
import { JumpalCenteredButtonContainer } from "./JumpalCommon.tsx";
import { useAuth } from "../hooks";

JumpalModalContent.propTypes = {
  children: PropTypes.element,
};

function JumpalModalContent(props) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
      }}
    >
      {props.children}
    </Box>
  );
}

JumpalModal.propTypes = {
  isOpen: PropTypes.bool,
  openButtonText: PropTypes.string,
  onToggle: PropTypes.func,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.element,
};

export default function JumpalModal(props) {
  const { isOpen, openButtonText, onToggle, title, onSubmit, children } = props;
  const [user] = useAuth();

  return (
    <div>
      <JumpalCenteredButtonContainer>
        <JumpalButton onClick={onToggle}>{openButtonText}</JumpalButton>
      </JumpalCenteredButtonContainer>
      <Modal open={isOpen} onClose={onToggle}>
        <JumpalModalContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <form>{children}</form>
          <JumpalButton onClick={onSubmit} disabled={!user}>
            Save
          </JumpalButton>
        </JumpalModalContent>
      </Modal>
    </div>
  );
}
