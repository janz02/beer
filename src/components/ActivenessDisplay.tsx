import React from 'react'
import './ActivenessDisplay.scss'

export type ActivenessStatus = 'active' | 'inactive' | 'deleted'

interface ActivenessDisplayProps {
  status?: ActivenessStatus
  text: string
}

export const ActivenessDisplay: React.FC<ActivenessDisplayProps> = props => {
  return (
    <div className="activeness-display">
      <span className={'active-inactive-badge ' + props.status} />
      {props.text}
    </div>
  )
}
