import * as React from "react"
import CloseIcon from "@mui/icons-material/Close"
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined"
import { Box, Typography, Button } from "@mui/material"
import Formfirst from "./formfirst"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Formnext from "./formnext"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  addActiveTanents,
  updateActiveTanents,
  updateArchivedTanents,
} from "@/redux/clientSlice"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import {
  StyledDialog,
  StyledStepLabel,
  StyledStepdiv,
} from "./Styles/createProgramStyles"
import {
  StledDialogTitle,
  Stledtitlediv,
  StyledDialogActions,
  StyledDialogContent,
  StyledbottmbordeBox,
} from "@/styles"
import { MyErrorType } from "@/types/tenants"
import useAxios from "@/utils/useAxios"
import ResponsiveSize from "@/utils/responsiveSizes"

const initialState = {
  _id: "",
  type: "state",
  description: "",
  name: "",
  email: "",
  contactNumber: "",
  address: "",
  state: "",
  city: "",
  zipCode: "",
  timeZone: "",
  domainName: "",
  databaseName: "ffhf",
  clientLogo: "",
  accentColor: "",
  programs: [],
  stateRegion: "",
  additionalFeature: [],
}

export default function FormDialog(props: {
  handlercreateProgram: () => void
  open: boolean
  currentId: any
  alertOpenHandle: (arg0: boolean, arg1: string) => void
  isArchived: boolean
}) {
  const { alertOpenHandle } = props
  const { showLoader, axiosPost } = useAxios()
  const [loading, setLoading] = React.useState(false)
  const [stateSubmit, setStateSubmit] = React.useState(false)
  const [form, setForm] = React.useState(initialState)
  const [value, setValue] = React.useState(0)
  const [errors, setErrors] = React.useState<MyErrorType | {}>()
  const [activeStep, setActiveStep] = React.useState(0)
  const currentId = props.currentId
  const [isAlert, setIsAlert] = React.useState(false)
  const client = useSelector((state: any) => {
    let data
    if (currentId) {
      props.isArchived
        ? (data = state.tenants.archivedTanents.filter(
          (message: any) => message._id === currentId
        ))
        : (data = state.tenants.activeTanents.filter(
          (message: any) => message._id === currentId
        ))

      return data
    }
  })
  const setErrorHandler = (key: string, value: boolean) => {
    setErrors({ ...errors, [key]: value })
  }
  const setFormVlaueHandler = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }
  React.useEffect(() => {
    if (client) {
      setForm(client[0])
    }
  }, [currentId])
  const isStepOptional = (step: number) => {
    return step === 1
  }
  const dispatch = useDispatch()

  const handleChange = () => {
    setErrors({})
    type errorsType = {
      element: string
      val: Boolean
    }
    type errorProp = {}
    const erros: any = {}

    if (form.description.length < 2) {
      erros["descriptionError"] = true
    }
    if (form.name.length < 2) {
      erros["nameError"] = true
    }
    if (form.email.length < 2) {
      erros["emailError"] = true
    }
    if (form.contactNumber.length < 2) {
      erros["contactNumberError"] = true
    }
    if (form.address.length < 2) {
      erros["addressError"] = true
    }
    if (form.state.length < 2) {
      erros["stateError"] = true
    }
    if (form.stateRegion.length < 2) {
      erros["stateRegionError"] = true
    }
    if (form.city.length < 2) {
      erros["cityError"] = true
    }
    if (form.zipCode.length < 2) {
      erros["zipCodeError"] = true
    }
    if (form.timeZone.length < 2) {
      erros["timeZoneError"] = true
    }
    if (form.domainName.length < 2) {
      erros["domainNameError"] = true
    }
    if (Object.keys(erros).length != 0) {
      setErrors(erros)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setValue(1)
    }
  }
  const handleChangeback = () => {
    setValue(0)
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleClickOpen = () => {
    // setOpen(true);
    // handlercreateProgram()
    props.handlercreateProgram()
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const erros: any = {}
    if (form.clientLogo.length < 1) {
      erros["clientLogoError"] = true
    }
    if (form.accentColor.length < 1) {
      erros["accentColorError"] = true
    }
    if (Object.keys(erros).length != 0) {
      setErrors(erros)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setValue(1)
      const strProgramValue = form.programs.join(",")
      const strAdditionalFeature = form.additionalFeature.join(",")
      let data = new FormData()
      {
        currentId && data.append("_id", form._id)
      }
      data.append("type", "state")
      data.append("description", form.description)
      data.append("name", form.name)
      data.append("email", form.email)
      data.append("contactNumber", form.contactNumber)
      data.append("address", form.address)
      data.append("state", form.state)
      data.append("city", form.city)
      data.append("zipCode", form.zipCode)
      data.append("timeZone", form.timeZone)
      data.append("domainName", form.domainName)
      data.append("databaseName", form.databaseName)
      data.append("accentColor", form.accentColor)
      data.append("programs", strProgramValue)
      data.append("additionalFeature", strAdditionalFeature)
      data.append("clientLogo", form.clientLogo)
      data.append("stateRegion", form.stateRegion)
      setStateSubmit(true)
      setLoading(true)
      if (currentId) {
        await axios
          .put(`http://localhost:3050/tenants/${currentId}`, data)
          .then((v) => {
            setLoading(false)
            props.isArchived
              ? dispatch(updateArchivedTanents(v.data.data[0]))
              : dispatch(updateActiveTanents(v.data.data[0]))
          })
      } else {
        await axios.post("http://localhost:3050/tenants/", data).then((v) => {
          setLoading(false)
          dispatch(addActiveTanents(v.data.data[0]))
        })
      }

      handleClose()
      alertOpenHandle(
        true,
        `${form.state} ${currentId ? " Added" : " Updated"}`
      )
    }
  }
  const handleClose = () => {
    // setOpen(false);
    props.handlercreateProgram()
  }
  const steps = [
    {
      label: "Basic Details ",
      contentbody: (
        <Formfirst
          form={form}
          errors={errors}
          setFormVlaueHandler={setFormVlaueHandler}
          setErrorHandler={setErrorHandler}
        />
      ),
    },
    {
      label: "Programs and Features",
      contentbody: (
        <Formnext
          form={form}
          errors={errors}
          setFormVlaueHandler={setFormVlaueHandler}
        />
      ),
    },
  ]

  return (
    <StyledDialog open={props.open} onClose={handleClose}>
      {loading && showLoader(loading)}
      <StledDialogTitle>
        <Stledtitlediv>
          <Typography
            style={{
              fontWeight: "bold",
              color: "#222222",
              margin: "0px",
              fontSize: ResponsiveSize(24),
            }}
          >
            {" "}
            Add Client{" "}
          </Typography>
          <Button
            variant="text"
            style={{
              position: "absolute",
              right: "0px",
            }}
            onClick={handleClickOpen}
          >
            <CloseIcon />
          </Button>
        </Stledtitlediv>

        <StyledbottmbordeBox>
          <Stepper
            activeStep={activeStep}
            connector={
              <KeyboardArrowRightOutlinedIcon
                fontSize="small"
                style={{
                  color: "#999999",
                  marginRight: "21px",
                }}
              />
            }
          >
            {steps.map(({ label, contentbody }, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}
              return (
                <Step key={label} {...stepProps}>
                  <StyledStepdiv
                    style={{
                      borderBottom: `${index == activeStep
                        ? "2px solid #D97D54"
                        : "2px solid black"
                        }`,
                    }}
                  >
                    <StyledStepLabel
                      sx={{
                        fontWeight: "600",
                        fontSize: ResponsiveSize(16),
                      }}
                      {...labelProps}
                    >
                      {label}{" "}
                    </StyledStepLabel>
                  </StyledStepdiv>
                </Step>
              )
            })}
          </Stepper>
        </StyledbottmbordeBox>
      </StledDialogTitle>
      <StyledDialogContent>
        {steps.map(({ label, contentbody }: any, index: any) => {
          return (
            <TabPanel value={value} index={index} key={index}>
              {contentbody}
            </TabPanel>
          )
        })}
      </StyledDialogContent>
      <StyledDialogActions>
        <br />

        <Button
          variant={value == 0 ? "contained" : "outlined"}
          endIcon={value == 0 ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
          onClick={value == 0 ? handleChange : handleChangeback}
        >
          {value == 0 ? "continue" : " Previous"}
        </Button>
        {value != 0 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={stateSubmit}
          >
            Submit
          </Button>
        )}
      </StyledDialogActions>
    </StyledDialog>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
