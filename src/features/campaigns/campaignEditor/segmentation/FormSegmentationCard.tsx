import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { FC } from 'react'

export interface SegmentationCardProps {
  segmentationCategories?: any[]
  segmentations?: any[]
  onRemove: () => void
}

export const FormSegmentationCard: FC<SegmentationCardProps> = ({
  segmentationCategories = [],
  segmentations = [],
  onRemove
}) => {
  return (
    <>
      hello
      <Button onClick={onRemove}>
        <DeleteOutlined />
      </Button>
    </>
  )
}
