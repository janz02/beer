import { Col, Divider, Row } from 'antd'
import { TextValuePair } from 'models/textValuePair'
import React, { FC } from 'react'
import { EmailResendSection } from './EmailRecallSection'
import { EmailReSendingRulesSection } from './EmailReSendingRulesSection'

interface EmailConfigurationsProps {
  resendFrequencyOptions: TextValuePair[]
  resendingRuleOptions: TextValuePair[]
}

export const EmailConfigurations: FC<EmailConfigurationsProps> = ({
  resendFrequencyOptions,
  resendingRuleOptions
}) => {
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
