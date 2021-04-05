import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertBar(props) {
  const { open, severity, message, onClose } = props;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      {open === true ? (
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      ) : (
        <div></div>
      )}
    </Snackbar>
  );
}

export default React.memo(AlertBar);
