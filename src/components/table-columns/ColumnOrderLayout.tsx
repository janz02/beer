import React from 'react'
import { Card, Button, Row, Col } from 'antd'
import Title from 'antd/lib/typography/Title'
import { CloseOutlined } from '@ant-design/icons'
import { ColumnOrderDragAndDrop } from './ColumnOrderDragAndDrop'
import { UseColumnOrderFeatures } from './useColumnOrder'
import Text from 'antd/lib/typography/Text'
import { useTranslation } from 'react-i18next'

export const ColumOrderLayout: <T>(
  p: UseColumnOrderFeatures<T>
) => React.ReactElement<UseColumnOrderFeatures<T>> = props => {
  const { t } = useTranslation()

  const {
    changeVisibility,
    storeColumnsOrder,
    setTempColumns,
    tempColumns,
    setCurrentColumns,
    defaultColumns
  } = props

  return (
    <Card style={{ width: 295 }}>
      <Row gutter={[0, 8]} style={{ flexDirection: 'column' }}>
        <Col>
          <Row justify="space-between">
            <Col span={22}>
              <Title level={3} style={{ fontWeight: 300 }}>
                {t('column-order.layout.header')}
              </Title>
            </Col>
            <Col span={2}>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => changeVisibility()}
              />
            </Col>
          </Row>
        </Col>
        <Col flex="auto">
          <ColumnOrderDragAndDrop {...props} />
        </Col>
        <Col>
          <Button
            type="link"
            style={{ marginLeft: -15 }}
            onClick={() => setTempColumns(defaultColumns)}
          >
            <span style={{ textDecoration: 'underline' }}>{t('column-order.layout.default')}</span>
          </Button>
        </Col>
        <Col>
          <Row justify="space-between">
            <Col span={12}>
              <Button type="text" style={{ marginLeft: -15 }} onClick={() => changeVisibility()}>
                <Text type="secondary">{t('column-order.layout.cancel')}</Text>
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <Button
                type="primary"
                onClick={() => {
                  setCurrentColumns(tempColumns)
                  storeColumnsOrder()
                  changeVisibility()
                }}
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
