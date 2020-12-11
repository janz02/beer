import { Col, Divider, Row } from 'antd'
import React, { FC } from 'react'
import { DailyRestrictionSection } from './DailyRestrictionSection'
import { IntervalRestrictionSection } from './IntervalRestrictionSection'
import { TimingSection } from './TimingSection'
import { useCampaignSettingsUtils } from './useCampaignSettingsUtils'

export const RestrictionConfigurations: FC = () => {
  const { campaignSettingsFormElements } = useCampaignSettingsUtils()
  const { timingTypes, intervalRestrictionOptions } = campaignSettingsFormElements
  return (
    <Row gutter={16}>
      <Col span={7}>
        <TimingSection timingTypes={timingTypes} />
      </Col>
      <Col>
        <Divider type="vertical" className="vertical-splitter" />
      </Col>
      <Col span={7}>
        <DailyRestrictionSection />
      </Col>
      <Col>
        <Divider type="vertical" className="vertical-splitter" />
      </Col>
      <Col span={7}>
        <IntervalRestrictionSection restrictionOptions={intervalRestrictionOptions} />
      </Col>
    </Row>
  )
}
