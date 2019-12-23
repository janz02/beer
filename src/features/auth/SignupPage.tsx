import React from 'react';
import { Form, Input, Icon, Button, Alert, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { signUp } from './authSlice';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { AuthLayout } from './AuthLayout';

export const SignupPage = Form.create({ name: 'signup' })(({ form }) => {
  const { loadingSignup: loading, errorSignup: error } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { handleSubmit, getFieldDecorator } = useAntdForm(form);

  return (
    <AuthLayout title={t(`auth.signup`)}>
      {error && <Alert message={t('auth.error.signup-failed')} type="error" />}
      <Form
        onSubmit={event =>
          handleSubmit(event, values => dispatch(signUp(values)))
        }
      >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: t('auth.error.username-required'),
              },
            ],
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
              // { required: true, message: t('auth.error.password-required') }
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" />}
              type="password"
              placeholder={t('auth.field.password')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('passwordAgain', {
            rules: [
              // { required: true, message: t('auth.error.password-required') }
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" />}
              type="password"
              placeholder={t('auth.field.password-again')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('company', {
            rules: [
              // { required: true, message: t('auth.error.company-required') }
            ],
          })(
            <Input
              prefix={<Icon type="home" />}
              type="text"
              placeholder={t('auth.field.company')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              // { required: true, message: t('auth.error.name-required') }
            ],
          })(
            <Input
              prefix={<Icon type="user" />}
              type="text"
              placeholder={t('auth.field.name')}
            />
          )}
        </Form.Item>
        <Form.Item>
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
        <Form.Item>
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
        </Button>
      </Form>
      <Button
        style={{ float: 'right', marginTop: '0.75rem' }}
        onClick={() => history.push('/auth')}
      >
        {t('auth.login')}
      </Button>
    </AuthLayout>
  );
});
