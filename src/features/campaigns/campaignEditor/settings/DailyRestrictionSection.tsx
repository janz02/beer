import { Col, Form, Row, TimePicker } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const DailyRestrictionSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.daily-restriction-title')}</Title>
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