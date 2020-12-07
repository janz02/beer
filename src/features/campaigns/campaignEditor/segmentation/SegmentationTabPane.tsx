import { PlusOutlined } from '@ant-design/icons'
import { Col, Row, Form, Modal, Typography, Empty, Button } from 'antd'
import { AccordionInfo } from 'components/accordion/AccordionInfo'
import { CustomAccordion } from 'components/accordion/CustomAccordion'
import { useCommonFormRules } from 'hooks'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sum } from 'services/commonFunctions'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import { SegmentationCardFilebasedInput } from './components/SegmentationCardFilebasedInput'
import { SegmentationCardInbuiltInput } from './components/SegmentationCardInbuiltInput'
import styles from './SegmentationTabPane.module.scss'

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { inbuiltSegmentation, filebasedSegmentation } = useCommonFormRules()
  const [summedInbuilt, setSummedInbuilt] = useState(0)
  const [summedFilebased, setSummedFilebased] = useState(0)

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

  const formValue = {
    campaignId,
    summaryAll: 12500,
    inbuiltSegmentationList: [
      // { segmentationId: 1, result: 300, isExpanded: true, expandResult: 34 }
    ],
    fileBasedSegmentationList: [
      // { fileId: 'valamiFileId', result: 200 }
    ]
  }

  const emptySegmentationList = (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={t('campaign-create.segmentation.empty-list')}
    />
  )

  const calculateInbuilt = (): void => {
    const summedResult = sum(form.getFieldValue('inbuiltSegmentationList'), 'result')
    const summedExpandedResult = sum(form.getFieldValue('inbuiltSegmentationList'), 'expandResult')

    console.log({
      list: form.getFieldValue('inbuiltSegmentationList'),
      summedResult,
      summedExpandedResult
    })
    setSummedInbuilt(summedResult + summedExpandedResult)
  }

  const calculateFilebased = (): void => {
    const summed = sum(form.getFieldValue('fileBasedSegmentationList'), 'result')
    setSummedFilebased(summed)
  }

  const handleInfoClick = (): void => {
    Modal.info({ title: 'Title', content: 'Content' })
  }

  const handleSubmit = (values: any): void => console.log(values)

  const handleDownloadFile = (fileId?: string): void => {
    console.log(fileId)
  }

  return (
    <>
      <Form form={form} initialValues={formValue} onFinish={handleSubmit} layout="vertical">
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
                      <Typography.Text strong>{summedInbuilt + summedFilebased} / </Typography.Text>
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
                          data={summedInbuilt}
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
                        <ul className={styles.cardList__container}>
                          {fields.map((field, index) => (
                            <li key={field.key}>
                              <Form.Item shouldUpdate>
                                {() => (
                                  <Form.Item
                                    name={[field.name]}
                                    fieldKey={[field.fieldKey]}
                                    rules={[inbuiltSegmentation()]}
                                  >
                                    <SegmentationCardInbuiltInput
                                      onRemove={() => {
                                        remove(index)
                                        calculateInbuilt()
                                      }}
                                      categories={data.segmentationCategories}
                                      segmentations={data.segmentations}
                                      onChange={calculateInbuilt}
                                    />
                                  </Form.Item>
                                )}
                              </Form.Item>
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
                          data={summedFilebased}
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
                        <ul className={styles.cardList__container}>
                          {fields.map((field, index) => (
                            <li key={field.key}>
                              <Form.Item shouldUpdate>
                                {() => (
                                  <Form.Item
                                    name={[field.name]}
                                    fieldKey={[field.fieldKey]}
                                    rules={[filebasedSegmentation()]}
                                  >
                                    <SegmentationCardFilebasedInput
                                      onChange={calculateFilebased}
                                      onRemove={() => {
                                        remove(index)
                                        calculateFilebased()
                                      }}
                                      onDownload={handleDownloadFile}
                                    />
                                  </Form.Item>
                                )}
                              </Form.Item>
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
          <Col>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
