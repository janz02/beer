import './ProfilePage.scss'
import { Button, Col, Row } from 'antd'
import Form from 'antd/lib/form/Form'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import React, { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useProfileUtils } from './useProfileUtils'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { ProfileBasics } from './components/ProfileBasics'
import { ProfilePosition } from './components/ProfilePosition'
import { ProfileContacts } from './components/ProfileContacts'
import { useHistory } from 'react-router-dom'

export const ProfilePage: FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { profileId } = useParams<{ profileId: string }>()
  const id = profileId ? +profileId : undefined
  const {
    companies,
    groups,
    jobRoles,
    formUtils,
    submitable,
    modified,
    saving,
    checkFieldsChange,
    handleSave,
    profile,
    isEditMode,
    setEditMode,
    handleCancel
  } = useProfileUtils(id)

  const backButtonProps = useMemo(
    () => ({
      primary: true,
      onClick: () => {
        history.goBack()
      }
    }),
    [history]
  )

  useEffect(() => {
    return () => setEditMode(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ResponsiveCard
      className="profile-editor-card"
      floatingTitle={isEditMode ? t('profile-editor.title.edit') : t('profile-editor.title.view')}
      floatingBackButton={backButtonProps}
    >
      <Form
        name="profile-editor-form"
        layout="vertical"
        form={formUtils.form}
        onFinish={handleSave}
        onFieldsChange={checkFieldsChange}
      >
        <ProfileBasics profile={profile} form={formUtils.form} isEditMode={isEditMode} />

        <Row className="profile-editor-columns" gutter={70}>
          <Col span={12}>
            <ProfilePosition
              companies={companies}
              groups={groups}
              jobRoles={jobRoles}
              isEditMode={isEditMode}
            />
          </Col>
          <Col span={12}>
            <ProfileContacts isEditMode={isEditMode} />
          </Col>
        </Row>

        {isEditMode && (
          <div className="profile-editor-footer">
            <div className="profile-editor-footer-right">
              <Button type="primary" htmlType="submit" disabled={!submitable} loading={saving}>
                {t('profile-editor.button-save')}
              </Button>
            </div>

            <Button type="link" onClick={handleCancel}>
              {t('profile-editor.button-cancel')}
            </Button>
          </div>
        )}
      </Form>
      <NavigationAlert when={modified} />
    </ResponsiveCard>
  )
}
