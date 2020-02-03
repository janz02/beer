import React, { useState, useEffect, useRef } from 'react'
import './CouponEditorForm.scss'
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  InputNumber,
  DatePicker,
  Popconfirm,
  Row,
  Col,
  Timeline
} from 'antd'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import TextArea from 'antd/lib/input/TextArea'
import { useTranslation } from 'react-i18next'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { Coupon } from 'models/coupon'
import { CouponRank, CouponType, CouponState } from 'api/swagger/models'
import { listCategories } from '../couponsSlice'
import { RootState } from 'app/rootReducer'
import { DeleteOutlined } from '@ant-design/icons'
import { updateCouponStatus, deleteCouponComments } from '../couponEditor/couponEditorSlice'
import { useParams } from 'hooks/react-router-dom-hooks'

export interface CouponEditorFormProps {
  handleCouponSave: (values: any) => void
  loading: boolean
  couponIsNew: boolean
  coupon?: Coupon
}

export const CouponEditorForm: React.FC<CouponEditorFormProps> = props => {
  const { handleCouponSave, loading, couponIsNew, coupon } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const { categories } = useSelector((state: RootState) => state.coupons)
  const [submitable, setSubmitable] = useState(false)
  const { editing } = useParams()
  const [formEditing, setFormEditing] = useState(editing === 'true')
  const [form] = Form.useForm()
  const [commentForm] = Form.useForm()
  const rule = useCommonFormRules()

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  const displayEditor =
    couponIsNew ||
    (formEditing &&
      coupon &&
      coupon.state !== CouponState.Closed &&
      coupon.state !== CouponState.Archived)

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

  // TODO: revisit this problem after upgrading andt package.
  // https://github.com/ant-design/ant-design/issues/18983
  // https://github.com/ant-design/ant-design/issues/20987
  // This should work instead of the workaround below.
  // useEffect(() => {
  //   form.setFieldsValue({
  //     rank: CouponRank.Bronze,
  //     type: CouponType.FixValue,
  //     ...coupon
  //   })
  // }, [coupon, form])
  // useEffect(() => {
  //   commentForm.setFieldsValue({
  //     comment: ''
  //   })
  // }, [coupon, commentForm])

  const formRef = useRef(form)
  useEffect(() => {
    formRef.current = form
  }, [form])
  useEffect(() => {
    formRef.current.setFieldsValue({
      rank: CouponRank.Bronze,
      type: CouponType.FixValue,
      ...coupon
    })
  }, [coupon])

  const commentFormRef = useRef(commentForm)
  useEffect(() => {
    commentFormRef.current = commentForm
  }, [commentForm])
  useEffect(() => {
    commentFormRef.current.setFieldsValue({
      comment: ''
    })
  }, [coupon])

  const actionButton = (couponState: CouponState, buttonText: string): JSX.Element => (
    <Popconfirm
      title={t('coupon-create.state-action-confirm-message')}
      onConfirm={() => {
        coupon &&
          coupon.id &&
          dispatch(updateCouponStatus(coupon.id, couponState, commentForm.getFieldsValue().comment))
      }}
      okText={t('common.ok')}
      cancelText={t('common.cancel')}
    >
      <Button>{buttonText}</Button>
    </Popconfirm>
  )
  const couponActions = (): JSX.Element => {
    let statusButtons = <></>
    switch (coupon?.state) {
      case CouponState.Created:
        statusButtons = (
          <>
            {actionButton(CouponState.Accepted, t('coupon-create.states.accept'))}
            {actionButton(CouponState.Rejected, t('coupon-create.states.reject'))}
            {actionButton(CouponState.Waiting, t('coupon-create.states.wait'))}
          </>
        )
        break
      case CouponState.Accepted:
      case CouponState.Rejected:
      case CouponState.Waiting:
        statusButtons = actionButton(CouponState.Closed, t('coupon-create.states.close'))
        break
      case CouponState.Closed:
        statusButtons = actionButton(CouponState.Archived, t('coupon-create.states.archive'))
        break
      default:
        break
    }

    return (
      <>
        {!displayEditor && (
          <div className="coupon-editor-form__actions">
            {statusButtons}
            {coupon &&
              coupon.state !== CouponState.Closed &&
              coupon.state !== CouponState.Archived && (
                <Button type="primary" htmlType="button" onClick={() => setFormEditing(true)}>
                  {t('coupon-create.edit')}
                </Button>
              )}
          </div>
        )}
      </>
    )
  }

  return (
    <Card className="coupon-editor-form" title={t('coupon-create.editor')} extra={couponActions()}>
      <Row>
        <Col span={18}>
          <Form
            name="coupon-editor-form"
            onFinish={handleSubmit}
            form={form}
            layout={formLayout}
            onFieldsChange={() => {
              const hasErrors = form.getFieldsError().some(field => field.errors.length)
              if (submitable === hasErrors) {
                setSubmitable(!submitable)
              }
            }}
          >
            <Form.Item
              name="name"
              label={t('coupon-create.field.name')}
              rules={[rule.required()]}
              {...formItemLayout}
            >
              <Input disabled={!displayEditor} />
            </Form.Item>

            <Form.Item
              name="description"
              label={t('coupon-create.field.description')}
              {...formItemLayout}
            >
              <TextArea disabled={!displayEditor} />
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

            <Form.Item
              name="categoryId"
              label={t('coupon-create.field.category')}
              {...formItemLayout}
            >
              <Select disabled={!displayEditor}>
                {categories &&
                  categories.map(x => (
                    <Select.Option key={x.id} value={x.id!}>
                      {x.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="type"
              label={t('coupon-create.field.discount-type')}
              {...formItemLayout}
            >
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
              <InputNumber disabled={!displayEditor} min={1} />
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
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            <Form.Item
              name="minimumShoppingValue"
              label={t('coupon-create.field.minimum-shopping-value')}
              {...formItemLayout}
            >
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            {displayEditor && (
              <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
                {couponIsNew ? t('coupon-create.create') : t('coupon-create.save')}
              </Button>
            )}
          </Form>
        </Col>
        <Col span={6}>
          {!displayEditor && (
            <Form name="coupon-editor-comment-form" form={commentForm}>
              <Form.Item name="comment" label={t('coupon-create.field.comment')}>
                <TextArea />
              </Form.Item>
            </Form>
          )}
          <Timeline>
            {coupon &&
              coupon.comments &&
              coupon.comments.map(x => (
                <Timeline.Item key={x.id}>
                  {x.comment}
                  &nbsp;
                  <Popconfirm
                    title={t('coupon-editor.comment-delete-confirm-message')}
                    onConfirm={() => {
                      coupon && coupon.id && x.id && dispatch(deleteCouponComments(coupon.id, x.id))
                    }}
                    okText={t('common.ok')}
                    cancelText={t('common.cancel')}
                  >
                    <Button danger size="small">
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </Timeline.Item>
              ))}
          </Timeline>
        </Col>
      </Row>
    </Card>
  )
}
