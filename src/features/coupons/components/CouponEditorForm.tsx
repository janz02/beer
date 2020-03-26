/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react'
import './CouponEditorForm.scss'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Popconfirm,
  Row,
  Col,
  Timeline,
  Collapse,
  Checkbox,
  InputNumber
} from 'antd'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import TextArea from 'antd/lib/input/TextArea'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { Coupon } from 'models/coupon'
import {
  CouponRank,
  CouponType,
  CouponState,
  Roles,
  CouponMode,
  CouponDiscountType
} from 'api/swagger/models'
import {
  getCategories,
  activateCoupon,
  updateCouponStatus,
  deleteCouponComment,
  getMajorPartners,
  downloadClaimedCoupons,
  downloadCoupons
} from '../couponsSlice'
import { RootState } from 'app/rootReducer'
import { DeleteFilled, CheckOutlined, ArrowRightOutlined, ExportOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import Title from 'antd/lib/typography/Title'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'
import { BackButton } from 'components/buttons/BackButton'
import { history, comboRoles } from 'router/router'
import { MomentDisplay } from 'components/MomentDisplay'
import { hasPermission, hasAllPermissions } from 'services/jwt-reader'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import { CampaignStateDisplay } from 'components/CampaignStateDisplay'
import { FileUploadButton } from 'components/upload/FileUploadButton'
import { PictureUploadButton } from 'components/upload/PictueUploadButton'

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
  const { categories, majorPartners } = useSelector((state: RootState) => state.coupons)
  const { userData } = useSelector((state: RootState) => state.auth)
  const [stateForCreate, setStateForCreate] = useState(CouponState.Created)
  const [couponType, setCouponType] = useState<CouponType>()
  const [couponMode, setCouponMode] = useState<CouponMode>()
  const [couponDiscountType, setCouponDiscountType] = useState<CouponDiscountType>()
  const rule = useCommonFormRules()

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue
  } = useFormUtils<Coupon>()

  const {
    form: commentForm,
    resetFormFlags: resetFormFlagsComment,
    setFieldsValue: setFieldsValueComment
  } = useFormUtils()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMajorPartners())
  }, [dispatch])

  useEffect(() => {
    setCouponType(coupon?.type)
    setCouponMode(coupon?.mode)
    setCouponDiscountType(coupon?.discountType)

    setFieldsValue({
      ...coupon,
      rank: CouponRank.Basic
    })
  }, [coupon, setFieldsValue])

  const displayEditor =
    couponIsNew ||
    (editing &&
      coupon &&
      (coupon.state === CouponState.Created || coupon.state === CouponState.Waiting))

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
        categoryId: +values.categoryId,
        discountValue: +values.discountValue,
        minimumShoppingValue: +values.minimumShoppingValue,
        itemPrice: +values.itemPrice,
        previousYearAverageBasketValue: +values.previousYearAverageBasketValue,
        partnerId: +values.partnerId
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

  const couponActionButtons = (
    <div className="coupon-editor-form__actions">
      {!displayEditor && (
        <>
          {coupon &&
            (coupon.state === CouponState.Created || coupon.state === CouponState.Waiting) && (
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
        </>
      )}
      <BackButton onClick={() => history.push('/campaigns/')} primary={!modified} />
    </div>
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

  const rowGutter = 70
  const prizeOrDiscount = couponType === CouponType.Discount || couponType === CouponType.Prize

  return (
    <Row className="coupon-editor-form">
      <Col span={18} className="editor-col">
        <ResponsiveHeader
          type="floating"
          title={t('coupon-create.editor-title')}
          options={couponActionButtons}
        />

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
          {!displayEditor && (
            <Collapse defaultActiveKey={['1']}>
              <Collapse.Panel header={t('coupon-create.client-activities')} key="1">
                <Row gutter={rowGutter}>
                  <Col span={4}>
                    <p style={{ float: 'left' }}>{t('coupon-create.field.showCount')} </p>
                    <p style={{ float: 'right' }}>{coupon?.showCount}</p>
                  </Col>

                  <Col span={4} offset={4}>
                    <p style={{ float: 'left' }}>{t('coupon-create.field.clickCount')} </p>
                    <p style={{ float: 'right' }}>{coupon?.clickCount}</p>
                  </Col>

                  <Col span={4} offset={4}>
                    <p style={{ float: 'left' }}>{t('coupon-create.field.claimCount')} </p>
                    <p style={{ float: 'right' }}>{coupon?.claimCount}</p>
                  </Col>
                </Row>

                <Row gutter={rowGutter}>
                  <Col span={8}>
                    <Button
                      type="default"
                      loading={loading}
                      icon={<ExportOutlined />}
                      onClick={() => {
                        dispatch(downloadClaimedCoupons(coupon!))
                      }}
                    >
                      {t('coupon-create.download-redeemed-coupons')}
                    </Button>
                  </Col>
                </Row>
              </Collapse.Panel>
            </Collapse>
          )}

          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header={t('coupon-create.campaign-basics')} key="1">
              <Row gutter={rowGutter}>
                <Col span={6}>
                  <Form.Item
                    name="type"
                    label={t('coupon-create.field.type')}
                    rules={[rule.required()]}
                  >
                    <Select
                      disabled={!displayEditor || !couponIsNew}
                      onChange={(value: CouponType) => {
                        setCouponType(value)
                      }}
                    >
                      {Object.keys(CouponType).map(x => (
                        <Select.Option key={x} value={x}>
                          {t(`coupon.type.${x.toLowerCase()}`)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12} offset={6}>
                  {!couponIsNew && (
                    <Form.Item label={t('coupon-create.field.state')}>
                      <CampaignStateDisplay state={coupon?.state} />
                    </Form.Item>
                  )}
                </Col>
              </Row>

              <Row gutter={rowGutter}>
                <Col span={12}>
                  {hasPermission(comboRoles.forNkm) ? (
                    <Form.Item name="partnerId" label={t('coupon-create.field.partner-name')}>
                      <Select disabled={!displayEditor || !couponIsNew}>
                        {majorPartners &&
                          majorPartners.map(x => (
                            <Select.Option key={x.id} value={x.id!}>
                              {x.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <div>{userData.partnerName}</div>
                  )}
                </Col>

                <Col span={12}>
                  {!couponIsNew && (
                    <Form.Item label={t('coupon-create.field.is-active')}>
                      {coupon?.isActive ? t('coupon-create.active') : t('coupon-create.inactive')}
                    </Form.Item>
                  )}
                </Col>
              </Row>

              <Row gutter={rowGutter}>
                <Col span={12} order={1}>
                  <Form.Item
                    name="name"
                    label={t('coupon-create.field.name')}
                    rules={[rule.requiredString(), rule.max(60)]}
                  >
                    <Input disabled={!displayEditor} maxLength={60} />
                  </Form.Item>
                </Col>

                <Col span={12} order={prizeOrDiscount ? 2 : 3}>
                  <Form.Item
                    name="startDate"
                    label={t('coupon-create.field.distribution-start-date')}
                    rules={[rule.required()]}
                  >
                    <DatePicker disabled={!displayEditor} />
                  </Form.Item>
                </Col>

                <Col span={12} order={prizeOrDiscount ? 3 : 2}>
                  {prizeOrDiscount && (
                    <Form.Item
                      name="description"
                      label={t('coupon-create.field.description')}
                      rules={[rule.requiredString(), rule.max(255)]}
                    >
                      <TextArea disabled={!displayEditor} maxLength={255} />
                    </Form.Item>
                  )}
                </Col>

                <Col span={12} order={4}>
                  <Form.Item
                    name="endDate"
                    label={t('coupon-create.field.distribution-end-date')}
                    rules={[rule.required()]}
                  >
                    <DatePicker disabled={!displayEditor} />
                  </Form.Item>
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>

          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header={t('coupon-create.campaign-details')} key="1">
              <Row gutter={rowGutter}>
                <Col span={8}>
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
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="rank"
                    label={t('coupon-create.field.rank')}
                    rules={[rule.required()]}
                  >
                    <Select
                      disabled={!displayEditor || !hasAllPermissions([Roles.CampaignManager])}
                    >
                      {Object.keys(CouponRank).map(x => (
                        <Select.Option key={x} value={x}>
                          {t(`coupon.rank.${x.toLowerCase()}`)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {couponType === CouponType.Discount && (
                  <Col span={8}>
                    <Form.Item
                      name="mode"
                      label={t('coupon-create.field.mode')}
                      rules={[rule.required()]}
                    >
                      <Select
                        disabled={!displayEditor}
                        onChange={(value: CouponMode) => {
                          setCouponMode(value)
                        }}
                      >
                        {Object.keys(CouponMode).map(x => (
                          <Select.Option key={x} value={x}>
                            {t(`coupon.mode.${x.toLowerCase()}`)}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Discount && couponMode === CouponMode.Online && (
                  <Col span={24}>
                    <Form.Item
                      name="onlineClaimLink"
                      label={t('coupon-create.field.online-claim-link')}
                      rules={[rule.required(), rule.max(2000)]}
                    >
                      <Input disabled={!displayEditor} maxLength={2000} />
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Discount && (
                  <Col span={8}>
                    <Form.Item
                      name="expireDate"
                      label={t('coupon-create.field.expiration-date')}
                      rules={[rule.required()]}
                    >
                      <DatePicker disabled={!displayEditor} />
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Banner && (
                  <Col span={24}>
                    <Form.Item
                      name="link"
                      label={t('coupon-create.field.banner-link')}
                      rules={[rule.required(), rule.max(2000)]}
                      extra={t('coupon-create.field.banner-link-help')}
                    >
                      <Input disabled={!displayEditor} maxLength={2000} />
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Prize && (
                  <Col span={8}>
                    <Form.Item
                      name="drawDate"
                      label={t('coupon-create.field.draw-date')}
                      rules={[rule.required()]}
                    >
                      <DatePicker disabled={!displayEditor} />
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Discount && (
                  <Col span={8}>
                    <Form.Item
                      name="discountType"
                      label={t('coupon-create.field.discount-type')}
                      rules={[rule.requiredString()]}
                    >
                      <Select
                        disabled={!displayEditor}
                        onChange={(value: CouponDiscountType) => {
                          setCouponDiscountType(value)
                        }}
                      >
                        {Object.keys(CouponDiscountType).map(x => (
                          <Select.Option key={x} value={x}>
                            {t(`coupon.discount-type.${x.toLowerCase()}`)}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                )}

                {(couponDiscountType === CouponDiscountType.FixValue ||
                  couponDiscountType === CouponDiscountType.PercentValue) && (
                  <Col span={8}>
                    <Form.Item
                      name="discountValue"
                      label={t('coupon-create.field.discount-amount')}
                      dependencies={['discountType']}
                      rules={[
                        rule.required(),
                        () => ({
                          validator(rule, value) {
                            const parsedAsFloat = parseFloat(value)
                            if (couponDiscountType === CouponDiscountType.PercentValue) {
                              if (parsedAsFloat < 0 || parsedAsFloat > 100) {
                                return Promise.reject(
                                  t('error.coupon.percentage-discount-out-of-range')
                                )
                              }
                            } else if (couponDiscountType === CouponDiscountType.FixValue) {
                              if (!Number.isInteger(parsedAsFloat)) {
                                return Promise.reject(
                                  t('error.coupon.fix-discount-must-be-integer')
                                )
                              }

                              if (parsedAsFloat < 1 || parsedAsFloat > 1000000) {
                                return Promise.reject(t('error.coupon.fix-discount-out-of-range'))
                              }
                            }

                            return Promise.resolve()
                          }
                        })
                      ]}
                    >
                      <Input
                        disabled={!displayEditor}
                        suffix={
                          couponDiscountType === CouponDiscountType.PercentValue
                            ? '%'
                            : t('common.currency.huf')
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Discount && (
                  <Col span={8}>
                    <Form.Item
                      name="minimumShoppingValue"
                      label={t('coupon-create.field.minimum-shopping-value')}
                      rules={[rule.positiveInteger()]}
                    >
                      <Input disabled={!displayEditor} suffix={t('common.currency.huf')} />
                    </Form.Item>
                  </Col>
                )}

                <Col span={8}>
                  <Form.Item
                    name="itemPrice"
                    label={t('coupon-create.field.item-price')}
                    dependencies={['previousYearAverageBasketValue']}
                    rules={[
                      rule.positiveInteger(),
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          const previousYearAverageBasketValue = getFieldValue(
                            'previousYearAverageBasketValue'
                          )
                          if (!previousYearAverageBasketValue && !value) {
                            return Promise.reject(
                              t(
                                'error.coupon.item-price-required-if-previous-year-average-basket-value-empty'
                              )
                            )
                          }

                          return Promise.resolve()
                        }
                      })
                    ]}
                    extra={t('coupon-create.field.item-price-help')}
                  >
                    <Input disabled={!displayEditor} suffix={t('common.currency.huf')} />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="previousYearAverageBasketValue"
                    label={t('coupon-create.field.previous-year-average-basket-value')}
                    dependencies={['itemPrice']}
                    rules={[
                      rule.positiveInteger(),
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          const itemPrice = getFieldValue('itemPrice')
                          if (!itemPrice && !value) {
                            return Promise.reject(
                              t(
                                'error.coupon.previous-year-average-basket-value-required-if-item-price-empty'
                              )
                            )
                          }

                          return Promise.resolve()
                        }
                      })
                    ]}
                    extra={t('coupon-create.field.previous-year-average-basket-value-help')}
                  >
                    <Input disabled={!displayEditor} suffix={t('common.currency.huf')} />
                  </Form.Item>
                </Col>

                {couponType === CouponType.Prize && (
                  <Col span={8}>
                    <Form.Item name="prizeRulesFileId" label={t('coupon-create.field.prize-rules')}>
                      <div>Upload pdf comes here</div>
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Discount && (
                  <Col span={24}>
                    <Form.Item
                      name="link"
                      label={t('coupon-create.field.webshop-link')}
                      rules={[rule.required(), rule.max(2000)]}
                      extra={t('coupon-create.field.webshop-link-help')}
                    >
                      <Input disabled={!displayEditor} maxLength={2000} />
                    </Form.Item>
                  </Col>
                )}

                {couponType === CouponType.Banner && (
                  <Col span={8}>
                    <Form.Item
                      name="awardedCampaign"
                      label={t('coupon-create.field.awarded-campaign')}
                      valuePropName="checked"
                    >
                      <Checkbox>{t('coupon-create.field.display-fix-banner-campaign')}</Checkbox>
                    </Form.Item>
                  </Col>
                )}
              </Row>

              <Row gutter={rowGutter}>
                <Col span={12}>
                  <Form.Item name="smallPicture" label={t('coupon-create.field.small-image')}>
                    <PictureUploadButton
                      onSuccess={fileId => setFieldsValue({ smallPictureId: fileId })}
                      onRemove={() => setFieldsValue({ smallPictureId: undefined })}
                      initialFileId={coupon?.smallPictureId}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {prizeOrDiscount && (
                    <Form.Item name="bigPicture" label={t('coupon-create.field.big-image')}>
                      <PictureUploadButton
                        onSuccess={fileId => setFieldsValue({ bigPictureId: fileId })}
                        onRemove={() => setFieldsValue({ bigPictureId: undefined })}
                        initialFileId={coupon?.bigPictureId}
                      />
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>

          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header={t('coupon-create.field.coupon-count')} key="1">
              <Row gutter={rowGutter}>
                <Col span={8}>
                  <Form.Item
                    name="couponCount"
                    label={t('coupon-create.field.coupon-count')}
                    rules={[rule.positiveInteger()]}
                  >
                    <InputNumber disabled={!displayEditor} min={1} max={100000000} />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="predefinedCodesFileId"
                    label={t('coupon-create.upload')}
                    rules={[]}
                  >
                    <FileUploadButton
                      onSuccess={fileId => setFieldsValue({ predefinedCodesFileId: fileId })}
                      onRemove={() => setFieldsValue({ predefinedCodesFileId: undefined })}
                      initialFileId={coupon?.predefinedCodesFileId}
                    />
                  </Form.Item>
                </Col>

                {!!coupon?.id && (
                  <Col span={8}>
                    <Form.Item name="download" label={t('coupon-create.download')} rules={[]}>
                      <Button
                        type="primary"
                        loading={loading}
                        icon={<ExportOutlined />}
                        onClick={() => {
                          dispatch(downloadCoupons(coupon!))
                        }}
                      >
                        {t('coupon-create.download-coupons')}
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Collapse.Panel>
          </Collapse>

          {displayEditor && (
            <Row justify="space-between">
              <Col span={12}>
                <Button
                  type="ghost"
                  htmlType="submit"
                  onClick={() => history.push('/campaigns/')}
                  disabled={!submitable}
                >
                  {t('common.cancel')}
                </Button>
              </Col>

              <Col span={12} className="actions-right">
                {couponIsNew && (
                  <Button
                    type="ghost"
                    htmlType="submit"
                    onClick={() => setStateForCreate(CouponState.Waiting)}
                    disabled={!submitable}
                    loading={loading}
                  >
                    {t('coupon-create.create-and-accept')}
                  </Button>
                )}

                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => setStateForCreate(CouponState.Created)}
                  disabled={!submitable}
                  loading={loading}
                >
                  {couponIsNew ? t('coupon-create.create') : t('common.save')}
                </Button>
              </Col>
            </Row>
          )}
        </Form>
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
                          {translateState(x.stateFrom)} <ArrowRightOutlined />
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
