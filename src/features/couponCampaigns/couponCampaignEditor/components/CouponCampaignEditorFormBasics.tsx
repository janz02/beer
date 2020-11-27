import React, { FC } from 'react'
import { Form, Input, Select, DatePicker, Row, Col } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useTranslation } from 'react-i18next'
import { CouponType } from 'api/swagger/coupon'
import { hasPermission } from 'services/jwt-reader'
import { CouponCampaignStateDisplay } from 'components/CouponCampaignStateDisplay'
import { CouponCampaignActiveDisplay } from 'components/CouponCampaignActiveDisplay'
import { comboRoles } from 'services/roleHelpers'
import { CouponCampaignUtils } from '../useCouponCampaignUtils'
import { useCommonFormRules } from 'hooks'
import { useDispatch } from 'react-redux'

interface CouponCampaignEditorFormBasicsProps {
  campaignUtils: CouponCampaignUtils
}

export const CouponCampaignEditorFormBasics: FC<CouponCampaignEditorFormBasicsProps> = props => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rule = useCommonFormRules()
  const {
    couponIsNew,
    coupon,
    majorPartners,
    userData,
    displayEditor,
    rowGutter,
    prizeOrDiscount,
    setSelectedCouponType
  } = props.campaignUtils

  return (
    <>
      <Row gutter={rowGutter}>
        <Col span={6}>
          <Form.Item
            name="type"
            label={t('coupon-campaign-create.field.type')}
            rules={[rule.required(t('error.validation.coupon.type-required'))]}
          >
            <Select
              disabled={!displayEditor || !couponIsNew}
              onChange={(value: CouponType) => {
                dispatch(setSelectedCouponType(value))
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
            <Form.Item label={t('coupon-campaign-create.field.state')}>
              <CouponCampaignStateDisplay state={coupon?.state} />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Row gutter={rowGutter}>
        <Col span={12}>
          {hasPermission(comboRoles.forNkm) ? (
            <Form.Item name="partnerId" label={t('coupon-campaign-create.field.partner-name')}>
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
            <Form.Item label={t('coupon-campaign-create.field.partner-name')}>
              <>{userData?.partnerName}</>
            </Form.Item>
          )}
        </Col>

        <Col span={12}>
          {!couponIsNew && (
            <Form.Item label={t('coupon-campaign-create.field.is-active')}>
              <CouponCampaignActiveDisplay coupon={coupon} />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Row gutter={rowGutter}>
        <Col span={12} order={1}>
          <Form.Item
            name="name"
            label={t('coupon-campaign-create.field.name')}
            extra={t('coupon-campaign-create.field.name-help')}
            rules={[
              rule.requiredString(t('error.validation.coupon.name-required')),
              rule.max(60, t('error.validation.coupon.name-max-length-60'))
            ]}
          >
            <Input disabled={!displayEditor} maxLength={60} />
          </Form.Item>
        </Col>

        <Col span={12} order={prizeOrDiscount ? 2 : 3}>
          <Form.Item
            name="startDate"
            label={t('coupon-campaign-create.field.distribution-start-date')}
            extra={t('coupon-campaign-create.field.distribution-start-date-help')}
            rules={[rule.required(t('error.validation.coupon.start-date-required'))]}
          >
            <DatePicker disabled={!displayEditor} />
          </Form.Item>
        </Col>

        <Col span={12} order={prizeOrDiscount ? 3 : 2}>
          {prizeOrDiscount && (
            <Form.Item
              name="description"
              label={t('coupon-campaign-create.field.description')}
              extra={t('coupon-campaign-create.field.description-help')}
              rules={[
                rule.requiredString(t('error.validation.coupon.description-required-non-banner')),
                rule.max(255, t('error.validation.coupon.description-max-length-255'))
              ]}
            >
              <TextArea disabled={!displayEditor} maxLength={255} rows={4} />
            </Form.Item>
          )}
        </Col>

        <Col span={12} order={4}>
          <Form.Item
            name="endDate"
            label={t('coupon-campaign-create.field.distribution-end-date')}
            extra={t('coupon-campaign-create.field.distribution-end-date-help')}
            rules={[rule.required(t('error.validation.coupon.end-date-required'))]}
          >
            <DatePicker disabled={!displayEditor} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}