import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { Profile } from 'models/profile'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { Partner } from 'models/partner'
import { history } from 'router/router'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'

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
  const rule = useCommonFormRules()

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue,
    resetFormFields
  } = useFormUtils()

  const handleSubmit = (values: any): void => {
    handleProfileSave({
      ...values
    })
    resetFormFlags()
  }

  useEffect(() => {
    setFieldsValue({
      ...profile,
      registerCode: partner?.registerCode
    })
    resetFormFields(['oldPassword', 'password', 'passwordAgain'])
  }, [partner, profile, resetFormFields, setFieldsValue])

  return (
    <ResponsiveCard floatingTitle={t('profile.editor-title')}>
      <NavigationAlert when={modified} />
      <Form
        name="profile-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        onFieldsChange={() => {
          checkFieldsChange()
        }}
      >
        <Form.Item
          name="name"
          label={t('profile.field.name')}
          rules={[rule.requiredString(), rule.max(100)]}
        >
          <Input disabled={!editable} maxLength={100} />
        </Form.Item>

        <Form.Item name="email" label={t('profile.field.email')}>
          <Input disabled />
        </Form.Item>

        <Form.Item label={t('profile.field.old-password')} name="oldPassword">
          <Input.Password disabled={!editable} />
        </Form.Item>

        <Form.Item
          extra={t('common.filed.help.password-format')}
          name="password"
          dependencies={['oldPassword']}
          hasFeedback
          label={t('profile.field.new-password')}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('oldPassword') !== value) {
                  return Promise.resolve()
                }
                return Promise.reject(t('error.auth.newpassword-sameasold'))
              }
            }),
            rule.password()
          ]}
        >
          <Input.Password disabled={!editable} maxLength={64} />
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
                return Promise.reject(t('error.auth.password-inconsistent'))
              }
            })
          ]}
        >
          <Input.Password disabled={!editable} maxLength={64} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('profile.field.phone')}
          rules={[rule.max(20)]}
          extra={t('common.field.help.phone-format')}
        >
          <Input disabled={!editable} type="tel" maxLength={20} />
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
