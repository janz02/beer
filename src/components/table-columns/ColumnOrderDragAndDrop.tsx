import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { UseColumnOrderFeatures } from './useColumnOrder'
import { MoreOutlined } from '@ant-design/icons'
import styles from './ColumnOrderDragAndDrop.module.scss'
import Text from 'antd/lib/typography/Text'
import { useTranslation } from 'react-i18next'
import { ColumnType } from 'antd/lib/table'

const DraggableItem = <T extends {}>(column: ColumnType<T>, index: number): JSX.Element => (
  <Draggable key={String(column.dataIndex)} draggableId={String(column.dataIndex)} index={index}>
    {provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={styles.draggableItem}
      >
        <MoreOutlined />
        <Text className={styles.draggableItemText}>{column.title}</Text>
      </div>
    )}
  </Draggable>
)

export const ColumnOrderDragAndDrop: <T>(
  p: UseColumnOrderFeatures<T>
) => React.ReactElement<UseColumnOrderFeatures<T>> = props => {
  const { t } = useTranslation()

  const { setTempColumns, tempColumns } = props

  const reorder = (startIndex: number, endIndex: number): void => {
    const result = Array.from(tempColumns)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    setTempColumns(result)
  }

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }
    reorder(result.source.index, result.destination.index)
  }

  return (
    <>
      <Text strong className={styles.header}>
        {t('column-order.drag-and-drop.header')}
      </Text>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div
              className={styles.draggableArea}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tempColumns
                .filter(column => column.title && column.dataIndex)
                .map((column, index) => DraggableItem(column, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
