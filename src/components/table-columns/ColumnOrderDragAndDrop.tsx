import React, { useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { UseColumnOrderFeatures } from './useColumnOrder'
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ColumnOrderDragAndDrop.module.scss'
import Text from 'antd/lib/typography/Text'
import { useTranslation } from 'react-i18next'
import { ColumnType } from 'antd/lib/table'
import { Button } from 'antd'

export const ColumnOrderDragAndDrop: <T>(
  p: UseColumnOrderFeatures<T>
) => React.ReactElement<UseColumnOrderFeatures<T>> = props => {
  const { t } = useTranslation()

  const DraggableItem = useCallback(
    (column: ColumnType<any>, index: number): JSX.Element => (
      <Draggable
        key={String(column.dataIndex)}
        draggableId={String(column.dataIndex)}
        index={index}
      >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.draggableItem}
          >
            <MoreOutlined />
            <Text className={styles.draggableItemText}>{column.title}</Text>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => props.hideColumn(column)}
            />
          </div>
        )}
      </Draggable>
    ),
    [props]
  )

  return (
    <>
      <Text strong className={styles.header}>
        {t('column-order.drag-and-drop.header')}
      </Text>
      <DragDropContext onDragEnd={props.onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div
              className={styles.draggableArea}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {props.tempColumns
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
