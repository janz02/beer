import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { recoverPassword } from '../authSlice';
import { RootState } from 'app/rootReducer';

export const PasswordRecoveryForm = Form.create({ name: 'login' })(
  ({ form }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { handleSubmit, getFieldDecorator } = useAntdForm(form);

    const { loading } = useSelector(
      (state: RootState) => state.auth.passwordRecovery
    );

    return (
      <>
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
      </>
    );
  }
);
