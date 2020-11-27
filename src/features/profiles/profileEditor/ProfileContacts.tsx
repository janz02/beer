import './ProfileContacts.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'

export const ProfileContacts: React.FC = () => {
  const { t } = useTranslation()

  const phoneRule = {
    pattern: new RegExp('^\\d*$'),
    message: t('error.common.field-number')
  }

  return (
    <>
      <h2>{t('profile-editor.contacts')}</h2>
      <Form.Item label={t('profile-editor.phone')}>
        <div className="profile-editor-phone-container">
          <div className="profile-editor-phone-country">+36</div>
          <Form.Item name="phoneNumberWithoutCountry" rules={[phoneRule]} noStyle>
            <Input maxLength={60} />
          </Form.Item>
        </div>
      </Form.Item>
    </>
  )
}
