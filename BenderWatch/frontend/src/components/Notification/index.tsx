import { useReactiveVar } from '@apollo/client'
import { Alert, AlertColor, Snackbar } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { notification } from '../../graphql/reactiveVariables'

export interface Notification {
  severity?: AlertColor
  show: boolean
  message: string
}

interface NotificationProps {}

const Notification: FC<NotificationProps> = () => {
  const notificationData = useReactiveVar(notification)
  const { message, severity } = notificationData
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (notificationData.show) {
      setOpen(true)
    }
  }, [notificationData])
  return (
    <Snackbar
      open={open}
      onClose={() => [
        setOpen(false),
        notification({ ...notification(), show: false })
      ]}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={() => [
          setOpen(false),
          notification({ ...notification(), show: false })
        ]}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
