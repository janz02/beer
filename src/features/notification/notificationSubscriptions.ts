import { hasPermission } from 'services/jwt-reader'
import { notificationRoleConfig } from 'features/notification/useNotification'
import { notificationActions } from './notificationSlice'
import { store } from 'app/store'
import { SignalrConnection } from 'middlewares/signalR/signalrTypes'

export const subscribeForRoleBasedNewNotification = (
  connection: SignalrConnection,
  jwt: string
): void => {
  if (hasPermission(notificationRoleConfig, jwt)) {
    connection?.on('NewNotification', () => {
      store.dispatch(notificationActions.getRecentNotifications())
    })
  }
}
