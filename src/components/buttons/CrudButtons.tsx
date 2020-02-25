import React, { FC } from 'react'
import { Tooltip, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons'
import { TooltipProps } from 'antd/lib/tooltip'

const tooltipConfig: Partial<TooltipProps> = {
  mouseEnterDelay: 0.5,
  placement: 'topRight',
  style: { marginLeft: '0.5rem' }
}

interface CrudButtonsProps {
  onDelete?: () => void
  onSend?: () => void
  onEdit?: () => void
}

/**
 * Common buttons for list or table items.
 */
export const CrudButtons: FC<CrudButtonsProps> = props => {
  const { onDelete, onEdit, onSend } = props
  const { t } = useTranslation()

  return (
    <>
      {onSend && (
        <Tooltip {...tooltipConfig} title={t('common.send')}>
          <Button onClick={onSend}>
            <SendOutlined />
          </Button>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip {...tooltipConfig} title={t('common.edit')}>
          <Button onClick={onEdit}>
            <EditOutlined />
          </Button>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip {...tooltipConfig} title={t('common.delete')}>
          <Button danger onClick={onDelete}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      )}
    </>
  )
}