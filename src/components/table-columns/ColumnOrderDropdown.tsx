import React from 'react'
import { Dropdown } from 'antd'
import { ColumOrderLayout } from './ColumnOrderLayout'
import { UseColumnOrderFeatures } from './useColumnOrder'
import { useTranslation } from 'react-i18next'
import { DownOutlined } from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'

export const ColumnOrderDropdown: <T>(
  p: UseColumnOrderFeatures<T>
) => React.ReactElement<UseColumnOrderFeatures<T>> = props => {
  const { t } = useTranslation()

  const { changeVisibility, visible } = props

  return (
    <Dropdown
      overlay={<ColumOrderLayout {...props} />}
      trigger={['click']}
      visible={visible}
      onVisibleChange={() => changeVisibility()}
    >
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <Text style={{ fontWeight: 600 }}>
          {t('column-order.dropdown.link')}
          <DownOutlined style={{ marginLeft: '0.5em' }} />
        </Text>
      </a>
    </Dropdown>
  )
}
