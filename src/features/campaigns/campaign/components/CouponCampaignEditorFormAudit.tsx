import React, { FC } from 'react'
import { Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { MomentDisplay } from 'components/MomentDisplay'
import { CouponCampaignUtils } from '../useCouponCampaignUtils'

interface CouponCampaignEditorFormAuditProps {
  campaignUtils: CouponCampaignUtils
}

export const CouponCampaignEditorFormAudit: FC<CouponCampaignEditorFormAuditProps> = props => {
  const { t } = useTranslation()
  const { coupon, rowGutter } = props.campaignUtils

  return (
    <Row gutter={rowGutter}>
      <Col span={8}>
        <Form.Item label={t('coupon-campaign-create.field.created')}>
          {coupon?.createdBy && (
            <div>
              {`${coupon?.createdBy}, `}
              <MomentDisplay date={coupon?.createdDate} mode="date time-sec" />
            </div>
          )}
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label={t('coupon-campaign-create.field.modified')}>
          {coupon?.modifiedBy && (
            <div>
              {`${coupon?.modifiedBy}, `}
              <MomentDisplay date={coupon?.modifiedDate} mode="date time-sec" />
            </div>
          )}
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label={t('coupon-campaign-create.field.approved')}>
          {coupon?.approvedBy && (
            <div>
              {`${coupon?.approvedBy}, `}
              <MomentDisplay date={coupon?.approvedDate} mode="date time-sec" />
            </div>
          )}
        </Form.Item>
      </Col>
    </Row>
  )
}
