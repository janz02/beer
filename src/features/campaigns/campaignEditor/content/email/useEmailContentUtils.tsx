import { SelectValue } from 'antd/lib/select'
import { RootState } from 'app/rootReducer'
import { newsletterEditorActions } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { newsletterListActions } from 'features/newsletter/newsletterList/newsletterListSlice'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useCallback, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore

import { Newsletter, NewsletterPreview } from 'models/newsletter'

interface EmailContentUtils {
  template: Newsletter | undefined
  templateList: NewsletterPreview[]
  handleTemplateSelection: (value: SelectValue) => void
  handleTemplateVersionSelection: (value: SelectValue) => void
}

export const useEmailContentUtils = (): EmailContentUtils => {
  const dispatch = useDispatch()
  const { template } = useSelector((state: RootState) => state.newsletterEditor)
  const { templateList } = useSelector((state: RootState) => state.newsletterList)

  let templateId: number | undefined
  let templateVersionId: number | undefined

  const handleGetTemplates = useCallback((): void => {
    dispatch(newsletterListActions.getNewsletterTemplates())
  }, [dispatch])

  const handleGetTemplate = useCallback(
    (templateId: number): void => {
      if (templateId && !isNaN(+templateId)) {
        dispatch(newsletterEditorActions.getNewsletterTemplate(+templateId))
      }
    },
    [dispatch]
  )

  const handleTemplateVersionSelection = (value: SelectValue): void => {
    const selectedTemplateVersion = value as number

    if (selectedTemplateVersion) {
      templateVersionId = selectedTemplateVersion
      dispatch(newsletterEditorActions.switchNewsletterVersion(templateVersionId))
    }
  }

  const handleTemplateSelection = (value: SelectValue): void => {
    const selectedTemplate = templateList.find(x => x.id === value)

    if (selectedTemplate) {
      templateId = selectedTemplate.id as number
      templateVersionId = selectedTemplate.version as number
      handleGetTemplate(templateId)
    }
  }

  useEffect(() => {
    if (templateList.length < 1) {
      handleGetTemplates()
    }
  }, [templateList, handleGetTemplates])

  return {
    template,
    templateList,
    handleTemplateSelection,
    handleTemplateVersionSelection
  }
}
