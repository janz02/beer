import React, { FC } from 'react'
import { Button, Tooltip } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export interface EscapeButtonProps extends ButtonProps {
  label?: string
}

export const EscapeButton: FC<EscapeButtonProps> = ({ label, ...props }) => {
  const { t } = useTranslation()
  return (
    <Tooltip mouseEnterDelay={0.75} placement="bottomLeft" title={label ?? t('common.escape')}>
      <Button type="ghost" icon={<CloseOutlined />} size="middle" {...props} />
    </Tooltip>
  )
}
