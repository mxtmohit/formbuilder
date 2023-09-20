import { Alert } from "@mui/material";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

const Snackbaralert = ({ setIsOpen, isOpen, message, type }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          sx={{ width: "100%" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Snackbaralert;
