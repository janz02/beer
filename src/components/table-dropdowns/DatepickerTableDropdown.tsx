import React, { FC } from 'react'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { DatePicker } from 'antd'
import { TableDropdownFooter } from './TableDropdownFooter'
import './DatepickerTableDropdown.scss'

export const DatepickerTableDropdown: FC<FilterDropdownProps> = props => {
  const { setSelectedKeys, selectedKeys } = props

  return (
    <div className="datepicker-table-dropdown">
      <div className="date-input-container">
        <DatePicker
          onChange={(e: any) => setSelectedKeys([e || undefined])}
          value={(selectedKeys[0] as any) || null}
        />
      </div>

      <TableDropdownFooter {...props} />
    </div>
  )
}
