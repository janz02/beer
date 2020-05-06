import React, { FC, useEffect, useState } from 'react'
import { SiteEditorForm } from './SiteEditorForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { siteEditorActions } from './siteEditorSlice'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { history } from 'router/router'
import { CashierList } from '../cashierList/CashierList'
import { CashierEditor } from '../cashierEditor/CashierEditor'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import {
  EditorMode,
  EditorModeOptionsProps,
  EditorModeOptions
} from 'components/buttons/EditorModeOptions'
import { useTranslation } from 'react-i18next'
import { FeatureState } from 'models/featureState'

export const SiteEditorPage: FC = () => {
  const { t } = useTranslation()

  const { siteId: id, cashierId, partnerId } = useParams()
  const dispatch = useDispatch()
  const { siteEditorState, site } = useSelector((state: RootState) => state.siteEditor)
  const loadingSiteEditor = siteEditorState === FeatureState.Loading

  const [mode, setMode] = useState(id ? EditorMode.VIEW : EditorMode.NEW)

  const { config } = useSelector((s: RootState) => s.siteList)

  const siteId = id ? +id : undefined

  useEffect(() => {
    id && setMode(EditorMode.VIEW)
  }, [id, site])

  useEffect(() => {
    siteId && dispatch(siteEditorActions.getSite(siteId))
    return () => {
      dispatch(siteEditorActions.reset())
    }
  }, [dispatch, siteId])

  const {
    editorParams,
    routeToEditor,
    handleExit,
    handleAfterClose
  } = useGenericModalFormEditorUtils({
    dataId: cashierId,
    rootRoute: `${config.routeRoot}/${id}`
  })

  const onSave = (site: Site): void => {
    dispatch(siteEditorActions.saveSite({ ...site }, siteId, +partnerId!, config.routeRoot))
  }

  const optionProps: EditorModeOptionsProps = {
    mode,
    handleEdit: () => setMode(EditorMode.EDIT),
    handleEscapeEdit: () => setMode(EditorMode.VIEW)
  }
  return (
    <>
      <SiteEditorForm
        mode={mode}
        options={<EditorModeOptions {...optionProps} />}
        title={t('site.editor-title')}
        loading={loadingSiteEditor}
        onSave={onSave}
        onExit={() => history.push(config.routeExit)}
        site={site}
        id={siteId}
      />
      {mode !== EditorMode.NEW && (
        <>
          <CashierList onOpenEditor={routeToEditor} />
          <CashierEditor
            params={editorParams}
            handleExit={handleExit}
            afterClose={handleAfterClose}
          />
        </>
      )}
    </>
  )
}
