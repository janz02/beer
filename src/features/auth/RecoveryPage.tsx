import React from 'react'
import { Form, Input, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { recoverPassword } from './authSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { AuthLayout } from './AuthLayout'
import { useCommonFormRules } from 'hooks'

export const RecoveryPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.auth)
  const rule = useCommonFormRules()

  return (
    <AuthLayout className="recovery" title={t(`auth.forgot-password`)}>
      <Form
        name="recovery"
        onFinish={values => {
          dispatch(recoverPassword(values))
        }}
      >
        <div className="instruction-text">{t('auth.text.new-password-email')}</div>
        <Form.Item
          name="email"
          rules={[rule.requiredString(t('error.validation.common.email-required'))]}
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
