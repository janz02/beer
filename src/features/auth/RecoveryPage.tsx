import React from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { recoverPassword } from './authSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { AuthLayout } from './AuthLayout'

const RecoveryPage: React.FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { loadingPasswordRecovery: loading, errorPasswordRecovery: error } = useSelector(
    (state: RootState) => state.auth
  )

  return (
    <AuthLayout className="recovery" title={t(`auth.forgot-password`)}>
      {error && <Alert message={t('auth.error.recovery-failed')} type="error" />}

      <Form
        name="recovery"
        onFinish={values => {
          dispatch(recoverPassword(values))
        }}
      >
        <div className="instruction-text">{t('auth.text.new-password-email')}</div>
        <Form.Item
          name="email"
          rules={[{ required: true, message: t('auth.error.email-required') }]}
        >
          <Input prefix={<MailOutlined />} placeholder={t('auth.field.email')} />
        </Form.Item>
        <Button loading={loading} block size="large" type="primary" htmlType="submit">
          {t('auth.send-email')}
        </Button>
      </Form>
      <div className="recovery__additional-options">
        <Button onClick={() => history.push('/auth/')}>{t(`auth.login`)}</Button>
        <Button onClick={() => history.push('/auth/signup')}>{t(`auth.signup`)}</Button>
      </div>
    </AuthLayout>
  )
}

export default RecoveryPage
