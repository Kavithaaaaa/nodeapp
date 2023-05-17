import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined"
import IconButton from "@mui/material/IconButton"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import FilterListIcon from "@mui/icons-material/FilterList"
import { useDispatch } from "react-redux"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  List,
  Drawer,
  Box,
} from "@mui/material"
import Cardposts from "./cards/cards"
import {
  DrawerHeader,
  Styledpbold,
  StyledFormGroup,
  Styledp,
  Tabdiv,
  StyledClosebtn,
  StyledCreateProgramButton,
  StyledAplyFilterButton,
} from "@/styles"
import axios from "axios"
import {
  filterActiveTanents,
  filterArchivedTanents,
  getActiveTanents,
  getArchivedTanents,
} from "@/redux/clientSlice"
const drawerWidth = 340

const MainDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
}))

export default function SideDialogpage(args: {
  isAchrivPage: boolean
  alertOpenHandle: (arg0: boolean, arg1: string) => void
}) {
  const { isAchrivPage, alertOpenHandle } = args
  const theme = useTheme()
  const [open, setOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const searchActivetenants = async (query: string) => {
    const resposne = await axios.get(
      `http://localhost:3050/tenants/search?query=${query}`
    )
    const data = resposne.data.data
    dispatch(getActiveTanents(data))
  }
  const searchArchivedTenants = async (query: string) => {
    const resposne = await axios.get(
      `http://localhost:3050/tenants/searchArchive?query=${query}`
    )
    const data = resposne.data.data
    dispatch(getArchivedTanents(data))
  }
  const handlerSearch = (e: any) => {
    isAchrivPage
      ? searchArchivedTenants(e.target.value)
      : searchActivetenants(e.target.value)
  }

  var filterArray: any = []
  const handleChangeFilter = (e: any) => {
    if (e.target.checked == true) {
      filterArray.push(e.target.name)
    } else {
      filterArray = filterArray.filter((v: any) => v != e.target.name)
    }
  }

  const handleSaveFilter = () => {
    isAchrivPage
      ? dispatch(filterArchivedTanents(filterArray))
      : dispatch(filterActiveTanents(filterArray))
  }

  return (
    <div style={{ top: "0px", overflow: "initial" }}>
      <Tabdiv>
        <TextField
          sx={{
            width: "296px",
            height: "40px",
          }}
          placeholder="Search"
          id="outlined-size-small"
          size="small"
          onChange={handlerSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: "none" }) }}
        >
          <FilterAltOutlinedIcon />
        </IconButton> */}
      </Tabdiv>
      <Box sx={{ display: "flex", margin: "0px", padding: "0px" }}>
        <MainDiv open={open}>
          <Cardposts
            isAchrivPage={isAchrivPage}
            alertOpenHandle={alertOpenHandle}
          />
        </MainDiv>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <div style={{ margin: "32px" }}>
            <DrawerHeader>
              <Styledpbold> Filter by</Styledpbold>
              <StyledClosebtn onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <FilterListIcon /> : <CloseIcon />}
              </StyledClosebtn>
            </DrawerHeader>

            <Divider />

            <List>
              <Styledp>Type</Styledp>
              <StyledFormGroup>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked onChange={handleChangeFilter} name="State1" />
                  }
                  label="State"
                />
              </StyledFormGroup>
            </List>

            <div
              style={{
                bottom: "10px",
                width: "80%",
                position: "absolute",
              }}
            >
              <Divider sx={{ width: "100%", margin: "10px" }} />

              <StyledAplyFilterButton
                variant="contained"
                onClick={() => {
                  handleSaveFilter(), handleDrawerClose()
                }}
              >
                Apply
              </StyledAplyFilterButton>
            </div>
          </div>
        </Drawer>
      </Box>
    </div>
  )
}
