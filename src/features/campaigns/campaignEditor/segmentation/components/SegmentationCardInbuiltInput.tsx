import {
  AimOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  PlusCircleFilled
} from '@ant-design/icons'
import { Button, Collapse, Select, Typography, Form, Row, Col, Modal } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SegmentationCardBase.module.scss'

export interface SegmentationCardInbuiltInputValue {
  categoryId?: any
  segmentationId?: any
  result?: number
  isExpanded?: boolean
  expandResult?: number
}

export interface SegmentationCardInbuiltInputProps {
  categories?: any[]
  segmentations?: any[]
  onRemove: () => void
  value?: SegmentationCardInbuiltInputValue // from Form.Item
  onChange?: Function // from Form.Item
}

export const SegmentationCardInbuiltInput: FC<SegmentationCardInbuiltInputProps> = ({
  categories = [],
  segmentations = [],
  value,
  onChange,
  onRemove
}) => {
  const { t } = useTranslation()

  const [innerValue, setInnerValue] = useState<SegmentationCardInbuiltInputValue>({ ...value })
  const { categoryId } = innerValue

  const [filteredSegmentations, setFilteredSegmentations] = useState<any[]>()

  useEffect(() => {
    setInnerValue({ ...value })
  }, [value])

  useEffect(() => {
    if (categoryId) {
      setFilteredSegmentations(segmentations.filter(el => el.categoryId === categoryId))
    } else {
      setFilteredSegmentations(segmentations)
    }
  }, [categoryId, segmentations])

  const handleExpandClick = (): void => {
    Modal.confirm({
      title: 'Segmentation editor',
      content: 'Placeholder modal for editor',
      onOk: (close: any) => {
        const random = Math.floor(Math.random() * 65) + 1
        const randomForExpand = Math.floor(Math.random() * 65) + 1

        const newValue = {
          ...innerValue,
          isExpanded: true,
          expandResult: random,
          result: random + randomForExpand
        }

        onChange?.(newValue)
        close()
      }
    })
  }

  const handleExpandRemoveClick = (): void => {
    const newValue = {
      ...innerValue,
      isExpanded: false,
      expandResult: null,
      result: (innerValue.result || 0) - (innerValue.expandResult || 0)
    }

    onChange?.(newValue)
  }

  const handleCategorySelected = (selectedCategoryId: any): void => {
    const newValue = { ...innerValue, segmentationId: null, categoryId: selectedCategoryId }
    setInnerValue(newValue)

    onChange?.(newValue)
  }

  const handleSegmentationSelected = (selectedSegmentationId: any): void => {
    const newValue = { ...innerValue, segmentationId: selectedSegmentationId }

    onChange?.(newValue)
  }

  return (
    <Collapse
      defaultActiveKey={['card']}
      expandIcon={() => undefined}
      className={styles.card__container}
    >
      <Collapse.Panel
        key="card"
        className={`custom-form-item-card ${styles.card__panel}`}
        header={
          <span className={styles.card__headerContainer}>
            <AimOutlined />
            <span className={styles.card__titleAndBtnContainer}>
              <span className={styles.card__headerTitleContainer}>
                <Typography.Text strong>
                  {t('campaign-create.segmentation.definition')}
                </Typography.Text>
                <span>
                  <Typography.Text>
                    {`${t('campaign-create.segmentation.filtered-results')}: `}
                  </Typography.Text>
                  <Typography.Text strong>{innerValue?.result || 0}</Typography.Text>
                </span>
              </span>
              <Button
                onClick={e => {
                  e.stopPropagation()
                  onRemove()
                }}
                className={styles.card__deleteBtn}
              >
                <DeleteOutlined />
              </Button>
            </span>
          </span>
        }
      >
        <Row align="middle" justify="center" gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label={t('campaign-create.segmentation.category-label')}
              className="bypass-error-border"
            >
              <Select
                value={innerValue?.categoryId}
                placeholder={t('campaign-create.segmentation.category-placeholder')}
                onChange={handleCategorySelected}
              >
                <Select.Option value="">
                  {t('campaign-create.segmentation.category-default')}
                </Select.Option>
                {categories.map((el, i) => (
                  <Select.Option key={`category__${el.categoryId}`} value={el.categoryId}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={t('campaign-create.segmentation.segmentation-label')} required>
              <Select
                value={innerValue?.segmentationId}
                placeholder={t('campaign-create.segmentation.segmentation-placeholder')}
                onChange={handleSegmentationSelected}
              >
                {filteredSegmentations?.map((el, i) => (
                  <Select.Option
                    key={`segmentation__${el.segmentationId}`}
                    value={el.segmentationId}
                  >
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {!innerValue?.isExpanded && (
              <Button
                type="dashed"
                icon={<PlusCircleFilled />}
                className={styles.card__actionBtn}
                onClick={handleExpandClick}
              >
                {t('campaign-create.segmentation.expand-btn')}
              </Button>
            )}
            {innerValue?.isExpanded && (
              <span className={styles.card__editBtnContainer}>
                <Button icon={<EditFilled />} onClick={handleExpandClick}>
                  {`${t('campaign-create.segmentation.expanded-label')} (${
                    innerValue.expandResult
                  })`}
                </Button>
                <Button icon={<DeleteFilled />} onClick={handleExpandRemoveClick} />
              </span>
            )}
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  )
}