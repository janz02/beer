import { useEffect, useState, useCallback } from 'react'
import { EditorMode, EditorModeOptionsProps } from 'components/buttons/EditorModeOptions'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { FeatureState } from 'models/featureState'
import { siteEditorActions } from '../siteEditorSlice'
import { Site } from 'models/site'
import { history } from 'router/router'
import { useTranslation } from 'react-i18next'
import { SiteEditorFormProps } from './SiteEditorForm'
import { SiteFeatureConfig } from 'features/sites/siteList/useSiteList'

export const getSiteListExitPath = (partnerId?: number | string): string =>
  partnerId ? `/partners/${partnerId}` : `/sites`

export const getSiteListRootPath = (partnerId?: number | string): string =>
  partnerId ? `/partners/${partnerId}/site` : `/sites/editor`

interface UseSiteEditorFormUtils {
  siteEditorFormProps: SiteEditorFormProps
  handleGetSite: () => void
  handleResetSite: () => void
}
export const useSiteEditorForm = (config: SiteFeatureConfig): UseSiteEditorFormUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { siteId: id, partnerId } = useParams()
  const siteId = id ? +id : undefined
  const { siteEditorState, site } = useSelector((state: RootState) => state.siteEditor)

  const loadingSiteEditor = siteEditorState === FeatureState.Loading

  const [siteEditorMode, setSiteEditorMode] = useState(id ? EditorMode.VIEW : EditorMode.NEW)

  useEffect(() => {
    id && setSiteEditorMode(EditorMode.VIEW)
  }, [id, site])

  const siteEditorOptionProps: EditorModeOptionsProps = {
    mode: siteEditorMode,
    canEdit: config.canEdit,
    handleEdit: () => setSiteEditorMode(EditorMode.EDIT),
    handleEscapeEdit: () => setSiteEditorMode(EditorMode.VIEW)
  }

  const handleSaveSite = (site: Site): void => {
    dispatch(
      siteEditorActions.saveSite({ ...site }, siteId, +partnerId!, getSiteListRootPath(partnerId))
    )
  }

  const handleExitSiteEditor = useCallback(
    (): void => history.push(getSiteListExitPath(partnerId)),
    [partnerId]
  )

  const handleGetSite = useCallback((): void => {
    siteId && dispatch(siteEditorActions.getSite(siteId))
  }, [siteId, dispatch])

  const handleResetSite = useCallback((): void => {
    dispatch(siteEditorActions.reset())
  }, [dispatch])

  const siteEditorFormProps: SiteEditorFormProps = {
    mode: siteEditorMode,
    options: siteEditorOptionProps,
    title: t('site.editor-title'),
    loading: loadingSiteEditor,
    onSave: handleSaveSite,
    onExit: handleExitSiteEditor,
    site: site,
    id: siteId
  }

  return {
    siteEditorFormProps,
    handleGetSite,
    handleResetSite
  }
}
