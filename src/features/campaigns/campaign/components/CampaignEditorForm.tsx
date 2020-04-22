/* eslint-disable react/jsx-indent */
import React, { FC, useEffect } from 'react'
import './CampaignEditor.scss'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Collapse,
  Checkbox,
  InputNumber
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useTranslation } from 'react-i18next'
import {
  CouponRank,
  CouponType,
  Roles,
  CouponMode,
  CouponDiscountType,
  CouponState
} from 'api/swagger/models'
import { ExportOutlined } from '@ant-design/icons'
import { history } from 'router/router'
import { MomentDisplay } from 'components/MomentDisplay'
import { hasPermission, hasAllPermissions } from 'services/jwt-reader'
import { CampaignStateDisplay } from 'components/CampaignStateDisplay'
import { FileUploadButton } from 'components/upload/FileUploadButton'
import { PictureUploadButton } from 'components/upload/PictueUploadButton'
import { CampaignActiveDisplay } from 'components/CampaignActiveDisplay'
import {
  getSeparatorAndSuffixFormatter,
  getSeparatorAndSuffixParser,
  separatorFormatter,
  separatorParser
} from 'services/numberInputHelpers'
import { comboRoles } from 'services/roleHelpers'
import { campaignActions } from '../../campaignsSlice'
import { useDispatch } from 'react-redux'
import { useCampaign } from '../useCampaign'
import { useCommonFormRules } from 'hooks'

