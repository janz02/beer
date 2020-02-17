import React from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { login } from './authSlice'
import { history } from 'router/router'
import { AuthLayout } from './AuthLayout'
import { useCommonFormRules } from 'hooks/useCommonFormRules'

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const { loading, errorLogin: error } = useSelector((state: RootState) => state.auth)

  return (
    <AuthLayout title={t(`auth.login`)}>
      {error && <Alert message={t('auth.error.login-failed')} type="error" />}
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={values => dispatch(login(values))}
      >
        <Form.Item label={t('auth.field.email')} name="username" rules={[rule.required()]}>
          <Input />
        </Form.Item>
        <Form.Item label={t('auth.field.password')} name="password" rules={[rule.required()]}>
          <Input.Password />
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
          className="auth__action-btn auth__action-btn--main"
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
        >
          {t('auth.login')}
        </Button>
      </Form>
      <Button className="auth__action-btn" type="link" onClick={() => history.push('/auth/signup')}>
        {t('auth.signup')}
      </Button>
    </AuthLayout>
  )
}
