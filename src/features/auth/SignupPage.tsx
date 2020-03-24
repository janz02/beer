import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { signUp } from './authSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { AuthLayout } from './AuthLayout'
import { useCommonFormRules } from 'hooks/useCommonFormRules'

export const SignupPage: React.FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { loading } = useSelector((state: RootState) => state.auth)
  const rule = useCommonFormRules()

  return (
    <AuthLayout className="signup" title={t(`auth.signup`)}>
      <Form name="signup" layout="vertical" onFinish={values => dispatch(signUp(values))}>
        <Form.Item
          name="name"
          label={t('auth.field.name')}
          rules={[rule.requiredString(), rule.max(100)]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          name="username"
          label={t('auth.field.email')}
          rules={[rule.requiredString(), rule.email(), rule.max(100)]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          label={t('auth.field.password')}
          rules={[rule.requiredString(), rule.password()]}
        >
          <Input.Password maxLength={64} />
        </Form.Item>

        <Form.Item
          name="passwordAgain"
          hasFeedback
          label={t('auth.field.password-again')}
          dependencies={['password']}
          rules={[
            rule.requiredString(),
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
          <Input.Password maxLength={64} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('auth.field.phone')}
          rules={[rule.max(20)]}
          help={t('common.field.help.phone-format')}
        >
          <Input type="tel" maxLength={20} />
        </Form.Item>

        <Form.Item name="code" label={t('auth.field.code')} rules={[rule.requiredString(), rule.max(10)]}>
          <Input maxLength={10} />
        </Form.Item>

        <Form.Item name="acceptTerms" valuePropName="checked">
          <Checkbox>
            <span className="text-faded">{t('auth.text.accept-prefix')}</span>
            <Button
              className="signup__accept-terms"
              type="link"
              onClick={() => console.log('TODO: open terms and services')}
            >
              <span className="underlined text-faded">{t('auth.text.terms-and-services')}</span>
            </Button>
          </Checkbox>
        </Form.Item>

        <Button
          className="auth__action-btn auth__action-btn--main"
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
        >
          {t('auth.signup')}
        </Button>
      </Form>
      <Button className="auth__action-btn" type="link" onClick={() => history.push('/auth')}>
        {t('auth.login')}
      </Button>
    </AuthLayout>
  )
}
