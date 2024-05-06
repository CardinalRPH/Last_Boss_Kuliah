import { Grid } from "@mui/material"
import TotalDevice from "../components/TotalDevice"
import DashShortcutCard from "../components/DashShortcutCard"


const DashboardPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <TotalDevice />
      </Grid>
      <Grid item xs={12} >
        <DashShortcutCard />
        <DashShortcutCard />
      </Grid>
    </Grid>
  )
}

export default DashboardPage