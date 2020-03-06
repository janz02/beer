import React, { FC, useEffect, useState, useCallback } from 'react'
import { SiteEditorForm } from './SiteEditorForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSiteEditorData, resetSiteEditor, saveSite } from './siteEditorSlice'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { history } from 'router/router'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { CashierList } from '../cashierList/CashierList'
import { CashierEditor, CashierEditorParams } from '../cashierEditor/CashierEditor'

export const SiteEditorPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loadingSave, site } = useSelector((state: RootState) => state.siteEditor)
  const [editorParams, setEditorParams] = useState<CashierEditorParams>({
    visible: false
  })

  const siteId = id ? +id : undefined

  useEffect(() => {
    dispatch(resetSiteEditor())
  }, [dispatch])

  useEffect(() => {
    siteId && dispatch(getSiteEditorData(siteId))
  }, [dispatch, siteId])

  const onSave = (site: Site): void => {
    dispatch(saveSite({ ...site }, siteId))
  }

  const openEditor = useCallback(
    (cashierId?: number, createNew?: boolean) => {
      if (!cashierId && !createNew) {
        return
      }

      setEditorParams({ visible: true, isNew: createNew, cashierId })
      history.push(`/sites/editor/${id}/?cashierId=${cashierId}`)
    },
    [id]
  )

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
      <CashierList onOpenEditor={openEditor} />
      <CashierEditor
        params={editorParams}
        onExit={() => setEditorParams({ ...editorParams, visible: false })}
        afterClose={() => {
          setEditorParams({ visible: false })
        }}
      />
    </ResponsivePage>
  )
}
