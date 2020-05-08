import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newsletterEditorActions, NewsletterTemplateContentState } from '../newsletterEditorSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { useParams } from 'react-router-dom'
import { FeatureState } from 'models/featureState'
import { Newsletter } from 'models/newsletter'

interface UseNewsletterEditorHandlersUtils {
  template: Newsletter | undefined
  isTemplateModified: boolean
  isLatestTemplate: boolean
  currentTemplateVersionId?: number
  templateState: FeatureState
  saveState: FeatureState
  handleVersionPreviewSwitch: (id: number) => void
  handleExitEditor: () => void
  handleOpenSegmentEmailModal: () => void
  handleOpenTestEmailModal: () => void
  handleOpenRevertModal: () => void
  handleGetTemplate: () => void
  handleClearTemplate: () => void
  handleSaveVersion: (template: string) => void
}
export const useNewsletterEditorHandlers = (): UseNewsletterEditorHandlersUtils => {
  const dispatch = useDispatch()
  const { templateId } = useParams()

  const {
    template,
    currentTemplateVersionId,
    templateContentState,
    templateState,
    saveState
  } = useSelector((state: RootState) => state.newsletterEditor)

  const handleGetTemplate = useCallback((): void => {
    if (templateId && !isNaN(+templateId)) {
      dispatch(newsletterEditorActions.getNewsletterTemplate(+templateId))
    }
  }, [templateId, dispatch])

  const isTemplateModified = templateContentState === NewsletterTemplateContentState.Modified

  const isLatestTemplate = useMemo(() => {
    const newestTemplateVersionId = template?.history?.[0]?.id
    return newestTemplateVersionId === currentTemplateVersionId
  }, [currentTemplateVersionId, template])

  const handleVersionPreviewSwitch = useCallback(
    (id: number) => {
      if (isTemplateModified) {
        dispatch(newsletterEditorActions.openDiscardModal(id))
      } else {
        dispatch(newsletterEditorActions.switchNewsletterVersion(id))
      }
    },
    [dispatch, isTemplateModified]
  )

  const handleExitEditor = (): void => {
    history.push('/newsletter')
  }

  const handleClearTemplate = useCallback((): void => {
    dispatch(newsletterEditorActions.clearNewsletterTemplate())
  }, [dispatch])

  const handleOpenSegmentEmailModal = (): void => {
    dispatch(newsletterEditorActions.openSegmentEmailModal())
  }

  const handleOpenTestEmailModal = (): void => {
    dispatch(newsletterEditorActions.openTestEmailModal())
  }

  const handleOpenRevertModal = (): void => {
    dispatch(newsletterEditorActions.openRevertModal())
  }

  const handleSaveVersion = (template: string): void => {
    dispatch(newsletterEditorActions.saveNewsletterTemplateVersion(template))
  }

  return {
    template,
    saveState,
    templateState,
    isLatestTemplate,
    isTemplateModified,
    currentTemplateVersionId,
    handleVersionPreviewSwitch,
    handleExitEditor,
    handleOpenRevertModal,
    handleOpenSegmentEmailModal,
    handleOpenTestEmailModal,
    handleGetTemplate,
    handleClearTemplate,
    handleSaveVersion
  }
}
