import { ExclamationCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
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
      <Text>
        {label} {!data && <>icon</>}
      </Text>
      {data && (
        <span>
          <Text strong>{data}</Text>
          {icon}
        </span>
      )}
    </span>
  )
}
