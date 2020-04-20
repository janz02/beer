import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useCategoryEditor } from './useCategoryEditor'

export interface CategoryEditorParams {
  visible?: boolean
  isNew?: boolean
  categoryId?: number
}

interface CategoryEditorProps {
  params: GenericModalFormEditorParams
  handleExit: () => void
  afterClose: () => void
}

export const CategoryEditor: FC<CategoryEditorProps> = props => {
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
  } = useCategoryEditor(props)

  useEffect(() => {
    handleGetCategory()
  }, [handleGetCategory])

  const modalTitle = isNew ? t('coupon-category.editor-create') : t('coupon-category.editor-edit')

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
        name: 'category-editor',
        onFinish: handleSave
      }}
      initialValues={initialValues}
    >
      <Form.Item
        label={t('coupon-category.field.name')}
        name="name"
        rules={[rule.requiredString(), rule.max(50)]}
      >
        <Input maxLength={50} />
      </Form.Item>
    </GenericModalForm>
  )
}
