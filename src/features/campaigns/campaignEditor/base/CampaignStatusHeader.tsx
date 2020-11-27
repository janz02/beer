import { Row } from 'antd'
import './CampaignEditor.scss'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MinusCircleTwoTone } from '@ant-design/icons'

export const EditCampaignStatus: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="edit-campaign-status">
      <Row>{t('campaign-create.status-creation')}</Row>
      <Row>
        <span>
          <MinusCircleTwoTone /> LastFilledTabContent
        </span>
      </Row>
    </div>
  )
}
