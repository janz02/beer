import { Row, Col } from 'antd'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import { newsletterEditorActions } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { useDispatch } from 'hooks/react-redux-hooks'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { history } from 'router/router'
import { CampaignEditorForm } from './base/CampaignEditorForm'
import { getCampaign } from './campaignEditorSlice'

export const CampaignEditorPage: React.FC = () => {
  const params = useParams<{ campaignId?: string }>()
  const id = params.campaignId ? +params.campaignId : undefined
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getCampaign(id))
      dispatch(newsletterEditorActions.clearNewsletterTemplate())
    }
  }, [id, dispatch])
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
