import { PlusOutlined } from '@ant-design/icons'
import { Col, Row, Form, Modal, Typography } from 'antd'
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
    summaryAll: 12500
  }

  const [inbuiltSegmentations, setInbuiltSegmentations] = useState<any[]>([])
  const [fileBasedSegmentations, setFileBasedSegmentations] = useState<any[]>([])

  const handleAddEmptyInbuilt = (): void => {
    setInbuiltSegmentations([...inbuiltSegmentations, 'New!'])
  }

  const handleAddEmptyFileBased = (): void => {
    setFileBasedSegmentations([...fileBasedSegmentations, 'New!'])
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
              onActionBtnClick={handleAddEmptyInbuilt}
            >
              {inbuiltSegmentations.map((el, i) => (
                <div key={`inbuilt__${i}`}>{el}</div>
              ))}
            </CustomAccordion>
          </Col>

          <Col span={24}>
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
              onActionBtnClick={handleAddEmptyFileBased}
            >
              {fileBasedSegmentations.map((el, i) => (
                <div key={`filebased__${i}`}>{el}</div>
              ))}
            </CustomAccordion>
          </Col>
        </Row>
      </Form>
    </>
  )
}
