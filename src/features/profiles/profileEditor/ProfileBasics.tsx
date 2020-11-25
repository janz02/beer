import React from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Form, Input, Row } from 'antd'
import { useCommonFormRules } from 'hooks'

interface ProfileBasicsProps {}

export const ProfileBasics: React.FC<ProfileBasicsProps> = props => {
  const { t } = useTranslation()
  // const rule = useCommonFormRules()
  // const { categories } = props.segmentationEditorUtils

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
        <Col span={7}>
          <Form.Item name="birthday" label={t('profile-editor.birthday')}>
            <Input maxLength={60} />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label={t('profile-editor.username')}>username</Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="email" label={t('profile-editor.email')}>
            <Input maxLength={60} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
