import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const IntervalRestrictionSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      {/* className="form-controls-display-grid" */}
      <label className="box-title">{t('campaign-create.settings.interval-restrictions')}</label>
      <Form.Item
        className="control-label"
        label={t('campaign-create.settings.email-delivery-date-restrictions')}
      >
        <CheckboxGroup className="vertical-checkboxes">
          <Checkbox value="weekday">Weekday</Checkbox>
          <Checkbox value="weekend">Weekend</Checkbox>
          <Checkbox value="feast-day">Feast-day</Checkbox>
          <Checkbox value="saturday-working-day">Saturday working day</Checkbox>
        </CheckboxGroup>
      </Form.Item>
    </>
  )
}
