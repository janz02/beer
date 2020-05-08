import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

interface MomentDisplayProps {
  date?: moment.Moment
  mode?: 'date' | 'time' | 'date time' | 'date time-sec' | 'date/time' | 'from now'
}

export const DATE_FORMAT = 'L'
export const TIME_FORMAT = 'LT'
export const TIME_FORMAT_WITH_SEC = 'LTS'

export const MomentDisplay: React.FC<MomentDisplayProps> = props => {
  const { date, mode } = props

  const { i18n } = useTranslation()

  if (!date) return <></>

  date.locale(i18n.language)

  switch (mode) {
    case 'time':
      return <>{date.format(TIME_FORMAT)}</>
    case 'from now':
      return <>{date.fromNow()}</>
    case 'date time':
      return <>{`${date.format(DATE_FORMAT)} ${date.format(TIME_FORMAT)}`}</>
    case 'date time-sec':
      return <>{`${date.format(DATE_FORMAT)} ${date.format(TIME_FORMAT_WITH_SEC)}`}</>
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
