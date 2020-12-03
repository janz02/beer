import { Row, Col, Button } from 'antd'
import './CampaignEditor.scss'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface CampaignEditorProps {
  onSubmit: () => void
}

export const CampaignEditorFormFooter: FC<CampaignEditorProps> = ({ onSubmit }) => {
  const { t } = useTranslation()

  return (
    <div className="create-campaign-buttons">
      <Row>
        <Col>
          <Button onClick={onSubmit} name="Submit">
            {t('campaign-create.save-draft')}
          </Button>
        </Col>
        <Col>
          <Button name="Next">{t('campaign-create.next-section')}</Button>
        </Col>
      </Row>
    </div>
  )
}
