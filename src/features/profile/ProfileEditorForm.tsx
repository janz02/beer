import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { Profile } from 'models/profile'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { Partner } from 'models/partner'
import { history } from 'router/router'

export interface ProfileEditorFormProps {
  handleProfileSave: (values: any) => void
  loading: boolean
  profile?: Profile
  editable?: boolean
  partner?: Partner
}

export const ProfileEditorForm: React.FC<ProfileEditorFormProps> = props => {
  const { handleProfileSave, loading, profile, editable, partner } = props
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [submitable, setSubmitable] = useState(false)
  const [passwordHelpVisible, setPasswordHelpVisible] = useState(false)
  const rule = useCommonFormRules()

  const handleSubmit = (values: any): void => {
    handleProfileSave({
      ...values
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
      registerCode: partner?.registerCode
    })
    formRef.current.resetFields(['password', 'passwordAgain', 'oldPassword'])
  }, [partner, profile])

  return (
    <ResponsiveCard responsiveCardTitle={t('profile.editor-title')}>
      <Form
        name="profile-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
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
          rules={[rule.required(), rule.max(100)]}
        >
          <Input disabled={!editable} />
        </Form.Item>

        <Form.Item
          extra={passwordHelpVisible ? t('common.password-format-help') : ''}
          name="password"
          hasFeedback
          label={t('profile.field.new-password')}
          rules={[rule.password()]}
        >
          <Input.Password
            disabled={!editable}
            onClick={() => {
              setPasswordHelpVisible(true)
            }}
          />
        </Form.Item>

        <Form.Item
          name="passwordAgain"
          hasFeedback
          label={t('profile.field.new-password-again')}
          dependencies={['password']}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(t('auth.error.password-inconsistent'))
              }
            })
          ]}
        >
          <Input.Password disabled={!editable} />
        </Form.Item>

        <Form.Item label={t('profile.field.old-password')} name="oldPassword">
          <Input.Password disabled={!editable} />
        </Form.Item>

        <Form.Item name="phone" label={t('profile.field.phone')} rules={[rule.max(20)]}>
          <Input disabled={!editable} type="tel" />
        </Form.Item>

        <Form.Item name="email" label={t('profile.field.email')}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="registerCode" label={t('profile.field.code')}>
          <Input disabled />
        </Form.Item>

        <div className="form-actions">
          <Button
            onClick={() => {
              history.goBack()
            }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            hidden={!editable}
            type="primary"
            htmlType="submit"
            disabled={!submitable}
            loading={loading}
          >
            {t('profile.save')}
          </Button>
        </div>
      </Form>
    </ResponsiveCard>
  )
}
