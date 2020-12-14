import './ProfilePage.scss'
import Form from 'antd/lib/form/Form'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import React, { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useProfileUtils } from './useProfileUtils'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useHistory } from 'react-router-dom'
import { ProfilePageEdit } from './components/ProfilePageEdit'
import { ProfilePageView } from './components/ProfilePageView'

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
        {isEditMode && (
          <ProfilePageEdit
            companies={companies}
            groups={groups}
            jobRoles={jobRoles}
            formUtils={formUtils}
            submitable={submitable}
            saving={saving}
            handleCancel={handleCancel}
            profile={profile}
          />
        )}
        {!isEditMode && (
          <ProfilePageView
            companies={companies}
            groups={groups}
            jobRoles={jobRoles}
            profile={profile}
          />
        )}
      </Form>
      <NavigationAlert when={modified} />
    </ResponsiveCard>
  )
}
