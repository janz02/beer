import React, { FC } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { DownloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'

export const ExportButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { t } = useTranslation()

  // TODO check export permissions
  return hasPermission() ? (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      size="small"
      title={t('common.export')}
      {...props}
    >
      {children}
    </Button>
  ) : null
}
