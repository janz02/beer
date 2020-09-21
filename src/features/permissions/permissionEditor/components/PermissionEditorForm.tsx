import React, { useEffect, useMemo } from 'react'
import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { CampaignPermission } from 'models/campaignPermission'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'
import { BackButtonProps } from 'components/buttons/BackButton'
import { EditorMode } from 'components/buttons/EditorModeOptions'

export interface PermissionEditorFormProps {
  mode: EditorMode
  loading: boolean
  title: string
  permission?: CampaignPermission
  handleBack?: () => void
  options?: JSX.Element
  handleSave: (values: CampaignPermission) => void
}

export const PermissionEditorForm: React.FC<PermissionEditorFormProps> = props => {
  const { title, handleBack, handleSave, loading, permission, mode, options } = props
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const isMobile = useIsMobile()

  const view = useMemo(() => mode === EditorMode.VIEW, [mode])

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue,
    getFieldValue
  } = useFormUtils()

  const formLayout = isMobile ? 'vertical' : 'horizontal'
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 }
        }
      : null

  const handleSubmit = (values: any): void => {
    handleSave(values)
    resetFormFlags()
  }

  useEffect(() => {
    if (mode === EditorMode.VIEW) {
      setFieldsValue({
        ...permission
      })
      resetFormFlags()
    }
  }, [mode, permission, resetFormFlags, setFieldsValue])

  const backButtonProps: BackButtonProps | undefined = handleBack
    ? { primary: !modified, onClick: handleBack, label: t('common.go-back-to-list') }
    : undefined

  return (
    <ResponsiveCard
      floatingTitle={title}
      floatingOptions={options}
      floatingBackButton={backButtonProps}
    >
      <NavigationAlert when={modified && mode === EditorMode.EDIT} />
      <Form
        name="permission-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout={formLayout}
        onFieldsChange={() => {
          checkFieldsChange()
        }}
      >
        <Form.Item
          name="name"
          label={t('permission.field.name')}
          rules={[
            rule.requiredString(t('error.validation.permission.name-required')),
            rule.max(150, t('error.validation.permission.name-max-length-150'))
          ]}
          {...formItemLayout}
        >
          <Input disabled={view} />
        </Form.Item>
        <Button
          hidden={mode === EditorMode.VIEW}
          type="primary"
          htmlType="submit"
          disabled={!submitable}
          loading={loading}
        >
          {mode === EditorMode.NEW ? t('permission.editor.create') : t('permission.editor.modify')}
        </Button>
      </Form>
    </ResponsiveCard>
  )
}
