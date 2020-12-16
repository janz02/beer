import './ProfilePage.scss'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import React, { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useProfileUtils } from './useProfileUtils'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useHistory } from 'react-router-dom'
import { ProfilePageEdit } from './components/ProfilePageEdit'
import { ProfilePageView } from './components/ProfilePageView'
import { Button, Dropdown, Empty, Form, Menu, Skeleton } from 'antd'
import { EditFilled, EllipsisOutlined, LockOutlined } from '@ant-design/icons'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

export const ProfilePage: FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { profileId } = useParams<{ profileId: string }>()
  const id = profileId ? +profileId : 1 // TODO: default id set to own user id for /me page
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
    handleCancel,
    profilePictureUrl,
    isOwnProfile,
    loading,
    activityTableUtils,
    error
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
      floatingBackButton={!isOwnProfile ? backButtonProps : undefined}
      floatingOptions={
        <>
          {!isEditMode && (
            <>
              <Button
                icon={<EditFilled />}
                type="primary"
                onClick={() => {
                  if (isEditMode) {
                    handleCancel()
                  } else {
                    setEditMode(true)
                  }
                }}
              />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key="change_password"
                      icon={<LockOutlined />}
                      onClick={() => console.log('change password')}
                    >
                      {t('profile-editor.change-password')}
                    </Menu.Item>
                    <Menu.Item
                      key="reset_password"
                      icon={<LockOutlined />}
                      onClick={() => console.log('reset password')}
                    >
                      {t('profile-editor.reset-password')}
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button icon={<EllipsisOutlined rotate={90} />} type="primary" />
              </Dropdown>
            </>
          )}
        </>
      }
    >
      <Form
        name="profile-editor-form"
        layout="vertical"
        form={formUtils.form}
        onFinish={handleSave}
        onFieldsChange={checkFieldsChange}
      >
        {loading && (
          <>
            <Skeleton.Avatar active size={200} shape="square" />
            <Skeleton active />
          </>
        )}

        {!loading && error && <Empty />}

        {isEditMode && !loading && !error && (
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
        {!isEditMode && !loading && !error && (
          <ProfilePageView
            companies={companies}
            groups={groups}
            jobRoles={jobRoles}
            profile={profile}
            profilePictureUrl={profilePictureUrl}
          />
        )}
      </Form>

      {!isEditMode && !isOwnProfile && !loading && !error && (
        <ResponsiveTable selectable={false} {...activityTableUtils} />
      )}

      <NavigationAlert when={modified} />
    </ResponsiveCard>
  )
}
