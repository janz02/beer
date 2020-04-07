import React, { FC } from 'react'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { Calendar } from 'antd'
import { TableDropdownFooter } from './TableDropdownFooter'

export const DatepickerTableDropdown: FC<FilterDropdownProps> = props => {
  const { setSelectedKeys, selectedKeys } = props

  return (
    <div>
      <Calendar
        fullscreen={false}
        onSelect={(e: any) => setSelectedKeys([e])}
        value={selectedKeys[0] as any}
      />
      <TableDropdownFooter {...props} />
    </div>
  )
}
