import React, { FC } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { SettingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'

export const SettingsButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { t } = useTranslation()

  // TODO check export permissions
  return hasPermission() ? (
    <Button
      type="primary"
      icon={<SettingOutlined />}
      size="small"
      title={t('common.table-settings')}
      {...props}
    >
      {children}
    </Button>
  ) : null
}
