import React, { FC } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Checkbox, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { CouponRank, CouponType, Roles, CouponMode, CouponDiscountType } from 'api/swagger/models'
import { hasAllPermissions } from 'services/jwt-reader'
import { FileUploadButton } from 'components/upload/FileUploadButton'
import { PictureUploadButton } from 'components/upload/PictueUploadButton'
import {
  getSeparatorAndSuffixFormatter,
  getSeparatorAndSuffixParser
} from 'services/numberInputHelpers'
import { campaignActions } from '../../campaignsSlice'
import { useDispatch } from 'react-redux'
import { useCampaign } from '../useCampaign'
import { useCommonFormRules } from 'hooks'
import { FormInstance } from 'antd/lib/form'

interface CampaignEditorFormDetailsProps {
  form: FormInstance
}

export const CampaignEditorFormDetails: FC<CampaignEditorFormDetailsProps> = props => {
  const { form } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const {
    coupon,
    selectedCouponType,
    selectedCouponMode,
    selectedCouponDiscountType,
    categories,
    displayEditor,
    rowGutter,
    prizeOrDiscount,
    setSelectedCouponMode,
    setSelectedCouponDiscountType
  } = useCampaign()

  const displayDiscountValue =
    selectedCouponType === CouponType.Discount &&
    (selectedCouponDiscountType === CouponDiscountType.FixValue ||
      selectedCouponDiscountType === CouponDiscountType.PercentValue)

  return (
    <>
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
            rules={[rule.required(t('error.validation.coupon.rank-required'))]}
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
              rules={[rule.required(t('error.validation.coupon.mode-required-for-discount'))]}
            >
              <Select
                disabled={!displayEditor}
                onChange={(value: CouponMode) => {
                  dispatch(setSelectedCouponMode(value))
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

        {selectedCouponType === CouponType.Discount && selectedCouponMode === CouponMode.Online && (
          <Col span={24}>
            <Form.Item
              name="onlineClaimLink"
              label={t('coupon-create.field.online-claim-link')}
              rules={[
                rule.required(t('error.validation.coupon.online-claim-link-required-for-online')),
                rule.max(2000, t('error.validation.coupon.online-claim-link-max-length-2000'))
              ]}
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
              rules={[
                rule.required(t('error.validation.coupon.expire-date-required-for-discount'))
              ]}
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
              rules={[rule.required(t('error.validation.coupon.draw-date-required-for-prize'))]}
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
              rules={[
                rule.requiredString(
                  t('error.validation.coupon.discount-type-required-for-discount')
                )
              ]}
            >
              <Select
                disabled={!displayEditor}
                onChange={(value: CouponDiscountType) => {
                  dispatch(setSelectedCouponDiscountType(value))
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

        {displayDiscountValue && (
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
                rule.required(t('error.validation.coupon.discount-required-for-discount')),
                () => ({
                  validator(_rule, value) {
                    const parsedAsFloat = parseFloat(value)
                    if (selectedCouponDiscountType === CouponDiscountType.PercentValue) {
                      if (parsedAsFloat < 0 || parsedAsFloat > 100) {
                        return Promise.reject(t('error.coupon.percentage-discount-out-of-range'))
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
                rules={[
                  rule.required(t('error.validation.coupon.prize-value-required-for-prize')),
                  rule.positiveInteger()
                ]}
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
                rules={[
                  rule.required(t('error.validation.coupon.prize-rules-file-id-required-for-prize'))
                ]}
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
            rules={[rule.required(t('error.validation.coupon.small-picture-id-required'))]}
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
              rules={[
                rule.required(t('error.validation.coupon.big-picture-id-required-non-banner'))
              ]}
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
    </>
  )
}
