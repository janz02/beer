import React, { FC, useEffect } from 'react'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Form, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'

import { useNewsletterEditorModals } from './useNewsletterEditorModals'

export const NewsletterSegmentEmailModal: FC = () => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const {
    segmentEmailModalFormProps,
    segments,
    openSegmentEmail,
    handleGetSegmnentsForEmail
  } = useNewsletterEditorModals()

  useEffect(() => {
    openSegmentEmail && handleGetSegmnentsForEmail()
  }, [openSegmentEmail, handleGetSegmnentsForEmail])

  return (
    <GenericModalForm {...segmentEmailModalFormProps}>
      <Form.Item
        name="subject"
        label={t('newsletter.field.subject')}
        rules={[rule.requiredString(t('error.validation.email.subject-required')), rule.max(45)]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="segment"
        label={t('newsletter.popup.target-segment')}
        rules={[rule.requiredString(t('error.validation.segment.id-required'))]}
      >
        <Select>
          {segments?.map(s => (
            <Select.Option key={s.id} value={s.id}>
              {s.name} - ({s.segmentSize})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </GenericModalForm>
  )
}
