import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, Row, Form, Modal, Typography, Button } from 'antd'
import { AccordionInfo } from 'components/accordion/AccordionInfo'
import { CustomAccordion } from 'components/accordion/CustomAccordion'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()

  const data = {
    campaignId,
    inbuiltFilteredResults: 400,
    fileBasedFilteredResults: 300,
    summaryResults: 700,
    summaryAll: 12500,
    inbuiltSegmentationList: [],
    fileBasedSegmentationList: []
  }

  const handleInfoClick = (): void => {
    Modal.info({ title: 'Title', content: 'Content' })
  }

  const onHandleSubmit = (values: any): void => console.log(values)

  return (
    <>
      <Form initialValues={data} onFinish={onHandleSubmit} layout="vertical">
        <Row align="middle" justify="start" gutter={[16, 16]}>
          <Col span={24}>
            <CustomAccordion
              defaultActive={false}
              isInactive
              accordionKey="summary"
              title={t('campaign-create.segmentation.summary-title')}
              info={
                <AccordionInfo
                  type="info"
                  label={t('campaign-create.segmentation.target-title')}
                  customData={
                    <>
                      <Typography.Text strong>{data.summaryResults} / </Typography.Text>
                      <Typography.Text>{data.summaryAll}</Typography.Text>
                    </>
                  }
                  onClick={handleInfoClick}
                />
              }
            />
          </Col>

          <Col span={24}>
            <Form.List name="inbuiltSegmentationList">
              {(fields, { add, remove }) => {
                return (
                  <>
                    <CustomAccordion
                      accordionKey="inbuilt"
                      title={t('campaign-create.segmentation.inbuilt-title')}
                      info={
                        <AccordionInfo
                          type="info"
                          label={t('campaign-create.segmentation.filtered-results')}
                          data={data.inbuiltFilteredResults}
                          onClick={handleInfoClick}
                        />
                      }
                      actionBtnLabel={
                        <>
                          <PlusOutlined /> {t('campaign-create.segmentation.add-btn')}
                        </>
                      }
                      onActionBtnClick={add}
                    >
                      <ul>
                        {fields.map((field, index) => (
                          <li key={field.key}>
                            hello {`__${index}`}
                            <Button onClick={() => remove(index)}>
                              <DeleteOutlined />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CustomAccordion>
                  </>
                )
              }}
            </Form.List>
          </Col>

          <Col span={24}>
            <Form.List name="fileBasedSegmentationList">
              {(fields, { add, remove }) => {
                return (
                  <>
                    <CustomAccordion
                      accordionKey="filebased"
                      title={t('campaign-create.segmentation.file-based-title')}
                      info={
                        <AccordionInfo
                          type="info"
                          label={t('campaign-create.segmentation.filtered-results')}
                          data={data.fileBasedFilteredResults}
                          onClick={handleInfoClick}
                        />
                      }
                      actionBtnLabel={
                        <>
                          <PlusOutlined /> {t('campaign-create.segmentation.add-btn')}
                        </>
                      }
                      onActionBtnClick={add}
                    >
                      <ul>
                        {fields.map((field, index) => (
                          <li key={field.key}>
                            hello {`__${index}`}
                            <Button onClick={() => remove(index)}>
                              <DeleteOutlined />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CustomAccordion>
                  </>
                )
              }}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </>
  )
}
