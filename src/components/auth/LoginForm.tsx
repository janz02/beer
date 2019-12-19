import React from 'react'
import { Form, Input, Icon, Button, Alert } from 'antd'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { doLogin } from 'store/auth';
import { RootState } from 'app/rootReducer';


export const LoginForm = Form.create({ name: 'login' })(({ form }) => {

  const { isLoading, error } = useSelector((state: RootState) => state.auth.login);

  const dispatch = useDispatch()

  const { t } = useTranslation();

  const { handleSubmit, getFieldDecorator } = useAntdForm(form)

  return (<>
    {error && (<Alert message={t('auth.error.login-failed')} type="error" />)}
    <Form onSubmit={(event) => handleSubmit(event, (values) => dispatch(doLogin(values)))}>
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
      {/* // TODO: check error */}
      {/* <Form.Item>
        {getFieldDecorator('rememember')(
          <Checkbox>{t('auth.field.remember-me')}</Checkbox>
        )}
      </Form.Item> */}
      <Button
        loading={isLoading}
        block
        size="large"
        type="primary"
        htmlType="submit"
      >
        {t('auth.login')}
      </Button>
    </Form>
  </>)
})
