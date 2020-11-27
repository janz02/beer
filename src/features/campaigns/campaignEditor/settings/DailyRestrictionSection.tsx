import { Col, Form, Row, TimePicker } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const DailyRestrictionSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <label className="box-title">{t('campaign-create.settings.daily-restriction-title')}</label>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item className="control-label" label={t('campaign-create.settings.start-time')}>
            <TimePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="control-label" label={t('campaign-create.settings.end-time')}>
            <TimePicker />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
