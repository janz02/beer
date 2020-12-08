import { DisconnectOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'
import { LoadingIndicator } from 'components/loading/LoadingIndicator'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupEditorUtils } from '../useGroupEditorUtils'
import styles from './GroupPermissionsLayout.module.scss'
interface GroupPermissionsLayoutProps {
  groupEditorUtils: GroupEditorUtils
}

export const GroupPermissionsLayout: FC<GroupPermissionsLayoutProps> = ({ groupEditorUtils }) => {
  const {
    isPermissionsLoading,
    permissions,
    permissionTotalCount,
    permissionIdToUnassign,
    isUnassignPermissionPopupVisible,
    handleUnassignPermission,
    handleUnassignPermissionApprove,
    handleUnassignPermissionCancel
  } = groupEditorUtils
  const { t } = useTranslation()

  return (
    <ResponsiveCard
      className={styles.list}
      width="full"
      floatingTitle={t('organization.groups.permissions', {
        totalCount: permissionTotalCount
      })}
    >
      <LoadingIndicator isLoading={isPermissionsLoading}>
        <Row>
          {(permissions && permissions?.length > 4 ? permissions?.slice(0, 4) : permissions)?.map(
            x => (
              <Col span="5" key={x.id}>
                <div className={styles.item}>
                  <Typography.Text className={styles.name}>{x?.name}</Typography.Text>
                  <Button
                    type="primary"
                    icon={<DisconnectOutlined />}
                    className={styles.unassignBtn}
                    size="small"
                    onClick={() => {
                      handleUnassignPermission(x.id)
                    }}
                  />
                </div>
              </Col>
            )
          )}

          {permissionTotalCount && permissionTotalCount > 4 ? (
            <Col span="1" className={styles.more}>
              <span>{permissionTotalCount - 4}+</span>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </LoadingIndicator>
      <GenericPopup
        id={permissionIdToUnassign}
        type="unassign"
        visible={isUnassignPermissionPopupVisible}
        onOkAction={() => handleUnassignPermissionApprove()}
        onCancel={() => handleUnassignPermissionCancel()}
      />
    </ResponsiveCard>
  )
}
