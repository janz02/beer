import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { Profile } from 'models/profile'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'

export interface ProfileEditorFormProps {
  handleProfileSave: (values: any) => void
  loading: boolean
  profile?: Profile
  editable?: boolean
}

export const ProfileEditorForm: React.FC<ProfileEditorFormProps> = props => {
  const { handleProfileSave, loading, profile, editable } = props

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
    handleProfileSave({
      ...values,
      phone: +values.phone
    })
  }

  // TODO: revisit this problem after upgrading andt package.
  // https://github.com/ant-design/ant-design/issues/18983
  // https://github.com/ant-design/ant-design/issues/20987
  // This should work instead of the workaround below.
  // useEffect(() => {
  //   form.setFieldsValue({
  //     ...profile
  //   })
  // }, [form, profile])
  const formRef = useRef(form)
  useEffect(() => {
    formRef.current = form
  }, [form])
  useEffect(() => {
    formRef.current.setFieldsValue({
      ...profile,
      phone: profile?.phone?.toString()
    })
  }, [profile])

  return (
    <Card className="profile-editor-form" title={t('profile.editor-title')}>
      <Form
        name="profile-editor-form"
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
          label={t('profile.field.name')}
          rules={[rule.required()]}
          {...formItemLayout}
        >
          <Input disabled={!editable} />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('profile.field.email')}
          rules={[rule.required(t('profile.error.email-required'), { type: 'email' })]}
          {...formItemLayout}
        >
          <Input disabled={!editable} prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('profile.field.phone')}
          rules={[rule.required()]}
          {...formItemLayout}
        >
          <Input disabled={!editable} type="tel" prefix={<PhoneOutlined />} />
        </Form.Item>

        <Button
          hidden={!editable}
          type="primary"
          htmlType="submit"
          disabled={!submitable}
          loading={loading}
        >
          {t('profile.save')}
        </Button>
      </Form>
    </Card>
  )
}
