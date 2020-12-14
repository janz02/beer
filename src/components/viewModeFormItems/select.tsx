import { Typography } from 'antd'
import React, { FC } from 'react'
import { ViewModeProps } from '.'

export const ViewModeSelect: FC<ViewModeProps<string>> = ({ value, onClick }) => {
  return (
    <>
      <span
        onClick={() => {
          onClick?.()
        }}
      >
        <Typography.Text>{value}</Typography.Text>
      </span>
    </>
  )
}
