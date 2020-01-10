import React from 'react';
import { Form, Input, Button, Alert, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'hooks/react-redux-hooks';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RootState } from 'app/rootReducer';
import { login } from './authSlice';
import { history } from 'app/router';
import { AuthLayout } from './AuthLayout';

export const LoginPage = () => {
  const { loadingLogin: loading, errorLogin: error } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <AuthLayout className="login" title={t(`auth.login`)}>
      {error && <Alert message={t('auth.error.login-failed')} type="error" />}
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={values => dispatch(login(values))}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: t('auth.error.username-required') },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('auth.field.username')}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('auth.error.password-required') },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('auth.field.password')}
          />
        </Form.Item>

        <div className="login__options">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{t('auth.field.remember-me')}</Checkbox>
          </Form.Item>
          <Button
            type="link"
            onClick={() => history.push('/auth/recovery')}
          >
            {t('auth.forgot-password')}
          </Button>
        </div>
        <Button
          loading={loading}
          block
          size="large"
          type="primary"
          htmlType="submit"
        >
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
  );
};
