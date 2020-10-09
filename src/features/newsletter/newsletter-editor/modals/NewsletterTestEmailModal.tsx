import React, { FC } from 'react'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Input, Form } from 'antd'
import { UseNewsletterEditorModalsUtils } from './useNewsletterEditorModals'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'

interface NewsletterTestEmailModalProps {
  newsletterEditorModalsUtils: UseNewsletterEditorModalsUtils
}

export const NewsletterTestEmailModal: FC<NewsletterTestEmailModalProps> = props => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { testEmailModalFormProps } = props.newsletterEditorModalsUtils

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
