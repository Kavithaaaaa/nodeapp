import { SyntheticEvent, useEffect, useState } from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { InputAdornment, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import validator from 'validator'
import Input from "./input"
import axios from "axios"
import { SyntheticExpression } from "typescript"
import Tooltipfutn from "./tooTip"
import ResponsiveSize from "@/utils/responsiveSizes"

type firstFormProps = {
  handleChangeFor: () => void
}
type Function = () => void
export default function Formfirst(args: {
  errors: any
  form: any
  setFormVlaueHandler: any
  setErrorHandler: any
}) {
  const { errors, form, setFormVlaueHandler, setErrorHandler } = args
  const [validationText, setValitaionText] = useState("")
  const [myRegion, setMyRegion] = useState([{ _id: "", name: "" }])
  const Mystate = useSelector((state: any) => state.tenants.myStates)
  const myTimeZone = useSelector((state: any) => state.tenants.timeZones)
  let formState
  const getState = async (id: number) => {
    await axios
      .get(`http://localhost:3050/state/${id}`)
      .then((res) => {
        setMyRegion(res.data.data[0].cities)
      })
    console.log("---+", myRegion)

  }

  useEffect(() => {
    formState = Mystate.find((v: { name: string }) => v.name === form?.state)
    const id = formState?._id
    id && getState(id)
  }, [form?.state])

  const checkboxHandler = (e: { target: { name: string; value: boolean } }) => {
    setFormVlaueHandler(e.target.name, e.target.value)
  }

  const handleChangeAutocomplete = (arg: string, v: string) => {
    setErrorHandler(`${v}Error`, false)
    setFormVlaueHandler(v, arg)
  }

  const handleChangeForm = (e: {
    target: { name: string; value: string | number | boolean }
  }) => {
    setErrorHandler(`${e.target.name}Error`, false)
    setValitaionText("")
if(e.target.name =="contactNumber"){
 if(!validator.isMobilePhone(e.target.value)){
    setErrorHandler(`${e.target.name}Error`, true)
    setValitaionText("Please provide valid phone number")
}

} else if(e.target.name=="email"){
if(!validator.isEmail(e.target.value) && e.target.value.length>4 ){
  setErrorHandler(`${e.target.name}Error`, true)
  setValitaionText("Email is invalid")
}
}
 
  
    setFormVlaueHandler(e.target.name, e.target.value)
  }

  return (
    <FormControl style={{ marginLeft: "-21px" }}>
      <Typography
        sx={{
          fontSize: ResponsiveSize(12),
          fontWeight: 600,
          letterSpacing: "0px",
          color: "#222222",
          width: "100%",
          textTransform: "uppercase",
        }}
      >
        CLIENT
      </Typography>
      <br />
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{
          fontSize: ResponsiveSize(12),
          width: "28px",
          height: "15px",
          color: "#222222",
        }}
      >
        Type
      </FormLabel>
      <RadioGroup
        sx={{ marginLeft: "10px" }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="type"
        defaultValue={"state"}
      >
        <FormControlLabel
          value="state"
          // onChange={checkboxHandler}
          control={<Radio />}
          label="State"
        />
        {/* <FormControlLabel
          value="local"
          onChange={checkboxHandler}
          control={<Radio />}
          label="local"
        /> */}
      </RadioGroup>
      <br />

      <Autocomplete
        id="combo-box-demo"
        options={Mystate}
        getOptionLabel={(option) => option.name}
        style={{ width: "92%" }}
        value={
          formState
          || {
            name: form?.state,
          }
        }
        onChange={(e: SyntheticEvent<EventTarget>, v) => {
          v && getState(v._id),
            v && handleChangeAutocomplete(v.name, "state")
        }}
        renderInput={(params) => (
          <TextField
            error={errors?.stateError}
            // helperText="Example error"
            name="state"
            {...params}
            autoComplete="off"
            label="State"
            variant="outlined"
          />
        )}
      />
      <br />
      <TextField
        style={{ width: "92%" }}
        error={errors?.descriptionError}
        id="outlined-multiline-static"
        label="Desicription (Optional)"
        multiline
        autoComplete="off"
        rows={4}
        defaultValue="Enter"
        name="description"
        onChange={handleChangeForm}
        value={form?.description}
      />

      <br />
      <Typography
        style={{ width: "92%" }}
        sx={{
          fontSize: ResponsiveSize(12),
          fontWeight: 600,
          letterSpacing: "0px",
          color: "#222222",
          textTransform: "uppercase",
        }}
      >
        {" "}
        ADMINISTRATOR
      </Typography>

      <br />

      <TextField
        error={errors?.nameError}
        style={{ width: "92%" }}
        name="name"
        onChange={handleChangeForm}
        variant="outlined"
        autoComplete="off"
        required
        fullWidth
        label="Name"
        value={form?.name}
      />
      <br />

      <TextField
        variant="outlined"
        style={{ width: "92%" }}
        autoComplete="off"
        required
        fullWidth
        name="email"
        helperText={validationText}
        label="Email Address"
        onChange={handleChangeForm}
        error={errors?.emailError}
        value={form?.email}
      />
      <br />
      <TextField
        variant="outlined"
        style={{ width: "92%" }}
        autoComplete="off"
        required
        fullWidth
        name="contactNumber"
        label="Contact"
        helperText={validationText}
        onChange={handleChangeForm}
        error={errors?.contactNumberError}
        value={form?.contactNumber}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span style={{ color: "#222222" }}>+1</span>
            </InputAdornment>
          ),
        }}
      />

      <br />
      <TextField
        variant="outlined"
        style={{ width: "92%" }}
        autoComplete="off"
        required
        fullWidth
        name="address"
        label="Address"
        onChange={handleChangeForm}
        error={errors?.addressError}
        value={form?.address}
      />
      <br />
      <Autocomplete
        style={{ width: "92%" }}
        disabled={myRegion ? false : true}
        onError={errors?.stateError}
        disablePortal
        id="combo-box-demo"
        options={myRegion}
        getOptionLabel={(option) => option.name}
        value={(form?.stateRegion && myRegion) && myRegion?.find((v) => v.name === form?.stateRegion)
          || {
          name: form?.stateRegion,
        }}
        onChange={(e: SyntheticEvent<EventTarget>, v: any) => {
          v && handleChangeAutocomplete(v.name, "stateRegion")
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={errors?.stateRegionError}
            label="State/Region"
            autoComplete="off"
            helperText={myRegion ? "" : "Please Select State"}
          />
        )}
      />
      <br />
      <div
        style={{
          width: "92%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <TextField
          variant="outlined"
          required
          autoComplete="off"
          fullWidth
          name="city"
          label="City"
          onChange={handleChangeForm}
          error={errors?.cityError}
          value={form?.city}
        />

        <TextField
          variant="outlined"
          autoComplete="off"
          required
          fullWidth
          name="zipCode"
          label="Zip code"
          onChange={handleChangeForm}
          error={errors?.zipCodeError}
          value={form?.zipCode}
        />
      </div>
      <br />
      <Autocomplete
        style={{ width: "92%" }}
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(option) => option.text}
        onError={errors?.timeZoneError}
        options={myTimeZone}
        value={myTimeZone?.find((v: { text: string }) =>v.text == form?.timeZone)||
        {
          name:form?.timeZone,
        }}
        onChange={(e: SyntheticEvent<EventTarget>, v: any) => {
          v && handleChangeAutocomplete(v.text, "timeZone")
        }}
        renderInput={(params) => <TextField
          error={errors?.timeZoneError}
          autoComplete="off"
          {...params}
          label="TimeZone" />}
      />
      <br />

      {/* </ListItem> */}
      <Typography
        sx={{
          fontSize: ResponsiveSize(12),
          fontWeight: 600,
          letterSpacing: "0px",
          color: "#222222",
          width: "100%",
          textTransform: "uppercase",
        }}
      >
        DOMAIN
      </Typography>

      <br />
      <div style={{ display: "flex", width: "100%" }}>
        <TextField
          variant="outlined"
          autoComplete="off"
          required
          fullWidth
          name="domainName"
          label="DNS/Domain Name"
          onChange={handleChangeForm}
          error={errors?.domainNameError}
          value={form?.domainName}
        />

        <Tooltipfutn value="Text explaining stuff" />
      </div>
      <br />
      <div style={{ display: "none", width: "100%" }}>
        <TextField
          variant="outlined"
          required
          fullWidth
          autoComplete="off"
          name="databaseName"
          label="Database Name"
          onChange={handleChangeForm}
          error={errors?.databaseNameError}
          value={form?.domainName}
        />


        <Tooltipfutn value="Text explaining stuff" />
      </div>
    </FormControl>
  )
}

