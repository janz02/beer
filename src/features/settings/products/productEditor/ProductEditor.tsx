import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useProductEditor } from './useProductEditor'

export interface ProductEditorParams {
  visible?: boolean
  isNew?: boolean
  productId?: number
}

interface ProductEditorProps {
  params: GenericModalFormEditorParams
  handleExit: () => void
  afterClose: () => void
}

export const ProductEditor: FC<ProductEditorProps> = props => {
  const { params, handleExit } = props
  const { visible, isNew } = params

  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const {
    initialValues,
    loading,
    handleGetProduct,
    handleSave,
    afterCloseExtended
  } = useProductEditor(props)

  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

  const modalTitle = isNew ? t('campaign-product.editor-create') : t('campaign-product.editor-edit')

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
        name: 'product-editor',
        onFinish: handleSave
      }}
      initialValues={initialValues}
    >
      <Form.Item
        label={t('campaign-product.field.name')}
        name="name"
        rules={[
          rule.requiredString(t('error.validation.product.name-required')),
          rule.max(100, t('error.validation.product.name-max-length-100'))
        ]}
      >
        <Input maxLength={100} />
      </Form.Item>
    </GenericModalForm>
  )
}
