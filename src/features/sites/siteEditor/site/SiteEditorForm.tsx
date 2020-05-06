import React, { FC, useEffect, useMemo } from 'react'
import { Form, Input, Button } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useTranslation } from 'react-i18next'
import { Site } from 'models/site'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'
import {
  EditorMode,
  EditorModeOptions,
  EditorModeOptionsProps
} from 'components/buttons/EditorModeOptions'
import { useSiteEditorForm } from './useSiteEditorForm'

export interface SiteEditorFormProps {
  mode: EditorMode
  title: string
  options: EditorModeOptionsProps
  onSave: (values: Site) => void
  onExit: () => void
  loading: boolean
  site?: Site
  id?: number | undefined
}

export const SiteEditorForm: FC = () => {
  const { t } = useTranslation()

  const { siteEditorFormProps, handleGetSite, handleResetSite } = useSiteEditorForm()
  const { onSave, loading, site, onExit, title, options, mode } = siteEditorFormProps

  useEffect(() => {
    handleGetSite()
    return () => {
      handleResetSite()
    }
  }, [handleGetSite, handleResetSite])
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
    if (mode === EditorMode.VIEW) {
      setFieldsValue({ ...site })
      resetFormFlags()
    }
  }, [mode, resetFormFields, resetFormFlags, setFieldsValue, site])

  const onSubmit = (values: Site): void => {
    onSave({ ...values })
    resetFormFlags()
  }

  const view = useMemo(() => mode === EditorMode.VIEW, [mode])

  const editorOptions = <EditorModeOptions {...options} />

  return (
    <>
      <ResponsiveCard
        floatingTitle={title}
        floatingOptions={editorOptions}
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
            rules={[
              rule.requiredString(t('error.validation.site.name-required')),
              rule.max(100, t('error.validation.site.name-max-length-100'))
            ]}
          >
            <Input disabled={view} maxLength={100} />
          </Form.Item>

          <Form.Item
            name="address"
            label={t('site.field.address')}
            rules={[
              rule.requiredString(t('error.validation.site.address-required')),
              rule.max(100, t('error.validation.site.address-max-length-100'))
            ]}
          >
            <Input disabled={view} maxLength={100} />
          </Form.Item>

          <Button
            hidden={view}
            type="primary"
            htmlType="submit"
            disabled={!submitable}
            loading={loading}
          >
            {t('common.save')}
          </Button>
        </Form>
      </ResponsiveCard>
    </>
  )
}
