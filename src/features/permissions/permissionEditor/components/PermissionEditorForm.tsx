import './PermissionEditorForm.scss'

import React, { useEffect, useMemo } from 'react'
import { Form, Input, Button, Collapse, List } from 'antd'
import { useTranslation } from 'react-i18next'
import { CampaignPermission } from 'models/campaignPermission'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'
import { BackButtonProps } from 'components/buttons/BackButton'
import { EditorMode } from 'components/buttons/EditorModeOptions'
import { CampaignFunctionPermission } from 'models/campaignFunctionPermission'
import { CampaignAdGroup } from 'models/campaignAdGroup'
import { CampaignUser } from 'models/campaignUser'

export interface PermissionEditorFormProps {
  mode: EditorMode
  loading: boolean
  title: string
  permission?: CampaignPermission
  campaignUsers?: CampaignUser[]
  campaignAdGroups?: CampaignAdGroup[]
  campaignFunctionPermissions?: CampaignFunctionPermission[]
  handleBack?: () => void
  options?: JSX.Element
  handleSave: (values: CampaignPermission) => void
}

export const PermissionEditorForm: React.FC<PermissionEditorFormProps> = props => {
  const {
    title,
    handleBack,
    handleSave,
    loading,
    permission,
    mode,
    options,
    campaignUsers,
    campaignAdGroups,
    campaignFunctionPermissions
  } = props
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const isMobile = useIsMobile()

  const isInViewMode = useMemo(() => mode === EditorMode.VIEW, [mode])

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue
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
    if (isInViewMode) {
      setFieldsValue({
        ...permission
      })
      resetFormFlags()
    }
  }, [isInViewMode, permission, resetFormFlags, setFieldsValue])

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
        className="permission-editor-form"
        name="permission-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout={formLayout}
        onFieldsChange={checkFieldsChange}
      >
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('permission.categories.basics')} key="1">
            <Form.Item
              name="name"
              label={t('permission.field.name')}
              rules={[
                rule.requiredString(t('error.validation.permission.name-required')),
                rule.max(500, t('error.validation.permission.name-max-length-500'))
              ]}
              {...formItemLayout}
            >
              <Input disabled={isInViewMode} />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>

        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('permission.categories.function-permissions')} key="0">
            <List
              dataSource={campaignFunctionPermissions}
              renderItem={item => <List.Item>{item.name}</List.Item>}
            />
          </Collapse.Panel>
        </Collapse>

        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('permission.categories.groups')} key="0">
            <List
              dataSource={campaignAdGroups}
              renderItem={item => <List.Item>{item.name}</List.Item>}
            />
          </Collapse.Panel>
        </Collapse>

        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('permission.categories.users')} key="0">
            <List
              dataSource={campaignUsers}
              renderItem={item => <List.Item>{item.name}</List.Item>}
            />
          </Collapse.Panel>
        </Collapse>

        <Button
          hidden={isInViewMode}
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
