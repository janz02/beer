import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Row, Form, Modal, Typography } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import './SegmentationStyles.scss'

const { Panel } = Collapse
const { Title } = Typography

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()

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
            <Collapse defaultActiveKey={['1']}>
              <Panel
                header={
                  <div className="accordion-header__container">
                    <div className="accordion-title__container">
                      <Title level={3} className="accordion-header__title">
                        {t('Inbuilt segmentation')}
                      </Title>
                      <Title
                        level={4}
                        className="accordion-header__title accordion-header__title--small"
                      >
                        {t('Filtered results')}
                      </Title>
                      <Title level={5} className="accordion-header__title">
                        {data.inbuiltFilteredResults}
                      </Title>
                      <span>
                        <InfoCircleOutlined
                          onClick={e => {
                            e.stopPropagation()
                            Modal.info({ title: 'Info', content: 'Info!!', okText: 'Ok' })
                          }}
                        />
                      </span>
                    </div>

                    <Button onClick={handleAddEmptyInbuilt}>
                      <PlusOutlined /> Add segementation
                    </Button>
                  </div>
                }
                key="1"
              >
                {campaignId}
              </Panel>
            </Collapse>
          </Col>
          {/* <Col span={24}>
            <Collapse defaultActiveKey={['2']}>
              <Panel
                header={t('File based custom segmentation')}
                key="2"
                extra={
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="fileBasedFilteredResults"
                        label={t('Filtered results')}
                        className="control-label"
                      >
                        <h4 className={styles['accordion-extra__data']}>
                          {data.fileBasedFilteredResults}
                        </h4>
                        <span>
                          <InfoCircleOutlined
                            onClick={e => {
                              e.stopPropagation()
                              Modal.info({ title: 'Info', content: 'Info!!', okText: 'Ok' })
                            }}
                          />
                        </span>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button onClick={handleAddEmptyFileBased}>
                        <PlusOutlined /> Add segementation
                      </Button>
                    </Col>
                  </Row>
                }
              >
                {campaignId}
              </Panel>
            </Collapse>
          </Col> */}
        </Row>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  )
}
