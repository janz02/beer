import React from 'react'
import { StatusDisplay } from './StatusDisplay'

export type ActivenessStatus = 'active' | 'inactive' | 'deleted'

interface ActivenessDisplayProps {
  status: ActivenessStatus
  text: string
}

const activenessBadgeColor = (activeness: ActivenessStatus): string => {
  switch (activeness) {
    case 'active':
      return '#78e625'
    case 'inactive':
      return '#a6adb4'
    case 'deleted':
      return '#e53225'
  }
}

export const ActivenessDisplay: React.FC<ActivenessDisplayProps> = ({ status, text }) => {
  return <StatusDisplay text={text} color={activenessBadgeColor(status)} />
}
