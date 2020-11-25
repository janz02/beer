import { DashOutlined } from '@ant-design/icons'
import { Form, Row, Col, Card, Divider, Button, Tabs } from 'antd'
import { RootState } from 'app/rootReducer'
import { TabPane } from 'components/responsive/tabs'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import { CampaignEditorFormFooter } from './CampaignEditorFormFooter'
import { EditCampaignStatus } from './CampaignStatusHeader'
import { CampaignUserLogs } from './CampaignUserLogs'
import { EmailContentTabPane } from '../content/email/EmailContentTabPane'
import { SegmentationTabPane } from '../segmentation/SegmentationTabPane'
import { SettingsTabPane } from '../settings/SettingsTabPane'
import { TestTabPane } from '../test/TestTabPane'

export interface CampaignEditorProps {
  campaignId: number | undefined
}

export const CampaignEditorForm: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  const campaignForMock = useSelector((state: RootState) =>
    state.campaignList.companyCampaigns.find(campaign => campaign.id === campaignId)
  )
  const isUserLogVisible = useMemo(
    () => hasPermission(pageViewRoles.campaignUserLogsVisibility),
    []
  )

  return (
    <Form className="create-campaign-form">
      <Card
        className="create-campaign-form-content"
        title={t('campaign-create.title')}
        extra={<Button icon={<DashOutlined rotate={90} type="primary" />} />}
      >
        <Row justify="end" align="middle">
          <Col span={8}>
            <EditCampaignStatus />
          </Col>
          <Col span={12}>
            {isUserLogVisible && (
              <CampaignUserLogs
                campaignLogs={
                  campaignForMock != null
                    ? [campaignForMock, campaignForMock, campaignForMock, campaignForMock]
                    : []
                }
              />
            )}
          </Col>
          <Divider />
        </Row>
        <Row>
          <Tabs className="campaign-editor-content">
            <TabPane tab="Settings" key="settings">
              <SettingsTabPane campaignId={campaignId} />
            </TabPane>
            <TabPane tab="Segmentation" key="segmentation">
              <SegmentationTabPane campaignId={campaignId} />
            </TabPane>
            <TabPane tab={t('campaign-create.content.email.tab-name')} key="content">
              <EmailContentTabPane campaignId={campaignId} />
            </TabPane>
            <TabPane tab="Test" key="test">
              <TestTabPane campaignId={campaignId} />
            </TabPane>
          </Tabs>
          <Divider />
        </Row>
        <Row>
          <Col span={22}>
            <CampaignEditorFormFooter />
          </Col>
        </Row>
      </Card>
    </Form>
  )
}
