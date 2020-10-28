import React, { FC } from 'react'
import { Button, Row, Col, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { ExportOutlined } from '@ant-design/icons'
import { couponCampaignActions } from '../../couponCampaignsSlice'
import { useDispatch } from 'react-redux'
import { CouponCampaignUtils } from '../useCouponCampaignUtils'

interface CouponCampaignEditorFormClientActivitiesProps {
  campaignUtils: CouponCampaignUtils
}

export const CouponCampaignEditorFormClientActivities: FC<CouponCampaignEditorFormClientActivitiesProps> = props => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { loading, coupon, rowGutter, prizeOrDiscount } = props.campaignUtils

  return (
    <>
      <Row gutter={rowGutter}>
        <Col span={6}>
          <p style={{ float: 'left', paddingRight: '5px' }}>{t('coupon-create.field.showCount')}</p>
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
            <Form.Item extra={t('coupon-create.download-redeemed-coupons-help')}>
              <Button
                type="default"
                loading={loading}
                icon={<ExportOutlined />}
                onClick={() => {
                  dispatch(couponCampaignActions.downloadClaimedCoupons(coupon!))
                }}
              >
                {t('coupon-create.download-redeemed-coupons')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  )
}
