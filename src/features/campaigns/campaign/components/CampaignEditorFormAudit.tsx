import React, { FC } from 'react'
import { Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { MomentDisplay } from 'components/MomentDisplay'
import { useCampaign } from '../useCampaign'

export const CampaignEditorFormAudit: FC = () => {
  const { t } = useTranslation()
  const { coupon, rowGutter } = useCampaign()

  return (
    <Row gutter={rowGutter}>
      <Col span={8}>
        <Form.Item label={t('coupon-create.field.created')}>
          {coupon?.createdBy && (
            <div>
              {`${coupon?.createdBy}, `}
              <MomentDisplay date={coupon?.createdDate} mode="date time-sec" />
            </div>
          )}
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label={t('coupon-create.field.modified')}>
          {coupon?.modifiedBy && (
            <div>
              {`${coupon?.modifiedBy}, `}
              <MomentDisplay date={coupon?.modifiedDate} mode="date time-sec" />
            </div>
          )}
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label={t('coupon-create.field.approved')}>
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
