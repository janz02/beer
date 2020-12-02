import { LoadingOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupEditorUtils } from '../useGroupEditorUtils'

interface GroupPermissionsLayoutProps {
  groupEditorUtils: GroupEditorUtils
}

export const GroupPermissionsLayout: FC<GroupPermissionsLayoutProps> = ({ groupEditorUtils }) => {
  const { isPermissionsLoading, permissions } = groupEditorUtils
  const { t } = useTranslation()
  const permissionsTitle = `${t('organization.groups.permissions')}(${permissions?.length})`

  return isPermissionsLoading ? (
    <div className="center">
      <LoadingOutlined />
    </div>
  ) : (
    <Row>
      {permissionsTitle}
      {permissions?.map(x => x.name)}
    </Row>
  )
}
