import React from "react";
import { Tabs, Box, Divider } from "@mui/material/";
import useBreadCrumb from "@/common/components/breadcrumbs/breadkCrumbs";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../forms/createProgream";
import { Typography } from "@mui/material";
import {
  StyledTab,
  StyledButton,
  TabLabelBox,
  StyledHeader,
  StyledOuterBox,
  StyledCreateProgramButton,
  StyledAllProgramsTabs,
  StyledAllProgramsTab,
} from "@/styles";
import { stepsType } from "@/types/tenants";
import ResponsiveSize from "@/utils/responsiveSizes";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ marginTop: "20px" }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Navtab(args: {
  steps: stepsType;
  alertOpenHandle: (arg0: boolean, arg1: string) => void;
}) {
  const { steps, alertOpenHandle } = args;
  const [value, setValue] = React.useState<number>(0);
  const [createProgram, setcreateProgram] = React.useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handlercreateProgram = () => {
    setcreateProgram(!createProgram);
  };
  const { breadCrumb } = useBreadCrumb();
  type typebreadCrumb = {
    name: string;
    url: string;
  };
  type breadCrumbPathType = Array<typebreadCrumb>;
  const breadCrumbPath: breadCrumbPathType = [
    { name: "Manage", url: "/manage" },
    { name: "Clients (Tenants)", url: "" },
  ];
  return (
    <>
      {breadCrumb(breadCrumbPath)}
      <StyledOuterBox>
        <StyledHeader>All Clients (Tenants)</StyledHeader>
        <TabLabelBox>
          <StyledAllProgramsTabs
            value={value}
            onChange={handleChange}
            // textColor="primary"
            // style={{ width: "auto" }}
            // TabIndicatorProps={{
            //   style: {
            //     backgroundColor: "#D97D54",
            //     color: "#D97D54",
            //   },
            // }}
            aria-label="basic tabs example"
          >
            {steps.map(({ label }, index: number) => {
              return (
                <StyledAllProgramsTab
                  sx={{}}
                  key={index}
                  label={label}
                  {...a11yProps(index)}
                />
              );
            })}
          </StyledAllProgramsTabs>
          <StyledCreateProgramButton variant="contained"
          onClick={handlercreateProgram}>
          <AddIcon
            sx={{
              width: ResponsiveSize(24),
              height: ResponsiveSize(24),
            }}
          />
             Add client
        </StyledCreateProgramButton>
        </TabLabelBox>
        <Divider />
        <div>
          {steps.map(({ contentbody }, index: number) => {
            return (
              <TabPanel value={value} index={index} key={index}>
                {contentbody}
              </TabPanel>
            );
          })}
          {createProgram && (
            <div>
              <FormDialog
                open={createProgram}
                handlercreateProgram={handlercreateProgram}
                currentId={null}
                isArchived={false}
                alertOpenHandle={alertOpenHandle}
              />
            </div>
          )}
        </div>
      </StyledOuterBox>
    </>
  );
}
