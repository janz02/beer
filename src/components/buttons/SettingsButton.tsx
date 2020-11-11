import React, { FC } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { SettingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export const SettingsButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { t } = useTranslation()

  return (
    <Button
      type="primary"
      icon={<SettingOutlined />}
      size="small"
      title={t('common.table-settings')}
      data-testid="settings-button"
      {...props}
    >
      {children}
    </Button>
  )
}
