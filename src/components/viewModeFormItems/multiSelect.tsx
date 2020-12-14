import { Typography } from 'antd'
import React, { FC } from 'react'
import { ViewModeProps } from '.'

export const ViewModeMultiSelect: FC<ViewModeProps<any[]>> = ({ value, onClick }) => {
  return (
    <>
      <span
        onClick={() => {
          onClick?.()
        }}
      >
        {value?.map((el, i) => (
          <Typography.Text
            key={`${value
              .toString()
              .toLowerCase()
              .replace(' ', '')}__${i}`}
          >
            {value}
          </Typography.Text>
        ))}
      </span>
    </>
  )
}
