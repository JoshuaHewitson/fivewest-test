import { makeVar } from '@apollo/client'
import { Notification } from '../components/Notification'

export const notification = makeVar<Notification>({
  show: false,
  severity: 'error',
  message: ''
})
