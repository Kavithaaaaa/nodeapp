import Button, { ButtonProps } from '@mui/material/Button'
import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import StepLabel from '@mui/material/StepLabel'
import { styled } from '@mui/system'
import { Dialog } from '@mui/material'
import ResponsiveSize from '@/utils/responsiveSizes'

export const StyledStepLabel = styled(StepLabel)({
  boxShadow: 'none',
  // MuiStepLabel-label class="MuiStepLabel-label Mui-active css-1hv8oq8-MuiStepLabel-label"
  // color: 'red', class="MuiStepLabel-label Mui-disabled css-1hv8oq8-MuiStepLabel-label"
  // MuiStepLabel-root MuiStepLabel-horizontal css-19hm472-MuiStepLabel-root class="MuiStepLabel-iconContainer Mui-disabled css-vnkopk-MuiStepLabel-iconContainer"

  '& .MuiStepLabel-root': {
    height: "18px",

    fontWeight: '600',
    fontSize: ResponsiveSize(14),
  },
  '&.MuiStepLabel-iconContainer': {

  },
  '& .Mui-active': {
    '&. MuiSvgIcon-root': {
      color: '#222222',
    },
    // width: "151px",
    // backgroundColor:'#222222',
    color: '#222222',
  },
  '& .Mui-disabled': {
    '&. MuiSvgIcon-root': {
      color: '#422D87',
    },
    '&.MuiStepIcon-root': {
      color: '#422D87',
      backgroundColor: '#422D87',
    },

    color: '#422D87',
  },
  // css-1hv8oq8-MuiStepLabel-label
  root: {
    marginTop: 0,
    padding: 0,
    "& $alternativeLabel": {
      marginTop: 0,
      backgroundColor: "green",
    }
  },
  labelContainer: {
    backgroundColor: "green",
    marginTop: 0,
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  myLabel: {
    backgroundColor: "red",
    marginTop: 0,
    "& $alternativeLabel": {
      marginTop: 0,
      backgroundColor: "green",
    }
  },


})
export const StyledStepdiv = styled("div")({
  display: 'flex',
  paddingTop: '21px',
  paddingBottom: '21px',
  marginLeft: '-7%',
  width: 'auto',
  marginRight: '7%',
})
export const TabLabelBox = styled(Box)({
  borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
})

export const StyledDialog = styled(Dialog)({
  width: '100%',
  // marginLeft:'30%',
  boxShadow: '0px 0px 23px #0000000A',
  borderRadius: '8px',
  opacity: '1',
  padding: '0px'
})
