import { ExclamationCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React, { FC, useMemo } from 'react'
import './AccordionInfo.scss'

export interface AccordionInfo {
  label: string
  type: 'info' | 'warning' | 'error'
  data?: any
  onClick?: Function
}

export const AccordionInfo: FC<AccordionInfo> = ({ label, data, type, onClick }) => {
  const icon = useMemo(
    () => (
      <>
        {type === 'info' && <InfoCircleOutlined />}
        {type === 'warning' && <WarningOutlined />}
        {type === 'error' && <ExclamationCircleOutlined />}
      </>
    ),
    [type]
  )
  return (
    <span
      className="panel-header__info"
      onClick={e => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      <Typography.Text>
        {label} {!data && <>icon</>}
      </Typography.Text>
      {data && (
        <span>
          <Typography.Text strong>{data}</Typography.Text>
          {icon}
        </span>
      )}
    </span>
  )
}
