import './CrudButtons.scss'
import React, { FC } from 'react'
import { Tooltip, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  FormOutlined,
  DeleteOutlined,
  RightCircleOutlined,
  SendOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { TooltipProps } from 'antd/lib/tooltip'

const tooltipConfig: Partial<TooltipProps> = {
  mouseEnterDelay: 0.5,
  placement: 'topRight',
  style: { marginLeft: '0.5rem' }
}

export interface CrudButtonsProps {
  onDelete?: () => void
  onSend?: () => void
  onEdit?: () => void
  onView?: () => void
  useRightCircleForView?: boolean
}

/**
 * Common buttons for list or table items.
 */
export const CrudButtons: FC<CrudButtonsProps> = props => {
  const { onDelete, onEdit, onSend, onView, useRightCircleForView } = props
  const { t } = useTranslation()

  return (
    <div className="crudButtons">
      {onSend && (
        <Tooltip {...tooltipConfig} title={t('common.send')}>
          <Button className="crud-button" onClick={onSend} name="crudSend">
            <SendOutlined />
          </Button>
        </Tooltip>
      )}
      {onView && (
        <Tooltip {...tooltipConfig} title={t('common.view')}>
          <Button className="crud-button" onClick={onView} name="crudView">
            {useRightCircleForView ? <RightCircleOutlined /> : <EyeOutlined />}
          </Button>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip {...tooltipConfig} title={t('common.edit')}>
          <Button className="crud-button" onClick={onEdit} name="crudEdit">
            <FormOutlined />
          </Button>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip {...tooltipConfig} title={t('common.delete')}>
          <Button className="crud-button" onClick={onDelete} name="crudDelete">
            <DeleteOutlined />
          </Button>
        </Tooltip>
      )}
    </div>
  )
}
