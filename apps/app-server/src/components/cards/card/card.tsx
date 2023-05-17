import * as React from "react"
import { useDispatch } from "react-redux"
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined"
import {
  IconButton,
  CardContent,
  Box,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material"
import EditNoteIcon from "@mui/icons-material/EditNote"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import ListItemIcon from "@mui/material/ListItemIcon"
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FormDialog from "@/components/forms/createProgream"
import axios from "axios"

import {
  addActiveTanents,
  addArchivedTanents,
  deleteActiveTanents,
  deleteArchivedTanents,
} from "@/redux/clientSlice"
import {
  StyledCardMedia,
  StyledTypograpghname,
  StyledTypograpghtype,
  Styledtenentcard,
} from "@/styles"
import AlertDialog from "@/common/components/breadcrumbs/Dialog"
import useAxios from "@/utils/useAxios"
function Cardpost(props: {
  data: any
  index: any
  isAchrivPage: any
  alertOpenHandle: any
}) {
  const { showLoader, axiosPost } = useAxios();
  const [loading, setLoading] = React.useState(false);
  const { alertOpenHandle, data, index, isAchrivPage } = props
  const [edittProgram, setcreateProgram] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [showAlert, setShowAlert] = React.useState({
    showbox: false,
    type: "",
    message: "",
  })
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handlerEditProgram = () => {
    setcreateProgram(!edittProgram)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()
  const deleteCard = async () => {
    await axios
      .delete(`http://localhost:3050/tenants/${data._id}`)
      .then((res) => {
        isAchrivPage
          ? dispatch(deleteArchivedTanents(data._id))
          : dispatch(deleteActiveTanents(data._id))
      })
      .then(() => {
        setLoading(false)
        alertOpenHandle(true, `Deleted`)
      })
  }
  const ArchiveCard = async () => {
    await axios
      .put(`http://localhost:3050/tenants/${data._id}`, {
        isArchive: true,
      })
      .then((res) => {
        dispatch(deleteActiveTanents(res.data?.data[0]?._id))
        dispatch(addArchivedTanents(res.data?.data[0]))
      })
      .then(() => {
        setLoading(false)
        alertOpenHandle(true, `Archived`)
      })
  }
  const unArchivedCard = async () => {
    isAchrivPage
    await axios
      .put(`http://localhost:3050/tenants/${data._id}`, {
        isArchive: false,
      })
      .then((res) => {
        dispatch(deleteArchivedTanents(res.data.data[0]._id))
        dispatch(addActiveTanents(res.data.data[0]))
      })
      .then(() => {
        setLoading(false)
        alertOpenHandle(true, `UnArchived`)
      })
  }
  const handleClickArchive = () => {
    setLoading(true)
    setShowAlert({
      showbox: true,
      type: "Archive",
      message: `${isAchrivPage ? "UnArchive" : "Archive "}`,
    })
  }
  const handleClickDelete = () => {
    setLoading(true)
    setShowAlert({
      showbox: true,
      type: "Delete",
      message: "Delete",
    })
  }
  const handleCloseDiagree = () => {
    setShowAlert({
      showbox: false,
      type: "",
      message: "",
    })
    handleClose()
    return "true"
  }
  const agreeArchive = () => {
    isAchrivPage ? unArchivedCard() : ArchiveCard()
    handleCloseDiagree()
  }
  const agreeDelete = () => {
    deleteCard()
    handleCloseDiagree()
  }

  return (
    <>
     {loading && showLoader(loading)}
      <Styledtenentcard sx={{ padding: "0px" }}>
        <StyledCardMedia
          sx={{ margin: "0px", padding: "0px" }}
          image={
            data?.clientLogo ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledTypograpghname>{data?.name}</StyledTypograpghname>
            <div>
              <IconButton
                data-testid={`MenuItem${index}`}
                sx={{ height: "24px", borderRadius: "2px", width: "20px" }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                sx={{ marginLeft: "-100px", marginTop: "10px" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >{!isAchrivPage &&
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentId(data._id), handleClose()
                  }}
                >
                  <ListItemIcon>
                    <PersonOutlineSharpIcon fontSize="medium" />
                  </ListItemIcon>
                  View
                </MenuItem>}
                {!isAchrivPage && <Divider />}
                {!isAchrivPage &&
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentId(data._id), handlerEditProgram()
                      handleClose()
                    }}
                  >
                    <ListItemIcon>
                      <EditNoteIcon fontSize="medium" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>}
                {!isAchrivPage && <Divider />}
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickArchive()
                  }}
                >
                  <ListItemIcon>
                    <CircleOutlinedIcon fontSize="medium" />
                  </ListItemIcon>
                  {isAchrivPage ? "UnArchive" : "Archive"}
                </MenuItem>
                {isAchrivPage &&  <Divider />}
                {isAchrivPage &&
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickDelete()
                    handleClose()
                  }}
                >
                  <ListItemIcon>
                    <DeleteOutlineIcon fontSize="medium" />
                  </ListItemIcon>
                  Delete
                </MenuItem>
                }
              </Menu>
            </div>
          </div>
          <Box
            sx={{
              width: "fit-content",
              height: "20x",
              background: "#FFFFFF00 0% 0% no-repeat padding-box",
              border: "1px solid #E78F24",
              borderRadius: "3px",
              opacity: "1",
            }}
          >
            <StyledTypograpghtype>{data.type}</StyledTypograpghtype>
          </Box>
        </CardContent>

        {edittProgram && (
          <div>
            <FormDialog
              open={true}
              handlercreateProgram={handlerEditProgram}
              currentId={currentId}
              isArchived={isAchrivPage}
              alertOpenHandle={alertOpenHandle}
            />
            {/* <FormDialog open={edittProgram} handlerEditProgram={handlerEditProgram} /> */}
          </div>
        )}
      </Styledtenentcard>
      <AlertDialog
        showAlertbox={showAlert?.showbox}
        agree={showAlert?.type == "Archive" ? agreeArchive : agreeDelete}
        handleCloseDiagree={handleCloseDiagree}
        message={showAlert?.message + ""}
      />
    </>
  )
}

export default Cardpost
