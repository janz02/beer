import React, { useEffect, useMemo } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { Product } from 'models/product'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'
import { BackButtonProps } from 'components/buttons/BackButton'
import { EditorMode } from 'components/buttons/EditorModeOptions'

export interface ProductEditorFormProps {
  mode: EditorMode
  loading: boolean
  title: string
  product?: Product
  handleBack?: () => void
  options?: JSX.Element
  handleSave: (values: Product) => void
}

export const ProductEditorForm: React.FC<ProductEditorFormProps> = props => {
  const { title, handleBack, handleSave, loading, product, mode, options } = props
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const isMobile = useIsMobile()

  const view = useMemo(() => mode === EditorMode.VIEW, [mode])

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue
  } = useFormUtils()

  const formLayout = isMobile ? 'vertical' : 'horizontal'
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 }
        }
      : null

  const handleSubmit = (values: any): void => {
    handleSave(values)
    resetFormFlags()
  }

  useEffect(() => {
    if (mode === EditorMode.VIEW) {
      setFieldsValue(product)
      resetFormFlags()
    }
  }, [mode, product, resetFormFlags, setFieldsValue])

  const backButtonProps: BackButtonProps | undefined = handleBack
    ? { primary: !modified, onClick: handleBack, label: t('common.go-back-to-list') }
    : undefined

  return (
    <ResponsiveCard
      floatingTitle={title}
      floatingOptions={options}
      floatingBackButton={backButtonProps}
    >
      <NavigationAlert when={modified && mode === EditorMode.EDIT} />
      <Form
        name="product-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout={formLayout}
        onFieldsChange={() => {
          checkFieldsChange()
        }}
      >
        <Form.Item
          name="name"
          label={t('product.field.name')}
          rules={[
            rule.requiredString(t('error.validation.product.name-required')),
            rule.max(150, t('error.validation.product.name-max-length-150'))
          ]}
          {...formItemLayout}
        >
          <Input disabled={view} />
        </Form.Item>
        <Button
          hidden={mode === EditorMode.VIEW}
          type="primary"
          htmlType="submit"
          disabled={!submitable}
          loading={loading}
        >
          {t('common.save')}
        </Button>
      </Form>
    </ResponsiveCard>
  )
}
