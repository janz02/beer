import React, { FC, useEffect } from 'react'
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

export const SiteEditorPage: FC = () => {
  const { id, cashierId } = useParams()
  const dispatch = useDispatch()
  const { loadingSave, site } = useSelector((state: RootState) => state.siteEditor)

  const siteId = id ? +id : undefined

  useEffect(() => {
    dispatch(resetSiteEditor())
  }, [dispatch])

  useEffect(() => {
    siteId && dispatch(getSite(siteId))
  }, [dispatch, siteId])

  const {
    editorParams,
    routeToEditor,
    handleExit,
    handleAfterClose
  } = useGenericModalFormEditorUtils({
    dataId: cashierId,
    rootRoute: `/sites/editor/${id}`
  })

  const onSave = (site: Site): void => {
    dispatch(saveSite({ ...site }, siteId))
  }

  return (
    <ResponsivePage>
      <SiteEditorForm
        loading={loadingSave}
        onSave={onSave}
        onExit={() => {
          history.push('/sites/')
        }}
        site={site}
        id={siteId}
      />

      <CashierList onOpenEditor={routeToEditor} />

      <CashierEditor params={editorParams} onExit={handleExit} afterClose={handleAfterClose} />
    </ResponsivePage>
  )
}
