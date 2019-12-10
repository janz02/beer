import React from 'react';
import { Form, Input, Button, Card, Select, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker } from 'antd';
import { useMediaQuery } from 'react-responsive';

const hasErrors = (fieldsError: any) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

interface CouponEditorFormProps extends FormComponentProps {
  handleCouponSave: (values: any) => void;
  loading: boolean;
}

const CouponEditorForm = (props: CouponEditorFormProps) => {
  const { t } = useTranslation();

  const isMobile = !useMediaQuery({
    query: '(min-device-width: 576px)',
  });
  const formLayout = isMobile ? 'vertical' : 'horizontal';
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

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
      <Form onSubmit={handleSubmit} layout={formLayout}>
        <Form.Item label={t('couponEditor.name')} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: t('couponEditor.nameIsRequired'),
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label={t('couponEditor.description')} {...formItemLayout}>
          {getFieldDecorator('description')(<TextArea />)}
        </Form.Item>

        <Form.Item label={t('couponEditor.rank')} {...formItemLayout}>
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

        <Form.Item label={t('couponEditor.category')} {...formItemLayout}>
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

        <Form.Item label={t('couponEditor.discountType')} {...formItemLayout}>
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

        <Form.Item label={t('couponEditor.discountAmount')} {...formItemLayout}>
          {getFieldDecorator('discountAmount')(
            <InputNumber min={1} max={100} />,
          )}
        </Form.Item>

        <Form.Item
          label={t('couponEditor.distributionDateRange')}
          {...formItemLayout}
        >
          {getFieldDecorator('distributionDateRange')(
            <DatePicker.RangePicker />,
          )}
        </Form.Item>

        <Form.Item label={t('couponEditor.expirationDate')} {...formItemLayout}>
          {getFieldDecorator('expirationDate')(<DatePicker />)}
        </Form.Item>

        <Form.Item label={t('couponEditor.couponCount')} {...formItemLayout}>
          {getFieldDecorator('couponCount')(<InputNumber min={1} />)}
        </Form.Item>

        <Form.Item
          label={t('couponEditor.minimumShoppingValue')}
          {...formItemLayout}
        >
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
