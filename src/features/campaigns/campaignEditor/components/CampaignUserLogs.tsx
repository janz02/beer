import { Row, Col, Button } from 'antd'
import './CampaignEditor.scss'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MomentDisplay } from 'components/MomentDisplay'

export interface UserLog {
  responsible?: string | null
  startDate?: moment.Moment
  endDate?: moment.Moment | null
}
export interface CampaignUserLogsProps {
  campaignLogs: UserLog[]
  visible: boolean
}

export const CampaignUserLogs: FC<CampaignUserLogsProps> = ({ campaignLogs, visible }) => {
  const { t } = useTranslation()
  const [seeAllLogs, setAllLogsVisibility] = useState(false)

  if (!visible) return null
  return (
    <>
      <span className="campaign-user-logs-title">{t('campaign-create.user-logs')}</span>
      <div className="campaign-user-logs">
        {campaignLogs
          ?.filter((value, index) => {
            if ((index === 0 || seeAllLogs) && value !== null) return value
          })
          .map(campaign => {
            return (
              <>
                <Row>
                  <Col span={4}>
                    <MomentDisplay date={campaign.startDate} mode="date" />
                  </Col>
                  <Col span={8}>{campaign.responsible}</Col>
                  <Col span={10}>Edited: Campaign settings</Col>
                </Row>
                <Row className="campaign-user-log-small-font">
                  <Col span={4}>
                    <MomentDisplay date={campaign.startDate} mode="time" />
                  </Col>
                  <Col span={8}>(Marketing)</Col>
                  <Col span={10} />
                </Row>
              </>
            )
          })}
        {campaignLogs.length > 1 ? (
          <Row className="campaign-user-log-inner-footer">
            {seeAllLogs ? (
              <Button
                className="campaign-user-log-small-font"
                type="link"
                onClick={() => setAllLogsVisibility(false)}
              >
                See less
              </Button>
            ) : (
              <Button
                className="campaign-user-log-small-font"
                type="link"
                onClick={() => setAllLogsVisibility(true)}
              >
                See more
              </Button>
            )}
          </Row>
        ) : null}
      </div>
    </>
  )
}
