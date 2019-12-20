import React from 'react';
import { Form, Input, Icon, Button, Alert, Card, Layout, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { RootState } from 'app/rootReducer';
import { login } from './authSlice';
import { history } from 'app/router';
import { useIsMobile } from 'hooks';

import './auth.scss';

export const LoginPage = Form.create({ name: 'login' })(({ form }) => {
  const { loading, error } = useSelector(
    (state: RootState) => state.auth.login
  );

  const isMobile = useIsMobile();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { handleSubmit, getFieldDecorator } = useAntdForm(form);

  return (
    <Layout.Content className="auth-page">
      <Card
        title={t(`auth.login`)}
        className={`auth-card ${isMobile ? 'auth-card--mobile' : ''}`}
      >
        {error && <Alert message={t('auth.error.login-failed')} type="error" />}
        <Form
          onSubmit={event =>
            handleSubmit(event, values => dispatch(login(values)))
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
                {
                  required: true,
                  message: t('auth.error.password-required'),
                },
              ],
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder={t('auth.field.password')}
              />
            )}
          </Form.Item>
          <div className="login-additional-options">
            <Form.Item>
              {getFieldDecorator('rememember', { valuePropName: 'checked' })(
                <Checkbox>{t('auth.field.remember-me')}</Checkbox>
              )}
            </Form.Item>

            <Button
              type="link"
              style={{ padding: 0 }}
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
          type="link"
          style={{ float: 'right', marginTop: '0.75rem' }}
          onClick={() => history.push('/auth/signup')}
        >
          {t('auth.signup')}
        </Button>
      </Card>
    </Layout.Content>
  );
});
