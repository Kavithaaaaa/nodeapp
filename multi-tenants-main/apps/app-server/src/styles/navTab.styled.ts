import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import { Typography } from "@mui/material";
import ResponsiveSize from "@/utils/responsiveSizes";
import { PeopleSharp } from "@mui/icons-material";
export const StyledCreateProgramButton = styled(Button)({
  width:ResponsiveSize(138),
  height: ResponsiveSize(40),
  marginLeft: 'auto',
  padding: 0,
  paddingRight: ResponsiveSize(8),
  borderRadius: '4px',
  alignContent: 'left',
  textTransform: 'none',
  justifyContent: 'space-evenly',
  lineHeight: 'normal',
  fontSize: ResponsiveSize(14),
})
export const StyledAplyFilterButton = styled(Button)({
  width:ResponsiveSize(100),
  height: ResponsiveSize(40),
  marginLeft: 'auto',
  padding: 0,
  paddingRight: ResponsiveSize(8),
  borderRadius: '4px',
  alignContent: 'left',
  textTransform: 'none',
  justifyContent: 'space-evenly',
  lineHeight: 'normal',
  fontSize: ResponsiveSize(14),
})
export const StyledAllProgramsTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary,
  },
}))
export const StyledAllProgramsTab = styled(Tab)({
  fontSize: ResponsiveSize(16),
  fontWeight: '600',
  textTransform: 'none',
  '&.Mui-selected': {
    color: '#222222',
  },
  paddingLeft: '0px',
  marginRight: '20px',
})
export const StyledButton = styled(Button)({
  width: ResponsiveSize(142),
  height: ResponsiveSize(40),
  background: "#422D87 0% 0% no-repeat padding-box",
  borderRadius: "4px",
  opacity: "1",

  // fontSize: 16,
  // padding: '4px 10px',
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#131471",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    // backgroundColor: 'black',
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export const TabLabelBox = styled(Box)({
  // borderBottom: 1,
  borderColor: "divider",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const StyledTab = styled(Tab)({
  padding: "0px",
  width:'fit-content',
  display:'content',
  marginRight: "40px",
  // font: "normal normal Bold 16px Montserrat, SemiBold",
  
  fontSize: ResponsiveSize(16),
  fontWeight: 'SemiBold',
  letterSpacing: "0px",
  color: "#222222",
  opacity: "2",
});

export const StyledHeader = styled(Typography)({
  height: ResponsiveSize(29),
  textAlign: "left",
  fontSize: ResponsiveSize(24),
  fontWeight: 'bold',
  letterSpacing: 0,
  padding:0,
  marginBottom: 28,
  color: "#222222",
  opacity: "1",
});

export const StyledOuterBox = styled(Box)({
  padding: 6,
  width: "100%",
});

export const BreadCrumb = styled(Typography)({
    fontSize: ' 12px',
    // margin:'12px',
    // justifyContent:'flex -start',
    // color:'red',

})

// `
//   text-decoration: none;

//   font-size: 12px;

//   color: #222222;
// ` as typeof Typography;
