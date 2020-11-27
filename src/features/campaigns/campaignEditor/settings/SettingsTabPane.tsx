import { Col, Divider, Form, Row } from 'antd'
import './../base/CampaignEditor.scss'
import React, { FC } from 'react'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import { BasicCampaignSection } from './BasicCampaignSection'
import { ChannelTypeSection } from './ChannelTypeSection'
import { ProductSection } from './ProductSection'
import { CampaignAdminSection } from './CampaignAdminSection'
import { TimingSection } from './TimingSection'
import { DailyRestrictionSection } from './DailyRestrictionSection'
import { IntervalRestrictionSection } from './IntervalRestrictionSection'
import { EmailRecallSection } from './EmailRecallSection'
import { EmailSendingSection } from './EmailSendingSection'

export const SettingsTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return (
    <Form className="settings-tab" layout="vertical">
      <div>
        <Col className="campaign-basic-details">
          <BasicCampaignSection campaignId={campaignId} />
        </Col>
        <Divider />

        <ChannelTypeSection campaignId={campaignId} />
        <Divider />

        <Row gutter={16}>
          <Col span={7}>
            <ProductSection />
          </Col>
          <Col>
            <Divider type="vertical" className="vertical-splitter" />
          </Col>
          <Col span={7}>
            <CampaignAdminSection />
          </Col>
        </Row>

        <Divider />
        <Row gutter={16}>
          <Col span={7}>
            <TimingSection />
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
            <IntervalRestrictionSection />
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={7}>
            <EmailRecallSection />
          </Col>
          <Col>
            <Divider type="vertical" className="vertical-splitter" />
          </Col>
          <Col span={7}>
            <EmailSendingSection />
          </Col>
        </Row>
      </div>
    </Form>
  )
}
