import React, { FC } from 'react'
import { Button, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BackButton } from 'components/buttons/BackButton'
import { history } from 'router/router'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import { useGroupEditorUtils } from './useGroupEditorUtils'
import { LoadingOutlined } from '@ant-design/icons'
import { GroupProfilesLayout } from './components/GroupProfilesLayout'
import { GroupPermissionsLayout } from './components/GroupPermissionsLayoutt'

import { MomentDisplay } from 'components/MomentDisplay'

export const GroupViewPage: FC<void> = () => {
  const { t } = useTranslation()
  const groupEditorUtils = useGroupEditorUtils()
  const { group, isLoading, isEditorUser } = groupEditorUtils

  const groupActionButtons = (
    <div className="group-editor-form__actions">
      {isEditorUser && (
        <>
          {group && (
            <Button type="primary" htmlType="button">
              <Link to={`/organization/group/${group?.id}/edit`}>
                {t('organization.groups.edit')}
              </Link>
            </Button>
          )}
        </>
      )}
      <BackButton onClick={() => history.push('/organization/group')} />
    </div>
  )

  return (
    <>
      <Row>
        <Col>
          <ResponsiveHeader
            type="floating"
            title={t('organization.groups.editor-title')}
            options={groupActionButtons}
          />
        </Col>
      </Row>
      {isLoading ? (
        <div className="center">
          <LoadingOutlined />{' '}
        </div>
      ) : (
        <>
          <Row>
            <label>{t('organization.groups.fields.name')}</label>
            <div>{group?.name}</div>
          </Row>
          <Row>
            <Col span="4">
              <div>
                <label>{t('organization.groups.fields.created-date')}</label>
                <MomentDisplay date={group?.createdDate} />
              </div>
            </Col>
            <Col span="6">
              <div>
                <label>{t('organization.groups.fields.created-by')}</label>
                <div>{group?.createdBy}</div>
              </div>
            </Col>
          </Row>
          <GroupPermissionsLayout groupEditorUtils={groupEditorUtils} />
          <GroupProfilesLayout groupEditorUtils={groupEditorUtils} />
        </>
      )}
    </>
  )
}
