import React from 'react'
import { Form, Input, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { history } from 'router/router'
import { AuthLayout } from './AuthLayout'
import { useCommonFormRules } from 'hooks'
import { useAuth } from './useAuth'
import styles from './RecoveryPage.module.scss'

export const RecoveryPage: React.FC = () => {
  const { t } = useTranslation()
  const { loading, handleRecoverPassword } = useAuth()
  const rule = useCommonFormRules()

  return (
    <AuthLayout title={t(`auth.forgot-password`)}>
      <Form name="recovery" onFinish={handleRecoverPassword}>
        <div className={styles.instructionText}>{t('auth.text.new-password-email')}</div>

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

      <div className={styles.additionalOptions}>
        <Button onClick={() => history.push('/auth/')}>{t(`auth.login`)}</Button>

        <Button onClick={() => history.push('/auth/signup')}>{t(`auth.signup`)}</Button>
      </div>
    </AuthLayout>
  )
}
