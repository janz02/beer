import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Card, Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { Partner } from 'models/partner'

export interface PartnerEditorFormProps {
  handlePartnerSave: (values: any) => void
  loading: boolean
  partner?: Partner
}

export const PartnerEditorForm: React.FC<PartnerEditorFormProps> = props => {
  const { handlePartnerSave, loading, partner } = props

  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [submitable, setSubmitable] = useState(false)
  const [form] = Form.useForm()
  const rule = useCommonFormRules()

  const formLayout = isMobile ? 'vertical' : 'horizontal'
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : null

  const handleSubmit = (values: any): void => {
    handlePartnerSave({
      ...values,
      registrationNumber: +values.registrationNumber,
      taxNumber: +values.taxNumber
    })
  }

  // TODO: revisit this problem after upgrading andt package.
  // https://github.com/ant-design/ant-design/issues/18983
  // https://github.com/ant-design/ant-design/issues/20987
  // This should work instead of the workaround below.
  // useEffect(() => {
  //   form.setFieldsValue({
  //     ...partner
  //   })
  // }, [form, partner])
  const formRef = useRef(form)
  useEffect(() => {
    formRef.current = form
  }, [form])
  useEffect(() => {
    formRef.current.setFieldsValue({
      ...partner
    })
  }, [partner])

  return (
    <Card className="partner-editor-form" title={t('partner.editor-title')}>
      <Form
        name="partner-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout={formLayout}
        onFieldsChange={() => {
          const hasErrors = form.getFieldsError().some(field => field.errors.length)
          if (submitable === hasErrors) {
            setSubmitable(!submitable)
          }
        }}
      >
        <Form.Item
          name="name"
          label={t('partner.field.name')}
          rules={[rule.required('partner.error.name-required')]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          valuePropName="majorPartner"
          label={t('partner.field.major-partner')}
          rules={[rule.required('partner.error.major-partner-required')]}
          {...formItemLayout}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="address"
          label={t('partner.field.address')}
          rules={[rule.required('partner.error.address-required')]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="companyRegisterNumber"
          label={t('partner.field.company-register-number')}
          rules={[rule.required('partner.error.company-register-number-required')]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="vatNumber"
          label={t('partner.field.vat-number')}
          rules={[rule.required('partner.error.vat-number-required')]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
          {t('partner.save')}
        </Button>
      </Form>
    </Card>
  )
}
