import React from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { history } from 'router/router'
import { AuthLayout } from './components/AuthLayout'
import { useCommonFormRules } from 'hooks/useCommonFormRules'
import { useAuthUtils } from './useAuthUtils'

export const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const { loading, handleLogin } = useAuthUtils()
  const rule = useCommonFormRules()

  return (
    <AuthLayout title={t(`auth.login`)}>
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          label={t('auth.field.email')}
          name="username"
          rules={[
            rule.requiredString(t('error.validation.common.email-required')),
            rule.max(100, t('error.validation.common.email-max-length-100'))
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item
          label={t('auth.field.password')}
          name="password"
          rules={[
            rule.requiredString(t('error.validation.common.password-required')),
            rule.max(64, t('error.validation.common.password-max-length-64'))
          ]}
        >
          <Input.Password maxLength={64} />
        </Form.Item>
        {/* TODO: was commented out because there is no BE support yet -> see NRMRTDKPR-125 */}
        {/* <div className="login__options">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{t('auth.field.remember-me')}</Checkbox>
          </Form.Item>
          <Button type="link" onClick={() => history.push('/auth/recovery')}>
            {t('auth.forgot-password')}
          </Button>
        </div> */}
        <Button
          className="action-btn action-btn--main"
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
        >
          {t('auth.login')}
        </Button>
      </Form>
      <Button className="action-btn" type="link" onClick={() => history.push('/auth/signup')}>
        {t('auth.signup')}
      </Button>
    </AuthLayout>
  )
}
