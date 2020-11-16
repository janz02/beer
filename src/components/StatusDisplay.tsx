import React from 'react'
import './StatusDisplay.scss'

interface StatusDisplayProps {
  className: string
  text: string
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ className, text }) => {
  return (
    <div className={`${className} status-display`}>
      <span className="status-badge" />
      <span>{text}</span>
    </div>
  )
}
