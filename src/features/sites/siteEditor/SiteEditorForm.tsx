import React, { FC, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useTranslation } from 'react-i18next'
import { Site } from 'models/site'
import { BackButton } from 'components/buttons/BackButton'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'

export interface SiteEditorFormProps {
  onSave: (values: Site) => void
  onExit: () => void
  loading: boolean
  site?: Site
  id?: number | undefined
}

export const SiteEditorForm: FC<SiteEditorFormProps> = props => {
  const { onSave, loading, site, onExit } = props
  const { t } = useTranslation()

  const rule = useCommonFormRules()

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setInitialFieldsValue,
    resetFormFields
  } = useFormUtils()

  useEffect(() => {
    setInitialFieldsValue({ ...site })
  }, [resetFormFields, setInitialFieldsValue, site])

  const onSubmit = (values: Site): void => {
    onSave({ ...values })
    resetFormFlags()
  }

  const headerOptions = <BackButton onClick={onExit} primary={!modified} />

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('site.editor-title')}
        floatingOptions={headerOptions}
        paddedBottom
      >
        <NavigationAlert when={modified} />
        <Form
          name="site-editor-form"
          onFinish={onSubmit}
          form={form}
          layout="vertical"
          onFieldsChange={() => {
            checkFieldsChange()
          }}
        >
          <Form.Item
            name="name"
            label={t('site.field.name')}
            rules={[rule.requiredString(), rule.max(100)]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Form.Item
            name="address"
            label={t('site.field.address')}
            rules={[rule.requiredString(), rule.max(100)]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
            {t('partner.save')}
          </Button>
        </Form>
      </ResponsiveCard>
    </>
  )
}
