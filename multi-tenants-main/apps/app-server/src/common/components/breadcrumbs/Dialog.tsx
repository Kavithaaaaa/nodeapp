import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import ResponsiveSize from '@/utils/responsiveSizes'

export default function AlertDialog(props: any) {
  return (
    <Dialog
      open={props.showAlertbox}
      // onClose={handleClose1}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: ResponsiveSize(16),
          fontWeight: 700,
          lineHeight: ResponsiveSize(19),
          letterSpacing: "0px",
          color: "#222222",
          margin: "3%",
        }}
      >
        {props.message} Program
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: ResponsiveSize(16),
          fontWeight: 'bold',
          lineHeight: ResponsiveSize(19),
          letterSpacing: "0px",
          color: "#222222",
          margin: "4%",
        }}
      >
        <Button variant="outlined" onClick={() => props.handleCloseDiagree()}>
          Disagree
        </Button>
        <Button variant="outlined" onClick={() => props.agree()} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
