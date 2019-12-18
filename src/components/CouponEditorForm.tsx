import React, { useState } from 'react';
import { Form, Input, Button, Card, Select, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker } from 'antd';
import { useIsMobile } from 'hooks';
import { Coupon } from 'models/coupon';
import { useParams } from 'react-router-dom';
import MomentDisplay from './MomentDisplay';

const hasErrors = (fieldsError: any) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

interface CouponEditorFormProps extends FormComponentProps {
  handleCouponSave: (values: any) => void;
  loading: boolean;
  couponIsNew: boolean;
  coupon?: Coupon;
}

const CouponEditorForm = (props: CouponEditorFormProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { getFieldDecorator, getFieldsError } = props.form;
  const { handleCouponSave, loading, couponIsNew, coupon } = props;

  const { editing } = useParams();
  const [formEditing, setFormEditing] = useState(editing === 'true');
  const displayEditor = couponIsNew || formEditing;

  const formLayout = isMobile ? 'vertical' : 'horizontal';
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

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
    <Card
      title={t('couponCreate.editor')}
      extra={
        !displayEditor ? (
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setFormEditing(true)}
          >
            {t('couponCreate.edit')}
          </Button>
        ) : null
      }
      loading={loading}
    >
      <Form onSubmit={handleSubmit} layout={formLayout}>
        <Form.Item label={t('couponCreate.name')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('name', {
                initialValue: coupon && coupon.name,
                rules: [
                  {
                    required: true,
                    message: t('couponCreate.nameIsRequired'),
                  },
                ],
              })(<Input />)
            : coupon && coupon.name}
        </Form.Item>

        <Form.Item label={t('couponCreate.description')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('description', {
                initialValue: coupon && coupon.description,
              })(<TextArea />)
            : coupon && coupon.description}
        </Form.Item>

        <Form.Item label={t('couponCreate.rank')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('rank', {
                initialValue: coupon && coupon.rank ? coupon.rank : 'basic',
              })(
                <Select>
                  {ranks.map((x) => (
                    <Select.Option key={x} value={x}>
                      {x}
                    </Select.Option>
                  ))}
                </Select>,
              )
            : coupon && coupon.rank}
        </Form.Item>

        <Form.Item label={t('couponCreate.category')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('category', {
                initialValue:
                  coupon && coupon.category ? coupon.category : 'c1',
              })(
                <Select>
                  {categories.map((x) => (
                    <Select.Option key={x} value={x}>
                      {x}
                    </Select.Option>
                  ))}
                </Select>,
              )
            : coupon && coupon.category}
        </Form.Item>

        <Form.Item label={t('couponCreate.discountType')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('discountType', {
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
              )
            : coupon && coupon.discountType}
        </Form.Item>

        <Form.Item label={t('couponCreate.discountAmount')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('discountAmount', {
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
              )
            : coupon && coupon.discountAmount}
        </Form.Item>

        <Form.Item
          label={t('couponCreate.distributionStartDate')}
          {...formItemLayout}
        >
          {displayEditor
            ? getFieldDecorator('distributionStartDate', {
                initialValue: coupon && coupon.distributionStartDate,
              })(<DatePicker />)
            : coupon && <MomentDisplay date={coupon.distributionStartDate} />}
        </Form.Item>

        <Form.Item
          label={t('couponCreate.distributionEndDate')}
          {...formItemLayout}
        >
          {displayEditor
            ? getFieldDecorator('distributionEndDate', {
                initialValue: coupon && coupon.distributionEndDate,
              })(<DatePicker />)
            : coupon && <MomentDisplay date={coupon.distributionEndDate} />}
        </Form.Item>

        <Form.Item label={t('couponCreate.expirationDate')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('expirationDate', {
                initialValue: coupon && coupon.expirationDate,
              })(<DatePicker />)
            : coupon && <MomentDisplay date={coupon.expirationDate} />}
        </Form.Item>

        <Form.Item label={t('couponCreate.couponCount')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('couponCount', {
                initialValue: coupon && coupon.couponCount,
              })(<InputNumber min={1} />)
            : coupon && coupon.couponCount}
        </Form.Item>

        <Form.Item
          label={t('couponCreate.minimumShoppingValue')}
          {...formItemLayout}
        >
          {displayEditor
            ? getFieldDecorator('minimumShoppingValue', {
                initialValue: coupon && coupon.minimumShoppingValue,
              })(<InputNumber min={1} />)
            : coupon && coupon.minimumShoppingValue}
        </Form.Item>

        {displayEditor && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              loading={loading}
            >
              {couponIsNew ? t('couponCreate.create') : t('couponCreate.save')}
            </Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  );
};

export default Form.create<CouponEditorFormProps>({
  name: 'coupon-editor-form',
})(CouponEditorForm);
