/* eslint-disable react/jsx-boolean-value */
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { usePartnerContactModals } from './usePartnerContactModals'
import { Form, Input, Radio, Select } from 'antd'
import { UserType } from 'models/user'
import { useRoleGenerator } from 'hooks/useRoleGenerator'
import { PartnerContactConfig } from 'features/partnerContact/PartnerContactTile'

export interface PartnerContactsParams {
  visible?: boolean
  isNew?: boolean
  partnerContactId?: number
}

export interface PartnerContactEditorProps {
  config: PartnerContactConfig
}

export const PartnerContactEditor: FC<PartnerContactEditorProps> = props => {
  const { canEdit, userType } = props.config
  const { editorModalProps, editingSelf } = usePartnerContactModals({ config: props.config })
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const roleOptions = useRoleGenerator(userType)

  return (
    <>
      <GenericModalForm {...editorModalProps}>
        <Form.Item
          label={t('partner-contact.field.name')}
          name="name"
          rules={[
            rule.requiredString(t('error.validation.common.user-name-required')),
            rule.max(100, t('error.validation.common.user-name-max-length-100'))
          ]}
        >
          <Input disabled={!canEdit} maxLength={100} />
        </Form.Item>

        {!editingSelf && (
          <Form.Item
            name="isActive"
            label={t('user-access.field.status')}
            rules={[rule.required(t('error.validation.partner-contact.is-active-required'))]}
          >
            <Radio.Group disabled={!canEdit} buttonStyle="solid">
              <Radio.Button value="false">{t('user-access.field.status-inactive')}</Radio.Button>
              <Radio.Button value="true">{t('user-access.field.status-active')}</Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}

        <Form.Item
          label={t('partner-contact.field.email')}
          name="email"
          rules={[
            rule.requiredString(t('error.validation.common.email-required')),
            rule.email(),
            rule.max(100, t('error.validation.common.email-max-length-100'))
          ]}
        >
          <Input disabled={!canEdit} maxLength={100} />
        </Form.Item>

        <Form.Item
          label={t('partner-contact.field.phone')}
          name="phone"
          rules={[rule.max(20, t('error.validation.common.phone-max-length-20'))]}
        >
          <Input disabled={!canEdit} maxLength={20} />
        </Form.Item>

        {!editingSelf && (
          <Form.Item
            name="role"
            label={
              userType === UserType.NKM
                ? t('partner-contact.field.role')
                : t('partner-contact.field.type')
            }
            rules={[rule.requiredString(t('error.validation.partner-contact.role-required'))]}
          >
            <Select disabled={!canEdit}>
              {roleOptions?.map((r, i) => (
                <Select.Option key={i} value={r.value as string | number}>
                  {r.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </GenericModalForm>
    </>
  )
}
