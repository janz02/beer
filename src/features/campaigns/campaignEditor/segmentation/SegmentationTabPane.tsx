import { PlusOutlined } from '@ant-design/icons'
import { Col, Row, Form, Modal, Typography, Empty, Button } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AccordionInfo } from 'components/accordion/AccordionInfo'
import { CustomAccordion } from 'components/accordion/CustomAccordion'
import { useCommonFormRules } from 'hooks'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sum } from 'services/commonFunctions'
import { CampaignEditorProps } from '../base/CampaignEditorForm'
import { SegmentationCardInput } from './SegmentationCardInput'
import './SegmentationTabPane.scss'

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  const { inbuiltSegmentation } = useCommonFormRules()
  const [form] = Form.useForm()

  const formValue = {
    campaignId,
    summaryAll: 12500,
    inbuiltSegmentationList: [
      // { segmentationId: 1, result: 300, isExpanded: true, expandResult: 34 },
      // { segmentationId: 1, result: 300, isExpanded: false },
      // { segmentationId: 1, categoryId: 1, result: 300, isExpanded: false }
    ],
    fileBasedSegmentationList: [
      // { url: 'valami', result: 200 }
      // { url: 'valami' },
      // { url: 'valami' },
      // { url: 'valami' },
      // { url: 'valami' }
    ]
  }

  const [summedInbuilt, setSummedInbuilt] = useState(0)
  const [summedFilebased, setSummedFilebased] = useState(0)

  const calculateInbuilt = (): void => {
    const summedResult = sum(form.getFieldValue('inbuiltSegmentationList'), 'result')
    const summedExpandedResult = sum(form.getFieldValue('inbuiltSegmentationList'), 'expandResult')
    setSummedInbuilt(summedResult + summedExpandedResult)
  }

  const calculateFilebased = (): void => {
    const summed = sum(form.getFieldValue('fileBasedSegmentationList'), 'result')
    setSummedFilebased(summed)
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
      <Form form={form} initialValues={formValue} onFinish={onHandleSubmit} layout="vertical">
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
                        <ul className="card-list__container">
                          {fields.map((field, index) => (
                            <li key={field.key}>
                              <Form.Item
                                name={[field.name]}
                                fieldKey={[field.fieldKey]}
                                rules={[inbuiltSegmentation()]}
                              >
                                <SegmentationCardInput
                                  onRemove={() => remove(index)}
                                  categories={data.segmentationCategories}
                                  segmentations={data.segmentations}
                                  onChange={calculateInbuilt}
                                />
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
