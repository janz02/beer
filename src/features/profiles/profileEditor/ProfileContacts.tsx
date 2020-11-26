import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'
import { useCommonFormRules } from 'hooks'
import { ProfileEditorPageUtils } from './ProfileEditorUtils'

interface ProfileContactsProps {
  profileEditorPageUtils: ProfileEditorPageUtils
}

export const ProfileContacts: React.FC<ProfileContactsProps> = props => {
  const { t } = useTranslation()
  // const rule = useCommonFormRules()

  return (
    <>
      <h2>{t('profile-editor.contacts')}</h2>
      <Form.Item
        name="phoneNumber"
        label={t('profile-editor.phone')}
        // rules={[
        //   rule.requiredString(t('error.validation.segmentation-editor.name-required')),
        //   rule.max(60, t('error.validation.segmentation-editor.name-max-length-60'))
        // ]}
      >
        <Input maxLength={60} />
      </Form.Item>
    </>
  )
}
