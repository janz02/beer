import React from 'react'
import './StatusDisplay.scss'

interface StatusDisplayProps {
  color: string
  text: string
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ color, text }) => {
  return (
    <div className="status-display">
      <span
        className="status-badge"
        style={{
          background: color
        }}
      />
      <span>{text}</span>
    </div>
  )
}
