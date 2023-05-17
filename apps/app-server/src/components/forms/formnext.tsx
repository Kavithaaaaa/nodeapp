import { useEffect, useState, SyntheticEvent } from "react"
import Brightness1Icon from "@mui/icons-material/Brightness1"
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined"
import {
  Checkbox, FormGroup, FormControlLabel, Autocomplete, ListItem, List, Box,
  TextField, FormLabel, FormControl
} from "@mui/material"
import {
  Button,
  InputAdornment,
  Typography,
} from "@mui/material"
import { useDispatch } from "react-redux"
import { FileInputTextFields } from "./Styles/formNextStyles"
import Tooltipfutn from "./tooTip"
import ResponsiveSize from '@/utils/responsiveSizes'


export default function Formnext(args: {
  errors: any
  form: any
  setFormVlaueHandler: any
}) {
  const { errors, form, setFormVlaueHandler } = args
  const [programsArr, setProgramsArr] = useState<string[]>([])
  const [additionalFeatureArr, setAdditionalFeatureArr] = useState<string[]>(
    []
  )
  const [programs, setPrograms] = useState<object>({
    "Career services": false,
    Curriculum: false,
    Integrations: false,
  })
  const [AdditionalFeature, setAdditionalFeature] = useState({
    "Life Skills": false,
    "Professional Devolvement": false,
    Assessments: false,
    Toolkit: false,
    "data + Reporting": false,
  })
  const dispatch = useDispatch()
  const myColors = [{ name: "Blue" }, { name: "Green" }]

  var newSetPrograms = programs
  var newsetAdditionalFeature = AdditionalFeature
  useEffect(() => {
    console.log("---setProgramsArr 0", form?.programs)
    Object.keys(programs).forEach((text) => {
      form?.programs.includes(text) &&
        (newSetPrograms = { ...newSetPrograms, [text]: true })
    })
    setPrograms(newSetPrograms)
    setProgramsArr(form?.programs)

    Object.keys(AdditionalFeature).forEach((text) => {
      form?.additionalFeature.includes(text) &&
        (newsetAdditionalFeature = {
          ...newsetAdditionalFeature,
          [text]: true,
        })
    })
    setAdditionalFeature(newsetAdditionalFeature)
    setAdditionalFeatureArr(form?.additionalFeature)
  }, [])
  console.log("---setProgramsArr 1", programsArr)
  useEffect(() => {
    setFormVlaueHandler("programs", programsArr)
  }, [programsArr])
  useEffect(() => {
    setFormVlaueHandler("additionalFeature", additionalFeatureArr)
  }, [additionalFeatureArr])

  const handleChangeAutocomplete = (arg: string, v: string) => {
    setFormVlaueHandler(v, arg)
  }

  const handleChecboxPrograms = (e: any) => {
    let name = e.target.name

    !programsArr.includes(name)
      ? setProgramsArr([...programsArr, name])
      : setProgramsArr(programsArr.filter((v) => v != name))

    setPrograms({ ...programs, [e.target.name]: e.target.checked })
  }
  const handleChecboxAdditionalFeature = (e: any) => {
    let name = e.target.name

    additionalFeatureArr.includes(name)
      ? setAdditionalFeatureArr(additionalFeatureArr.filter((v) => v != name))
      : setAdditionalFeatureArr([...additionalFeatureArr, name])

    setAdditionalFeature({
      ...AdditionalFeature,
      [e.target.name]: e.target.checked,
    })
    setFormVlaueHandler("additionalFeature", additionalFeatureArr)
  }

  const handleChangeImag = (e: any) => {
    setFormVlaueHandler("clientLogo", e.target.files[0])
  }
  return (
    <FormControl style={{ marginLeft: "-21px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography
            style={{
              fontWeight: "bold",
            }}
          >
            {" "}
            {form.state}(State){" "}
          </Typography>
          <Typography>{form.stateRegion}xyz Zone </Typography>
        </div>
        {/* <Button
          variant="text"
          // style={{ marginRight: "0px", position: "absolute", right: "10px" }}
        >
          <InventoryOutlinedIcon />
        </Button>{" "} */}
      </div>
      <br />

      <div>
        <FormControl
          style={{ display: "flex", flexDirection: "row" }}
          error={errors?.clientLogoError}
        >
          <FileInputTextFields
            // required
            sx={{ border: `${errors?.clientLogoError && "1px solid red"}` }}
            error={errors?.clientLogoError}
            disabled={form.clientLogo ? true : true}
            fullWidth
            id="outlined-required"
            label={<div>Client Logo</div>}
            value={form.clientLogo?.name}
            defaultValue={form.clientLogo}
          />
          <label htmlFor="upload-photo">
            <div>
              <input
                style={{ display: "none" }}
                id="upload-photo"
                type="file"
                onChange={handleChangeImag}
              />

              <Button
                sx={{
                  height: "54px",
                  color: "blue",
                  backgroundColor: "gray",
                  borderRadius: "0px 5px 5px 0px",
                  background: "#F9F7F4",
                  border: " 1px solid #888888",
                }}
                color="secondary"
                variant="contained"
                component="span"
                onChange={handleChangeImag}
              >
                Browse
              </Button>
            </div>
          </label>
          <Tooltipfutn value="Text explaining stuff" />
        </FormControl>
      </div>
      <br />

      <div style={{ display: "flex", width: "424px" }}>
        <Autocomplete
          sx={{ width: "100%" }}
          id="combo-box-programs"
          options={myColors}
          value={
            myColors.find(
              (v: { name: string }) => v.name === form?.accentColor
            ) || {
              name: form?.accentColor,
            }
          }
          getOptionLabel={(option) => option.name}
          onChange={(e: SyntheticEvent<EventTarget>, v: any) => {
            v && handleChangeAutocomplete(v.name, "accentColor")
          }}
          renderInput={(params) => (
            <TextField
              error={errors?.accentColorError}
              {...params}
              variant="outlined"
              label="Accent Color per Brand"
              name="Accent Color per Brand"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    {form.accentColor ? (
                      <Brightness1Icon
                        style={{ color: `${form.accentColor}` }}
                      />
                    ) : (
                      <Brightness1OutlinedIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Tooltipfutn value="Text explaining stuff" />
      </div>

      <br />
      <FormLabel
        id="programs-row-radio-buttons-group-label"
        sx={{
          fontSize: ResponsiveSize(12),
          fontWeight: 600,
          textTransform: "uppercase",
          color: "#222222",
        }}
      >
        PROGRAMS/SERVICES
      </FormLabel>
      <FormGroup>
        <Box sx={{ margin: "10px" }}>
          <List>
            {Object.keys(programs).map((text, index) => (
              <ListItem key={text} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={programs[text]}
                      onChange={handleChecboxPrograms}
                      name={text}
                    />
                  }
                  label={text}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </FormGroup>
      <FormLabel
        id="programs-row-radio-buttons-group-label"
        sx={{
          fontSize: ResponsiveSize(12),
          fontWeight: 600,
          textTransform: "uppercase",
          color: "#222222",
        }}
      >
        ADDITIONAL FEATURES
      </FormLabel>
      <FormGroup>
        <Box sx={{ margin: "10px" }}>
          <List>
            {Object.keys(AdditionalFeature).map((text, index) => (
              <ListItem key={text} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={AdditionalFeature[text]}
                      // checked={form?.additionalFeature?.includes(text)}
                      onChange={handleChecboxAdditionalFeature}
                      name={text}
                    />
                  }
                  label={text}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </FormGroup>
    </FormControl>
  )
}
