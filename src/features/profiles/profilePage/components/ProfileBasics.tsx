import './ProfileBasics.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Col, DatePicker, Form, Input, Row } from 'antd'
import { useCommonFormRules } from 'hooks'
import { PictureUploadButton } from 'components/upload/PictueUploadButton'
import { FileExtension } from 'components/upload/fileUploadHelper'
import { Profile } from 'models/profile'
import { FormInstance } from 'antd/lib/form'

interface ProfileBasicsProps {
  profile?: Profile
  form: FormInstance
  isEditMode: boolean
}

export const ProfileBasics: React.FC<ProfileBasicsProps> = ({ profile, form, isEditMode }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  return (
    <div className="profile-editor-basics-container">
      <div className="profile-editor-basics-picture-container">
        <Form.Item
          name="profilePictureDetails"
          extra={t('profile-editor.picture-help')}
          rules={[rule.fileSize(2), rule.fileImgDimensionsExactMatch({ width: 512, height: 512 })]}
        >
          <PictureUploadButton
            onSuccess={fileDetails => {
              form.setFieldsValue({
                ...form.getFieldsValue(),
                profilePictureDetails: fileDetails
              })

              form.validateFields(['profilePictureDetails'])
            }}
            onRemove={() => {
              form.setFieldsValue({
                ...form.getFieldsValue(),
                profilePictureDetails: undefined
              })

              form.validateFields(['profilePictureDetails'])
            }}
            initialFileId={profile?.profilePictureId}
            allowedExtensions={[FileExtension.JPG, FileExtension.PNG]}
          />
        </Form.Item>
      </div>
      <div className="profile-editor-basics-controls-container">
        <Row gutter={50}>
          <Col span={12}>
            <Form.Item name="name" label={t('profile-editor.name')}>
              <Input maxLength={100} disabled={!isEditMode} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={70}>
          <Col span={9}>
            <Form.Item name="birthDay" label={t('profile-editor.birthday')}>
              <DatePicker disabled={!isEditMode} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('profile-editor.username')}>{profile?.userName}</Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item name="email" label={t('profile-editor.email')}>
              <Input maxLength={60} disabled />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  )
}
