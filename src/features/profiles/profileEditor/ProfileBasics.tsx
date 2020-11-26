import React from 'react'
import { useTranslation } from 'react-i18next'
import { Col, DatePicker, Form, Input, Row } from 'antd'
import { useCommonFormRules } from 'hooks'
import { ProfileEditorPageUtils } from './ProfileEditorUtils'

interface ProfileBasicsProps {
  profileEditorPageUtils: ProfileEditorPageUtils
}

export const ProfileBasics: React.FC<ProfileBasicsProps> = props => {
  const { t } = useTranslation()
  // const rule = useCommonFormRules()
  const { profile } = props.profileEditorPageUtils

  return (
    <>
      <Row gutter={50}>
        <Col span={12}>
          <Form.Item
            name="name"
            label={t('profile-editor.name')}
            // rules={[
            //   rule.requiredString(t('error.validation.segmentation-editor.name-required')),
            //   rule.max(60, t('error.validation.segmentation-editor.name-max-length-60'))
            // ]}
          >
            <Input maxLength={60} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={70}>
        <Col span={9}>
          <Form.Item name="birthDay" label={t('profile-editor.birthday')}>
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={t('profile-editor.username')}>{profile?.userName}</Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item name="email" label={t('profile-editor.email')}>
            <Input maxLength={60} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
