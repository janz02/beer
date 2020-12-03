import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface IntervalRestrictionProps {
  restrictionOptions: TextValuePair[]
}

export const IntervalRestrictionSection: FC<IntervalRestrictionProps> = ({
  restrictionOptions
}) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.interval-restrictions')}</Title>
      <Form.Item
        className="control-label"
        label={t('campaign-create.settings.email-delivery-date-restrictions')}
      >
        <CheckboxGroup className="vertical-checkboxes">
          {restrictionOptions.map(option => (
            <Checkbox key={option.value} value={option.value}>
              {option.text}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Form.Item>
    </>
  )
}
