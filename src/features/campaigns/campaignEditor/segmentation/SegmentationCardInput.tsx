import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Collapse, Select, Typography, Form, Row, Col } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import './SegmentationCardInput.scss'

export interface SegmentationCardInputProps {
  categories?: any[]
  segmentations?: any[]
  onRemove: () => void
  value?: { categoryId?: any; segmentationId?: any; result?: number; isExpanded?: boolean }
  onChange?: Function
}

export const SegmentationCardInput: FC<SegmentationCardInputProps> = ({
  categories = [],
  segmentations = [],
  value,
  onChange,
  onRemove
}) => {
  const { t } = useTranslation()

  const handleExpandClick = (): void => console.log('expando patrono!')

  const handleExpandRemoveClick = (): void => console.log('expando deleto!')

  return (
    <Collapse defaultActiveKey={['card']} expandIcon={() => undefined} className="card__container">
      <Collapse.Panel
        key="card"
        className="card__panel"
        header={
          <span className="card__header-container">
            <span className="card__header-title-container">
              <Typography.Text strong>
                {t('campaign-create.segmentation.definition')}
              </Typography.Text>
              <span>
                <Typography.Text>
                  {`${t('campaign-create.segmentation.filtered-results')}: `}
                </Typography.Text>
                <Typography.Text strong>{value?.result || 0}</Typography.Text>
              </span>
            </span>
            <Button
              onClick={e => {
                e.stopPropagation()
                onRemove()
              }}
              className="card__delete-btn"
            >
              <DeleteOutlined />
            </Button>
          </span>
        }
      >
        <Row align="middle" justify="center" gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label={t('campaign-create.segmentation.category-label')}>
              <Select placeholder={t('campaign-create.segmentation.category-placeholder')}>
                <Select.Option value="null">
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
              <Select placeholder={t('campaign-create.segmentation.segmentation-placeholder')}>
                {segmentations.map((el, i) => (
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
            {!value?.isExpanded && (
              <Button
                type="dashed"
                icon={<PlusCircleOutlined />}
                className="card__action-btn"
                onClick={handleExpandClick}
              >
                {t('campaign-create.segmentation.expand-btn')}
              </Button>
            )}
            {value?.isExpanded && (
              <Button
                type="dashed"
                icon={<DeleteOutlined />}
                className="card__action-btn"
                onClick={handleExpandRemoveClick}
              >
                {t('campaign-create.segmentation.expand-btn')}
              </Button>
            )}
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  )
}
