import React, { useState } from "react";
import SideDialogpage from "./sideDialog";
import Navtab from "./Tab/navTab";
import { Grid } from "@mui/material";
import useAllertMessage from "@/common/components/breadcrumbs/useAllertMessage";
import { stepsType } from "@/types/tenants";
import { useSelector } from "react-redux";
function TenantsDashboard() {
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertMessage, setIsAlertMessage] = useState("");
  const alertOpenHandle = (staus: boolean, msg: string) => {
    setIsAlertMessage(msg);
    setIsAlert(staus);
  };
  const alertCloseHandle = (staus: boolean) => {
    setIsAlert(staus);
  };
  const storeAciveTanents = useSelector(
    (state: any) => state.tenants.activeTanents
  );
  const storeArchivedTanents = useSelector(
    (state: any) => state.tenants.archivedTanents
  );
  const { alertMessage } = useAllertMessage();
  const steps: stepsType = [
    {
      label: `Active (${storeAciveTanents?.length})`,
      contentbody: (
        <SideDialogpage
          isAchrivPage={false}
          alertOpenHandle={alertOpenHandle}
        />
      ),
    },
    {
      label: `Archived (${storeArchivedTanents?.length})`,
      contentbody: (
        <div>
          <SideDialogpage
            isAchrivPage={true}
            alertOpenHandle={alertOpenHandle}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Navtab steps={steps} alertOpenHandle={alertOpenHandle} />
      {isAlert && (
        <Grid sx={{ position: "absolute", top: "20%", width: "30%",left:'32%' }}>
          {alertMessage(
            alertCloseHandle,
            isAlert,
            "Success",
            `${isAlertMessage} successfully.`
          )}
        </Grid>
      )}
    </>
  );
}

export default TenantsDashboard;
