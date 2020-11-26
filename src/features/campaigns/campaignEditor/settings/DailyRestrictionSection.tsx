import { Col, Form, TimePicker } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const DailyRestrictionSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Form.Item
      label={t('campaign-create.settings.daily-restriction-title')}
      className="form-controls-display-content"
    >
      <Col>
        <label className="control-label">{t('campaign-create.settings.start-time')}</label>
        <TimePicker />
      </Col>
      <Col>
        <label className="control-label">{t('campaign-create.settings.end-time')}</label>
        <TimePicker />
      </Col>
    </Form.Item>
  )
}
