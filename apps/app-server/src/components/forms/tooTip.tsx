import React from "react";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
function Tooltipfutn({ value }: any) {
  return (
    <Tooltip
      title={value}
      placement="top-start"
      sx={{ margin: "auto", marginLeft: "10px" }}
    >
      <HelpOutlineOutlinedIcon />
    </Tooltip>
  );
}

export default Tooltipfutn;
