import React, { FC } from 'react'
import './ActivenessDisplay.scss'
import { useTranslation } from 'react-i18next'

export type ActivenessStatus = 'active' | 'inactive' | 'deleted'

interface ActivenessDisplayProps {
  status?: ActivenessStatus
  text: string
}

export const ActivenessDisplay: React.FC<ActivenessDisplayProps> = props => {
  const { t } = useTranslation()

  return (
    <div className="activeness-display">
      <span className={'active-inactive-badge ' + props.status} />
      {props.text}
    </div>
  )
}
