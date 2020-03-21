import React, { FC, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useTranslation } from 'react-i18next'
import { Site } from 'models/site'
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
    setFieldsValue,
    resetFormFields
  } = useFormUtils()

  useEffect(() => {
    setFieldsValue({ ...site })
  }, [resetFormFields, setFieldsValue, site])

  const onSubmit = (values: Site): void => {
    onSave({ ...values })
    resetFormFlags()
  }

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('site.editor-title')}
        floatingBackButton={{ onClick: onExit, primary: !modified }}
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
