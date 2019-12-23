import React from 'react';
import { Form, Input, Icon, Button, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { recoverPassword } from './authSlice';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { AuthLayout } from './AuthLayout';

export const RecoveryPage = Form.create({ name: 'recovery' })(({ form }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { handleSubmit, getFieldDecorator } = useAntdForm(form);

  const {
    loadingPasswordRecovery: loading,
    errorPasswordRecovery: error,
  } = useSelector((state: RootState) => state.auth);

  return (
    <AuthLayout title={t(`auth.forgot-password`)}>
      {error && (
        <Alert message={t('auth.error.recovery-failed')} type="error" />
      )}
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
    </AuthLayout>
  );
});
