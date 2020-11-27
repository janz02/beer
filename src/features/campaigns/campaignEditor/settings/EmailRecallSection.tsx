import { Col, Form, Input, Row, Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const EmailRecallSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <label className="box-title">
        {t('campaign-create.settings.email-recall-settings-title')}
      </label>
      <Row gutter={5}>
        <Col span={10}>
          <Form.Item
            className="control-label"
            label={t('campaign-create.settings.maximum-recall-attempts')}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={14} className="col-flex-end">
          <Form.Item
            className="control-label"
            label={t('campaign-create.settings.recall-frequency')}
          >
            <Select>
              <Select.Option value="1">6 Months</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
