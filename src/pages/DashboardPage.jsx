import { Grid, Typography } from "@mui/material"
import TotalDevice from "../components/TotalDevice"
import DashShortcutCard from "../components/DashShortcutCard"
import AlertMain from "../components/AlertMain"
import { useEffect, useState } from "react"
import { useGet, usePost } from "../hooks/dataHandler"
import { useSelector } from "react-redux"
import getCurrentTime from "../utilities/getCurrentTime"
import { useNavigate, useOutletContext } from "react-router-dom"

const DashboardPage = () => {
  const [alertState, setAlertState] = useState(false)
  const { data, error, execute } = useGet('/userDevice', true, false)
  const { data: dataPost, error: errorPost, loading: loadingPost, execute: executePost } = usePost('doWatering')
  const [deviceData, setDeviceData] = useState([])
  const [totalDevice, SetTotalDevice] = useState(0)
  const { payload, isAuthenticated } = useSelector(state => state.auth)
  const { wsMessage } = useOutletContext()
  const { day } = getCurrentTime()
  const navigate = useNavigate()
  const [alertComponent, setAlertComponent] = useState({
    severity: 'info',
    alertLabel: '',
    content: ''
  })

  const handleWatering = (deviceId) => {
    executePost({
      data: {
        deviceId,
        userMail: payload?.email
      }
    })
  }

  useEffect(() => {
    if (data) {
      //do data
      SetTotalDevice(data?.data.length)
      setDeviceData(data?.data)
    }
    if (dataPost) {
      setAlertComponent({
        severity: 'success',
        alertLabel: 'Success',
        content: 'Success Watering'
      })
      setAlertState(true)
    }
  }, [data, dataPost])

  useEffect(() => {
    if (error) {
      //do error
      setAlertComponent({
        severity: 'error',
        alertLabel: 'Error',
        content: error.response?.data.error || error.message
      })
      setAlertState(true)
    }
    if (errorPost) {
      setAlertComponent({
        severity: 'error',
        alertLabel: 'Error',
        content: errorPost.response?.data.error || errorPost.message
      })
      setAlertState(true)
    }
  }, [error, errorPost])

  useEffect(() => {
    if (isAuthenticated) {
      execute({
        params: {
          userMail: payload?.email
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <TotalDevice totalDevice={totalDevice} />
        </Grid>
        <Grid item xs={12} >
          {deviceData.length > 0 ? deviceData.map(value =>
            <DashShortcutCard
              //from db
              key={value.deviceId}
              deviceName={value.name}
              lastWaterDay={day}
              lastWaterHour={value.waterVal[day].data.reverse()[0] || '00:00'}
              //from ws
              isRain={wsMessage?.rainSensor || false}
              waterStorage={wsMessage?.waterSensor || 0}
              //function
              onIconClick={() => navigate(`/devices/${value.deviceId}`)}
              onWatering={() => handleWatering(value.deviceId)}
              disableBtn={loadingPost}
            />) :
            <Typography>
              No Device Found
            </Typography>}

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