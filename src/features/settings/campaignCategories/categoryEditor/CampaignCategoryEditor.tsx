import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useCampaignCategoryEditorUtils } from './useCampaignCategoryEditorUtils'

export interface CampaignCategoryEditorParams {
  visible?: boolean
  isNew?: boolean
  categoryId?: number
}

interface CampaignCategoryEditorProps {
  params: GenericModalFormEditorParams
  handleExit: () => void
  afterClose: () => void
}

export const CampaignCategoryEditor: FC<CampaignCategoryEditorProps> = props => {
  const { params, handleExit } = props
  const { visible, isNew } = params

  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const {
    initialValues,
    loading,
    handleGetCategory,
    handleSave,
    afterCloseExtended
  } = useCampaignCategoryEditorUtils(props)

  useEffect(() => {
    handleGetCategory()
  }, [handleGetCategory])

  const modalTitle = isNew
    ? t('campaign-category.editor-create')
    : t('campaign-category.editor-edit')

  return (
    <GenericModalForm
      loadingAction={loading}
      loadingContent={loading}
      modalProps={{
        visible: visible,
        title: modalTitle,
        okText: t('common.save'),
        afterClose: afterCloseExtended,
        onCancel: handleExit
      }}
      formProps={{
        name: 'campaign-category-editor',
        onFinish: handleSave
      }}
      initialValues={initialValues}
    >
      <Form.Item
        label={t('campaign-category.field.name')}
        name="name"
        rules={[
          rule.requiredString(t('error.validation.category.name-required')),
          rule.max(50, t('error.validation.category.name-max-length-50'))
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>
    </GenericModalForm>
  )
}
