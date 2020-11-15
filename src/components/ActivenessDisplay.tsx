import './ActivenessDisplay.scss'
import React from 'react'
import { StatusDisplay } from './StatusDisplay'

export type ActivenessStatus = 'active' | 'inactive' | 'deleted'

interface ActivenessDisplayProps {
  status: ActivenessStatus
  text: string
}

export const ActivenessDisplay: React.FC<ActivenessDisplayProps> = ({ status, text }) => {
  return <StatusDisplay text={text} className={'status-' + status} />
}
