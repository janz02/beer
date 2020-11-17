import { Row, Col, Button } from 'antd'
import './CampaignEditor.scss'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const CampaignEditorFormFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="create-campaign-buttons">
      <Row>
        <Col>
          <Button name="Submit">{t('campaign-create.save-draft')}</Button>
        </Col>
        <Col>
          <Button name="Next">{t('campaign-create.next-section')}</Button>
        </Col>
      </Row>
    </div>
  )
}
