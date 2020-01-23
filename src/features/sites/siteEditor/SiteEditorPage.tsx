import React, { FC, useEffect } from 'react'
import { SiteEditorForm } from './SiteEditorForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSite, resetSiteEditor, saveSite } from './siteEditorSlice'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { history } from 'router/router'
export const SiteEditorPage: FC = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const site = useSelector((state: RootState) => state.siteEditor.site)
  const loading = useSelector((state: RootState) => state.siteEditor.loadingSave)

  useEffect(
    () => () => {
      dispatch(resetSiteEditor())
    },
    [dispatch]
  )

  useEffect(() => {
    if (id && !isNaN(+id)) {
      dispatch(getSite(+id))
    }
  }, [dispatch, id])

  const onSave = (site: Site): void => {
    id && dispatch(saveSite(+id, { ...site }))
  }

  return (
    <div>
      <SiteEditorForm
        loading={loading}
        onSave={onSave}
        onExit={() => {
          history.push('/sites/')
        }}
        site={site}
      />
    </div>
  )
}
