import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'
import { history } from 'router/router'
import { AuthLayout } from './components/AuthLayout'
import { useCommonFormRules } from 'hooks/useCommonFormRules'
import { useAuth } from './useAuth'
import styles from './SignupPage.module.scss'
import { useParams } from 'react-router-dom'

export const SignupPage: React.FC = () => {
  const { registrationCode } = useParams()
  const { t } = useTranslation()
  const { loading, handleSignup } = useAuth()
  const rule = useCommonFormRules()

  return (
    <AuthLayout title={t(`auth.signup`)}>
      <Form name="signup" layout="vertical" onFinish={handleSignup}>
        <Form.Item
          name="name"
          label={t('auth.field.name')}
          rules={[
            rule.requiredString(t('error.validation.common.user-name-required')),
            rule.max(100, t('error.validation.common.user-name-max-length-100'))
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          name="username"
          label={t('auth.field.email')}
          rules={[
            rule.requiredString(t('error.validation.common.email-required')),
            rule.email(),
            rule.max(100, t('error.validation.common.email-max-length-100'))
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          label={t('auth.field.password')}
          extra={t('common.field.help.password-format')}
          rules={[
            rule.requiredString(t('error.validation.common.password-required')),
            rule.max(64, t('error.validation.common.password-max-length-64')),
            rule.password()
          ]}
        >
          <Input.Password maxLength={64} />
        </Form.Item>

        <Form.Item
          name="passwordAgain"
          hasFeedback
          label={t('auth.field.password-again')}
          dependencies={['password']}
          rules={[
            rule.requiredString(t('error.validation.common.password-required')),
            rule.max(64, t('error.validation.common.password-max-length-64')),
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
          <Input.Password maxLength={64} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('auth.field.phone')}
          rules={[rule.max(20, t('error.validation.common.phone-max-length-20'))]}
          extra={t('common.field.help.phone-format')}
        >
          <Input type="tel" maxLength={20} />
        </Form.Item>

        <Form.Item
          name="code"
          label={t('auth.field.code')}
          rules={[
            rule.requiredString(
              t('error.validation.register-partner-contact.partner-code-required')
            ),
            rule.max(10, t('error.validation.register-partner-contact.partner-code-max-length-10'))
          ]}
        >
          <Input
            maxLength={10}
            defaultValue={registrationCode ?? ''}
            disabled={!!registrationCode}
          />
        </Form.Item>

        <Form.Item name="acceptTerms" valuePropName="checked">
          <Checkbox>
            <span className="text-faded">{t('auth.text.accept-prefix')}</span>
            <Button
              className={styles.acceptTerms}
              type="link"
              onClick={() => console.log('TODO: open terms and services')}
            >
              <span className="underlined text-faded">{t('auth.text.terms-and-services')}</span>
            </Button>
          </Checkbox>
        </Form.Item>

        <Button
          className="action-btn action-btn--main"
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
        >
          {t('auth.signup')}
        </Button>
      </Form>
      <Button className="action-btn" type="link" onClick={() => history.push('/auth')}>
        {t('auth.login')}
      </Button>
    </AuthLayout>
  )
}
