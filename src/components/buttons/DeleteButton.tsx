import React, { FC } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useTranslation } from 'react-i18next'

export interface DeleteButtonProps extends ButtonProps {
  label?: string
}

export const DeleteButton: FC<DeleteButtonProps> = props => {
  const { label, ...btnProps } = props
  const { t } = useTranslation()

  return (
    <Tooltip mouseEnterDelay={0.45} placement="bottom" title={label ?? t('common.delete')}>
      <Button
        danger
        icon={<DeleteOutlined />}
        shape="circle"
        style={{ marginLeft: '1rem' }}
        {...btnProps}
      />
    </Tooltip>
  )
}
