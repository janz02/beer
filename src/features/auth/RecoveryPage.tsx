import React from 'react';
import { Form, Input, Icon, Button, Layout, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { recoverPassword } from './authSlice';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { useIsMobile } from 'hooks';

import './auth.scss';

export const RecoveryPage = Form.create({ name: 'recovery' })(({ form }) => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();

  const dispatch = useDispatch();

  const { handleSubmit, getFieldDecorator } = useAntdForm(form);

  const { loading } = useSelector(
    (state: RootState) => state.auth.passwordRecovery
  );

  return (
    <Layout.Content className="auth-page">
      <Card
        title={t(`auth.forgot-password`)}
        className={`auth-card ${isMobile ? 'auth-card--mobile' : ''}`}
      >
        <Form
          onSubmit={event =>
            handleSubmit(event, values => dispatch(recoverPassword(values)))
          }
        >
          <div>{t('auth.text.new-password-email')}</div>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: t('auth.error.email-required') },
              ],
            })(
              <Input
                prefix={<Icon type="mail" />}
                placeholder={t('auth.field.email')}
              />
            )}
          </Form.Item>
          <Button
            loading={loading}
            block
            size="large"
            type="primary"
            htmlType="submit"
          >
            {t('auth.send-email')}
          </Button>
        </Form>
        <div className="recovery-additional-options">
          <Button onClick={() => history.push('/auth/')}>
            {t(`auth.login`)}
          </Button>
          <Button onClick={() => history.push('/auth/signup')}>
            {t(`auth.signup`)}
          </Button>
        </div>
      </Card>
    </Layout.Content>
  );
});
