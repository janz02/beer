import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Select, InputNumber, DatePicker } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useIsMobile } from 'hooks'
import { Coupon } from 'models/coupon'
import { CouponRank, CouponType } from 'api/swagger/models'
import { listCategories } from '../couponsSlice'
import { RootState } from 'app/rootReducer'

interface CouponEditorFormProps {
  handleCouponSave: (values: any) => void
  loading: boolean
  couponIsNew: boolean
  coupon?: Coupon
}

const CouponEditorForm: React.FC<CouponEditorFormProps> = props => {
  const { handleCouponSave, loading, couponIsNew, coupon } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const { categories } = useSelector((state: RootState) => state.coupons)
  const [submitable, setSubmitable] = useState(false)
  const { editing } = useParams()
  const [formEditing, setFormEditing] = useState(editing === 'true')
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  const displayEditor = couponIsNew || formEditing

  const formLayout = isMobile ? 'vertical' : 'horizontal'
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : null

  const handleSubmit = (values: any): void => {
    handleCouponSave({
      ...values,
      // TODO: integrate tags and isDrawable.
      tags: [],
      isDrawable: false
    })
  }

  return (
    <Card
      title={t('coupon-create.editor')}
      extra={
        !displayEditor ? (
          <Button type="primary" htmlType="button" onClick={() => setFormEditing(true)}>
            {t('coupon-create.edit')}
          </Button>
        ) : null
      }
    >
      <Form
        name="coupon-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout={formLayout}
        onFieldsChange={v => {
          const hasErrors = form.getFieldsError().some(field => field.errors.length)
          if (submitable === hasErrors) {
            setSubmitable(!submitable)
          }
        }}
        initialValues={{
          rank: CouponRank.Bronze,
          type: CouponType.FixValue,
          ...coupon
        }}
      >
        <Form.Item
          name="name"
          label={t('coupon-create.field.name')}
          rules={[{ required: true, message: t('coupon-create.error.name-required') }]}
          {...formItemLayout}
        >
          <Input readOnly={!displayEditor} />
        </Form.Item>

        <Form.Item
          name="description"
          label={t('coupon-create.field.description')}
          {...formItemLayout}
        >
          <TextArea readOnly={!displayEditor} />
        </Form.Item>

        <Form.Item name="rank" label={t('coupon-create.field.rank')} {...formItemLayout}>
          <Select disabled={!displayEditor}>
            {Object.keys(CouponRank).map(x => (
              <Select.Option key={x} value={x}>
                {x}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="categoryId" label={t('coupon-create.field.category')} {...formItemLayout}>
          <Select disabled={!displayEditor}>
            {categories &&
              categories.map(x => (
                <Select.Option key={x.id} value={x.id!}>
                  {x.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name="type" label={t('coupon-create.field.discount-type')} {...formItemLayout}>
          <Select disabled={!displayEditor}>
            {Object.keys(CouponType).map(x => (
              <Select.Option key={x} value={x}>
                {x}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="discountValue"
          label={t('coupon-create.field.discount-amount')}
          dependencies={['type']}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value > 100 && getFieldValue('type') === CouponType.PercentValue) {
                  return Promise.reject(t('coupon-create.error.percentage-max-100'))
                }
                return Promise.resolve()
              }
            })
          ]}
          {...formItemLayout}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          name="startDate"
          label={t('coupon-create.field.distribution-start-date')}
          {...formItemLayout}
        >
          <DatePicker disabled={!displayEditor} />
        </Form.Item>

        <Form.Item
          name="endDate"
          label={t('coupon-create.field.distribution-end-date')}
          {...formItemLayout}
        >
          <DatePicker disabled={!displayEditor} />
        </Form.Item>

        <Form.Item
          name="expireDate"
          label={t('coupon-create.field.expiration-date')}
          {...formItemLayout}
        >
          <DatePicker disabled={!displayEditor} />
        </Form.Item>

        <Form.Item
          name="couponCount"
          label={t('coupon-create.field.coupon-count')}
          {...formItemLayout}
        >
          <InputNumber readOnly={!displayEditor} min={1} />
        </Form.Item>

        <Form.Item
          name="minimumShoppingValue"
          label={t('coupon-create.field.minimum-shopping-value')}
          {...formItemLayout}
        >
          <InputNumber readOnly={!displayEditor} min={1} />
        </Form.Item>

        {displayEditor && (
          <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
            {couponIsNew ? t('coupon-create.create') : t('coupon-create.save')}
          </Button>
        )}
      </Form>
    </Card>
  )
}

export default CouponEditorForm
