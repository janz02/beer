import { Col, Divider, Row } from 'antd'
import React, { FC } from 'react'
import { EmailResendSection } from './EmailRecallSection'
import { EmailReSendingRulesSection } from './EmailReSendingRulesSection'
import { useCampaignSettingsUtils } from './useCampaignSettingsUtils'

export const EmailConfigurations: FC = () => {
  const { campaignSettingsFormElements } = useCampaignSettingsUtils()
  const { resendFrequencyOptions, resendingRuleOptions } = campaignSettingsFormElements
  return (
    <Row gutter={16}>
      <Col span={7}>
        <EmailResendSection emailResendOptions={resendFrequencyOptions} />
      </Col>
      <Col>
        <Divider type="vertical" className="vertical-splitter" />
      </Col>
      <Col span={7}>
        <EmailReSendingRulesSection emailReSendingOptions={resendingRuleOptions} />
      </Col>
    </Row>
  )
}
