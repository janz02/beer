import { Col, Divider, Form, Row } from 'antd'
import './../base/CampaignEditor.scss'
import React, { FC } from 'react'
import { BasicCampaignSection } from './BasicCampaignSection'
import { ChannelTypeSection } from './ChannelTypeSection'
import { ProductSection } from './ProductSection'
import { CampaignAdminSection } from './CampaignAdminSection'
import { TimingSection } from './TimingSection'
import { DailyRestrictionSection } from './DailyRestrictionSection'
import { IntervalRestrictionSection } from './IntervalRestrictionSection'
import { EmailResendSection } from './EmailRecallSection'
import { EmailReSendingSection } from './EmailSendingSection'
import { useCampaignSettingsUtils } from './useCampaignSettingsUtils'
import { CampaignEditorFormFooter } from '../base/CampaignEditorFormFooter'

export const SettingsTabPane: FC = () => {
  const { form, handleSubmitButtonClick, campaignSettingsFormElements } = useCampaignSettingsUtils()

  return (
    <Form className="settings-tab" layout="vertical" form={form} onFinish={handleSubmitButtonClick}>
      <div>
        <Col className="campaign-basic-details">
          <BasicCampaignSection />
        </Col>
        <Divider />

        <ChannelTypeSection channelTypes={campaignSettingsFormElements.channels} />
        <Divider />

        <Row gutter={16}>
          <Col span={7}>
            <ProductSection products={campaignSettingsFormElements.products} />
          </Col>
          <Col>
            <Divider type="vertical" className="vertical-splitter" />
          </Col>
          <Col span={7}>
            <CampaignAdminSection
              requesters={campaignSettingsFormElements.users}
              responsibles={campaignSettingsFormElements.users}
            />
          </Col>
        </Row>

        <Divider />
        <Row gutter={16}>
          <Col span={7}>
            <TimingSection timingTypes={campaignSettingsFormElements.timingTypes} />
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
            <IntervalRestrictionSection
              restrictionOptions={campaignSettingsFormElements.intervalRestrictionOptions}
            />
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={7}>
            <EmailResendSection
              emailResendOptions={campaignSettingsFormElements.resendFrequencyOptions}
            />
          </Col>
          <Col>
            <Divider type="vertical" className="vertical-splitter" />
          </Col>
          <Col span={7}>
            <EmailReSendingSection
              emailReSendingOptions={campaignSettingsFormElements.resendingRuleOptions}
            />
          </Col>
        </Row>
      </div>
      <Divider />
      <Row>
        <Col span={22}>
          <CampaignEditorFormFooter />
        </Col>
      </Row>
    </Form>
  )
}
