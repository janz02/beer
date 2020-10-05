import React, { FC } from 'react'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { DatePicker } from 'antd'
import { TableDropdownFooter } from './TableDropdownFooter'
import './DateRangePickerTableDropdown.scss'
const { RangePicker } = DatePicker

export const DateRangePickerTableDropdown: FC<FilterDropdownProps> = props => {
  const { setSelectedKeys, selectedKeys } = props

  return (
    <div className="rangepicker-table-dropdown">
      <div className="date-input-container">
        <RangePicker
          onChange={(e: any) => setSelectedKeys([e || undefined])}
          value={(selectedKeys[0] as any) || null}
        />
      </div>

      <TableDropdownFooter {...props} />
    </div>
  )
}
