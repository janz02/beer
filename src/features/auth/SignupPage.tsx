import React from 'react'
import { Form, Input, Button, Alert, Checkbox } from 'antd'
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
  const rule = useCommonFormRules()

  const { loading, errorSignup: error } = useSelector((state: RootState) => state.auth)

  return (
    <AuthLayout className="signup" title={t(`auth.signup`)}>
      {error && <Alert message={t('auth.error.signup-failed')} type="error" />}
      <Form name="signup" layout="vertical" onFinish={values => dispatch(signUp(values))}>
        <Form.Item name="username" label={t('auth.field.username')} rules={[rule.required()]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          label={t('auth.field.password')}
          rules={[rule.required(), rule.password()]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="passwordAgain"
          hasFeedback
          label={t('auth.field.password-again')}
          dependencies={['password']}
          rules={[
            rule.required(),
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(t('auth.error.password-inconsistent'))
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="company" label={t('auth.field.company')} rules={[rule.required()]}>
          <Input />
        </Form.Item>

        <Form.Item name="name" label={t('auth.field.name')} rules={[rule.required()]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('auth.field.phone')}
          rules={[rule.required(), rule.number()]}
        >
          <Input type="tel" />
        </Form.Item>

        <Form.Item
          name="code"
          label={t('auth.field.code')}
          extra={t('auth.text.client-code-info')}
          rules={[rule.required()]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="acceptTerms" valuePropName="checked">
          <Checkbox>
            {t('auth.text.accept-prefix')}
            <Button
              className="signup__accept-terms"
              type="link"
              onClick={() => console.log('TODO: open terms and services')}
            >
              {' '}
              {t('auth.text.terms-and-services')}
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
