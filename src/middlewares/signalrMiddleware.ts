import { Action, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { store } from 'app/store'
import { authActionType } from 'features/auth/authSlice'
import { UserVm } from 'api/swagger'
import {
  notificationActions,
  notificationActionType
} from 'features/notification/notificationSlice'
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState
} from '@microsoft/signalr'

type Connection = HubConnection | null | undefined

export interface SignalrStatusReport {
  connectionState?: HubConnectionState
  connectionId?: string | null
  reportSource?: string | null
  connectionCreatedAt?: number
  error: any
}

/**
 * Helper method to dispactch actions on connection lifecycle change.
 * @param connection
 * @param connectionCreatedAt - it serves as an identifier, the connection id is lost at disconnection
 */
const sendConnectionStateFactory = (connection: Connection, connectionCreatedAt: number) => (
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
 * Register the signlr method names, and the their callbacks
 * @param connection
 */
const registerCallbacks = (connection: Connection): void => {
  connection?.on('NewNotification', () => console.log('## NEW NOTI ', connection.connectionId))
}

/**
 * Creates a new connection if there is an accesible jwt.
 * @param newJwt if is not awailable it will resort to the session storage
 * * at auth/loginSuccess the jwt is still not in the session storage, thus it comes from the action payload
 */
const initConnection = (newJwt?: string): Connection => {
  const url = process.env.REACT_APP_API_URL
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

  registerCallbacks(connection)

  connection
    .start()
    .then(() => sendConnectionState('start'))
    .catch(err => sendConnectionState('startFail', { err }))

  return connection
}

/**
 * Builds and starts a new connection. (Stops the existing connection before.)
 * @param currentCnnection
 * @param jwt - only needed if comes from the `auth/loginSuccess` payload
 * @returns `newConnection`
 */
const connect = (currentConnection: Connection, jwt?: string): Connection => {
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
 * Biuld and start a new connection. (Stops the existing connection before.)
 * @param currentConnection
 */
const disconnect = (currentConnection: Connection): void => {
  if (!currentConnection) return
  currentConnection.stop().then(() => {
    currentConnection = null
  })
}

/**
 * Make a new connection if the current connection is not active.
 * @param currentCnnection
 */
const reconnect = (currentConnection: Connection): Connection => {
  if (!currentConnection || currentConnection.state === HubConnectionState.Disconnected) {
    return connect(currentConnection)
  }
}

/**
 * Connects to the signlR event hub
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
