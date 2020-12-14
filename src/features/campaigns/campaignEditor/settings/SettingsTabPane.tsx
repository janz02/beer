import { Col, Divider, Form, Row } from 'antd'
import './../base/CampaignEditor.scss'
import React, { FC, useEffect, useState } from 'react'
import { BasicCampaignSection } from './BasicCampaignSection'
import { ChannelTypeSection } from './ChannelTypeSection'
import { ProductSection } from './ProductSection'
import { CampaignAdminSection } from './CampaignAdminSection'
import { useCampaignSettingsUtils } from './useCampaignSettingsUtils'
import { CampaignEditorFormFooter } from '../base/CampaignEditorFormFooter'
import { EmailConfigurations } from './EmailConfiguration'
import { RestrictionConfigurations } from './RestrictionConfigurations'
import { Channels } from 'models/channels'

export const SettingsTabPane: FC = () => {
  const {
    form,
    handleSubmitButtonClick,
    campaignSettingsFormElements,
    handleGetSettingFormElements
  } = useCampaignSettingsUtils()

  const [channelChosen, setChannelChosen] = useState<number>()
  useEffect(() => {
    handleGetSettingFormElements()
  }, [handleGetSettingFormElements])

  return (
    <Form className="settings-tab" layout="vertical" form={form} onFinish={handleSubmitButtonClick}>
      <div>
        <Col className="campaign-basic-details">
          <BasicCampaignSection />
        </Col>
        <Divider />

        <ChannelTypeSection
          channelTypes={campaignSettingsFormElements.channels}
          onChange={setChannelChosen}
        />
        <Divider />

        <Row gutter={16}>
          <Col span={7}>
            <ProductSection products={campaignSettingsFormElements.products} />
          </Col>
          <Col>
            <Divider type="vertical" className="vertical-splitter" />
          </Col>
          <Col span={7}>
            <CampaignAdminSection users={campaignSettingsFormElements.users} />
          </Col>
        </Row>

        <Divider />
        <RestrictionConfigurations
          timingTypes={campaignSettingsFormElements.timingTypes}
          intervalRestrictionOptions={campaignSettingsFormElements.intervalRestrictionOptions}
        />

        {channelChosen === Channels.Email && (
          <>
            <Divider />
            <EmailConfigurations
              resendFrequencyOptions={campaignSettingsFormElements.resendFrequencyOptions}
              resendingRuleOptions={campaignSettingsFormElements.resendingRuleOptions}
            />
          </>
        )}
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
