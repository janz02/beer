import React, { useMemo, FC } from 'react'
import { Roles } from 'api/coupon-api/models'
import { hasPermission } from 'services/jwt-reader'
import { DeleteButton } from './DeleteButton'
import { EditButton } from './EditButton'
import { EscapeButton } from './EscapeButton'
import { useTranslation } from 'react-i18next'

export enum EditorMode {
  NEW = 'new',
  EDIT = 'edit',
  VIEW = 'view'
}

export interface EditorModeOptionsProps {
  mode: EditorMode
  editPermission?: Roles[]
  handleDelete?: () => void
  handleEdit?: () => void
  handleEscapeEdit?: () => void
}

export const EditorModeOptions: FC<EditorModeOptionsProps> = props => {
  const { mode, editPermission, handleDelete, handleEdit, handleEscapeEdit } = props
  const { t } = useTranslation()
  const options = useMemo((): JSX.Element | undefined => {
    switch (mode) {
      case EditorMode.VIEW:
        return hasPermission(editPermission) ? (
          <>
            {handleDelete && <DeleteButton onClick={handleDelete} />}
            {handleEdit && <EditButton onClick={handleEdit} />}
          </>
        ) : (
          undefined
        )
      case EditorMode.EDIT:
        return (
          <>
            {handleEscapeEdit && (
              <EscapeButton onClick={handleEscapeEdit} label={t('common.escape-editor')} />
            )}
          </>
        )
      default:
        return undefined
    }
  }, [editPermission, handleDelete, handleEdit, handleEscapeEdit, mode, t])
  return <>{options}</>
}
