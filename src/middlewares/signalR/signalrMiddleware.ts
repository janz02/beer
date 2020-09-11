import { Action, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { store } from 'app/store'
import { authActionType } from 'features/auth/authSlice'
import { UserVm } from 'api2/swagger/coupon'
import {
  notificationActions,
  notificationActionType
} from 'features/notification/notificationSlice'
import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr'
import { SignalrConnection, SignalrStatusReport } from './signalrTypes'
import { subscribeForRoleBasedNewNotification } from 'features/notification/notificationSubscriptions'

/**
 * Helper method to dispatch actions on connection lifecycle change.
 * @param connection
 * @param connectionCreatedAt - it serves as an identifier, the connection id is lost at disconnection
 */
const sendConnectionStateFactory = (connection: SignalrConnection, connectionCreatedAt: number) => (
  reportSource: string,
  error?: any
) => {
  const report: SignalrStatusReport = {
    connectionId: connection?.connectionId,
    connectionState: connection?.state,
    connectionCreatedAt,
    reportSource,
    error
  }
  store.dispatch(notificationActions.setConnectionState(report))
}

/**
 * Register the signalr method names, and the their callbacks
 * @param connection
 */
const registerCallbacks = (connection: SignalrConnection, jwt: string): void => {
  subscribeForRoleBasedNewNotification(connection, jwt)
  // Extend here to register more message handlers
}

/**
 * Creates a new connection if there is an accessible jwt.
 * @param newJwt if is not available it will resort to the session storage
 * * at auth/loginSuccess the jwt is still not in the session storage, thus it comes from the action payload
 */
const initConnection = (newJwt?: string): SignalrConnection => {
  const url = process.env.REACT_APP_COUPON_API_URL
  const jwt = newJwt ?? sessionStorage.getItem('jwt')
  if (!jwt) return null

  const connection = new HubConnectionBuilder()
    .withUrl(`${url}/notificationHub`, {
      accessTokenFactory: () => jwt
    })
    .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000, 60000, 60000, 60000])
    .configureLogging(LogLevel.Information)
    .build()

  const sendConnectionState = sendConnectionStateFactory(connection, Date.now())

  connection.onreconnected(() => sendConnectionState('onReconnected'))
  connection.onreconnecting(() => sendConnectionState('onReconnecting'))
  connection.onclose(() => sendConnectionState('onClose'))

  registerCallbacks(connection, jwt)

  connection
    .start()
    .then(() => sendConnectionState('start'))
    .catch(err => sendConnectionState('startFail', { err }))

  return connection
}

/**
 * Builds and starts a new connection. (Stops the existing connection before.)
 * @param currentConnection
 * @param jwt - only needed if comes from the `auth/loginSuccess` payload
 * @returns `newConnection`
 */
const connect = (currentConnection: SignalrConnection, jwt?: string): SignalrConnection => {
  if (currentConnection) {
    currentConnection.stop().then(() => {
      currentConnection = null
      return initConnection(jwt)
    })
  } else {
    return initConnection(jwt)
  }
}

/**
 * Build and start a new connection. (Stops the existing connection before.)
 * @param currentConnection
 */
const disconnect = (currentConnection: SignalrConnection): void => {
  if (!currentConnection) return
  currentConnection.stop().then(() => {
    currentConnection = null
  })
}

/**
 * Make a new connection if the current connection is not active.
 * @param currentConnection
 */
const reconnect = (currentConnection: SignalrConnection): SignalrConnection => {
  if (!currentConnection || currentConnection.state === HubConnectionState.Disconnected) {
    return connect(currentConnection)
  }
}

/**
 * Connects to the signalR event hub
 * * Tries to connect on init, if there is a jwt in the session storage
 * * Connects on login success action
 * * Reconnects on notification drawer open, if there is no active connection
 * * If the connection is lost than tries to reconnect a couple of times
 * * Disconnects completely on logout action
 */
export const signalrMiddleware = (): any => {
  let connection = initConnection()
  return () => (next: Dispatch<any>) => (action: Action) => {
    const newJwt = (action as PayloadAction<UserVm>)?.payload?.jwtToken ?? ''

    switch (action.type) {
      case authActionType.loginSuccess:
        connection = connect(connection, newJwt)
        break
      case authActionType.logout:
        disconnect(connection)
        break
      case notificationActionType.open:
        connection = reconnect(connection)
        break
    }
    return next(action)
  }
}
