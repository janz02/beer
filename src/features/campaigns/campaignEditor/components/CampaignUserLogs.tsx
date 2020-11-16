import { Row, Col } from 'antd'
import './CampaignEditor.scss'
import { CampaignListItem } from 'models/campaign/campaignListItem'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface CampaignUserLogsProps {
  campaign: CampaignListItem | undefined
}

export const CampaignUserLogs: FC<CampaignUserLogsProps> = ({ campaign }) => {
  const { t } = useTranslation()

  return (
    <>
      <span className="campaign-user-logs-title">{t('campaign-create.user-logs')}</span>
      <div className="campaign-user-logs">
        <Row>
          <Col span={4}>{campaign?.startDate?.format('YYYY.MM.DD')}</Col>
          <Col span={8}>{campaign?.responsible}</Col>
          <Col span={10}>{campaign != null ? 'Edited: Campaign settings' : ''}</Col>
        </Row>
        <Row>
          <Col span={4}>{campaign?.startDate?.format('hh.mm')}</Col>
          <Col span={8}>{campaign != null ? '(Marketing)' : ''}</Col>
          <Col span={10} />
        </Row>
      </div>
    </>
  )
}
