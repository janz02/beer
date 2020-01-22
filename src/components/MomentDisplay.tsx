import React from 'react'
import moment from 'moment'

interface MomentDisplayProps {
  date?: moment.Moment
}

export const MomentDisplay: React.FC<MomentDisplayProps> = props => {
  return <>{props.date && props.date.format('YYYY.MM.DD')}</>
}
