import React, { FC } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useTranslation } from 'react-i18next'

export interface BackButtonProps extends ButtonProps {
  primary?: boolean
  label?: string
}

/**
 * For returning from an editor to the list/table.
 */
export const BackButton: FC<BackButtonProps> = props => {
  const { primary, label, ...btnProps } = props
  const { t } = useTranslation()

  return (
    <Tooltip mouseEnterDelay={0.75} placement="bottomLeft" title={label ?? t('common.go-back')}>
      <Button
        type={primary ? 'primary' : 'ghost'}
        icon={<ArrowLeftOutlined />}
        shape="circle"
        style={{ marginRight: '1rem' }}
        {...btnProps}
      />
    </Tooltip>
  )
}
