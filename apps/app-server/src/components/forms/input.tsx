import React from "react";

import { TextField, InputAdornment, FormHelperText } from "@mui/material";

export default function Input(props: any) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    placeholderText,
    ...other
  } = props;

  return (
    <TextField
      variant="outlined"
      id="input-with-icon-textfield"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      sx={{
        "& .Mui-error": {
          margin: "0px",
        },
      }}
      {...other}
      {...(error && { error: true, helperText: error })}
      fullWidth
      placeholder={placeholderText}
      InputProps={{
        startAdornment: name === "contactNumber" && (
          <InputAdornment position="start">
            <span style={{ color: "#222222" }}>+1</span>
          </InputAdornment>
        ),
      }}
    />
  );
}
