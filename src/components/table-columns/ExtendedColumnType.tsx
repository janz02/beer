import { ColumnType } from 'antd/lib/table'

export interface ExtendedColumnType<RecordType> extends ColumnType<RecordType> {
  hiddenByDefault?: boolean
  cannotBeHidden?: boolean
}
