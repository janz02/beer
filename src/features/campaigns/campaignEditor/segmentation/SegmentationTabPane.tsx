import { PlusOutlined } from '@ant-design/icons'
import { Col, Row, Form, Modal, Typography, Empty } from 'antd'
import { AccordionInfo } from 'components/accordion/AccordionInfo'
import { CustomAccordion } from 'components/accordion/CustomAccordion'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import { FormSegmentationCard } from './FormSegmentationCard'

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()

  const data = {
    campaignId,
    inbuiltFilteredResults: 400,
    fileBasedFilteredResults: 300,
    summaryResults: 700,
    summaryAll: 12500,
    inbuiltSegmentationList: [
      { segmentationId: 1, segmentationCategoryId: 4 },
      { segmentationId: 1, segmentationCategoryId: 4 },
      { segmentationId: 1, segmentationCategoryId: 4 },
      { segmentationId: 1, segmentationCategoryId: 4 },
      { segmentationId: 1, segmentationCategoryId: 4 }
    ],
    fileBasedSegmentationList: [
      { url: 'valami' },
      { url: 'valami' },
      { url: 'valami' },
      { url: 'valami' },
      { url: 'valami' }
    ]
  }

  const handleInfoClick = (): void => {
    Modal.info({ title: 'Title', content: 'Content' })
  }

  const onHandleSubmit = (values: any): void => console.log(values)

  const emptySegmentationList = (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('Hozzáadhatsz  szegmentációt')} />
  )

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
                        {fields.length === 0 && <>{emptySegmentationList}</>}
                        {fields.map((field, index) => (
                          <li key={field.key}>
                            <FormSegmentationCard onRemove={() => remove(index)} />
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
                        {fields.length === 0 && <>{emptySegmentationList}</>}
                        {fields.map((field, index) => (
                          <li key={field.key}>
                            <FormSegmentationCard onRemove={() => remove(index)} />
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
