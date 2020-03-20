import React, { useEffect } from 'react'
import { Form, Input, Button, Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import { Partner } from 'models/partner'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'

export interface PartnerEditorFormProps {
  handlePartnerSave: (values: any) => void
  loading: boolean
  partner?: Partner
}

export const PartnerEditorForm: React.FC<PartnerEditorFormProps> = props => {
  const { handlePartnerSave, loading, partner } = props
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const isMobile = useIsMobile()

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setInitialFieldsValue
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
    handlePartnerSave({
      ...values,
      registrationNumber: +values.registrationNumber,
      taxNumber: +values.taxNumber,
      bankAccount: +values.bankAccount
    })
    resetFormFlags()
  }

  useEffect(() => {
    setInitialFieldsValue({
      ...partner,
      registrationNumber: partner?.registrationNumber?.toString(),
      taxNumber: partner?.taxNumber?.toString(),
      bankAccount: partner?.bankAccount?.toString()
    })
  }, [form, partner, setInitialFieldsValue])

  return (
    <ResponsiveCard wide floatingTitle={t('partner.editor-title')}>
      <NavigationAlert when={modified} />
      <Form
        name="partner-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout={formLayout}
        onFieldsChange={() => {
          checkFieldsChange()
        }}
      >
        <Form.Item
          name="name"
          label={t('partner.field.name')}
          rules={[rule.requiredString()]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="majorPartner"
          valuePropName="checked"
          label={t('partner.field.major-partner')}
          {...formItemLayout}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="address"
          label={t('partner.field.address')}
          rules={[rule.requiredString()]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="bankAccount"
          label={t('partner.field.bankAccount')}
          rules={[rule.requiredString(), rule.number()]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="registrationNumber"
          label={t('partner.field.registration-number')}
          rules={[rule.requiredString(), rule.number()]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="taxNumber"
          label={t('partner.field.tax-number')}
          rules={[rule.requiredString(), rule.number()]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
          {t('partner.save')}
        </Button>
      </Form>
    </ResponsiveCard>
  )
}