export const CampaignEditorForm: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const {
    loading,
    couponIsNew,
    coupon,
    selectedCouponType,
    selectedCouponMode,
    selectedCouponDiscountType,
    categories,
    majorPartners,
    userData,
    displayEditor,
    rowGutter,
    prizeOrDiscount,
    form,
    formProps,
    submitable,
    handleCouponChange,
    setSelectedCouponType,
    setSelectedCouponMode,
    setSelectedCouponDiscountType,
    setStateForCreate
  } = useCampaign()

  useEffect(() => {
    handleCouponChange()
  }, [handleCouponChange, coupon])

  return (
    <Form name="coupon-editor-form" layout="vertical" form={form} {...formProps}>
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
                    setSelectedCouponType(value)
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
                          {x.name} - (
                          {x.partnerState
                            ? t(`partner.partner-state.${x.partnerState?.toLowerCase()}`)
                            : t('partner.partner-state.inactive')}
                          )
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item label={t('coupon-create.field.partner-name')}>
                  <>{userData?.partnerName}</>
                </Form.Item>
              )}
            </Col>

            <Col span={12}>
              {!couponIsNew && (
                <Form.Item label={t('coupon-create.field.is-active')}>
                  <CampaignActiveDisplay coupon={coupon} />
                </Form.Item>
              )}
            </Col>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={12} order={1}>
              <Form.Item
                name="name"
                label={t('coupon-create.field.name')}
                extra={t('coupon-create.field.name-help')}
                rules={[rule.requiredString(), rule.max(60)]}
              >
                <Input disabled={!displayEditor} maxLength={60} />
              </Form.Item>
            </Col>

            <Col span={12} order={prizeOrDiscount ? 2 : 3}>
              <Form.Item
                name="startDate"
                label={t('coupon-create.field.distribution-start-date')}
                extra={t('coupon-create.field.distribution-start-date-help')}
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
                  extra={t('coupon-create.field.description-help')}
                  rules={[rule.requiredString(), rule.max(255)]}
                >
                  <TextArea disabled={!displayEditor} maxLength={255} rows={4} />
                </Form.Item>
              )}
            </Col>

            <Col span={12} order={4}>
              <Form.Item
                name="endDate"
                label={t('coupon-create.field.distribution-end-date')}
                extra={t('coupon-create.field.distribution-end-date-help')}
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
                extra={t('coupon-create.field.category-help')}
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
                extra={t('coupon-create.field.rank-help')}
                rules={[rule.required()]}
              >
                <Select disabled={!displayEditor || !hasAllPermissions([Roles.CampaignManager])}>
                  {Object.keys(CouponRank).map(x => (
                    <Select.Option key={x} value={x}>
                      {t(`coupon.rank.${x.toLowerCase()}`)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {selectedCouponType === CouponType.Discount && (
              <Col span={8}>
                <Form.Item
                  name="mode"
                  label={t('coupon-create.field.mode')}
                  extra={t('coupon-create.field.mode-help')}
                  rules={[rule.required()]}
                >
                  <Select
                    disabled={!displayEditor}
                    onChange={(value: CouponMode) => {
                      setSelectedCouponMode(value)
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

            {selectedCouponType === CouponType.Discount &&
              selectedCouponMode === CouponMode.Online && (
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

            {selectedCouponType === CouponType.Discount && (
              <Col span={8}>
                <Form.Item
                  name="expireDate"
                  label={t('coupon-create.field.expiration-date')}
                  extra={t('coupon-create.field.expiration-date-help')}
                  rules={[rule.required()]}
                >
                  <DatePicker disabled={!displayEditor} />
                </Form.Item>
              </Col>
            )}

            {selectedCouponType === CouponType.Banner && (
              <Col span={24}>
                <Form.Item
                  name="productDetails"
                  label={t('coupon-create.field.banner-link')}
                  extra={t('coupon-create.field.banner-link-help')}
                  rules={[rule.required(), rule.max(2000)]}
                >
                  <Input disabled={!displayEditor} maxLength={2000} />
                </Form.Item>
              </Col>
            )}

            {selectedCouponType === CouponType.Prize && (
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

            {selectedCouponType === CouponType.Discount && (
              <Col span={8}>
                <Form.Item
                  name="discountType"
                  label={t('coupon-create.field.discount-type')}
                  extra={t('coupon-create.field.discount-type-help')}
                  rules={[rule.requiredString()]}
                >
                  <Select
                    disabled={!displayEditor}
                    onChange={(value: CouponDiscountType) => {
                      setSelectedCouponDiscountType(value)
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

            {selectedCouponType === CouponType.Discount &&
              (selectedCouponDiscountType === CouponDiscountType.FixValue ||
                selectedCouponDiscountType === CouponDiscountType.PercentValue) && (
                <Col span={8}>
                  <Form.Item
                    name="discountValue"
                    label={t('coupon-create.field.discount-amount')}
                    extra={
                      selectedCouponDiscountType === CouponDiscountType.PercentValue
                        ? t('coupon-create.field.discount-amount-percent-help')
                        : t('coupon-create.field.discount-amount-fix-help')
                    }
                    dependencies={['discountType']}
                    rules={[
                      rule.required(),
                      () => ({
                        validator(_rule, value) {
                          const parsedAsFloat = parseFloat(value)
                          if (selectedCouponDiscountType === CouponDiscountType.PercentValue) {
                            if (parsedAsFloat < 0 || parsedAsFloat > 100) {
                              return Promise.reject(
                                t('error.coupon.percentage-discount-out-of-range')
                              )
                            }
                          } else if (selectedCouponDiscountType === CouponDiscountType.FixValue) {
                            if (!Number.isInteger(parsedAsFloat)) {
                              return Promise.reject(t('error.coupon.fix-discount-must-be-integer'))
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
                    {selectedCouponDiscountType === CouponDiscountType.PercentValue ? (
                      <InputNumber
                        disabled={!displayEditor}
                        formatter={getSeparatorAndSuffixFormatter('%')}
                        parser={getSeparatorAndSuffixParser('%')}
                        min={0}
                        max={100}
                      />
                    ) : (
                      <InputNumber
                        disabled={!displayEditor}
                        formatter={getSeparatorAndSuffixFormatter('Ft')}
                        parser={getSeparatorAndSuffixParser('Ft')}
                        min={1}
                        max={1000000}
                      />
                    )}
                  </Form.Item>
                </Col>
              )}

            {selectedCouponType === CouponType.Discount && (
              <Col span={8}>
                <Form.Item
                  name="minimumShoppingValue"
                  label={t('coupon-create.field.minimum-shopping-value')}
                  extra={t('coupon-create.field.minimum-shopping-value-help')}
                  rules={[rule.positiveInteger()]}
                >
                  <InputNumber
                    disabled={!displayEditor}
                    formatter={getSeparatorAndSuffixFormatter('Ft')}
                    parser={getSeparatorAndSuffixParser('Ft')}
                    max={999999999}
                  />
                </Form.Item>
              </Col>
            )}

            {selectedCouponType === CouponType.Discount && (
              <>
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
                    className="mark-label-as-required"
                  >
                    <InputNumber
                      disabled={!displayEditor}
                      formatter={getSeparatorAndSuffixFormatter('Ft')}
                      parser={getSeparatorAndSuffixParser('Ft')}
                      max={999999999}
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="previousYearAverageBasketValue"
                    label={t('coupon-create.field.previous-year-average-basket-value')}
                    extra={t('coupon-create.field.previous-year-average-basket-value-help')}
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
                    className="mark-label-as-required"
                  >
                    <InputNumber
                      disabled={!displayEditor}
                      formatter={getSeparatorAndSuffixFormatter('Ft')}
                      parser={getSeparatorAndSuffixParser('Ft')}
                      max={999999999}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            {selectedCouponType === CouponType.Prize && (
              <>
                <Col span={8}>
                  <Form.Item
                    name="prizeValue"
                    label={t('coupon-create.field.prize-value')}
                    rules={[rule.required(), rule.positiveInteger()]}
                  >
                    <InputNumber
                      disabled={!displayEditor}
                      formatter={getSeparatorAndSuffixFormatter('Ft')}
                      parser={getSeparatorAndSuffixParser('Ft')}
                      max={999999999}
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="prizeRulesFileId"
                    label={t('coupon-create.field.prize-rules')}
                    extra={t('coupon-create.field.prize-rules-help')}
                    rules={[rule.required()]}
                  >
                    <FileUploadButton
                      disabled={!displayEditor}
                      onSuccess={fileId => {
                        form.setFieldsValue({
                          ...form.getFieldsValue(),
                          prizeRulesFileId: fileId
                        })

                        form.validateFields()
                      }}
                      onRemove={() => {
                        form.setFieldsValue({
                          ...form.getFieldsValue(),
                          prizeRulesFileId: undefined
                        })

                        form.validateFields()
                      }}
                      onClick={() => dispatch(campaignActions.downloadPrizeFile(coupon!))}
                      initialFileId={coupon?.prizeRulesFileId}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            {selectedCouponType === CouponType.Discount && (
              <Col span={24}>
                <Form.Item
                  name="productDetails"
                  label={t('coupon-create.field.webshop-link')}
                  extra={t('coupon-create.field.webshop-link-help')}
                  rules={[rule.required(), rule.max(2000)]}
                >
                  <Input disabled={!displayEditor} maxLength={2000} />
                </Form.Item>
              </Col>
            )}

            {selectedCouponType === CouponType.Banner && (
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
              <Form.Item
                name="smallPictureId"
                label={t('coupon-create.field.small-image')}
                extra={t('coupon-create.field.small-image-help')}
                rules={[rule.required()]}
              >
                <PictureUploadButton
                  disabled={!displayEditor}
                  onSuccess={fileId => {
                    form.setFieldsValue({
                      ...form.getFieldsValue(),
                      smallPictureId: fileId
                    })

                    form.validateFields()
                  }}
                  onRemove={() => {
                    form.setFieldsValue({
                      ...form.getFieldsValue(),
                      smallPictureId: undefined
                    })

                    form.validateFields()
                  }}
                  initialFileId={coupon?.smallPictureId}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {prizeOrDiscount && (
                <Form.Item
                  name="bigPictureId"
                  label={t('coupon-create.field.big-image')}
                  extra={t('coupon-create.field.big-image-help')}
                  rules={[rule.required()]}
                >
                  <PictureUploadButton
                    disabled={!displayEditor}
                    onSuccess={fileId => {
                      form.setFieldsValue({
                        ...form.getFieldsValue(),
                        bigPictureId: fileId
                      })

                      form.validateFields()
                    }}
                    onRemove={() => {
                      form.setFieldsValue({
                        ...form.getFieldsValue(),
                        bigPictureId: undefined
                      })

                      form.validateFields()
                    }}
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
                extra={t('coupon-create.field.coupon-count-help')}
                rules={[rule.required(), rule.positiveInteger()]}
              >
                <InputNumber
                  disabled={!displayEditor}
                  formatter={separatorFormatter}
                  parser={separatorParser}
                  min={1}
                  max={100000000}
                />
              </Form.Item>
            </Col>
            {prizeOrDiscount && (
              <Col span={8}>
                <Form.Item
                  name="predefinedCodesFileId"
                  label={t('coupon-create.field.upload')}
                  extra={t('coupon-create.field.upload-help')}
                >
                  <FileUploadButton
                    disabled={!displayEditor}
                    onSuccess={fileId => {
                      form.setFieldsValue({
                        ...form.getFieldsValue(),
                        predefinedCodesFileId: fileId
                      })

                      form.validateFields()
                    }}
                    onRemove={() => {
                      form.setFieldsValue({
                        ...form.getFieldsValue(),
                        predefinedCodesFileId: undefined
                      })

                      form.validateFields()
                    }}
                    onClick={() => dispatch(campaignActions.downloadPredefinedCodesFile(coupon!))}
                    initialFileId={coupon?.predefinedCodesFileId}
                  />
                </Form.Item>
              </Col>
            )}

            {!!coupon?.id && prizeOrDiscount && (
              <Col span={8}>
                <Form.Item
                  name="download"
                  label={t('coupon-create.field.download')}
                  extra={t('coupon-create.field.download-help')}
                >
                  <Button
                    type="primary"
                    loading={loading}
                    icon={<ExportOutlined />}
                    onClick={() => {
                      dispatch(campaignActions.downloadCoupons(coupon!))
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

      {!displayEditor && (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('coupon-create.client-activities')} key="1">
            <Row gutter={rowGutter}>
              <Col span={6}>
                <p style={{ float: 'left', paddingRight: '5px' }}>
                  {t('coupon-create.field.showCount')}
                </p>
                <p style={{ float: 'right' }}>{coupon?.showCount}</p>
              </Col>

              <Col span={6}>
                <p style={{ float: 'left', paddingRight: '5px' }}>
                  {t('coupon-create.field.clickCount')}
                </p>
                <p style={{ float: 'right' }}>{coupon?.clickCount}</p>
              </Col>

              <Col span={6}>
                <p style={{ float: 'left', paddingRight: '5px' }}>
                  {t('coupon-create.field.claimCount')}
                </p>
                <p style={{ float: 'right' }}>{coupon?.claimCount}</p>
              </Col>

              <Col span={6}>
                <p style={{ float: 'left', paddingRight: '5px' }}>
                  {t('coupon-create.field.discardCount')}
                </p>
                <p style={{ float: 'right' }}>{coupon?.discardCount}</p>
              </Col>
            </Row>

            {prizeOrDiscount && (
              <Row gutter={rowGutter}>
                <Col span={8}>
                  <Button
                    type="default"
                    loading={loading}
                    icon={<ExportOutlined />}
                    onClick={() => {
                      dispatch(campaignActions.downloadClaimedCoupons(coupon!))
                    }}
                  >
                    {t('coupon-create.download-redeemed-coupons')}
                  </Button>
                </Col>
              </Row>
            )}
          </Collapse.Panel>
        </Collapse>
      )}

      {!displayEditor && (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('coupon-create.audit')} key="1">
            <Row gutter={rowGutter}>
              <Col span={8}>
                <Form.Item label={t('coupon-create.field.created')}>
                  {coupon?.createdBy && (
                    <div>
                      {`${coupon?.createdBy}, `}
                      <MomentDisplay date={coupon?.createdDate} />
                    </div>
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label={t('coupon-create.field.modified')}>
                  {coupon?.modifiedBy && (
                    <div>
                      {`${coupon?.modifiedBy}, `}
                      <MomentDisplay date={coupon?.modifiedDate} />
                    </div>
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label={t('coupon-create.field.approved')}>
                  {coupon?.approvedBy && (
                    <div>
                      {`${coupon?.approvedBy}, `}
                      <MomentDisplay date={coupon?.approvedDate} />
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      )}

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
  )
}
