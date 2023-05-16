import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
function AlertMessage({ value }) {
  // { variant, children }
  const [show, setShow] = useState(false);
  const [timeOut, setTimeOut] = useState(null);
  useEffect(() => {
    setShow(value);
  }, [value]);

  setTimeout(() => {
    setShow(false);
  }, 2000);
  return (
    show && (
      <Stack
        sx={{
          width: "30%",
          position: "absolute",
          display: "flex",
          float: "top",
          justifyContent: "center",
          justifyItems: "center",
        }}
        spacing={2}
      >
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert>
      </Stack>
    )
  );
}

export default AlertMessage;
