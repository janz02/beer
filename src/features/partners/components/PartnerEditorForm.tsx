import React, { useEffect, useMemo } from 'react'
import { Form, Input, Button, Switch, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { Partner } from 'models/partner'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'
import { BackButtonProps } from 'components/buttons/BackButton'
import { PartnerState } from 'api/swagger/models'
import { EditorMode } from 'components/buttons/EditorModeOptions'

export interface PartnerEditorFormProps {
  mode: EditorMode
  loading: boolean
  title: string
  partner?: Partner
  handleBack?: () => void
  options?: JSX.Element
  handleSave: (values: Partner) => void
}

export const PartnerEditorForm: React.FC<PartnerEditorFormProps> = props => {
  const { title, handleBack, handleSave, loading, partner, mode, options } = props
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
        ...partner,
        differentMailingAddress: partner?.address !== partner?.mailingAddress
      })
      resetFormFlags()
    }
  }, [mode, partner, resetFormFlags, setFieldsValue])

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
        name="partner-editor-form"
        onFinish={handleSubmit}
        form={form}
        layout={formLayout}
        onFieldsChange={() => {
          checkFieldsChange()
        }}
      >
        <Form.Item
          name="name"
          label={t('partner.field.name')}
          rules={[rule.requiredString(), rule.max(150)]}
          {...formItemLayout}
        >
          <Input disabled={view} />
        </Form.Item>

        <Form.Item
          name="majorPartner"
          valuePropName="checked"
          label={t('partner.field.major-partner')}
          {...formItemLayout}
        >
          <Switch disabled />
        </Form.Item>

        <Form.Item name="partnerState" label={t('partner.field.partner-state')} {...formItemLayout}>
          <Select disabled>
            {Object.keys(PartnerState).map(s => (
              <Select.Option key={s} value={s}>
                {t(`partner.partner-state.${s?.toLowerCase()}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label={t('partner.field.address')}
          rules={[rule.requiredString(), rule.max(150)]}
          {...formItemLayout}
        >
          <Input
            disabled={view}
            onChange={() => {
              if (!getFieldValue('differentMailingAddress')) {
                setFieldsValue({ mailingAddress: getFieldValue('address') })
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="differentMailingAddress"
          valuePropName="checked"
          label={t('partner.field.different-address')}
          {...formItemLayout}
        >
          <Switch
            disabled={view}
            onChange={checked => {
              setFieldsValue({ mailingAddress: checked ? '' : getFieldValue('address') })
            }}
          />
        </Form.Item>

        <Form.Item
          name="mailingAddress"
          label={t('partner.field.mailing-address')}
          rules={[rule.requiredString(), rule.max(150)]}
          {...formItemLayout}
        >
          <Input
            disabled={view}
            onChange={() => {
              setFieldsValue({
                differentMailingAddress:
                  getFieldValue('address') !== getFieldValue('mailingAddress')
              })
            }}
          />
        </Form.Item>

        <Form.Item
          name="registrationNumber"
          label={t('partner.field.registration-number')}
          rules={[rule.requiredString(), rule.max(20)]}
          {...formItemLayout}
        >
          <Input disabled={view} placeholder="12345678" />
        </Form.Item>

        <Form.Item
          name="taxNumber"
          label={t('partner.field.tax-number')}
          rules={[rule.requiredString(), rule.max(20)]}
          {...formItemLayout}
        >
          <Input disabled={view} />
        </Form.Item>

        <Form.Item
          name="bankAccount"
          label={t('partner.field.bank-account')}
          rules={[rule.requiredString(), rule.max(26)]}
          {...formItemLayout}
        >
          <Input disabled={view} placeholder="12345678-12345678-12345678" />
        </Form.Item>

        <Form.Item
          name="registrationAllowed"
          label={t('partner.field.registration-allowed')}
          rules={[rule.requiredString(), rule.max(30)]}
          {...formItemLayout}
        >
          <Input disabled={view} />
        </Form.Item>

        <Form.Item name="registerCode" label={t('partner.field.register-code')} {...formItemLayout}>
          <Input disabled />
        </Form.Item>

        <Button
          hidden={mode === EditorMode.VIEW}
          type="primary"
          htmlType="submit"
          disabled={!submitable}
          loading={loading}
        >
          {t('partner.save')}
        </Button>
      </Form>
    </ResponsiveCard>
  )
}
