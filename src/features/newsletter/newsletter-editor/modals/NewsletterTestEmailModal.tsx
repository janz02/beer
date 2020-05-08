import React, { FC } from 'react'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Input, Form } from 'antd'
import { useNewsletterEditorModals } from './useNewsletterEditorModals'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'

export const NewsletterTestEmailModal: FC = () => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { testEmailModalFormProps } = useNewsletterEditorModals()

  return (
    <GenericModalForm {...testEmailModalFormProps}>
      <Form.Item
        name="subject"
        label={t('newsletter.field.subject')}
        rules={[rule.requiredString(t('error.validation.email.subject-required')), rule.max(45)]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label={t('newsletter.field.email')}
        rules={[rule.requiredString(t('error.validation.segment.email-required')), rule.email()]}
      >
        <Input />
      </Form.Item>
    </GenericModalForm>
  )
}
