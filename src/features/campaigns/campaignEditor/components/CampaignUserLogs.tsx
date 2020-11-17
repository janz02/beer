import { Row, Col } from 'antd'
import './CampaignEditor.scss'
import { CampaignListItem } from 'models/campaign/campaignListItem'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MomentDisplay } from 'components/MomentDisplay'

export interface CampaignUserLogsProps {
  campaign: CampaignListItem | undefined
  visible: boolean
}

export const CampaignUserLogs: FC<CampaignUserLogsProps> = ({ campaign, visible }) => {
  const { t } = useTranslation()

  if (!visible) return <></>
  return (
    <>
      <span className="campaign-user-logs-title">{t('campaign-create.user-logs')}</span>
      <div className="campaign-user-logs">
        <Row>
          <Col span={4}>
            <MomentDisplay date={campaign?.startDate} mode="date" />
          </Col>
          <Col span={8}>{campaign?.responsible}</Col>
          <Col span={10}>{campaign !== null ? 'Edited: Campaign settings' : ''}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <MomentDisplay date={campaign?.startDate} mode="time" />
          </Col>
          <Col span={8}>{campaign !== null ? '(Marketing)' : ''}</Col>
          <Col span={10} />
        </Row>
      </div>
    </>
  )
}
