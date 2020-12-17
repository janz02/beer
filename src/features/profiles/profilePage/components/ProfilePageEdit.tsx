import React, { FC } from 'react'
import { Button, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProfileBasics } from './ProfileBasics'
import { ProfileContacts } from './ProfileContacts'
import { ProfilePosition } from './ProfilePosition'
import { ProfileUtils } from '../useProfileUtils'

export const ProfilePageEdit: FC<Partial<ProfileUtils>> = ({
  profile,
  formUtils,
  companies,
  groups,
  jobRoles,
  submitable,
  isSaving,
  handleCancel
}) => {
  const { t } = useTranslation()
  return (
    <>
      <ProfileBasics profile={profile} formUtils={formUtils} />

      <Row className="profile-editor-columns" gutter={70}>
        <Col span={12}>
          <ProfilePosition companies={companies} groups={groups} jobRoles={jobRoles} />
        </Col>
        <Col span={12}>
          <ProfileContacts />
        </Col>
      </Row>

      <div className="profile-editor-footer">
        <div className="profile-editor-footer-right">
          <Button type="primary" htmlType="submit" disabled={!submitable} loading={isSaving}>
            {t('profile-editor.button-save')}
          </Button>
        </div>

        <Button type="link" onClick={handleCancel}>
          {t('profile-editor.button-cancel')}
        </Button>
      </div>
    </>
  )
}
