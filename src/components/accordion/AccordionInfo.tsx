import { ExclamationCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'
import React, { FC, useMemo } from 'react'
import { Typography } from 'antd'
import './AccordionInfo.scss'

const { Text } = Typography

export interface AccordionInfo {
  label: string
  type: 'info' | 'warning' | 'error'
  data?: string | number
  customData?: JSX.Element
  onClick?: Function
}

export const AccordionInfo: FC<AccordionInfo> = ({ label, data, customData, type, onClick }) => {
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
      <Text>
        {label} {!data && <>icon</>}
      </Text>
      {data && (
        <span>
          <Text strong>{data}</Text>
          {icon}
        </span>
      )}
      {customData && (
        <span>
          {customData}
          {icon}
        </span>
      )}
    </span>
  )
}
