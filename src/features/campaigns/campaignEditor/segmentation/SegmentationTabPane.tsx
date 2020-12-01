import { DownOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Row, Form, Modal, Typography } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import './SegmentationStyles.scss'

const { Panel } = Collapse
const { Title, Text } = Typography

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  const [inbuiltActive, setInbuiltActive] = useState(true)

  const data = {
    inbuiltFilteredResults: 400,
    fileBasedFilteredResults: 400,
    inbuiltSegmentations: [],
    fileBasedSegmentations: []
  }

  const handleAddEmptyInbuilt = (event: any): void => {
    event.stopPropagation()
    console.log('add inbuilt')
  }

  const handleAddEmptyFileBased = (event: any): void => {
    event.stopPropagation()
    console.log('add file based')
  }

  const onHandleSubmit = (values: any): void => console.log(values)

  return (
    <>
      <Form initialValues={data} onFinish={onHandleSubmit} layout="vertical">
        <Row align="middle" justify="start" gutter={[16, 16]}>
          <Col span={24}>
            <Collapse
              defaultActiveKey={['1']}
              expandIcon={() => undefined}
              onChange={activeKeys => setInbuiltActive(activeKeys.includes('1'))}
            >
              <Panel
                key="1"
                header={
                  <span className="panel-header__container">
                    <span className="panel-header-title__container">
                      <span className="panel-header__title">
                        <Text strong>{t('Inbuilt segmentation')}</Text>
                        <DownOutlined rotate={inbuiltActive ? 180 : 0} />
                      </span>

                      <span
                        className="panel-header__info"
                        onClick={e => {
                          e.stopPropagation()
                          Modal.info({ title: 'Info', content: 'Info!!', okText: 'Ok' })
                        }}
                      >
                        <Text>{t('Filtered results')}</Text>
                        <span>
                          <Text strong>{data.inbuiltFilteredResults}</Text>
                          <InfoCircleOutlined />
                        </span>
                      </span>
                    </span>
                    <Button onClick={handleAddEmptyInbuilt}>
                      <PlusOutlined /> Add segementation
                    </Button>
                  </span>
                }
              >
                {campaignId}
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  )
}
