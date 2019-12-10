import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';

const hasErrors = (fieldsError: any) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

interface CouponEditorFormProps extends FormComponentProps {
  handleCouponSave: (values: any) => void;
}

const CouponEditorForm = (props: CouponEditorFormProps) => {
  const { t } = useTranslation();

  const { getFieldDecorator, getFieldsError } = props.form;
  const { handleCouponSave } = props;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        handleCouponSave(values);
      }
    });
  };

  return (
    <Card title={t('couponEditor.editor')}>
      <Form onSubmit={handleSubmit}>
        <Form.Item label={t('couponEditor.name')}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: t('couponEditor.nameIsRequired'),
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            {t('couponEditor.create')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Form.create<CouponEditorFormProps>({
  name: 'coupon-editor-form',
})(CouponEditorForm);
