import React, { useState, useEffect } from 'react'
import './CouponEditorForm.scss'
import {
  Form,
  Input,
  Button,
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
import { useCommonFormRules } from 'hooks'
import { Coupon } from 'models/coupon'
import { CouponRank, CouponType, CouponState } from 'api/swagger/models'
import { getCategories } from '../couponsSlice'
import { RootState } from 'app/rootReducer'
import { DeleteFilled, CheckOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { deleteCouponComment } from '../couponEditor/couponEditorSlice'
import { Link } from 'react-router-dom'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import Title from 'antd/lib/typography/Title'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'

export interface CouponEditorFormProps {
  handleCouponSave?: (values: any) => void
  loading: boolean
  couponIsNew: boolean
  coupon?: Coupon
  editing: boolean
}

export const CouponEditorForm: React.FC<CouponEditorFormProps> = props => {
  const { handleCouponSave, loading, couponIsNew, coupon, editing } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { categories } = useSelector((state: RootState) => state.coupons)
  const rule = useCommonFormRules()
  // TODO: integrate, use property of the coupon.
  const [couponActive, setCouponActive] = useState(true)

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setInitialFieldsValue
  } = useFormUtils()

  const {
    form: commentForm,
    resetFormFlags: resetFormFlagsComment,
    setInitialFieldsValue: setInitialFieldsValueComment
  } = useFormUtils()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

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

  useEffect(() => {
    setInitialFieldsValue({
      rank: CouponRank.Bronze,
      type: CouponType.FixValue,
      ...coupon
    })
  }, [coupon, setInitialFieldsValue])

  useEffect(() => {
    setInitialFieldsValueComment({
      comment: ''
    })
  }, [coupon, setInitialFieldsValueComment])

  const displayEditor =
    couponIsNew ||
    (editing &&
      coupon &&
      coupon.state !== CouponState.Closed &&
      coupon.state !== CouponState.Archived)

  const handleSubmit = (values: any): void => {
    handleCouponSave &&
      handleCouponSave({
        ...values,
        // TODO: integrate tags and isDrawable.
        tags: [],
        isDrawable: false
      })
    resetFormFlags()
  }

  const handleStatusSubmit = (values: any): void => {
    // TODO: integrate
    console.log(values)
    // coupon &&
    //   coupon.id &&
    //   dispatch(updateCouponStatus(coupon.id, values.couponState, values.comment))
    resetFormFlagsComment()
  }

  const handleCouponActivate = (): void => {
    // TODO: integrate
    setCouponActive(!couponActive)
  }

  const couponActionButtons = (
    <>
      {!displayEditor && (
        <div className="coupon-editor-form__actions">
          {coupon && coupon.state !== CouponState.Closed && coupon.state !== CouponState.Archived && (
            <Button type="primary" htmlType="button">
              <Link to={`/coupon/${coupon?.id}/edit`}>{t('coupon-create.edit')}</Link>
            </Button>
          )}
          {coupon && coupon.state === CouponState.Accepted && (
            <Button
              type="primary"
              htmlType="button"
              onClick={() => {
                handleCouponActivate()
              }}
            >
              {couponActive ? t('coupon-create.inactivate') : t('coupon-create.activate')}
            </Button>
          )}
        </div>
      )}
    </>
  )

  const couponStatusDropdown = (): JSX.Element => {
    switch (coupon?.state) {
      case CouponState.Created:
        return (
          <Select>
            <Select.Option key={CouponState.Accepted} value={CouponState.Accepted}>
              {t('coupon-create.states.accept')}
            </Select.Option>
            <Select.Option key={CouponState.Waiting} value={CouponState.Waiting}>
              {t('coupon-create.states.wait')}
            </Select.Option>
          </Select>
        )
      case CouponState.Accepted:
      case CouponState.Waiting:
        return (
          <Select>
            <Select.Option key={CouponState.Closed} value={CouponState.Closed}>
              {t('coupon-create.states.close')}
            </Select.Option>
          </Select>
        )
      case CouponState.Closed:
        return (
          <Select>
            <Select.Option key={CouponState.Archived} value={CouponState.Archived}>
              {t('coupon-create.states.archive')}
            </Select.Option>
          </Select>
        )
      default:
        return <Select />
    }
  }

  return (
    <Row className="coupon-editor-form">
      <Col span={18}>
        <ResponsiveCard
          floatingTitle={t('coupon-create.editor-title')}
          innerOptions={couponActionButtons}
          paddedBottom
          fullWidth
        >
          <NavigationAlert when={modified} />
          <Form
            name="coupon-editor-form"
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            onFieldsChange={() => {
              checkFieldsChange()
            }}
          >
            <Form.Item name="name" label={t('coupon-create.field.name')} rules={[rule.required()]}>
              <Input disabled={!displayEditor} />
            </Form.Item>

            <Form.Item name="description" label={t('coupon-create.field.description')}>
              <TextArea disabled={!displayEditor} />
            </Form.Item>

            <Form.Item name="rank" label={t('coupon-create.field.rank')}>
              <Select disabled={!displayEditor}>
                {Object.keys(CouponRank).map(x => (
                  <Select.Option key={x} value={x}>
                    {x}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="categoryId" label={t('coupon-create.field.category')}>
              <Select disabled={!displayEditor}>
                {categories &&
                  categories.map(x => (
                    <Select.Option key={x.id} value={x.id!}>
                      {x.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item name="type" label={t('coupon-create.field.discount-type')}>
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
            >
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            <Form.Item name="startDate" label={t('coupon-create.field.distribution-start-date')}>
              <DatePicker disabled={!displayEditor} />
            </Form.Item>

            <Form.Item name="endDate" label={t('coupon-create.field.distribution-end-date')}>
              <DatePicker disabled={!displayEditor} />
            </Form.Item>

            <Form.Item name="expireDate" label={t('coupon-create.field.expiration-date')}>
              <DatePicker disabled={!displayEditor} />
            </Form.Item>

            <Form.Item name="couponCount" label={t('coupon-create.field.coupon-count')}>
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            <Form.Item
              name="minimumShoppingValue"
              label={t('coupon-create.field.minimum-shopping-value')}
            >
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            {displayEditor && (
              <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
                {couponIsNew ? t('coupon-create.create') : t('common.save')}
              </Button>
            )}
          </Form>
        </ResponsiveCard>
      </Col>

      <Col span={6} className="comment-col">
        {!displayEditor && (
          <ResponsiveCard innerTitle={t('coupon-create.status-title')} paddedBottom>
            <Form
              name="coupon-editor-comment-form"
              form={commentForm}
              layout="vertical"
              onFinish={handleStatusSubmit}
            >
              <Form.Item name="couponState">{couponStatusDropdown()}</Form.Item>

              <Form.Item name="comment" label={t('coupon-create.field.comment')}>
                <TextArea />
              </Form.Item>

              <Form.Item className="actions">
                <Button type="primary" htmlType="submit">
                  {t('common.save')}
                </Button>
              </Form.Item>
            </Form>
          </ResponsiveCard>
        )}

        <div className="comment-col__comments">
          <Title level={3}>{t('coupon-editor.timeline-title')}</Title>
          <Timeline>
            {coupon &&
              coupon.comments &&
              coupon.comments.map(x => (
                <Timeline.Item
                  key={x.id}
                  color="#08979C"
                  dot={
                    <div className="time-line-dot-check">
                      <CheckOutlined />
                    </div>
                  }
                >
                  <Popconfirm
                    title={t('coupon-editor.comment-delete-confirm-message')}
                    onConfirm={() => {
                      coupon && coupon.id && x.id && dispatch(deleteCouponComment(coupon.id, x.id))
                    }}
                    okText={t('common.ok')}
                    cancelText={t('common.cancel')}
                  >
                    <div className="timeline-item__title">
                      2020.01.30 &nbsp;
                      <strong>
                        Waiting <ArrowRightOutlined /> Approved
                      </strong>
                    </div>
                    <div className="timeline-item__body text-faded">
                      {x.comment} - Lugosi Boglárka
                      <Button size="small" type="link">
                        <DeleteFilled />
                      </Button>
                    </div>
                  </Popconfirm>
                </Timeline.Item>
              ))}
          </Timeline>
        </div>
      </Col>
    </Row>
  )
}
