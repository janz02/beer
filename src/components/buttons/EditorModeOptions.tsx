import React, { useMemo, FC } from 'react'
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
  canEdit: boolean
  handleDelete?: () => void
  handleEdit?: () => void
  handleEscapeEdit?: () => void
}

export const EditorModeOptions: FC<EditorModeOptionsProps> = props => {
  const { mode, canEdit, handleDelete, handleEdit, handleEscapeEdit } = props
  const { t } = useTranslation()
  const options = useMemo((): JSX.Element | undefined => {
    switch (mode) {
      case EditorMode.VIEW:
        return canEdit ? (
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
  }, [canEdit, handleDelete, handleEdit, handleEscapeEdit, mode, t])
  return <>{options}</>
}
