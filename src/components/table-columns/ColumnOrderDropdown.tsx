import React from 'react'
import { Dropdown, Button } from 'antd'
import { ColumOrderLayout } from './ColumnOrderLayout'
import { ColumnOrderUtils } from './useColumnOrderUtils'
import { useTranslation } from 'react-i18next'
import { DownOutlined } from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
import styles from './ColumnOrderDropdown.module.scss'

export const ColumnOrderDropdown: <T>(
  p: ColumnOrderUtils<T>
) => React.ReactElement<ColumnOrderUtils<T>> = props => {
  const { t } = useTranslation()

  return (
    <Dropdown
      overlay={<ColumOrderLayout {...props} />}
      trigger={['click']}
      visible={props.visible}
      onVisibleChange={props.handleChangeVisibility}
    >
      <Button type="link">
        <Text className={styles.text}>
          {t('column-order.dropdown.link')}
          <DownOutlined style={{ marginLeft: '0.5em' }} />
        </Text>
      </Button>
    </Dropdown>
  )
}
