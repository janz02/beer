import { Form, Row, Col, Card, Divider } from 'antd'
import { RootState } from 'app/rootReducer'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { CampaignEditorFormFooter } from './CampaignEditorFormFooter'
import { EditCampaignStatus } from './CampaignStatusHeader'
import { CampaignUserLogs } from './CampaignUserLogs'

export interface CampaignEditorProps {
  campaignId: number | undefined
}

export const CampaignEditorForm: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  const campaign = useSelector((state: RootState) =>
    state.campaignList.companyCampaigns.find(campaign => campaign.id === campaignId)
  )

  return (
    <Form className="create-campaign-form">
      <Card className="create-campaign-form-content" title={t('campaign-create.title')} extra="...">
        <Row justify="end" align="middle">
          <Col span={8}>
            <EditCampaignStatus />
          </Col>
          <Col span={12}>
            <CampaignUserLogs campaign={campaign} visible />
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
