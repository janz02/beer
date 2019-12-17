import React from 'react'
import { Card, Form, Input, Icon, Button, Checkbox } from 'antd'
import { useTranslation } from 'react-i18next';
import './AuthForm.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { setLoggedIn, loginRequest } from 'store/auth';
import { RootState } from 'app/rootReducer';


export const LoginForm = Form.create({ name: 'login' })(({ form }) => {

  const { isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth);


  const dispatch = useDispatch()

  const { t } = useTranslation();

  const { handleSubmit, getFieldDecorator } = useAntdForm(form)


  const doLogin = (v: any) => {
    console.log('doLogin hello', v)
    dispatch(loginRequest(v))
  }


  return (<>
    <Card title={t('auth.login')} className="login__card">
      <Form onSubmit={(event) => handleSubmit(event, doLogin)}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: t('auth.error.username-required') }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder={t('auth.field.username')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: t('auth.error.password-required') }
            ]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder={t('auth.field.password')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rememember')(
            <Checkbox>{t('auth.field.remember-me')}</Checkbox>
          )}
        </Form.Item>
        <Button
          loading={isLoading}
          block
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {t('auth.login')}
        </Button>
      </Form>
    </Card>
  </>)
})
