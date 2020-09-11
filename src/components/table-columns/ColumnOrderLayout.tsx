import React from 'react'
import { Card, Button, Row, Col } from 'antd'
import Title from 'antd/lib/typography/Title'
import { CloseOutlined } from '@ant-design/icons'
import { ColumnOrderDragAndDrop } from './ColumnOrderDragAndDrop'
import { UseColumnOrderFeatures } from './useColumnOrder'
import Text from 'antd/lib/typography/Text'
import { useTranslation } from 'react-i18next'
import styles from './ColumnOrderLayout.module.scss'

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
              <Button type="primary" onClick={props.handleApplyChanges}>
                {t('column-order.layout.apply')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
