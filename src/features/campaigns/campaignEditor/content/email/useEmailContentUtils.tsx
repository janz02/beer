import { SelectValue } from 'antd/lib/select'
import { RootState } from 'app/rootReducer'
import { newsletterEditorActions } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { newsletterListActions } from 'features/newsletter/newsletterList/newsletterListSlice'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useCallback, useEffect } from 'react'
import { Newsletter, NewsletterPreview } from 'models/newsletter'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormInstance } from 'antd/lib/form'

interface EmailContentUtils {
  form: FormInstance<any>
  template: Newsletter | undefined
  templateList: NewsletterPreview[]
  currentTemplateVersionId: number | undefined
  handleTemplateSelection: (value: SelectValue) => void
  handleTemplateVersionSelection: (value: SelectValue) => void
}

export const useEmailContentUtils = (): EmailContentUtils => {
  const dispatch = useDispatch()
  const { form, setFieldsValue } = useFormUtils()
  const { template, currentTemplateVersionId } = useSelector(
    (state: RootState) => state.newsletterEditor
  )
  const { templateList } = useSelector((state: RootState) => state.newsletterList)

  const handleGetTemplates = useCallback((): void => {
    dispatch(newsletterListActions.getNewsletterTemplates({ pageSize: -1 }))
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
    const selectedTemplate = template?.history?.find(h => h?.id === selectedTemplateVersion)

    if (selectedTemplate?.id) {
      dispatch(newsletterEditorActions.switchNewsletterVersion(selectedTemplate?.id))
    }
  }

  const handleTemplateSelection = (value: SelectValue): void => {
    const selectedTemplate = templateList.find(x => x.id === value)

    if (selectedTemplate?.id) {
      setFieldsValue({ templateVersion: selectedTemplate?.version })
      handleGetTemplate(selectedTemplate?.id)
    }
  }

  useEffect(() => {
    if (templateList.length < 1) {
      handleGetTemplates()
    }
  }, [templateList, handleGetTemplates])

  return {
    form,
    template,
    templateList,
    currentTemplateVersionId,
    handleTemplateSelection,
    handleTemplateVersionSelection
  }
}
