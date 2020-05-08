import './RtConnectionDot.scss'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { Badge } from 'antd'
import { HubConnectionState } from '@microsoft/signalr'

export const RtConnectionDot: FC = () => {
  const { rtConnectionState } = useSelector((state: RootState) => state.notification)
  let color
  switch (rtConnectionState) {
    case HubConnectionState.Connected:
      color = 'success'
      break
    case HubConnectionState.Disconnected:
      color = 'error'
      break
    default:
      color = 'processing'
      break
  }

  return <Badge className="rt-connection-dot" status={color as any} />
}
