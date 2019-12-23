import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker } from 'antd';
import { useIsMobile } from 'hooks';
import { Coupon } from 'models/coupon';
import { useParams } from 'react-router-dom';
import MomentDisplay from '../../../components/MomentDisplay';
import { CouponRank, CouponType } from 'api/swagger/models';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../couponsSlice';
import { RootState } from 'app/rootReducer';

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
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { categories } = useSelector((state: RootState) => state.coupons);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

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
        const coupon = {
          name: values['name'],
          description: values['description'],
          rank: values['rank'],
          categoryId: values['categoryId'],
          type: values['type'],
          discountValue: values['discountValue'],
          startDate: values['startDate'],
          endDate: values['endDate'],
          expireDate: values['expireDate'],
          couponCount: values['couponCount'],
          minimumShoppingValue: values['minimumShoppingValue'],
          // TODO: integrate tags and isDrawable.
          tags: [],
          isDrawable: false,
        } as Coupon;
        handleCouponSave(coupon);
      }
    });
  };

  return (
    <Card
      title={t('coupon-create.editor')}
      extra={
        !displayEditor ? (
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setFormEditing(true)}
          >
            {t('coupon-create.edit')}
          </Button>
        ) : null
      }
    >
      <Form onSubmit={handleSubmit} layout={formLayout}>
        <Form.Item label={t('coupon-create.name')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('name', {
                initialValue: coupon && coupon.name,
                rules: [
                  {
                    required: true,
                    message: t('coupon-create.name-is-required'),
                  },
                ],
              })(<Input />)
            : coupon && coupon.name}
        </Form.Item>

        <Form.Item label={t('coupon-create.description')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('description', {
                initialValue: coupon && coupon.description,
              })(<TextArea />)
            : coupon && coupon.description}
        </Form.Item>

        <Form.Item label={t('coupon-create.rank')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('rank', {
                initialValue:
                  coupon && coupon.rank ? coupon.rank : CouponRank.Bronze,
              })(
                <Select>
                  {Object.keys(CouponRank).map((x) => (
                    <Select.Option key={x} value={x}>
                      {x}
                    </Select.Option>
                  ))}
                </Select>,
              )
            : coupon && coupon.rank}
        </Form.Item>

        <Form.Item label={t('coupon-create.category')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('categoryId', {
                initialValue: coupon && coupon.categoryId,
              })(
                <Select>
                  {categories &&
                    categories.map((x) => (
                      <Select.Option key={x.id} value={x.id}>
                        {x.name}
                      </Select.Option>
                    ))}
                </Select>,
              )
            : coupon && coupon.categoryId}
        </Form.Item>

        <Form.Item label={t('coupon-create.discount-type')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('type', {
                initialValue:
                  coupon && coupon.type ? coupon.type : CouponType.FixValue,
              })(
                <Select>
                  {Object.keys(CouponType).map((x) => (
                    <Select.Option key={x} value={x}>
                      {x}
                    </Select.Option>
                  ))}
                </Select>,
              )
            : coupon && coupon.type}
        </Form.Item>

        <Form.Item label={t('coupon-create.discount-amount')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('discountValue', {
                initialValue: coupon && coupon.discountValue,
              })(
                <InputNumber
                  min={1}
                  max={
                    props.form.getFieldValue('type') === CouponType.PercentValue
                      ? 100
                      : undefined
                  }
                />,
              )
            : coupon && coupon.discountValue}
        </Form.Item>

        <Form.Item
          label={t('coupon-create.distribution-start-date')}
          {...formItemLayout}
        >
          {displayEditor
            ? getFieldDecorator('startDate', {
                initialValue: coupon && coupon.startDate,
              })(<DatePicker />)
            : coupon && <MomentDisplay date={coupon.startDate} />}
        </Form.Item>

        <Form.Item
          label={t('coupon-create.distribution-end-date')}
          {...formItemLayout}
        >
          {displayEditor
            ? getFieldDecorator('endDate', {
                initialValue: coupon && coupon.endDate,
              })(<DatePicker />)
            : coupon && <MomentDisplay date={coupon.endDate} />}
        </Form.Item>

        <Form.Item label={t('coupon-create.expirationDate')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('expireDate', {
                initialValue: coupon && coupon.expireDate,
              })(<DatePicker />)
            : coupon && <MomentDisplay date={coupon.expireDate} />}
        </Form.Item>

        <Form.Item label={t('coupon-create.coupon-count')} {...formItemLayout}>
          {displayEditor
            ? getFieldDecorator('couponCount', {
                initialValue: coupon && coupon.couponCount,
              })(<InputNumber min={1} />)
            : coupon && coupon.couponCount}
        </Form.Item>

        <Form.Item
          label={t('coupon-create.minimumShoppingValue')}
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
              {couponIsNew ? t('coupon-create.create') : t('coupon-create.save')}
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
