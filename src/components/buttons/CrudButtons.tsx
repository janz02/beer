import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormOutlined,
  DeleteOutlined,
  RightCircleOutlined,
  SendOutlined,
  EyeOutlined,
  DisconnectOutlined
} from '@ant-design/icons'
import { ActionButtons } from './ActionButtons'
import { ActionButton } from './ActionButton'

export interface CrudButtonsProps {
  onDelete?: () => void
  onSend?: () => void
  onEdit?: () => void
  onView?: () => void
  onUnassign?: () => void
  useRightCircleForView?: boolean
}

/**
 * Common buttons for list or table items.
 */
export const CrudButtons: FC<CrudButtonsProps> = props => {
  const { onDelete, onEdit, onSend, onView, onUnassign, useRightCircleForView } = props
  const { t } = useTranslation()

  return (
    <ActionButtons>
      {onSend && (
        <ActionButton
          icon={<SendOutlined />}
          tooltip={t('common.send')}
          onClick={onSend}
          name="crudSend"
        />
      )}
      {onView && (
        <ActionButton
          icon={useRightCircleForView ? <RightCircleOutlined /> : <EyeOutlined />}
          tooltip={t('common.view')}
          onClick={onView}
          name="crudView"
        />
      )}
      {onEdit && (
        <ActionButton
          icon={<FormOutlined />}
          tooltip={t('common.edit')}
          onClick={onEdit}
          name="crudEdit"
        />
      )}
      {onDelete && (
        <ActionButton
          icon={<DeleteOutlined />}
          tooltip={t('common.delete')}
          onClick={onDelete}
          name="crudDelete"
        />
      )}
      {onUnassign && (
        <ActionButton
          icon={<DisconnectOutlined />}
          tooltip={t('common.unassign')}
          onClick={onUnassign}
          name="crudUnassign"
        />
      )}
    </ActionButtons>
  )
}
