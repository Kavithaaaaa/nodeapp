import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getArchivedTanents,
  getActiveTanents,
  getMyStats,
  getTimeZone,
} from "@/redux/clientSlice";
import { Tanents } from "@/types/tenants";

import { PageBox } from "@/styles";
import TenantsDashboard from "@/components/TenantsDashboard";

const ClientDashboard = (args: {
  activeTanents: Tanents;
  archiveData: Tanents;
  myStates: Tanents;
  timeZones: Tanents;
}) => {
  const { activeTanents, archiveData, myStates, timeZones } = args;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveTanents(activeTanents));
    dispatch(getArchivedTanents(archiveData));
    dispatch(getMyStats(myStates));
    dispatch(getTimeZone(timeZones));
  }, [activeTanents, archiveData, myStates, timeZones]);

  return (
    <PageBox>
      <TenantsDashboard />
    </PageBox>
  );
};

export default ClientDashboard;

export async function getServerSideProps() {
  let data, archiveData, myStates, timeZones;
  await axios.get("http://localhost:3050/tenants").then((resposne: any) => {
    data = resposne.data.data;
  });
  await axios
    .get("http://localhost:3050/tenants/getArchive")
    .then((resposne: any) => {
      archiveData = resposne.data.data;
    });
  await axios.get("http://localhost:3050/state").then((resposne: any) => {
    myStates = resposne.data.data;
  });
  await axios.get("http://localhost:3050/timezone").then((resposne: any) => {
    timeZones = resposne.data.data;
  });

  return {
    props: {
      activeTanents: data,
      archiveData: archiveData,
      myStates: myStates,
      timeZones: timeZones,
    },
  };
}
