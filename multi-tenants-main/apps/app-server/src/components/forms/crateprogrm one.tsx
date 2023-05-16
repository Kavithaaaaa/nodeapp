import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import Formfirst from './formfirst'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Formnext from './formnext'
import AlertMessage from './alertMessage'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addActiveTanents, updateActiveTanents } from '@/redux/clientSlice'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { StyledDialog, StyledStepLabel, StyledStepdiv } from './Styles/createProgramStyles'
import { type } from 'os'
import { current } from '@reduxjs/toolkit'
import ResponsiveSize from '@/utils/responsiveSizes'
const initialState = {
  type: "",
  description: "",
  name: "",
  email: "",
  contactNumber: '',
  address: "",
  state: "",
  city: "",
  zipCode: '',
  timeZone: "",
  domainName: "",
  databaseName: "",
  clientLogo: "logodefault",
  accentColor: "",
  programs: [],
  additionalFeature: []
}



export default function FormDialog(props: { handlercreateProgram: () => void; open: boolean; currentId: any }) {
  const [form, setForm] = React.useState(initialState)
  const [value, setValue] = React.useState(0)
  type MyErrorType = { Object: [Array<string>, boolean] }
  const [errors, setErrors] = React.useState({ "typeError": false })
  const [activeStep, setActiveStep] = React.useState(0)
  const currentId = props.currentId
  const client = useSelector((state: any) => {
    if (currentId) {
      return state.tenants.activeTanents.filter((message: any) => message._id === currentId)
    }
  })
  const setErrorHandler = (key: string, value: boolean) => {
    console.log("--->")

    setErrors({ ...errors, [key]: value })
  }
  const setFormVlaueHandler = (name: string, value: string) => {
    console.log("----setFormVlaueHandler", name, value)

    setForm({ ...form, [name]: value })
  }
  React.useEffect(() => {
    if (client) { setForm(client[0]) }
    console.log("---+++++>cuid", form, client)
  }, [currentId])

  // const post = useSelector((state) => { 
  //   if (currentId) { state.posts.posts.find((message) => message._id === currentId) } });

  // const classs= stylesLab()
  const isStepOptional = (step: number) => {
    return step === 1
  }
  const dispatch = useDispatch()

  const handleChange = () => {
    console.log("---->", form)
    setErrors([])
    type errorsType = {
      element: string, val: Boolean
    }
    type errorProp = {}
    const erros: any = {}


    // if (form.type.length < 1) { erros["typeError"] = true }
    // if (form.description.length < 2) { erros["descriptionError"] = true }
    // if (form.name.length < 2) {erros["nameError"] = true;}
    // if (form.email.length < 2) { erros["emailError"] = true; }
    // if (form.contactNumber.length < 2) { erros["contactNumberError"] = true; }
    // if (form.address.length < 2) { erros["addressError"] = true; }
    // if (form.state.length < 2) { erros["stateError"] = true; }
    // if (form.city.length < 2) { erros["cityError"] = true; }
    // if (form.zipCode.length < 2) { erros["zipCodeError"] = true; }
    // if (form.timeZone.length < 2) { erros["timeZoneError"] = true; }
    // if (form.domainName.length < 2) { erros["domainNameError"] = true; }
    // if (form.databaseName.length < 2) { erros["databaseNameError"] = true; }
    // if (erros.length != 0) {
    //   setErrors(erros)
    // //   console.log("------error", erros, errors);
    // } else {
    console.log("------error else", erros, errors)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setValue(1)
    // }
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
    // <AlertMessage value={true}/>

    e.preventDefault()
    // const erros: any = {};
    // if (form.clientLogo.length < 1) { erros["clientLogo"] = true }
    // if (form.accentColor.length < 1) { erros["accentColor"] = true }
    // if (form. programs.length < 1) { erros[" programs"] = true }
    // if (form.additionalFeature.length < 1) { erros["additionalFeature"] = true }
    // console.log("---wf", form);
    // if (erros.length != 0) {
    //   setErrors(erros)
    //   console.log("------error", erros, errors);


    // } else {
    //   console.log("------error else", erros, errors);
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   setValue(1);
    console.log("--form---", form)
    if (currentId) {
      console.log("---put--1", currentId, form)
      await axios.put(`http://localhost:3050/tenants/${currentId}`, form).then((v) => {
        console.log("---put", v)
        dispatch(updateActiveTanents(form))
      })

    } else {
      console.log("---put--not")
      // await axios.post("http://localhost:3050/tenants/", {
      //   type: "State1",
      //   description: "2",
      //   name: "c",
      //   email: "abc@abc.com",
      //   contactNumber: 12345,
      //   address: "abc adress",
      //   state: "abcstate",
      //   city: "abc city",
      //   zipCode: 1234,
      //   timeZone: "est",
      //   domainName: "domainabc",
      //   databaseName: "dbname",
      //   clientLogo: "log.svg",
      //   accentColor: "colrred1",
      //   programs: ["Career services"],
      //   additionalFeature: ["Toolkit"]
      // }).then((v) => {
      //   console.log("poestred", v);
      //   dispatch(addActiveTanents(v.data));

      //   //   // dispatch(getActiveTanents(v.data))

      // })
    }

    // handleClose()
    // }



  }
  const handleClose = () => {
    // setOpen(false);
    props.handlercreateProgram()
  }
  const steps = [{
    label: 'Basic Details ',
    contentbody:

      <Formfirst
        form={form}
        errors={errors} setFormVlaueHandler={setFormVlaueHandler} setErrorHandler={setErrorHandler}
      />,

  },
  {
    label: 'Programs and Features',
    contentbody:
      <Formnext form={form} errors={errors} setFormVlaueHandler={setFormVlaueHandler}
      />,

  },]


  return (

    <StyledDialog open={props.open} onClose={handleClose}>
      <DialogTitle sx={{
      }}>
        <div style={{
          display: 'flex',
          // marginTop:'0px/', 
          position: 'relative',
          // marginLeft: '2%'
        }}>
          <Typography style={{
            fontWeight: 'bold',
            color: '#222222',
            fontSize: ResponsiveSize(24),
          }}> Add Client </Typography>
          <Button variant="text"

            style={{
              marginRight: '-10px',
              position: 'absolute',
              right: '0px',
              width: '2px'
            }}
            onClick={handleClickOpen}>
            <CloseIcon />
          </Button> </div>

        <Box
          sx={{
            borderBottom: 1,
            padding: '0px',
          }}
        >
          {/* <Tabs value={value}  aria-label="basic tabs example"> */}
          <Stepper activeStep={activeStep}
            connector={< KeyboardArrowRightOutlinedIcon fontSize='small' style={{
              color: "#999999",
              // marginLeft: '-10px',
              //  marginRight: '30px'
            }}
            />}>
            {steps.map(({ label, contentbody }, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}

              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption"></Typography>
                )
              }
              return (

                <Step key={label} {...stepProps}>
                  <StyledStepdiv
                    // <StyledStepdiv
                    style={{
                      borderBottom: `${index == activeStep ? '2px solid #D97D54' : '2px solid black'}`,


                    }}
                  >
                    <StyledStepLabel sx={{
                      fontWeight: '600',
                      fontSize: ResponsiveSize(16),
                    }}  {...labelProps}>{label} </StyledStepLabel>
                  </StyledStepdiv>


                </Step>




              )
            })}
          </Stepper>
          {/* </Tabs> */}

        </Box>

      </DialogTitle>
      <DialogContent
      // sx={{width: '530px',}}
      >
        {/* <MultyTabForm/> */}
        {/* <StepperForm  handleClose={handleClose}/> */}

        {steps.map(({ label, contentbody }: any, index: any) => {
          return (
            <TabPanel key={index} value={value} index={index}>
              {contentbody}
            </TabPanel>
          )
        })}

      </DialogContent>
      <DialogActions

        sx={{
          display: 'block',

        }}>
        <Box
          sx={{
            // display: 'grid',
            paddingBottom: '0%',
            margin: '5%',
            borderTop: 1,
            padding: '0px',
          }}
        >






          <Divider sx={{ width: "490px", margin: 'auto' }} />
          <br />
          <Button
            variant={value == 0 ? "contained" : "outlined"}
            endIcon={value == 0 ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}

            onClick={value == 0 ? handleChange : handleChangeback}
          >
            {value == 0 ? "continue" : " Previous"}
          </Button>
          {value != 0 &&
            <Button variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>}
          {/* </div> */}

        </Box >

      </DialogActions>



    </StyledDialog>
    // </div>
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
    'aria-controls': `simple-tabpanel-${index}`,
  }
}




