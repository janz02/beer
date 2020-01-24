import React, { FC } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useTranslation } from 'react-i18next'

interface BackButtonProps extends ButtonProps {
  primary?: boolean
}

/**
 * For returning from an editor to the list/table.
 */
export const BackButton: FC<BackButtonProps> = props => {
  const { primary, ...btnProps } = props
  const { t } = useTranslation()

  return (
    <Tooltip mouseEnterDelay={0.75} placement="bottomLeft" title={t('common.go-back')}>
      <Button
        type={primary ? 'primary' : 'default'}
        icon={<ArrowLeftOutlined />}
        shape="circle"
        style={{ marginRight: '1rem', marginLeft: '0.5rem' }}
        {...btnProps}
      />
    </Tooltip>
  )
}
