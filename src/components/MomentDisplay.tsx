import React from 'react'
import moment from 'moment'

interface MomentDisplayProps {
  date?: moment.Moment
  mode?: 'date' | 'time' | 'date time' | 'date/time'
}

export const DATE_FORMAT = 'YYYY.MM.DD'
export const TIME_FORMAT = 'hh:mm'
export const DATE_TIME_FORMAT = 'YYYY.MM.DD hh:mm'

export const MomentDisplay: React.FC<MomentDisplayProps> = props => {
  const { date, mode } = props
  if (!date) return <></>

  if (mode === 'time') {
    return <>{date.format(TIME_FORMAT)}</>
  } else if (mode === 'date time') {
    return <>{date.format(DATE_TIME_FORMAT)}</>
  } else if (mode === 'date/time') {
    return (
      <>
        <div>{date.format(DATE_FORMAT)}</div>
        <div>{date.format(TIME_FORMAT)}</div>
      </>
    )
  }
  return <>{date.format(DATE_FORMAT)}</>
}
