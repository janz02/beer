import React, { FC, useRef, useEffect } from 'react'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { TableDropdownFooter } from './TableDropdownFooter'

export const SearchTableDropdown: FC<FilterDropdownProps> = props => {
  const { setSelectedKeys, selectedKeys, confirm, visible } = props
  const { t } = useTranslation()

  const inputRef = useRef<any>()

  useEffect(() => {
    visible && setTimeout(() => inputRef.current.focus(), 0)
  }, [visible])

  return (
    <div>
      <Input
        ref={inputRef}
        autoFocus={visible}
        placeholder={t('common.search')}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={confirm}
        style={{ margin: 8, width: 'auto', border: 'none', minWidth: 200 }}
      />
      <TableDropdownFooter {...props} />
    </div>
  )
}
