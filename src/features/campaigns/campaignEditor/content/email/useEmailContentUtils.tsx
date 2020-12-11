import { SelectValue } from 'antd/lib/select'
import { RootState } from 'app/rootReducer'
import { newsletterEditorActions } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { newsletterListActions } from 'features/newsletter/newsletterList/newsletterListSlice'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useCallback, useEffect } from 'react'
import { Newsletter, NewsletterPreview } from 'models/newsletter'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormInstance } from 'antd/lib/form'
import { campaignEditorActions } from '../../campaignEditorSlice'
import { CampaignEmailContent } from 'models/campaign/campaign'

interface EmailContentUtils {
  form: FormInstance<any>
  template: Newsletter | undefined
  templateList: NewsletterPreview[]
  currentTemplateVersionId: number | undefined
  handleSubmit: (values: any) => void
  handleTemplateSelection: (value: SelectValue) => void
  handleTemplateVersionSelection: (value: SelectValue) => void
}

export const useEmailContentUtils = (campaignId: number | undefined): EmailContentUtils => {
  const dispatch = useDispatch()
  const { form, setFieldsValue } = useFormUtils()
  const { template, currentTemplateVersionId } = useSelector(
    (state: RootState) => state.newsletterEditor
  )
  const { templateList } = useSelector((state: RootState) => state.newsletterList)
  const { campaign } = useSelector((state: RootState) => state.campaignEditor)

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

  const handleTemplateVersionSelection = useCallback(
    (value: SelectValue): void => {
      const selectedTemplateVersion = value as number
      const selectedTemplate = template?.history?.find(h => h?.id === selectedTemplateVersion)
      if (selectedTemplate?.id) {
        dispatch(newsletterEditorActions.switchNewsletterVersion(selectedTemplate?.id))
      }
    },
    [template, dispatch]
  )

  const handleTemplateSelection = (value: SelectValue): void => {
    const selectedTemplate = templateList.find(x => x.id === value)
    if (selectedTemplate?.id) {
      setFieldsValue({ emailTemplateVersion: selectedTemplate?.version })
      handleGetTemplate(selectedTemplate?.id)
      dispatch(newsletterEditorActions.setTemplatePreviewLoading(true))
    }
  }

  const handleSubmit = (values: any): void => {
    const templateVersionNumber = template?.history?.find(
      version => version.id === values?.emailTemplateVersion
    )?.version

    if (campaignId && templateVersionNumber) {
      dispatch(
        campaignEditorActions.updateEmailContent(
          campaignId,
          values.emailTemplateId,
          templateVersionNumber
        )
      )
    }
  }

  useEffect(() => {
    if (templateList.length < 1) {
      handleGetTemplates()
    }
  }, [templateList, handleGetTemplates])

  // Load the right email content from the edit details
  useEffect(() => {
    const emailContent = campaign?.content as CampaignEmailContent
    if (
      !form.getFieldValue('emailTemplateId') &&
      emailContent?.emailTemplateId &&
      emailContent?.emailTemplateVersion &&
      templateList.find(template => template.id === emailContent.emailTemplateId) !== -1
    ) {
      form.setFieldsValue(emailContent)
      handleGetTemplate(emailContent.emailTemplateId)
    }
  }, [form, campaign, templateList, dispatch, handleGetTemplate, handleTemplateVersionSelection])

  // After the right email content loaded, update the version if needed
  useEffect(() => {
    const selectedVersion = form.getFieldValue('emailTemplateVersion')
    const selectedVersionId = template?.history?.find(temp => temp.version === selectedVersion)?.id
    if (selectedVersionId && selectedVersionId !== currentTemplateVersionId) {
      handleTemplateVersionSelection(selectedVersionId)
    }
  }, [form, template, currentTemplateVersionId, handleTemplateVersionSelection])

  return {
    form,
    template,
    templateList,
    currentTemplateVersionId,
    handleSubmit,
    handleTemplateSelection,
    handleTemplateVersionSelection
  }
}
