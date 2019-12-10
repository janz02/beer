import React from 'react';
import { Form, Input, Button, Card, Select, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker } from 'antd';

const hasErrors = (fieldsError: any) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

interface CouponEditorFormProps extends FormComponentProps {
  handleCouponSave: (values: any) => void;
  loading: boolean;
}

const CouponEditorForm = (props: CouponEditorFormProps) => {
  const { t } = useTranslation();

  const { getFieldDecorator, getFieldsError } = props.form;
  const { handleCouponSave, loading } = props;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        handleCouponSave(values);
      }
    });
  };

  const ranks = ['basic', 'standard', 'super', 'premium'];
  const categories = ['c1', 'c2', 'c3', 'c4', 'c5'];
  const discountTypes = ['percent', 'fix'];

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

        <Form.Item label={t('couponEditor.description')}>
          {getFieldDecorator('description')(<TextArea />)}
        </Form.Item>

        <Form.Item label={t('couponEditor.rank')}>
          {getFieldDecorator('rank', { initialValue: ['basic'] })(
            <Select>
              {ranks.map((x) => (
                <Select.Option key={x} value={x}>
                  {x}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item label={t('couponEditor.category')}>
          {getFieldDecorator('category', { initialValue: ['c1'] })(
            <Select>
              {categories.map((x) => (
                <Select.Option key={x} value={x}>
                  {x}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item label={t('couponEditor.discountType')}>
          {getFieldDecorator('discountType', { initialValue: ['percent'] })(
            <Select>
              {discountTypes.map((x) => (
                <Select.Option key={x} value={x}>
                  {x}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item label={t('couponEditor.discountAmount')}>
          {getFieldDecorator('discountAmount')(
            <InputNumber min={1} max={100} />,
          )}
        </Form.Item>

        <Form.Item label={t('couponEditor.distributionDateRange')}>
          {getFieldDecorator('distributionDateRange')(
            <DatePicker.RangePicker />,
          )}
        </Form.Item>

        <Form.Item label={t('couponEditor.expirationDate')}>
          {getFieldDecorator('expirationDate')(<DatePicker />)}
        </Form.Item>

        <Form.Item label={t('couponEditor.couponCount')}>
          {getFieldDecorator('couponCount')(<InputNumber min={1} />)}
        </Form.Item>

        <Form.Item label={t('couponEditor.minimumShoppingValue')}>
          {getFieldDecorator('minimumShoppingValue')(<InputNumber min={1} />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            loading={loading}
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
