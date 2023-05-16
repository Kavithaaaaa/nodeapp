import React from "react";
import { Box } from "@mui/material";
import { Alert, AlertTitle, Fade } from "@mui/material";

const useAllertMessage = () => {
  const alertMessage = (
    alertCloseHandle: (status: boolean) => void,
    isAlert: boolean,
    status: string,
    message: string
  ) => {
    // const { alertOpenHandle, alertCloseHandle, isAlert } = props
    return (
      <Box borderLeft="6px solid #76B900" borderRadius="6px">
        <Fade
          in={isAlert}
          timeout={{ enter: 1000, exit: 1000 }}
          addEndListener={() => {
            setTimeout(() => {
              alertCloseHandle(false);
            }, 3500);
          }}
        >
          <Alert
            severity="success"
            variant="standard"
            className="alert"
            onClose={() => alertCloseHandle(false)}
          >
            <AlertTitle>
              <strong>{status}</strong>
            </AlertTitle>
            {message}
          </Alert>
        </Fade>
      </Box>
    );
  };

  return {
    alertMessage,
  };
};

export default useAllertMessage;
