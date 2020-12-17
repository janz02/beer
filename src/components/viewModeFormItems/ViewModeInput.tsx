import { Typography } from 'antd'
import { DATE_FORMAT } from 'components/MomentDisplay'
import React, { FC } from 'react'
import { ViewInputProps } from './models'
import styles from './ViewModeStyles.module.scss'

export const ViewModeInput: FC<ViewInputProps<string | moment.Moment | number | any>> = ({
  value,
  onClick,
  type = 'text'
}) => {
  return (
    <>
      {!value && <Typography.Text>N/a</Typography.Text>}
      <span
        className={onClick ? styles.clickableElement : ''}
        onClick={() => {
          onClick?.()
        }}
      >
        {type === 'text' && <Typography.Text>{value}</Typography.Text>}
        {type === 'date' && (
          <Typography.Text>{(value as moment.Moment)?.format(DATE_FORMAT)}</Typography.Text>
        )}
        {type === 'name' && <Typography.Title level={2}>{value}</Typography.Title>}
        {type === 'email' && <Typography.Link href={`mailto:${value}`}>{value}</Typography.Link>}
        {type === 'phone' && <Typography.Link href={`tel:${value}`}>{value}</Typography.Link>}
      </span>
    </>
  )
}
