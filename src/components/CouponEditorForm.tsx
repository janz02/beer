import React from 'react';
import { Form, Input, Button, Card, Select, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker } from 'antd';
import { useIsMobile } from 'hooks';
import { Coupon } from 'models/coupon';

const hasErrors = (fieldsError: any) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

interface CouponEditorFormProps extends FormComponentProps {
  handleCouponSave: (values: any) => void;
  loading: boolean;
  coupon?: Coupon;
}

const CouponEditorForm = (props: CouponEditorFormProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const formLayout = isMobile ? 'vertical' : 'horizontal';
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const { getFieldDecorator, getFieldsError } = props.form;
  const { handleCouponSave, loading, coupon } = props;

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
  const defaultDiscountType = 'percent';

  return (
    <Card title={t('couponCreate.editor')}>
      <Form onSubmit={handleSubmit} layout={formLayout}>
        <Form.Item label={t('couponCreate.name')} {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: coupon && coupon.name,
            rules: [
              {
                required: true,
                message: t('couponCreate.nameIsRequired'),
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label={t('couponCreate.description')} {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: coupon && coupon.description,
          })(<TextArea />)}
        </Form.Item>

        <Form.Item label={t('couponCreate.rank')} {...formItemLayout}>
          {getFieldDecorator('rank', {
            initialValue: coupon && coupon.rank ? coupon.rank : 'basic',
          })(
            <Select>
              {ranks.map((x) => (
                <Select.Option key={x} value={x}>
                  {x}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item label={t('couponCreate.category')} {...formItemLayout}>
          {getFieldDecorator('category', {
            initialValue: coupon && coupon.category ? coupon.category : 'c1',
          })(
            <Select>
              {categories.map((x) => (
                <Select.Option key={x} value={x}>
                  {x}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item label={t('couponCreate.discountType')} {...formItemLayout}>
          {getFieldDecorator('discountType', {
            initialValue:
              coupon && coupon.discountType
                ? coupon.discountType
                : defaultDiscountType,
          })(
            <Select>
              {discountTypes.map((x) => (
                <Select.Option key={x} value={x}>
                  {x}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item label={t('couponCreate.discountAmount')} {...formItemLayout}>
          {getFieldDecorator('discountAmount', {
            initialValue: coupon && coupon.discountAmount,
          })(
            <InputNumber
              min={1}
              max={
                props.form.getFieldValue('discountType') === 'percent'
                  ? 100
                  : undefined
              }
            />,
          )}
        </Form.Item>

        <Form.Item
          label={t('couponCreate.distributionStartDate')}
          {...formItemLayout}
        >
          {getFieldDecorator('distributionStartDate', {
            initialValue: coupon && coupon.distributionStartDate,
          })(<DatePicker />)}
        </Form.Item>

        <Form.Item
          label={t('couponCreate.distributionEndDate')}
          {...formItemLayout}
        >
          {getFieldDecorator('distributionEndDate', {
            initialValue: coupon && coupon.distributionEndDate,
          })(<DatePicker />)}
        </Form.Item>

        <Form.Item label={t('couponCreate.expirationDate')} {...formItemLayout}>
          {getFieldDecorator('expirationDate', {
            initialValue: coupon && coupon.expirationDate,
          })(<DatePicker />)}
        </Form.Item>

        <Form.Item label={t('couponCreate.couponCount')} {...formItemLayout}>
          {getFieldDecorator('couponCount', {
            initialValue: coupon && coupon.couponCount,
          })(<InputNumber min={1} />)}
        </Form.Item>

        <Form.Item
          label={t('couponCreate.minimumShoppingValue')}
          {...formItemLayout}
        >
          {getFieldDecorator('minimumShoppingValue', {
            initialValue: coupon && coupon.minimumShoppingValue,
          })(<InputNumber min={1} />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            loading={loading}
          >
            {t('couponCreate.create')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Form.create<CouponEditorFormProps>({
  name: 'coupon-editor-form',
})(CouponEditorForm);
