import React, { FC, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'
import { useCommonFormRules } from 'hooks'
import { GenericPopup } from 'components/popups/GenericPopup'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { AddButton } from 'components/buttons/AddButton'
import { useNewlsetterList } from './useNewlsetterList'

export const NewsletterList: FC = () => {
  const { t } = useTranslation()

  const rule = useCommonFormRules()
  const {
    tableProps,
    deletePopupProps,
    createModalFormProps,
    openCreateTemplateModal,
    handleGetNewsletterTemplates
  } = useNewlsetterList()

  useEffect(() => {
    handleGetNewsletterTemplates()
  }, [handleGetNewsletterTemplates])

  const headerOptions = (
    <AddButton onClick={openCreateTemplateModal}>{t('newsletter.add')}</AddButton>
  )

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('newsletter.available-templates')}
        floatingOptions={headerOptions}
        forTable
        width="normal"
      >
        <ResponsiveTable {...tableProps} />
      </ResponsiveCard>

      <GenericPopup {...deletePopupProps} />

      <GenericModalForm {...createModalFormProps}>
        <Form.Item
          name="templateName"
          label={t('newsletter.field.template-name')}
          rules={[
            rule.requiredString(t('error.validation.email.template-name-required')),
            rule.max(35)
          ]}
        >
          <Input maxLength={35} />
        </Form.Item>
      </GenericModalForm>
    </>
  )
}
