import React, { FC, useEffect, useMemo } from 'react'
import { Row, Col, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { history } from 'router/router'
import { useGroupEditorUtils } from './useGroupEditorUtils'
import { GroupProfilesLayout } from './components/GroupProfilesLayout'
import { GroupPermissionsLayout } from './components/GroupPermissionsLayout'

import { MomentDisplay } from 'components/MomentDisplay'
import { LoadingIndicator } from 'components/loading/LoadingIndicator'
import './GroupViewPage.scss'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { EditButton } from 'components/buttons/EditButton'

export const GroupViewPage: FC<void> = () => {
  const { t } = useTranslation()
  const groupEditorUtils = useGroupEditorUtils()
  const { group, isLoading, isEditorUser, getGroupDetails } = groupEditorUtils

  useEffect(() => {
    getGroupDetails()
  }, [getGroupDetails])

  const cardHeaderActions = useMemo(
    () => (
      <>
        {isEditorUser && (
          <EditButton onClick={() => history.push(`/organization/groups/${group?.id}/edit`)}>
            {t('organization.groups.viewer.edit')}
          </EditButton>
        )}
      </>
    ),
    [t, group, isEditorUser]
  )

  const backButtonProps = useMemo(
    () => ({
      primary: true,
      onClick: () => {
        history.push('/organization/groups')
      }
    }),
    []
  )

  return (
    <ResponsiveCard
      className="group-editor-card"
      floatingTitle={t('organization.groups.viewer.title')}
      floatingBackButton={backButtonProps}
      floatingOptions={cardHeaderActions}
    >
      <Form layout="vertical">
        <LoadingIndicator isLoading={isLoading}>
          <Row>
            <Col span="6">
              <Form.Item
                className="group-editor-form__name"
                label={t('organization.groups.fields.name')}
              >
                {group?.name}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="4">
              <Form.Item label={t('organization.groups.fields.created-date')}>
                <MomentDisplay date={group?.createdDate} />
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item label={t('organization.groups.fields.created-by')}>
                {group?.createdBy}
              </Form.Item>
            </Col>
          </Row>
          <GroupPermissionsLayout groupEditorUtils={groupEditorUtils} />
          <GroupProfilesLayout groupEditorUtils={groupEditorUtils} />
        </LoadingIndicator>
      </Form>
    </ResponsiveCard>
  )
}
