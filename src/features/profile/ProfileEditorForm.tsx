import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { useIsMobile } from 'hooks'
import { Profile } from 'models/profile'
import { MailOutlined } from '@ant-design/icons'

export interface ProfileEditorFormProps {
  handleProfileSave: (values: any) => void
  loading: boolean
  profile?: Profile
}

export const ProfileEditorForm: React.FC<ProfileEditorFormProps> = props => {
  const { handleProfileSave, loading, profile } = props

  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [submitable, setSubmitable] = useState(false)
  const [form] = Form.useForm()

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
      ...values
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      ...profile
    })
  }, [form, profile])

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
          rules={[{ required: true, message: t('profile.error.name-required') }]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('profile.field.email')}
          rules={[{ required: true, type: 'email', message: t('profile.error.email-required') }]}
          {...formItemLayout}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('profile.field.phone')}
          rules={[{ required: true, message: t('profile.error.phone-required') }]}
          {...formItemLayout}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
          {t('profile.save')}
        </Button>
      </Form>
    </Card>
  )
}
