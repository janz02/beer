import React, { useEffect, useState } from 'react'
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
import { CouponRank, CouponType, CouponState, Roles } from 'api/swagger/models'
import {
  getCategories,
  activateCoupon,
  updateCouponStatus,
  deleteCouponComment
} from '../couponsSlice'
import { RootState } from 'app/rootReducer'
import { DeleteFilled, CheckOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import Title from 'antd/lib/typography/Title'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'
import { BackButton } from 'components/buttons/BackButton'
import { history } from 'router/router'
import { MomentDisplay } from 'components/MomentDisplay'
import { hasPermission } from 'services/jwt-reader'

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
  const [stateForCreate, setStateForCreate] = useState(CouponState.Created)
  const rule = useCommonFormRules()

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue
  } = useFormUtils()

  const {
    form: commentForm,
    resetFormFlags: resetFormFlagsComment,
    setFieldsValue: setFieldsValueComment
  } = useFormUtils()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    setFieldsValue({
      ...coupon,
      rank: CouponRank.Bronze
      // type: CouponType.Discount
    })
  }, [coupon, setFieldsValue])

  const displayEditor =
    couponIsNew ||
    (editing &&
      coupon &&
      coupon.state !== CouponState.Closed &&
      coupon.state !== CouponState.Archived)

  useEffect(() => {
    if (editing) return

    setFieldsValueComment({
      couponState: '',
      comment: ''
    })
  }, [coupon, editing, setFieldsValueComment])

  const handleSubmit = (values: any): void => {
    values.state = stateForCreate

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
    coupon?.id && dispatch(updateCouponStatus(coupon.id, values.couponState, values.comment))
    resetFormFlagsComment()
  }

  const handleCouponActivate = (): void => {
    coupon?.id && dispatch(activateCoupon(coupon?.id, !coupon?.isActive))
  }

  const couponActionButtons = !displayEditor ? (
    <div className="coupon-editor-form__actions">
      {coupon && coupon.state !== CouponState.Closed && coupon.state !== CouponState.Archived && (
        <Button type="primary" htmlType="button">
          <Link to={`/campaign/${coupon?.id}/edit`}>{t('coupon-create.edit')}</Link>
        </Button>
      )}
      {hasPermission([
        Roles.Administrator,
        Roles.CampaignManager,
        Roles.PartnerContactEditor,
        Roles.PartnerContactApprover
      ]) &&
        coupon &&
        coupon.state === CouponState.Accepted && (
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              handleCouponActivate()
            }}
          >
            {coupon.isActive ? t('coupon-create.inactivate') : t('coupon-create.activate')}
          </Button>
        )}
    </div>
  ) : (
    undefined
  )

  const translateState = (state?: CouponState): string => {
    switch (state) {
      case CouponState.Accepted:
        return t('coupon.state.action.accept')
      case CouponState.Waiting:
        return t('coupon.state.action.wait')
      case CouponState.Closed:
        return t('coupon.state.action.close')
      case CouponState.Archived:
        return t('coupon.state.action.archive')
      default:
        return ''
    }
  }

  const couponStatusDropdown = (): JSX.Element => {
    switch (coupon?.state) {
      case CouponState.Created:
        return (
          <Select>
            <Select.Option key={CouponState.Waiting} value={CouponState.Waiting}>
              {translateState(CouponState.Waiting)}
            </Select.Option>
          </Select>
        )
      case CouponState.Waiting:
        return (
          <Select>
            <Select.Option key={CouponState.Accepted} value={CouponState.Accepted}>
              {translateState(CouponState.Accepted)}
            </Select.Option>
          </Select>
        )
      case CouponState.Accepted:
        return (
          <Select>
            <Select.Option key={CouponState.Closed} value={CouponState.Closed}>
              {translateState(CouponState.Closed)}
            </Select.Option>
          </Select>
        )
      case CouponState.Closed:
        return (
          <Select>
            <Select.Option key={CouponState.Archived} value={CouponState.Archived}>
              {translateState(CouponState.Archived)}
            </Select.Option>
          </Select>
        )
      default:
        return <Select />
    }
  }

  const backButton = <BackButton onClick={() => history.push('/campaigns/')} primary={!modified} />

  return (
    <Row className="coupon-editor-form">
      <Col span={18}>
        <ResponsiveCard
          floatingTitle={t('coupon-create.editor-title')}
          innerOptions={couponActionButtons}
          floatingOptions={backButton}
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
            <Form.Item
              name="name"
              label={t('coupon-create.field.name')}
              rules={[rule.requiredString(), rule.max(60)]}
            >
              <Input disabled={!displayEditor} maxLength={60} />
            </Form.Item>

            <Form.Item
              name="description"
              label={t('coupon-create.field.description')}
              rules={[rule.requiredString(), rule.max(255)]}
            >
              <TextArea disabled={!displayEditor} maxLength={255} />
            </Form.Item>

            <Form.Item
              name="rank"
              label={t('coupon-create.field.rank')}
              rules={[rule.requiredString()]}
            >
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
              rules={[rule.required()]}
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
              rules={[rule.requiredString()]}
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
                rule.required(),
                () => ({
                  validator(rule, value) {
                    if (value > 100) {
                      return Promise.reject(t('error.coupon.percentage-max-100'))
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            <Form.Item
              name="startDate"
              label={t('coupon-create.field.distribution-start-date')}
              rules={[rule.required()]}
            >
              <DatePicker disabled={!displayEditor} />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={t('coupon-create.field.distribution-end-date')}
              rules={[rule.required()]}
            >
              <DatePicker disabled={!displayEditor} />
            </Form.Item>

            <Form.Item
              name="expireDate"
              label={t('coupon-create.field.expiration-date')}
              rules={[rule.required()]}
            >
              <DatePicker disabled={!displayEditor} />
            </Form.Item>

            <Form.Item
              name="couponCount"
              label={t('coupon-create.field.coupon-count')}
              rules={[rule.required()]}
            >
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            <Form.Item
              name="minimumShoppingValue"
              label={t('coupon-create.field.minimum-shopping-value')}
            >
              <InputNumber disabled={!displayEditor} min={1} />
            </Form.Item>

            {displayEditor && (
              <div className="coupon-editor-form__actions">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => setStateForCreate(CouponState.Created)}
                  disabled={!submitable}
                  loading={loading}
                >
                  {couponIsNew ? t('coupon-create.create') : t('common.save')}
                </Button>
                {couponIsNew && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => setStateForCreate(CouponState.Waiting)}
                    disabled={!submitable}
                    loading={loading}
                  >
                    {t('coupon-create.create-and-accept')}
                  </Button>
                )}
              </div>
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
                      <MomentDisplay date={x.dateTime} /> &nbsp;
                      {x.stateFrom && x.stateTo && (
                        <strong>
                          {translateState(x.stateFrom)} <ArrowRightOutlined />{' '}
                          {translateState(x.stateTo)}
                        </strong>
                      )}
                    </div>
                    <div className="timeline-item__body text-faded">
                      {x.comment} - {x.from}
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
