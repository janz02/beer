import { Checkbox, Form } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/textValuePair'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface IntervalRestrictionSectionProps {
  restrictionOptions: TextValuePair[]
}

export const IntervalRestrictionSection: FC<IntervalRestrictionSectionProps> = ({
  restrictionOptions
}) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.interval-restrictions')}</Title>
      <Form.Item
        name={['timing', 'intervalRestrictionOptions']}
        className="control-label"
        label={t('campaign-create.settings.email-delivery-date-restrictions')}
      >
        <Checkbox.Group className="vertical-checkboxes">
          {restrictionOptions.map(option => (
            <Checkbox key={option.value} value={option.value}>
              {t(`campaign-create.settings.${option.text.toLowerCase()}`)}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </>
  )
}
