import React, { FC, useEffect, useState } from 'react'
import { SiteEditorForm } from './SiteEditorForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetSiteEditor, saveSite, getSite } from './siteEditorSlice'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { history } from 'router/router'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { CashierList } from '../cashierList/CashierList'
import { CashierEditor } from '../cashierEditor/CashierEditor'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { useReusableSites } from '../useReusableSites'
import {
  EditorMode,
  EditorModeOptionsProps,
  EditorModeOptions
} from 'components/buttons/EditorModeOptions'

export const SiteEditorPage: FC = () => {
  const { siteId: id, cashierId, partnerId } = useParams()
  const dispatch = useDispatch()
  const { loadingSave, site } = useSelector((state: RootState) => state.siteEditor)

  const [mode, setMode] = useState(id ? EditorMode.VIEW : EditorMode.NEW)

  const { route, label } = useReusableSites()

  const siteId = id ? +id : undefined

  useEffect(() => {
    id && setMode(EditorMode.VIEW)
  }, [id, site])

  useEffect(() => {
    siteId && dispatch(getSite(siteId))
    return () => {
      dispatch(resetSiteEditor())
    }
  }, [dispatch, siteId])

  const {
    editorParams,
    routeToEditor,
    handleExit,
    handleAfterClose
  } = useGenericModalFormEditorUtils({
    dataId: cashierId,
    rootRoute: `${route.root}/${id}`
  })

  const onSave = (site: Site): void => {
    dispatch(saveSite({ ...site }, siteId, +partnerId!, route.root))
  }

  const optionProps: EditorModeOptionsProps = {
    mode,
    handleEdit: () => setMode(EditorMode.EDIT),
    handleEscapeEdit: () => setMode(EditorMode.VIEW)
  }
  return (
    <ResponsivePage>
      <SiteEditorForm
        mode={mode}
        options={<EditorModeOptions {...optionProps} />}
        title={label.title}
        loading={loadingSave}
        onSave={onSave}
        onExit={() => history.push(route.exit)}
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
    </ResponsivePage>
  )
}
