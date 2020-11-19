import { DashOutlined } from '@ant-design/icons'
import { Form, Row, Col, Card, Divider, Button } from 'antd'
import { RootState } from 'app/rootReducer'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import { CampaignEditorFormFooter } from './CampaignEditorFormFooter'
import { EditCampaignStatus } from './CampaignStatusHeader'
import { CampaignUserLogs } from './CampaignUserLogs'

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
          <Col span={18}>
            <CampaignEditorFormFooter />
          </Col>
        </Row>
      </Card>
    </Form>
  )
}
