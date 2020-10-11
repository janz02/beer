import React, { FC } from 'react'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useCommonFormRules } from 'hooks'
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'
import { PartnerContactModalUtils } from './usePartnerContactModalUtils'

interface PartnerContactInviterProps {
  partnerContactModalUtils: PartnerContactModalUtils
}

export const PartnerContactInviter: FC<PartnerContactInviterProps> = props => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { inviterModalProps } = props.partnerContactModalUtils

  return (
    <GenericModalForm {...inviterModalProps}>
      <Form.Item
        label={t('partner-contact.field.email')}
        name="email"
        rules={[
          rule.requiredString(t('error.validation.common.email-required')),
          rule.email(),
          rule.max(100, t('error.validation.common.email-max-length-100'))
        ]}
      >
        <Input maxLength={100} />
      </Form.Item>
    </GenericModalForm>
  )
}
