import React, { FC } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'
import { CouponRank, CouponType, Roles, CouponMode, CouponDiscountType } from 'api/swagger/coupon'
import { hasAllPermissions } from 'services/jwt-reader'
import { FileUploadButton } from 'components/upload/FileUploadButton'
import { PictureUploadButton } from 'components/upload/PictueUploadButton'
import {
  getSeparatorAndSuffixFormatter,
  getSeparatorAndSuffixParser
} from 'services/numberInputHelpers'
import { couponCampaignActions } from '../../../couponCampaigns/couponCampaignsSlice'
import { useDispatch } from 'react-redux'
import { CouponCampaignUtils } from '../useCouponCampaignUtils'
import { useCommonFormRules } from 'hooks'
import { FormInstance } from 'antd/lib/form'
import { InputNumberI18n } from 'components/InputNumberI18n'
import { FileExtension } from 'components/upload/fileUploadHelper'

interface CouponCampaignEditorFormDetailsProps {
  campaignUtils: CouponCampaignUtils
  form: FormInstance
}

export const CouponCampaignEditorFormDetails: FC<CouponCampaignEditorFormDetailsProps> = props => {
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
  } = props.campaignUtils

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
            label={t('coupon-campaign-create.field.category')}
            extra={t('coupon-campaign-create.field.category-help')}
            rules={[rule.required(t('error.validation.category.id-required'))]}
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
            label={t('coupon-campaign-create.field.rank')}
            extra={t('coupon-campaign-create.field.rank-help')}
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
              label={t('coupon-campaign-create.field.mode')}
              extra={t('coupon-campaign-create.field.mode-help')}
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
              label={t('coupon-campaign-create.field.online-claim-link')}
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
              label={t('coupon-campaign-create.field.expiration-date')}
              extra={t('coupon-campaign-create.field.expiration-date-help')}
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
              label={t('coupon-campaign-create.field.banner-link')}
              extra={t('coupon-campaign-create.field.banner-link-help')}
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
              label={t('coupon-campaign-create.field.draw-date')}
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
              label={t('coupon-campaign-create.field.discount-type')}
              extra={t('coupon-campaign-create.field.discount-type-help')}
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
              label={t('coupon-campaign-create.field.discount-amount')}
              extra={
                selectedCouponDiscountType === CouponDiscountType.PercentValue
                  ? t('coupon-campaign-create.field.discount-amount-percent-help')
                  : t('coupon-campaign-create.field.discount-amount-fix-help')
              }
              dependencies={['discountType']}
              rules={[
                rule.required(t('error.validation.coupon.discount-required-for-discount')),
                () => ({
                  validator(_rule, value) {
                    const parsedAsFloat = parseFloat(value)
                    if (selectedCouponDiscountType === CouponDiscountType.PercentValue) {
                      if (parsedAsFloat < 0) {
                        return Promise.reject(
                          t('error.validation.coupon.discount-percent-greater-than-or-equal-0')
                        )
                      } else if (parsedAsFloat > 100) {
                        return Promise.reject(
                          t('error.validation.coupon.discount-percent-less-than-or-equal-100')
                        )
                      }
                    } else if (selectedCouponDiscountType === CouponDiscountType.FixValue) {
                      if (!Number.isInteger(parsedAsFloat)) {
                        return Promise.reject(t('error.coupon.fix-discount-must-be-integer'))
                      }

                      if (parsedAsFloat < 1) {
                        return Promise.reject(
                          t('error.validation.coupon.discount-fix-greater-than-or-equal-1')
                        )
                      } else if (parsedAsFloat > 1000000) {
                        return Promise.reject(
                          t('error.validation.coupon.discount-fix-less-than-or-equal-1000000')
                        )
                      }
                    }

                    return Promise.resolve()
                  }
                })
              ]}
            >
              {selectedCouponDiscountType === CouponDiscountType.PercentValue ? (
                <InputNumberI18n
                  disabled={!displayEditor}
                  formatter={getSeparatorAndSuffixFormatter('%')}
                  parser={getSeparatorAndSuffixParser('%')}
                  min={0}
                  max={100}
                  precision={2}
                />
              ) : (
                <InputNumberI18n
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
              label={t('coupon-campaign-create.field.minimum-shopping-value')}
              extra={t('coupon-campaign-create.field.minimum-shopping-value-help')}
              rules={[rule.positiveInteger()]}
            >
              <InputNumberI18n
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
                label={t('coupon-campaign-create.field.item-price')}
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
                          t('error.validation.coupon.item-price-required-no-prev-year-average')
                        )
                      }

                      return Promise.resolve()
                    }
                  })
                ]}
                extra={t('coupon-campaign-create.field.item-price-help')}
                className="mark-label-as-required"
              >
                <InputNumberI18n
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
                label={t('coupon-campaign-create.field.previous-year-average-basket-value')}
                extra={t('coupon-campaign-create.field.previous-year-average-basket-value-help')}
                dependencies={['itemPrice']}
                rules={[
                  rule.positiveInteger(),
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      const itemPrice = getFieldValue('itemPrice')
                      if (!itemPrice && !value) {
                        return Promise.reject(
                          t('error.validation.coupon.previous-basket-value-required-non-item-price')
                        )
                      }

                      return Promise.resolve()
                    }
                  })
                ]}
                className="mark-label-as-required"
              >
                <InputNumberI18n
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
                label={t('coupon-campaign-create.field.prize-value')}
                rules={[
                  rule.required(t('error.validation.coupon.prize-value-required-for-prize')),
                  rule.positiveInteger()
                ]}
              >
                <InputNumberI18n
                  disabled={!displayEditor}
                  formatter={getSeparatorAndSuffixFormatter('Ft')}
                  parser={getSeparatorAndSuffixParser('Ft')}
                  max={999999999}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="prizeRulesFile"
                label={t('coupon-campaign-create.field.prize-rules')}
                extra={t('coupon-campaign-create.field.prize-rules-help')}
                rules={[
                  rule.required(t('error.validation.coupon.prize-rules-file-id-required-for-prize'))
                ]}
              >
                <FileUploadButton
                  disabled={!displayEditor}
                  onSuccess={fileDetail => {
                    form.setFieldsValue({
                      ...form.getFieldsValue(),
                      prizeRulesFile: fileDetail
                    })

                    form.validateFields(['prizeRulesFile'])
                  }}
                  onRemove={() => {
                    form.setFieldsValue({
                      ...form.getFieldsValue(),
                      prizeRulesFile: undefined
                    })

                    form.validateFields(['prizeRulesFile'])
                  }}
                  onClick={() => dispatch(couponCampaignActions.downloadPrizeFile(coupon!))}
                  initialFileId={coupon?.prizeRulesFile?.id}
                  allowedExtensions={[FileExtension.PDF]}
                />
              </Form.Item>
            </Col>
          </>
        )}

        {selectedCouponType === CouponType.Discount && (
          <Col span={24}>
            <Form.Item
              name="productDetails"
              label={t('coupon-campaign-create.field.webshop-link')}
              extra={t('coupon-campaign-create.field.webshop-link-help')}
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
              label={t('coupon-campaign-create.field.awarded-campaign')}
              valuePropName="checked"
            >
              <Checkbox>{t('coupon-campaign-create.field.display-fix-banner-campaign')}</Checkbox>
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={rowGutter}>
        <Col span={12}>
          <Form.Item
            name="smallPicture"
            label={t('coupon-campaign-create.field.small-image')}
            extra={t('coupon-campaign-create.field.small-image-help')}
            rules={[
              rule.required(t('error.validation.coupon.small-picture-id-required')),
              rule.fileImgDimensionsExactMatch({ width: 360, height: 270 })
            ]}
          >
            <PictureUploadButton
              disabled={!displayEditor}
              onSuccess={fileDetails => {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  smallPicture: fileDetails
                })

                form.validateFields(['smallPicture'])
              }}
              onRemove={() => {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  smallPicture: undefined
                })

                form.validateFields(['smallPicture'])
              }}
              initialFileId={coupon?.smallPicture?.id}
              allowedExtensions={[FileExtension.JPG, FileExtension.PNG]}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          {prizeOrDiscount && (
            <Form.Item
              name="bigPicture"
              label={t('coupon-campaign-create.field.big-image')}
              extra={t('coupon-campaign-create.field.big-image-help')}
              rules={[
                rule.required(t('error.validation.coupon.big-picture-id-required-non-banner')),
                rule.fileImgDimensionsExactMatch({ width: 360, height: 540 })
              ]}
            >
              <PictureUploadButton
                disabled={!displayEditor}
                onSuccess={fileDetails => {
                  form.setFieldsValue({
                    ...form.getFieldsValue(),
                    bigPicture: fileDetails
                  })

                  form.validateFields(['bigPicture'])
                }}
                onRemove={() => {
                  form.setFieldsValue({
                    ...form.getFieldsValue(),
                    bigPicture: undefined
                  })

                  form.validateFields(['bigPicture'])
                }}
                initialFileId={coupon?.bigPicture?.id}
                allowedExtensions={[FileExtension.JPG, FileExtension.PNG]}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
    </>
  )
}