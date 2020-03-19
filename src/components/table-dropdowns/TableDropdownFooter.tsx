import React, { FC } from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { useTranslation } from 'react-i18next'

export const TableDropdownFooter: FC<FilterDropdownProps> = props => {
  const { confirm, clearFilters } = props
  const { t } = useTranslation()
  return (
    <div className="ant-table-filter-dropdown-btns">
      <Button type="link" onClick={confirm} icon={<SearchOutlined />} size="small">
        {t('common.search')}
      </Button>
      <Button type="link" onClick={clearFilters} size="small">
        {t('common.reset')}
      </Button>
    </div>
  )
}
