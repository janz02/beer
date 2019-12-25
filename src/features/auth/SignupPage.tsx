import React from 'react';
import { Form, Input, Button, Alert, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  PhoneOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { signUp } from './authSlice';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { AuthLayout } from './AuthLayout';

export const SignupPage = () => {
  const { loadingSignup: loading, errorSignup: error } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <AuthLayout title={t(`auth.signup`)}>
      {error && <Alert message={t('auth.error.signup-failed')} type="error" />}
      <Form
        name="signup"
        layout="vertical"
        onFinish={values => dispatch(signUp(values))}
      >
        <Form.Item
          name="username"
          label={t('auth.field.username')}
          rules={[
            { required: true, message: t('auth.error.username-required') },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          label={t('auth.field.password')}
          rules={[
            { required: true, message: t('auth.error.password-required') },
            {
              pattern: new RegExp(
                '^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
              ),
              message: t('auth.error.password-format'),
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="passwordAgain"
          hasFeedback
          label={t('auth.field.password-again')}
          dependencies={['password']}
          rules={[
            { required: true, message: t('auth.error.password-required') },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t('auth.error.password-inconsistent'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="company"
          label={t('auth.field.company')}
          rules={[
            { required: true, message: t('auth.error.company-required') },
          ]}
        >
          <Input prefix={<HomeOutlined />} />
        </Form.Item>

        <Form.Item
          name="name"
          label={t('auth.field.name')}
          rules={[{ required: true, message: t('auth.error.name-required') }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t('auth.field.phone')}
          rules={[{ required: true, message: t('auth.error.phone-required') }]}
        >
          <Input type="tel" prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item
          name="code"
          label={t('auth.field.code')}
          extra={t('auth.text.client-code-info')}
          rules={[{ required: true, message: t('auth.error.code-required') }]}
        >
          <Input prefix={<CrownOutlined />} />
        </Form.Item>

        <Form.Item name="acceptTerms" valuePropName="checked">
          <Checkbox>
            {t('auth.text.accept-prefix')}
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => console.log('TODO: open terms and services')}
            >
              {' '}
              {t('auth.text.terms-and-services')}
            </Button>
          </Checkbox>
        </Form.Item>

        <Button
          loading={loading}
          block
          size="large"
          type="primary"
          htmlType="submit"
        >
          {t('auth.signup')}
        </Button>

        {/* <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              // { required: true, message: t('auth.error.phone-required') }
            ],
          })(
            <Input
              prefix={<Icon type="phone" />}
              type="tel"
              placeholder={t('auth.field.phone')}
            />
          )}
        </Form.Item>
        <Form.Item extra={t('auth.text.client-code-info')}>
          {getFieldDecorator('code', {
            rules: [
              // { required: true, message: t('auth.error.phone-required') }
            ],
          })(
            <Input
              prefix={<Icon type="crown" />}
              type="text"
              placeholder={t('auth.field.code')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('accept', { valuePropName: 'checked' })(
            <Checkbox>
              {t('auth.text.accept-prefix')}
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => console.log('TODO: open terms and services')}
              >
                {' '}
                {t('auth.text.terms-and-services')}
              </Button>
            </Checkbox>
          )}
        </Form.Item>
        <Button
          loading={loading}
          block
          size="large"
          type="primary"
          htmlType="submit"
        >
          {t('auth.signup')}
        </Button> */}
      </Form>
      <Button
        style={{ float: 'right', marginTop: '0.75rem' }}
        onClick={() => history.push('/auth')}
      >
        {t('auth.login')}
      </Button>
    </AuthLayout>
  );
};
