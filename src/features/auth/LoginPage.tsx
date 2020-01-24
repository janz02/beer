import React from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { RootState } from 'app/rootReducer'
import { login } from './authSlice'
import { history } from 'router/router'
import { AuthLayout } from './AuthLayout'
import { useCommonFormRules } from 'hooks/useCommonFormRules'

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const { loadingLogin: loading, errorLogin: error } = useSelector((state: RootState) => state.auth)

  return (
    <AuthLayout className="login" title={t(`auth.login`)}>
      {error && <Alert message={t('auth.error.login-failed')} type="error" />}
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={values => dispatch(login(values))}
      >
        <Form.Item name="username" rules={[rule.required(t('auth.error.username-required'))]}>
          <Input prefix={<UserOutlined />} placeholder={t('auth.field.username')} />
        </Form.Item>
        <Form.Item name="password" rules={[rule.required(t('auth.error.password-required'))]}>
          <Input.Password prefix={<LockOutlined />} placeholder={t('auth.field.password')} />
        </Form.Item>
        {/* TODO: was commented out because there is BE support yet -> see NRMRTDKPR-125 */}
        {/* <div className="login__options">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{t('auth.field.remember-me')}</Checkbox>
          </Form.Item>
          <Button type="link" onClick={() => history.push('/auth/recovery')}>
            {t('auth.forgot-password')}
          </Button>
        </div> */}
        <Button loading={loading} block size="large" type="primary" htmlType="submit">
          {t('auth.login')}
        </Button>
      </Form>
      <Button
        className="login__signup-button"
        type="link"
        onClick={() => history.push('/auth/signup')}
      >
        {t('auth.signup')}
      </Button>
    </AuthLayout>
  )
}
