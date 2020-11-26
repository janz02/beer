import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const IntervalRestrictionSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Form.Item
      label={t('campaign-create.settings.interval-restrictions')}
      className="form-controls-display-grid"
    >
      <label className="control-label">
        {t('campaign-create.settings.email-delivery-date-restrictions')}
      </label>
      <CheckboxGroup>
        <Checkbox value="weekday">Weekday</Checkbox>
        <Checkbox value="weekend">Weekend</Checkbox>
        <Checkbox value="feast-day">Feast-day</Checkbox>
        <Checkbox value="saturday-working-day">Saturday working day</Checkbox>
      </CheckboxGroup>
    </Form.Item>
  )
}
