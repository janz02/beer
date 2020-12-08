import './ProfileEditorPage.scss'
import { Button, Col, Row } from 'antd'
import Form from 'antd/lib/form/Form'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProfileBasics } from './ProfileBasics'
import { ProfilePosition } from './ProfilePosition'
import { ProfileContacts } from './ProfileContacts'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useProfileEditorPageUtils } from './ProfileEditorUtils'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { history } from 'router/router'

export const ProfileEditorPage: FC = () => {
  const { t } = useTranslation()
  const { profileId } = useParams<{ profileId: string }>()
  const id = profileId ? +profileId : undefined
  const profileEditorPageUtils = useProfileEditorPageUtils(id)
  const {
    submitable,
    modified,
    saving,
    checkFieldsChange,
    resetFormFlags,
    handleSave
  } = profileEditorPageUtils

  const backButtonProps = useMemo(
    () => ({
      primary: true,
      onClick: () => {
        history.goBack()
      }
    }),
    []
  )

  return (
    <ResponsiveCard
      className="profile-editor-card"
      floatingTitle={t('profile-editor.title')}
      floatingBackButton={backButtonProps}
    >
      <Form
        name="profile-editor-form"
        layout="vertical"
        form={profileEditorPageUtils.formUtils.form}
        onFinish={handleSave}
        onFieldsChange={checkFieldsChange}
      >
        <ProfileBasics profileEditorPageUtils={profileEditorPageUtils} />

        <Row className="profile-editor-columns" gutter={70}>
          <Col span={12}>
            <ProfilePosition profileEditorPageUtils={profileEditorPageUtils} />
          </Col>
          <Col span={12}>
            <ProfileContacts />
          </Col>
        </Row>

        <div className="profile-editor-footer">
          <div className="profile-editor-footer-right">
            <Button type="primary" htmlType="submit" disabled={!submitable} loading={saving}>
              {t('profile-editor.button-save')}
            </Button>
          </div>

          <Button
            type="link"
            onClick={() => {
              resetFormFlags()
              history.push('/profiles')
            }}
          >
            {t('profile-editor.button-cancel')}
          </Button>
        </div>
      </Form>
      <NavigationAlert when={modified} />
    </ResponsiveCard>
  )
}
