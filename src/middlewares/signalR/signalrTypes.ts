import { HubConnection, HubConnectionState } from '@microsoft/signalr'

export type SignalrConnection = HubConnection | null | undefined

export interface SignalrStatusReport {
  connectionState?: HubConnectionState
  connectionId?: string | null
  reportSource?: string | null
  connectionCreatedAt?: number
  error: any
}
