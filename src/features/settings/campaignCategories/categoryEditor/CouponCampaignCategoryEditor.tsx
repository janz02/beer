import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useCouponCampaignCategoryEditorUtils } from './useCouponCampaignCategoryEditorUtils'

export interface CouponCampaignCategoryEditorParams {
  visible?: boolean
  isNew?: boolean
  categoryId?: number
}

interface CouponCampaignCategoryEditorProps {
  params: GenericModalFormEditorParams
  handleExit: () => void
  afterClose: () => void
}

export const CouponCampaignCategoryEditor: FC<CouponCampaignCategoryEditorProps> = props => {
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
  } = useCouponCampaignCategoryEditorUtils(props)

  useEffect(() => {
    handleGetCategory()
  }, [handleGetCategory])

  const modalTitle = isNew
    ? t('coupon-campaign-category.editor-create')
    : t('coupon-campaign-category.editor-edit')

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
        name: 'coupon-campaign-category-editor',
        onFinish: handleSave
      }}
      initialValues={initialValues}
    >
      <Form.Item
        label={t('coupon-campaign-category.field.name')}
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
