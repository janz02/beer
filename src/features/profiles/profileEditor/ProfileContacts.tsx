import './ProfileContacts.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'
import { useCommonFormRules } from 'hooks'

export const ProfileContacts: React.FC = () => {
  const { t } = useTranslation()
  const rules = useCommonFormRules()

  return (
    <>
      <h2>{t('profile-editor.contacts')}</h2>
      <Form.Item htmlFor="phoneNumberWithoutCountry" label={t('profile-editor.phone')}>
        <div className="profile-editor-phone-container">
          <div className="profile-editor-phone-country">+36</div>
          <Form.Item name="phoneNumberWithoutCountry" rules={[rules.phoneNumber()]} noStyle>
            <Input maxLength={60} />
          </Form.Item>
        </div>
      </Form.Item>
    </>
  )
}
