import { Row, Col } from 'antd'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import React from 'react'
import { useParams } from 'react-router-dom'
import { history } from 'router/router'
import { CampaignEditorForm } from './components/CampaignEditorForm'

export const CampaignEditorPage: React.FC = () => {
  const params = useParams<{ campaignId?: string }>()
  const id = params.campaignId ? +params.campaignId : undefined

  return (
    <>
      <Row className="campaign-editor-form">
        <Col span={18} className="editor-col">
          <ResponsiveHeader
            type="floating"
            title={id?.toString()}
            backButton={{
              primary: true,
              onClick: () => {
                history.push('/campaigns')
              }
            }}
          />
        </Col>
      </Row>
      <CampaignEditorForm campaignId={id} />
    </>
  )
}
