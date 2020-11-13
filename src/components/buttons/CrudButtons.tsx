import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormOutlined,
  DeleteOutlined,
  RightCircleOutlined,
  SendOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { ActionButtons } from './ActionButtons'
import { ActionButton } from './ActionButton'

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
    </ActionButtons>
  )
}
