import React, { useEffect, FC } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { history } from 'router/router'
import { useProfile } from './useProfile'

export const ProfileEditorForm: FC = () => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const {
    editable,
    loading,
    submitable,
    form,
    prepareFormFields,
    checkFieldsChange,
    handleFinish
  } = useProfile()

  useEffect(() => {
    prepareFormFields()
  }, [prepareFormFields])

  return (
    <Form
      name="profile-editor-form"
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      onFieldsChange={() => {
        checkFieldsChange()
      }}
    >
      <Form.Item
        name="name"
        label={t('profile.field.name')}
        rules={[
          rule.requiredString(t('error.validation.common.user-name-required')),
          rule.max(100, t('error.validation.common.user-name-max-length-100'))
        ]}
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
        name="password"
        dependencies={['oldPassword']}
        hasFeedback
        label={t('profile.field.new-password')}
        extra={t('common.field.help.password-format')}
        rules={[
          ({ getFieldValue }) => ({
            validator(_rule, value) {
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
            validator(_rule, value) {
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
        rules={[rule.max(20, t('error.validation.common.phone-max-length-20'))]}
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
  )
}
