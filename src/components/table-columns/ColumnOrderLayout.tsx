import React from 'react'
import { Card, Button, Row, Col, Select, Checkbox } from 'antd'
import Title from 'antd/lib/typography/Title'
import { CloseOutlined } from '@ant-design/icons'
import { ColumnOrderDragAndDrop } from './ColumnOrderDragAndDrop'
import { UseColumnOrderFeatures } from './useColumnOrder'
import Text from 'antd/lib/typography/Text'
import { useTranslation } from 'react-i18next'
import styles from './ColumnOrderLayout.module.scss'
import { Option } from 'antd/lib/mentions'

export const ColumOrderLayout: <T>(
  p: UseColumnOrderFeatures<T>
) => React.ReactElement<UseColumnOrderFeatures<T>> = props => {
  const { t } = useTranslation()

  return (
    <Card className={styles.card}>
      <Row gutter={[0, 8]} className={styles.mainRow}>
        <Col>
          <Row justify="space-between">
            <Col span={22}>
              <Title level={3} className={styles.title}>
                {t('column-order.layout.header')}
              </Title>
            </Col>
            <Col span={2}>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={props.handleChangeVisibility}
              />
            </Col>
          </Row>
        </Col>
        <Col flex="auto">
          <ColumnOrderDragAndDrop {...props} />
        </Col>
        <Col>
          <Select
            value={[]}
            placeholder={t('column-order.layout.add-select-placeholder')}
            onChange={value => props.addColumn(value)}
            className={styles.addSelect}
          >
            {props.hiddenColumns.map(column => (
              <Option value={String(column.dataIndex)} key={String(column.dataIndex)}>
                {column.title}
              </Option>
            ))}
          </Select>
          <Checkbox onChange={e => props.addOrRemoveAllColumn(e.target.checked)}>
            {t('column-order.layout.add-all-checkbox')}
          </Checkbox>
        </Col>
        <Col>
          <Button type="link" className={styles.defaultButton} onClick={props.handleResetToDefault}>
            <span>{t('column-order.layout.default')}</span>
          </Button>
        </Col>
        <Col>
          <Row justify="space-between">
            <Col span={12}>
              <Button
                type="text"
                className={styles.cancelButton}
                onClick={props.handleChangeVisibility}
              >
                <Text type="secondary">{t('column-order.layout.cancel')}</Text>
              </Button>
            </Col>
            <Col span={12} className={styles.applyButtonCol}>
              <Button
                disabled={props.tempColumns.length === 0}
                type="primary"
                onClick={props.handleApplyChanges}
              >
                {t('column-order.layout.apply')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
