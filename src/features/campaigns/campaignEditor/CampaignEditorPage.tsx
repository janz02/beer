import { Row, Col } from 'antd'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { history } from 'router/router'
import { CampaignEditorForm } from './base/CampaignEditorForm'

export const CampaignEditorPage: React.FC = () => {
  const params = useParams<{ campaignId?: string }>()
  const id = params.campaignId ? +params.campaignId : undefined
  const { t } = useTranslation()

  return (
    <>
      <Row className="campaign-editor-form">
        <Col span={18} className="editor-col">
          <ResponsiveHeader
            type="floating"
            title={t('campaign-create.title')}
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
