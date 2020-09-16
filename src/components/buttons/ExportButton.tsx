import React, { FC } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { DownloadOutlined } from '@ant-design/icons'

export const ExportButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button type="primary" icon={<DownloadOutlined />} size="large" {...props}>
      {children}
    </Button>
  )
}
