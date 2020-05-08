import React, { FC } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { PlusOutlined } from '@ant-design/icons'

export const AddButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button type="primary" icon={<PlusOutlined />} size="large" {...props}>
      {children}
    </Button>
  )
}
