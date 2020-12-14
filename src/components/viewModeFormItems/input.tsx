import { Typography } from 'antd'
import { DATE_FORMAT } from 'components/MomentDisplay'
import React, { FC } from 'react'
import { ViewModeInputProps } from '.'

export const ViewModeInput: FC<ViewModeInputProps<string | moment.Moment | number | any>> = ({
  value,
  onClick,
  type = 'text'
}) => {
  return (
    <>
      <span
        onClick={() => {
          onClick?.()
        }}
      >
        {type === 'text' && <Typography.Text>{value}</Typography.Text>}
        {type === 'date' && <Typography.Text>{value?.format(DATE_FORMAT)}</Typography.Text>}
        {type === 'name' && <Typography.Title level={2}>{value}</Typography.Title>}
        {type === 'email' && <Typography.Link href={`mailto:${value}`}>{value}</Typography.Link>}
        {type === 'phone' && <Typography.Link href={`tel:${value}`}>{value}</Typography.Link>}
      </span>
    </>
  )
}
