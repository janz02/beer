import { DisconnectOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'
import { LoadingIndicator } from 'components/loading/LoadingIndicator'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupEditorUtils } from '../useGroupEditorUtils'

interface GroupPermissionsLayoutProps {
  groupEditorUtils: GroupEditorUtils
}

export const GroupPermissionsLayout: FC<GroupPermissionsLayoutProps> = ({ groupEditorUtils }) => {
  const {
    isPermissionsLoading,
    permissions,
    permissionTotalCount,
    handleUnassignPermission
  } = groupEditorUtils
  const { t } = useTranslation()

  return (
    <ResponsiveCard
      className="group-editor-form__permissions-list"
      width="full"
      floatingTitle={t('organization.groups.permissions', {
        totalCount: permissionTotalCount
      })}
    >
      <LoadingIndicator isLoading={isPermissionsLoading}>
        <Row className="group-editor-form__permissions-row">
          {(permissions && permissions?.length > 4 ? permissions?.slice(0, 4) : permissions)?.map(
            x => (
              <Col span="5" key={x.id}>
                <div className="group-editor-form__permissions-item">
                  <Typography.Text> {x?.name}</Typography.Text>
                  <div>
                    <Button
                      type="primary"
                      icon={<DisconnectOutlined />}
                      size="small"
                      onClick={() => {
                        handleUnassignPermission(x.id)
                      }}
                    />
                  </div>
                </div>
              </Col>
            )
          )}

          {permissionTotalCount && permissionTotalCount > 4 ? (
            <Col span="1" className="group-editor-form__permissions-more">
              <span>{permissionTotalCount - 4}+</span>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </LoadingIndicator>
    </ResponsiveCard>
  )
}
