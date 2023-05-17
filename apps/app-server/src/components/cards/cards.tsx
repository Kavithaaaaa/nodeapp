import { useSelector, useDispatch } from "react-redux"
import { Grid } from "@mui/material"
import Cardpost from "./card/card"
const Cardposts = (args: { isAchrivPage: boolean; alertOpenHandle: any }) => {
  const { isAchrivPage, alertOpenHandle } = args
  const activeTanents = useSelector(
    (state: any) => state.tenants.activeTanents
  )
  const archivedTanents = useSelector(
    (state: any) => state.tenants.archivedTanents
  )
  const client = !isAchrivPage ? activeTanents : archivedTanents
  return (
    <Grid
      container
      alignItems="stretch"
      spacing={2}
      sx={{ marginBottom: "20px" }}
    >
      {client?.length <= 0 && (
        <div style={{ minHeight: "250px", width: '100%' }}>
          <p style={{ marginLeft: '48%', marginTop: 9 }}>No Client Found</p>
        </div>
      )}
      {client?.map((post: any, index: number) => (
        <Grid item key={index} xs={4} sm={4} md={5} lg={3}>
          <Cardpost
            data={post}
            isAchrivPage={isAchrivPage}
            index={index}
            alertOpenHandle={alertOpenHandle}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Cardposts
