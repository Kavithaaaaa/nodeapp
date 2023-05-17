import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FormGroup, TextField } from "@mui/material";
import ResponsiveSize from "@/utils/responsiveSizes";

export const TabLabelBox = styled(Box)({
  borderBottom: 1,
  borderColor: "divider",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: ResponsiveSize(2),
  backgroundColor: "white",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "gray",
  },
}));
export const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
}));

export const SearInput = styled(TextField)({
  height: "40%",
  backgroundColor: "red",
});

export const Tabdiv = styled("div")(() => ({
  justifyContent: "space-between",
  display: "flex",
  marginBottom: "30px",
}));

export const Styledp = styled("p")({
  width: "38px",
  height: "19px",
  textAlign: "left",
  color: "#222222",
  fontSize: ResponsiveSize(16),
});

export const Styledpbold = styled("p")({
  height: ResponsiveSize(24),
  textAlign: "left",
  fontWeight: "Bold",
  opacity: "1",
});
export const StyledClosebtn = styled(IconButton)({
  marginRight: ResponsiveSize(15),
  position: "absolute",
  right: "0px",
});
export const StyledFormGroup = styled(FormGroup)({
  fontSize: ResponsiveSize(13),
  color: "#222222",
  opacity: "1",
  margin: ResponsiveSize(20),
});

//   export const StyledButton = styled(Button)({
//     boxShadow: 'none',
//     textTransform: 'none',
//     marginLeft: '10px',
// height:'40px',

//     fontSize: 16,
//     padding: '4px 10px',
//     border: '1px solid',
//     lineHeight: 1.5,
//     backgroundColor: '#131471',
//     borderColor: '#0063cc',
//     fontFamily: [
//         '-apple-system',
//         'BlinkMacSystemFont',
//         '"Segoe UI"',
//         'Roboto',
//         '"Helvetica Neue"',
//         'Arial',
//         'sans-serif',
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//         // backgroundColor: 'black',
//         borderColor: '#0062cc',
//         boxShadow: 'none',
//     },
//     '&:active': {
//         boxShadow: 'none',
//         backgroundColor: '#0062cc',
//         borderColor: '#005cbf',
//     },
//     '&:focus': {
//         boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//     },
// });
