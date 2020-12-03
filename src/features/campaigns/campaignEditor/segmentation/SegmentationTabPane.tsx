import { PlusOutlined } from '@ant-design/icons'
import { Col, Row, Form, Modal, Typography, Empty } from 'antd'
import { AccordionInfo } from 'components/accordion/AccordionInfo'
import { CustomAccordion } from 'components/accordion/CustomAccordion'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import { SegmentationCardInput } from './SegmentationCardInput'
import './SegmentationTabPane.scss'

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()

  const formValue = {
    campaignId,
    inbuiltFilteredResults: 400,
    fileBasedFilteredResults: 300,
    summaryResults: 700,
    summaryAll: 12500,
    inbuiltSegmentationList: [
      { segmentationId: 1, result: 300, isExpanded: true },
      { segmentationId: 1, result: 300, isExpanded: false },
      { segmentationId: 1, result: 300, isExpanded: false },
      { segmentationId: 1, result: 300, isExpanded: false },
      { segmentationId: 1, result: 300, isExpanded: false }
    ],
    fileBasedSegmentationList: [
      // { url: 'valami' },
      // { url: 'valami' },
      // { url: 'valami' },
      // { url: 'valami' },
      // { url: 'valami' }
    ]
  }

  const data = {
    segmentationCategories: [
      { categoryId: 1, name: 'Category 1' },
      { categoryId: 2, name: 'Category 2' },
      { categoryId: 3, name: 'Category 3' }
    ],
    segmentations: [
      { segmentationId: 1, name: 'Segementation 1', categoryId: 1 },
      { segmentationId: 2, name: 'Segementation 2', categoryId: null },
      { segmentationId: 3, name: 'Segementation 3', categoryId: 2 }
    ]
  }

  const handleInfoClick = (): void => {
    Modal.info({ title: 'Title', content: 'Content' })
  }

  const onHandleSubmit = (values: any): void => console.log(values)

  const emptySegmentationList = (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={t('campaign-create.segmentation.empty-list')}
    />
  )

  return (
    <>
      <Form initialValues={formValue} onFinish={onHandleSubmit} layout="vertical">
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
                      <Typography.Text strong>{formValue.summaryResults} / </Typography.Text>
                      <Typography.Text>{formValue.summaryAll}</Typography.Text>
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
                          data={formValue.inbuiltFilteredResults}
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
                      {fields.length === 0 && <>{emptySegmentationList}</>}
                      {fields.length > 0 && (
                        <ul className="card-list__container">
                          {fields.map((field, index) => (
                            <li key={field.key}>
                              <SegmentationCardInput
                                onRemove={() => remove(index)}
                                categories={data.segmentationCategories}
                                segmentations={data.segmentations}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
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
                          data={formValue.fileBasedFilteredResults}
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
                      {fields.length === 0 && <>{emptySegmentationList}</>}
                      {fields.length > 0 && (
                        <ul className="card-list__container">
                          {fields.map((field, index) => (
                            <li key={field.key}>
                              <SegmentationCardInput onRemove={() => remove(index)} />
                            </li>
                          ))}
                        </ul>
                      )}
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
