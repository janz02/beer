import React, { FC } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { EditOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export const EditButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { t } = useTranslation()
  return (
    <Button
      type="primary"
      icon={<EditOutlined />}
      size="large"
      style={{ marginLeft: '1rem' }}
      data-testid="edit-button"
      {...props}
    >
      {children ?? t('common.edit')}
    </Button>
  )
}
