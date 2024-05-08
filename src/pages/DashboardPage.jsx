import { Grid } from "@mui/material"
import TotalDevice from "../components/TotalDevice"
import DashShortcutCard from "../components/DashShortcutCard"
import AlertMain from "../components/AlertMain"
import { useState } from "react"


const DashboardPage = () => {
  const [alertState, setAlertState] = useState(false)
  const [alertComponent, setAlertComponent] = useState({
    severity: 'info',
    alertLabel: '',
    content: ''
  })
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <TotalDevice />
        </Grid>
        <Grid item xs={12} >
          <DashShortcutCard />
          <DashShortcutCard />
        </Grid>
      </Grid>
      <AlertMain
        open={alertState}
        onClose={() => setAlertState(false)}
        alertLabel={alertComponent.alertLabel}
        severity={alertComponent.severity}
        content={alertComponent.content}
      />
    </>
  )
}

export default DashboardPage