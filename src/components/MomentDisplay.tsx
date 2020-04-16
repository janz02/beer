import React from 'react'
import moment from 'moment'

interface MomentDisplayProps {
  date?: moment.Moment
  mode?: 'date' | 'time' | 'date time' | 'date/time' | 'from now'
}

export const DATE_FORMAT = 'L'
export const TIME_FORMAT = 'LT'

export const MomentDisplay: React.FC<MomentDisplayProps> = props => {
  const { date, mode } = props

  if (!date) return <></>

  switch (mode) {
    case 'time':
      return <>{date.format(TIME_FORMAT)}</>
    case 'from now':
      return <>{date.fromNow()}</>
    case 'date time':
      return <>{`${date.format(DATE_FORMAT)} ${date.format(TIME_FORMAT)}`}</>
    case 'date/time':
      return (
        <>
          <div>{date.format(DATE_FORMAT)}</div>
          <div>{date.format(TIME_FORMAT)}</div>
        </>
      )
    case 'date':
    default:
      return <>{date.format(DATE_FORMAT)}</>
  }
}
