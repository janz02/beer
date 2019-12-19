import React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAntdForm } from './useAntdForm';
import { doRecoverPassword } from './authSlice';
import { RootState } from 'app/rootReducer';


export const PasswordRecoveryForm = Form.create({ name: 'login' })(({ form }) => {

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { handleSubmit, getFieldDecorator } = useAntdForm(form)

  const { isLoading } = useSelector((state: RootState) => state.auth.passwordRecovery)


  return (<>
    <Form onSubmit={(event) => handleSubmit(event, (values) => dispatch(doRecoverPassword(values)))}>
      <div>{t('auth.text.new-password-email')}</div>
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: t('auth.error.email-required') }
          ]
        })(
          <Input
            prefix={<Icon type="mail" />}
            placeholder={t('auth.field.email')}
          />
        )}
      </Form.Item>
      <Button
        loading={isLoading}
        block
        size="large"
        type="primary"
        htmlType="submit"
      >
        {t('auth.send-email')}
      </Button>

    </Form>
  </>)
})
