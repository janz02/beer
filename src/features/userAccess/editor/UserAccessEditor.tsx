import React, { FC } from 'react'
import { Status, UserType } from 'models/user'
import { useTranslation } from 'react-i18next'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Form, Select, Radio } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useUserAccessEditor } from './useUserAccessEditor'
import Typography from 'antd/lib/typography'

const { Text } = Typography

export const UserAccessEditor: FC = () => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const { editorFormModalProps, roleOptions, editedUserType, editedUser } = useUserAccessEditor()

  return (
    <GenericModalForm {...editorFormModalProps}>
      <Form.Item label={t('user-access.field.username')}>
        <Text>{editedUser?.name}</Text>
      </Form.Item>

      <Form.Item
        name="role"
        label={
          editedUserType === UserType.NKM
            ? t('user-access.field.role')
            : t('user-access.field.partner-contact-type')
        }
        rules={[rule.requiredString(t('error.validation.partner-contact.role-required'))]}
      >
        <Select>
          {roleOptions?.map((r, i) => (
            <Select.Option key={i} value={r.value.toString()}>
              {r.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label={t('user-access.field.status')}
        rules={[rule.requiredString(t('error.validation.partner-contact.is-active-required'))]}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={Status.INACTIVE}>
            {t('user-access.field.status-inactive')}
          </Radio.Button>
          <Radio.Button value={Status.ACTIVE}>{t('user-access.field.status-active')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </GenericModalForm>
  )
}
